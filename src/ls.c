#include<ls.h>

int ls(int argc, char **argv) {
	switch(global_opts.target) {
		case WORKOUT_DATA_TYPE_ATTRIBUTE:
			return ls_attribute();
		case WORKOUT_DATA_TYPE_RECENT:
			return ls_recent();
		case WORKOUT_DATA_TYPE_DEFAULT:
		case WORKOUT_DATA_TYPE_WORKOUT:
			return ls_workout(argc,argv);
	}
}

int ls_attribute() {
	if(attribute_get(&print_attribute)<0) { return EXIT_FAILURE; }

	return EXIT_SUCCESS;
}

int ls_recent() {
	if(recent_get(global_opts.rows,&print_recent)<0) {
		log_err(LS_RECENT_COMMAND_FAILED);
		return EXIT_FAILURE;
	}

	return EXIT_SUCCESS;
}

struct ls_helper {
	int i;
	int attr_count;
};

struct ls_helper helper = {
	0,
	0
};

static struct option ls_long_options[] = {
	{"filter", required_argument, 0, 'f'},
	{0,0,0,0}
};

int ls_workout(int argc, char **argv) {
	/*
	 * Cases:
	 * -filter by attribute value: workouts --filter 011xx100
	 * -search by name: workouts P90X
	 *
	 * All together: workouts --filter 01xx1001 P90X
	 *
 	 * 0: must not have attribute
 	 * 1: must have attribute
	 * x: can have attribute
	 */

	int c;
	char *filter_p = NULL;
	char *search_term = NULL;

	// reset optind; see `man getopt.3` NOTES section for justification
	optind = 0;
	while(1) {
		int option_index = 0;

		if((c = getopt_long(argc,argv,"f:",ls_long_options,&option_index))==-1) { break; }

		switch(c) {
			case 0:
				if(ls_long_options[option_index].flag!=0) { break; }

				log_err("option %s",ls_long_options[option_index].name);
				if(optarg) {
					log_err(" with arg %s",optarg);
				}
				log_err("\n");
				return EXIT_FAILURE;
				
				break;
			case 'f':
				filter_p = optarg;
				break;
			case '?':
			default:
				usage();
				return EXIT_FAILURE;
		}
	}

	if(optind<argc) {
		search_term = argv[optind];
	}

	helper.attr_count = attribute_count();
	if(attribute_get(&print_header)<0) { return -1; }

	if(workout_get(
		search_term, /* term */
		filter_p, /* filter */
		global_opts.rows, /* limit */
		&print_workout /* print_function */
	)<0) { return EXIT_FAILURE; }

	return EXIT_SUCCESS;
}

#define ATTRIBUTE_PRINT_FORMAT "%s\n"

void print_attribute(const unsigned char *name) {
	printf(ATTRIBUTE_PRINT_FORMAT,name);
}

#define ATTRIBUTE_PRINT_HEADER "Attributes:\t"
#define ATTRIBUTE_PRINT_ROW "%s\t"
#define ATTRIBUTE_PRINT_END "\n"

void print_header(const unsigned char *name) {
	if((helper.attr_count>0)&&(helper.i==0)) {
		printf(ATTRIBUTE_PRINT_HEADER);
	}
	printf(ATTRIBUTE_PRINT_ROW,name);
	helper.i++;
	if(helper.i==helper.attr_count) {
		printf(ATTRIBUTE_PRINT_END);
	}
}

#define RECENT_PRINT_FORMAT "%s\t%s\n"

void print_recent(const unsigned char *workout, const unsigned char *date) {
	printf(RECENT_PRINT_FORMAT,workout,date);
}

#define PRINT_WORKOUT_FORMAT "%s [%d] [Last done: %s]\n"
#define PRINT_WORKOUT_FORMAT_LAST_NULL "%s [%d] [Last done: N/A]\n"

void print_workout(const unsigned char *name, int attr_flags, const unsigned char *last) {
	printf((NULL==last)?PRINT_WORKOUT_FORMAT_LAST_NULL:PRINT_WORKOUT_FORMAT,name,attr_flags,last);
}