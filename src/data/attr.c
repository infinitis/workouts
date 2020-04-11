#include<data.h>

int attribute_count() {
	int count = 0;

	sqlite3 *db_p = NULL;
	sqlite3_stmt *stmt_p = NULL;

	if(sqlite3_open_v2(global_opts.db_location,&db_p,SQLITE_OPEN_READWRITE,NULL)!=SQLITE_OK) { goto cleanup; }

	if(sqlite3_prepare_v2(db_p,ATTRIBUTE_COUNT_SQL,-1,&stmt_p,NULL)!=SQLITE_OK) { goto cleanup; }

	if(sqlite3_step(stmt_p)!=SQLITE_ROW) { goto cleanup; }

	count = sqlite3_column_int(stmt_p,0);

	if(sqlite3_finalize(stmt_p)!=SQLITE_OK) { goto cleanup; }
	stmt_p = NULL;

	if(sqlite3_close_v2(db_p)!=SQLITE_OK) { goto cleanup; }

	return count;
	cleanup:
		if(stmt_p!=NULL) { sqlite3_finalize(stmt_p); }
		if(db_p!=NULL) { sqlite3_close_v2(db_p); }
		return -1;
}

int attribute_get(void (*print)(const unsigned char*)) {
	sqlite3 *db_p = NULL;
	sqlite3_stmt *stmt_p = NULL;

	if(sqlite3_open_v2(global_opts.db_location,&db_p,SQLITE_OPEN_READWRITE,NULL)!=SQLITE_OK) { goto cleanup; }

	if(sqlite3_prepare_v2(db_p,ATTRIBUTE_GET_SQL,-1,&stmt_p,NULL)!=SQLITE_OK) { goto cleanup; }

	int ret;
	while((ret = sqlite3_step(stmt_p))==SQLITE_ROW) {
		const unsigned char *name = sqlite3_column_text(stmt_p,0);
		print(name);
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

struct attribute_indexer {
	int i;
	int index;
	char *name;
};

struct attribute_indexer indexer = {
	0,
	0,
	NULL,
};

int attribute_index(char *name) {
	indexer.i = 0;
	indexer.index = -1;
	indexer.name = name;

	if(attribute_get(&attribute_index_helper)<0) { return -1; }

	return indexer.index;
}

void attribute_index_helper(const unsigned char *name) {
	if(strcmp(indexer.name,(const char*) name)==0) {
		indexer.index = indexer.i;
	}
	indexer.i++;
}

int attribute_insert(char *name) {
	sqlite3 *db_p = NULL;
	sqlite3_stmt *stmt_p = NULL;

	if(sqlite3_open_v2(global_opts.db_location,&db_p,SQLITE_OPEN_READWRITE,NULL)!=SQLITE_OK) { goto cleanup; }

	if(sqlite3_prepare_v2(db_p,ATTRIBUTE_INSERT_SQL,-1,&stmt_p,NULL)!=SQLITE_OK) { goto cleanup; }
	if(sqlite3_bind_text(stmt_p,1,name,-1,SQLITE_STATIC)!=SQLITE_OK) { goto cleanup; }

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

int attribute_parse(char *str, int *required, int *exclude) {
	if(NULL==str) { return -1; }
	if(NULL==required) { return -1; }

	int len = strlen(str);
	for(int i=0;i<len;i++) {
		(*required) <<= 1;
		if(exclude!=NULL) {
			(*exclude) <<= 1;
		}

		if(str[i]=='1') {
			(*required)++;
		} else if(str[i]=='0') {
			if(exclude!=NULL) {
				(*exclude)++;
			}
		} else if(str[i]!='x') {
			return -1;
		}
	}

	return 1;
}