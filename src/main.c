#include<config.h>
#include<main.h>

int main(int argc, char **argv) {
	int i,ret;

	if(defaults()<0) { return EXIT_FAILURE; }

	i = 1;
	do {
		ret = option(argv[i]);
		switch(ret) {
			case OPTION_NO_MORE:
				goto exit_options;
			case OPTION_HELP:
				usage();
				return EXIT_SUCCESS;
			case OPTION_INVALID:
				printf("invalid option: %s\n\n",argv[i]);
				usage();
				return EXIT_FAILURE;
			case OPTION_ERROR:
				printf("unknown error occured\n");
				return EXIT_FAILURE;
			case OPTION_EXIT:
				return EXIT_FAILURE;
			default:
				i++;
				break;
		}
	} while(ret>0);

	exit_options:
		if(setup()<0) { return EXIT_FAILURE; }
		char *cmd = argv[i];

		if(NULL!=cmd) {
			i++;
			if(strcmp(cmd,UTIL_ADD)==0) {
				return add(i,argc,argv);
			} else if(strcmp(cmd,UTIL_ATTR)==0) {
				return attr(i,argc,argv);
			} else if(strcmp(cmd,UTIL_LS)==0) {
				return ls(i,argc,argv);
			} else if(strcmp(cmd,UTIL_NEW)==0) {
				return new_workout(i,argc,argv);
			} else if(strcmp(cmd,UTIL_RECENT)==0) {
				return recent(i,argc,argv);
			} else if(strcmp(cmd,UTIL_TOGGLE)==0) {
				return toggle(i,argc,argv);
			} else if(strcmp(cmd,UTIL_VERSION)==0) {
				printf("Version: 0.0.0\n");
				return EXIT_SUCCESS;
			} else {
				// decrement to allow for args to ls
				i--;
			}
		}
	
		return ls(i,argc,argv);
}