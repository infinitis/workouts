#include<data.h>

int setup() {
	sqlite3 *db_p = NULL;
	
	if(sqlite3_open_v2(global_opts.db_location,&db_p,SQLITE_OPEN_READWRITE | SQLITE_OPEN_CREATE,NULL)!=SQLITE_OK) { goto cleanup; }

	if(sqlite3_exec(db_p,CREATE_SCHEMA_SQL,NULL,NULL,NULL)!=SQLITE_OK) { goto cleanup; }
	
	if(sqlite3_close_v2(db_p)!=SQLITE_OK) { goto cleanup; }

	return 1;
	cleanup:
		if(db_p!=NULL) { sqlite3_close_v2(db_p); }
		return -1;
}