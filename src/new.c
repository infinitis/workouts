#include<new.h>

int new_workout(int i, int argc, char **argv) {
	if(i>=argc) {
		printf("not enough arguments for new\n");
		usage();
		return EXIT_FAILURE;
	}

	// check if attribute template provided
	unsigned int attr_flags = 0;
	if(i+1<argc) {
		int count = attribute_count();
		char *attr_p = argv[i+1];
		int len = strlen(attr_p);

		if(len!=count) {
			printf("number of attributes don't match\n");
			return EXIT_FAILURE;
		}

		for(int j=len-1;j>=0;j--) {
			attr_flags <<= 1;
			if(attr_p[j]=='1') {
				attr_flags += 1;
			}
		}
	}

	if(workout_insert(argv[i],attr_flags)<0) {
		printf("workout insert failed\n");
		return EXIT_FAILURE;
	}

	printf("New workout added: %s\n",argv[i]);

	return EXIT_SUCCESS;
}