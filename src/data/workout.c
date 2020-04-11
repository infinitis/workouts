#include<data.h>

int workout_get(char *term, char *filter, int limit, void (*print_row)(const unsigned char*,int,const unsigned char*)) {
	sqlite3 *db_p = NULL;
	sqlite3_stmt *stmt_p = NULL;

	int required = 0;
	int exclude = 0;
	if(NULL!=filter) {
		if(attribute_parse(filter,&required,&exclude)<0) { return -1; }
	}

	if(sqlite3_open_v2(global_opts.db_location,&db_p,SQLITE_OPEN_READWRITE,NULL)!=SQLITE_OK) { goto cleanup; }

	if(NULL==term) {
		if(sqlite3_prepare_v2(db_p,WORKOUT_GET_SQL,-1,&stmt_p,NULL)!=SQLITE_OK) { goto cleanup; }
		if(sqlite3_bind_int(stmt_p,1,required)!=SQLITE_OK) { goto cleanup; }
		if(sqlite3_bind_int(stmt_p,2,exclude)!=SQLITE_OK) { goto cleanup; }
		if(sqlite3_bind_int(stmt_p,3,limit)!=SQLITE_OK) { goto cleanup; }
	} else {
		if(sqlite3_prepare_v2(db_p,WORKOUT_GET_SEARCH_SQL,-1,&stmt_p,NULL)!=SQLITE_OK) { goto cleanup; }
		if(sqlite3_bind_text(stmt_p,1,term,-1,SQLITE_STATIC)!=SQLITE_OK) { goto cleanup; }
		if(sqlite3_bind_int(stmt_p,2,required)!=SQLITE_OK) { goto cleanup; }
		if(sqlite3_bind_int(stmt_p,3,exclude)!=SQLITE_OK) { goto cleanup; }
		if(sqlite3_bind_int(stmt_p,4,limit)!=SQLITE_OK) { goto cleanup; }
	}

	int ret;
	while((ret = sqlite3_step(stmt_p))==SQLITE_ROW) {
		const unsigned char *name_p = sqlite3_column_text(stmt_p,0);
		const unsigned char *last_p = sqlite3_column_text(stmt_p,2);
		print_row(name_p,sqlite3_column_int(stmt_p,1),last_p);
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

int workout_insert(char *name, unsigned int flags) {
	sqlite3 *db_p = NULL;
	sqlite3_stmt *stmt_p = NULL;

	if(sqlite3_open_v2(global_opts.db_location,&db_p,SQLITE_OPEN_READWRITE,NULL)!=SQLITE_OK) { goto cleanup; }

	if(sqlite3_prepare_v2(db_p,WORKOUT_INSERT_SQL,-1,&stmt_p,NULL)!=SQLITE_OK) { goto cleanup; }
	if(sqlite3_bind_text(stmt_p,1,name,-1,SQLITE_STATIC)!=SQLITE_OK) { goto cleanup; }
	if(sqlite3_bind_int(stmt_p,2,flags)!=SQLITE_OK) { goto cleanup; }

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

struct workout_toggler {
	char *name;
	int attributes;
};

struct workout_toggler toggler = {
	NULL,
	0
};

int workout_toggle(char *name, char *attribute) {
	int index = attribute_index(attribute);
	if(index<0) { return -1; }

	toggler.name = name;
	toggler.attributes = 0;

	if(workout_get(
		name, /* term */
		NULL, /* filter */
		-1, /* limit */
		&workout_toggle_helper /* print function */
	)<0) { return -1; }

	if(toggler.name!=NULL) { return -1; }

	toggler.attributes ^= 1<<index;
	if(workout_update(name,name,toggler.attributes)<0) { return -1; }

	return 1;
}

void workout_toggle_helper(const unsigned char *name, int flags, const unsigned char *last) {
	if(toggler.name!=NULL) {
		if(strcmp(toggler.name,(const char*) name)==0) {
			toggler.attributes = flags;
			toggler.name = NULL;
		}
	}
}

int workout_update(char *old, char *name, int flags) {
	sqlite3 *db_p = NULL;
	sqlite3_stmt *stmt_p = NULL;

	if(sqlite3_open_v2(global_opts.db_location,&db_p,SQLITE_OPEN_READWRITE,NULL)!=SQLITE_OK) { goto cleanup; }
	
	if(sqlite3_exec(db_p,"PRAGMA foreign_keys = ON;",NULL,NULL,NULL)!=SQLITE_OK) { goto cleanup; }

	if(sqlite3_prepare_v2(db_p,WORKOUT_UPDATE_SQL,-1,&stmt_p,NULL)!=SQLITE_OK) { goto cleanup; }
	if(sqlite3_bind_text(stmt_p,1,name,-1,SQLITE_STATIC)!=SQLITE_OK) { goto cleanup; }
	if(sqlite3_bind_int(stmt_p,2,flags)!=SQLITE_OK) { goto cleanup; }
	if(sqlite3_bind_text(stmt_p,3,old,-1,SQLITE_STATIC)!=SQLITE_OK) { goto cleanup; }

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