#include<rm.h>

int rm(int argc, char **argv) {
	switch(global_opts.target) {
		case WORKOUT_DATA_TYPE_ATTRIBUTE:
			return rm_attribute(argc,argv);
		case WORKOUT_DATA_TYPE_DEFAULT:
		case WORKOUT_DATA_TYPE_RECENT:
			return rm_recent(argc,argv);
		case WORKOUT_DATA_TYPE_WORKOUT:
			return rm_workout(argc,argv);
	}
}

int rm_attribute(int argc, char **argv) {
	if(argc!=2) {
		log_err(RM_MESSAGE_ATTR_WRONG_NUM_ARGS);
		return EXIT_FAILURE;
	}

	if(attribute_delete(argv[1])<0) {
		log_err(RM_MESSAGE_ATTR_DELETE_FAILED);
		return EXIT_FAILURE;
	}

	log_msg(RM_MESSAGE_ATTR_DELETED,argv[1]);

	return EXIT_SUCCESS;
}

int rm_recent(int argc, char **argv) {
	if(argc!=3) {
		log_err(RM_MESSAGE_RECENT_WRONG_NUM_ARGS);
		return EXIT_FAILURE;
	}

	if(recent_delete(argv[1],argv[2])<0) {
		log_err(RM_MESSAGE_RECENT_DELETE_FAILED);
		return EXIT_FAILURE;
	}

	log_msg(RM_MESSAGE_RECENT_DELETED,argv[1],argv[2]);

	return EXIT_SUCCESS;
}

int rm_workout(int argc, char **argv) {
	if(argc!=2) {
		log_err(RM_MESSAGE_WORKOUT_WRONG_NUM_ARGS);
		return EXIT_FAILURE;
	}

	if(workout_delete(argv[1])<0) {
		log_err(RM_MESSAGE_WORKOUT_DELETE_FAILED);
		return EXIT_FAILURE;
	}

	log_msg(RM_MESSAGE_WORKOUT_DELETED,argv[1]);

	return EXIT_SUCCESS;
}