#include<ls.h>

struct ls_helper {
	int i;
	int attr_count;
};

struct ls_helper helper = {
	0,
	0
};

int ls(int i, int argc, char **argv) {
	char *filter_p = NULL;
	/*
	Cases:
	-filter by attribute value: workouts --filter 011xx100
	-search by name: workouts P90X
	
	All together: workouts --filter 01xx1001 P90X

	0: must not have attribute
	1: must have attribute
	x: can have attribute
	*/

	helper.attr_count = attribute_count();
	if(attribute_get(&print_header)<0) { return -1; }

	if(i+1<argc) {
		if(memcmp(argv[i],"--filter",8)==0) {
			filter_p = argv[i+1];
			i += 2;
		}
	}
	
	switch(argc-i) {
		case 0:
			return (workout_get(
				NULL, /* term */
				filter_p, /* filter */
				global_opts.rows, /* limit */
				&print_workout /* print_function */
			)<0)?EXIT_FAILURE:EXIT_SUCCESS;
		case 1:
			return (workout_get(
				argv[i], /* term */
				filter_p, /* filter */
				global_opts.rows, /* limit */
				&print_workout /* print function */
			)<0)?EXIT_FAILURE:EXIT_SUCCESS;
		default:
			printf("invalid usage\n");
			usage();
			return EXIT_FAILURE;
	}
}

void print_header(const unsigned char *name) {
	if((helper.attr_count>0)&&(helper.i==0)) {
		printf("Attributes:\t");
	}
	printf("%s\t",name);
	helper.i++;
	if(helper.i==helper.attr_count) {
		printf("\n");
	}
}

#define PRINT_WORKOUT_FORMAT "%s [%d] [Last done: %s]\n"
#define PRINT_WORKOUT_FORMAT_LAST_NULL "%s [%d] [Last done: N/A]\n"

void print_workout(const unsigned char *name, int attr_flags, const unsigned char *last) {
	printf((NULL==last)?PRINT_WORKOUT_FORMAT_LAST_NULL:PRINT_WORKOUT_FORMAT,name,attr_flags,last);
}