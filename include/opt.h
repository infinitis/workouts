#ifndef __OPT_H_
#define __OPT_H_

#include<dirent.h>
#include<errno.h>
#include<stdio.h>
#include<stdlib.h>
#include<string.h>

#include<log.h>

// global options
struct options {
	char *db_location;
	char *homedir;
	int rows;
	enum log_level verbose;
};

extern struct options global_opts;

// specific option setters
int opt_set_homedir(char*);
void opt_set_rows(int);
void opt_set_log_level(enum log_level);

#endif