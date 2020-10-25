#include<add.h>

int add(int argc, char **argv) {
	if(1==argc) {
		log_err("`workouts add` requires at least 1 argument\n");
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
			log_err("invalid date given\n");
			return EXIT_FAILURE;
		}

		when.tm_year = YY - 1900;
		when.tm_mon = MM - 1;
		when.tm_mday = DD;
		if(strftime(buf,11,"%Y-%m-%d",&when)==0) { return EXIT_FAILURE; }
	}

	if(recent_insert(argv[1],buf)<0) {
		log_err("add failed\n");
		return EXIT_FAILURE;
	}

	log_msg("added workout %s on %s\n",argv[1],buf);

	return EXIT_SUCCESS;
}