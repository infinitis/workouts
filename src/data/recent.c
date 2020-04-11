#include<data.h>

int recent_get(int limit,void (*f)(const unsigned char*,const unsigned char*)) {
	sqlite3 *db_p = NULL;
	sqlite3_stmt *stmt_p = NULL;

	if(sqlite3_open_v2(global_opts.db_location,&db_p,SQLITE_OPEN_READWRITE,NULL)!=SQLITE_OK) { goto cleanup; }

	if(sqlite3_prepare_v2(db_p,RECENT_GET_SQL,-1,&stmt_p,NULL)!=SQLITE_OK) { goto cleanup; }
	if(sqlite3_bind_int(stmt_p,1,limit)!=SQLITE_OK) { goto cleanup; }

	int ret;
	while((ret = sqlite3_step(stmt_p))==SQLITE_ROW) {
		const unsigned char *name_p = sqlite3_column_text(stmt_p,0);
		const unsigned char *date_p = sqlite3_column_text(stmt_p,1);
		f(name_p,date_p);
	}

	if(ret!=SQLITE_DONE) { goto cleanup; }

	if(sqlite3_finalize(stmt_p)!=SQLITE_OK) { goto cleanup; }
	stmt_p = NULL;

	if(sqlite3_close_v2(db_p)!=SQLITE_OK) { goto cleanup; }

	return 1;
	cleanup:
		if(stmt_p!=NULL) { sqlite3_finalize(stmt_p); }
		if(db_p!=NULL) { sqlite3_close_v2(db_p); }
		return -1;
}

int recent_insert(char *workout, char *date) {
	sqlite3 *db_p = NULL;
	sqlite3_stmt *stmt_p = NULL;

	if(sqlite3_open_v2(global_opts.db_location,&db_p,SQLITE_OPEN_READWRITE,NULL)!=SQLITE_OK) { goto cleanup; }

	if(sqlite3_exec(db_p,"PRAGMA foreign_keys = ON;",NULL,NULL,NULL)!=SQLITE_OK) { goto cleanup; }

	if(sqlite3_prepare_v2(db_p,RECENT_INSERT_SQL,-1,&stmt_p,NULL)!=SQLITE_OK) { goto cleanup; }
	if(sqlite3_bind_text(stmt_p,1,workout,-1,SQLITE_STATIC)!=SQLITE_OK) { goto cleanup; }
	if(sqlite3_bind_text(stmt_p,2,date,-1,SQLITE_STATIC)!=SQLITE_OK) { goto cleanup; }

	if(sqlite3_step(stmt_p)!=SQLITE_DONE) { goto cleanup; }
	if(sqlite3_finalize(stmt_p)!=SQLITE_OK) { goto cleanup; }
	stmt_p = NULL;

	if(sqlite3_close_v2(db_p)!=SQLITE_OK) { goto cleanup; }

	return 1;
	cleanup:
		if(stmt_p!=NULL) { sqlite3_finalize(stmt_p); }
		if(db_p!=NULL) { sqlite3_close_v2(db_p); }
		return -1;
}