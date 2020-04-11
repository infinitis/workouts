#include<add.h>

int add(int i, int argc, char **argv) {
	if(i==argc) {
		printf("`workouts add` requires at least 1 argument\n");
		usage();
		return EXIT_FAILURE;
	}


	char buf[11];
	if(i+1==argc) { // no date given
		time_t t = time(NULL);
		struct tm now = *localtime(&t);
		if(strftime(buf,11,"%Y-%m-%d",&now)==0) { return EXIT_FAILURE; }
	} else {
		int YY, MM, DD;
		struct tm when = {0};

		if(sscanf(argv[i+1],"%d-%d-%d", &YY, &MM, &DD)!=3) {
			printf("invalid date given\n");
			return EXIT_FAILURE;
		}

		when.tm_year = YY - 1900;
		when.tm_mon = MM - 1;
		when.tm_mday = DD;
		if(strftime(buf,11,"%Y-%m-%d",&when)==0) { return EXIT_FAILURE; }
	}

	if(recent_insert(argv[i],buf)<0) {
		printf("add failed\n");
		return EXIT_FAILURE;
	}

	printf("added workout %s on %s\n",argv[i],buf);

	return EXIT_SUCCESS;
}