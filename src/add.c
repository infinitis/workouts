#include<add.h>

int add(int argc, char **argv) {
	switch(global_opts.target) {
		case WORKOUT_DATA_TYPE_ATTRIBUTE:
			return add_attribute(argc,argv);
		case WORKOUT_DATA_TYPE_DEFAULT:
		case WORKOUT_DATA_TYPE_RECENT:
			return add_recent(argc,argv);
		case WORKOUT_DATA_TYPE_WORKOUT:
			return add_workout(argc,argv);
	}
}

int add_attribute(int argc, char **argv) {
	if(argc!=2) {
		log_err(ADD_ATTR_MESSAGE_WRONG_NUM_ARGS);
		return EXIT_FAILURE;
	}

	if(attribute_insert(argv[1])<0) {
		log_err(ADD_ATTR_MESSAGE_ATTR_INSERT_FAILED);
		return EXIT_FAILURE;
	}

	log_msg(ADD_ATTR_MESSAGE_ATTR_ADDED,argv[1]);
	return EXIT_SUCCESS;
}

int add_recent(int argc, char **argv) {
	if(1==argc) {
		log_err(ADD_RECENT_MESSAGE_WRONG_NUM_ARGS);
		usage();
		return EXIT_FAILURE;
	}

	char buf[11];
	if(2==argc) { // no date given
		time_t t = time(NULL);
		struct tm now = *localtime(&t);
		if(strftime(buf,11,"%Y-%m-%d",&now)==0) { return EXIT_FAILURE; }
	} else {
		int YY, MM, DD;
		struct tm when = {0};

		if(sscanf(argv[2],"%d-%d-%d", &YY, &MM, &DD)!=3) {
			log_err(ADD_RECENT_MESSAGE_INVALID_DATE);
			return EXIT_FAILURE;
		}

		when.tm_year = YY - 1900;
		when.tm_mon = MM - 1;
		when.tm_mday = DD;
		if(strftime(buf,11,"%Y-%m-%d",&when)==0) { return EXIT_FAILURE; }
	}

	if(recent_insert(argv[1],buf)<0) {
		log_err(ADD_RECENT_MESSAGE_INSERT_FAILED);
		return EXIT_FAILURE;
	}

	log_msg(ADD_RECENT_MESSAGE_SUCCESS,argv[1],buf);

	return EXIT_SUCCESS;
}

int add_workout(int argc, char **argv) {
	if(argc<2) { return EXIT_FAILURE; }
	
	// check if attribute template provided
	unsigned int attr_flags = 0;
	if(2<argc) {
		int count = attribute_count();
		char *attr_p = argv[2];
		int len = strlen(attr_p);

		if(len!=count) {
			log_err(ADD_WORKOUT_MESSAGE_NUM_ATTRS_MISMATCH);
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
		log_err(ADD_WORKOUT_MESSAGE_INSERT_FAILED);
		return EXIT_FAILURE;
	}

	log_msg(ADD_WORKOUT_MESSAGE_WORKOUT_ADDED,argv[1]);

	return EXIT_SUCCESS;
}