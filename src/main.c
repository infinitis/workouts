#include<main.h>

static struct option long_options[] = {
	{"help", no_argument, 0, 'h'},
	{"homedir", required_argument, 0, 'd'},
	{"quiet", no_argument, &verbose_flag, LOG_LEVEL_SILENT},
	{"rows", required_argument, 0, 'r'},
	{"verbose", no_argument, &verbose_flag, LOG_LEVEL_VERBOSE},
	{0,0,0,0}
};

int main(int argc, char **argv) {
	int c;

	if(defaults()<0) { return EXIT_FAILURE; }

	while(1) {
		int option_index = 0;

		/* The '+' at the beginning of the string means getopt_long will
		 * stop processing after finding the first non-option argument.
		 */
		if((c = getopt_long(argc,argv,"+d:hqr:v",long_options,&option_index))==-1) { break; }

		switch(c) {
			case 0:
				if(long_options[option_index].flag!=0) { break; }

				log_err("option %s",long_options[option_index].name);
				if(optarg) {
					log_err(" with arg %s",optarg);
				}
				log_err("\n");
				return EXIT_FAILURE;
				
				break;
			case 'd':
				if(opt_set_homedir(optarg)<0) { return EXIT_FAILURE; }
				break;
			case 'h':
				usage();
				return EXIT_FAILURE;
				break;
			case 'q':
				opt_set_log_level(LOG_LEVEL_SILENT);
				break;
			case 'r':
				opt_set_rows(strtoul(optarg,NULL,10));
				break;
			case 'v':
				opt_set_log_level(LOG_LEVEL_VERBOSE);
				break;
			case '?':
			default:
				return EXIT_FAILURE;
		}
	}

	if(setup()<0) { return EXIT_FAILURE; }

	if(optind<argc) {
		char *cmd = argv[optind];
		argc -=  optind;
		argv = &(argv[optind]);
		
		if(strcmp(cmd,UTIL_ADD)==0) {
			return add(argc,argv);
		} else if(strcmp(cmd,UTIL_ATTR)==0) {
			return attr(argc,argv);
		} else if(strcmp(cmd,UTIL_LS)==0) {
			return ls(argc,argv);
		} else if(strcmp(cmd,UTIL_NEW)==0) {
			return new_workout(argc,argv);
		} else if(strcmp(cmd,UTIL_RECENT)==0) {
			return recent();
		} else if(strcmp(cmd,UTIL_TOGGLE)==0) {
			return toggle(argc,argv);
		} else {
			log_err("Unknown cmd: %s\n",cmd);
			return EXIT_FAILURE;
		}
	}

	return ls(argc,argv);
}