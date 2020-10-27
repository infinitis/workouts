#include<main.h>

static struct option long_options[] = {
	{"attribute", no_argument, 0, 'a'},
	{"attr", no_argument, 0, 'a'},
	{"help", no_argument, 0, 'h'},
	{"homedir", required_argument, 0, 'd'},
	{"quiet", no_argument, &verbose_flag, LOG_LEVEL_SILENT},
	{"recent", no_argument, 0, 'l'},
	{"rows", required_argument, 0, 'r'},
	{"verbose", no_argument, &verbose_flag, LOG_LEVEL_VERBOSE},
	{"workout", no_argument, 0, 'w'},
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
		if((c = getopt_long(argc,argv,"+ad:hlqr:vw",long_options,&option_index))==-1) { break; }

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
			case 'a':
				opt_set_target(WORKOUT_DATA_TYPE_ATTRIBUTE);
				break;
			case 'd':
				if(opt_set_homedir(optarg)<0) { return EXIT_FAILURE; }
				break;
			case 'l':
				opt_set_target(WORKOUT_DATA_TYPE_RECENT);
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
			case 'w':
				opt_set_target(WORKOUT_DATA_TYPE_WORKOUT);
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
		} else if(strcmp(cmd,UTIL_LS)==0) {
			return ls(argc,argv);
		} else if(strcmp(cmd,UTIL_RM)==0) {
			return rm(argc,argv);
		} else if(strcmp(cmd,UTIL_TOGGLE)==0) {
			return toggle(argc,argv);
		} else {
			log_err(MAIN_MESSAGE_UNKNOWN_CMD,cmd);
			usage();
			return EXIT_FAILURE;
		}
	}

	return ls(argc,argv);
}