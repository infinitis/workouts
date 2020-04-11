#include<default.h>

int defaults() {
	char *p;
	
	// homedir
	p = getenv("WORKOUTS_HOME");
	if(p==NULL) {
		p = getenv("HOME");
		if(NULL==p) {
			printf("HOME or WORKOUTS_HOME env variable must be defined\n");
			return -1;
		}
	}

	if(set_homedir(p)<0) {
		printf("HOME or WORKOUTS_HOME env value invalid\n");
		return -1;
	}

	set_rows(-1);
	
	set_verbose(0);

	return 0;
}