#include<default.h>

struct options global_opts = {
	NULL, /* db_location */
	NULL, /* homedir */
	-1, /* rows */
	0 /* verbose */
};

int defaults() {
	char *p;
	
	// homedir
	p = getenv("WORKOUTS_HOME");
	if(p==NULL) {
		p = getenv("HOME");
		if(NULL==p) {
			log_err("HOME or WORKOUTS_HOME env variable must be defined\n");
			return -1;
		}
	}

	if(opt_set_homedir(p)<0) {
		log_err("HOME or WORKOUTS_HOME env value invalid\n");
		return -1;
	}

	opt_set_rows(-1);
	
	opt_set_log_level(LOG_LEVEL_DEFAULT);

	opt_set_target(WORKOUT_DATA_TYPE_DEFAULT);

	return 0;
}