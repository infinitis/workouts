#include<opt.h>

#define DB_FILENAME "workouts.db"
#define DB_FILENAME_LENGTH 11

int set_homedir(char *to_set) {
	int len = strlen(to_set);
	if(len<1) { return -1; }

	global_opts.homedir = malloc(sizeof(char)*(len+1));
	if(NULL==global_opts.homedir) { return -1; }

	global_opts.db_location = malloc(sizeof(char)*(len+DB_FILENAME_LENGTH+2));
	if(NULL==global_opts.db_location) { return -1; }

	strcpy(global_opts.homedir,to_set);
	strcpy(global_opts.db_location,global_opts.homedir);
	
	for(int i=0;;i++) {
		if(global_opts.db_location[i]=='\0') {
			if(global_opts.db_location[i-1]!='/') {
				strcat(global_opts.db_location,"/");
			}
			break;
		}
	}

	strcat(global_opts.db_location,DB_FILENAME);

	DIR *dir = opendir(global_opts.homedir);
	if(NULL==dir) {
		return -1;
	}
	closedir(dir);

	return 1;
}