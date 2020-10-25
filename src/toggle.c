#include<toggle.h>

int toggle(int argc, char **argv) {
	if(3!=argc) {
		log_err(TOGGLE_MESSAGE_WRONG_NUM_ARGS);
		usage();
		return EXIT_FAILURE;
	}

	if(workout_toggle(argv[1],argv[2])<0) {
		log_err(TOGGLE_MESSAGE_UNABLE,argv[2],argv[1]);
		return EXIT_FAILURE;
	}

	log_msg(TOGGLE_MESSAGE_SUCCESS,argv[2],argv[1]);

	return EXIT_SUCCESS;
}