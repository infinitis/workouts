#include<toggle.h>

int toggle(int i, int argc, char **argv) {
	if(i+2!=argc) {
		printf("wrong number of arguments for toggle\n");
		usage();
		return EXIT_FAILURE;
	}

	if(workout_toggle(argv[i],argv[i+1])<0) {
		printf("unable to toggle attribute %s for workout %s\n",argv[i+1],argv[i]);
		return EXIT_FAILURE;
	}

	printf("Successfully toggled %s attribute for workout %s\n",argv[i+1],argv[i]);

	return EXIT_SUCCESS;
}