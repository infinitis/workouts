#include<new.h>

int new_workout(int argc, char **argv) {
	if(argc<2) { return EXIT_FAILURE; }
	
	// check if attribute template provided
	unsigned int attr_flags = 0;
	if(2<argc) {
		int count = attribute_count();
		char *attr_p = argv[2];
		int len = strlen(attr_p);

		if(len!=count) {
			log_err(NEW_MESSAGE_NUM_ATTRS_MISMATCH);
			return EXIT_FAILURE;
		}

		for(int j=len-1;j>=0;j--) {
			attr_flags <<= 1;
			if(attr_p[j]=='1') {
				attr_flags += 1;
			}
		}
	}

	if(workout_insert(argv[1],attr_flags)<0) {
		log_err(NEW_MESSAGE_INSERT_FAILED);
		return EXIT_FAILURE;
	}

	log_msg(NEW_MESSAGE_WORKOUT_ADDED,argv[1]);

	return EXIT_SUCCESS;
}