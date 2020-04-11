#ifndef __OPT_H_
#define __OPT_H_

#include<dirent.h>
#include<errno.h>
#include<stdio.h>
#include<stdlib.h>
#include<string.h>

// global options
struct options {
	char *db_location;
	char *homedir;
	int rows;
	unsigned char verbose;
};

extern struct options global_opts;

enum option_code {
	OPTION_ERROR,
	OPTION_EXIT,
	OPTION_HELP,
	OPTION_INVALID,
	OPTION_NO_MORE,
	OPTION_SUCCESS
};

int option(char*);
int long_option(char*);
int short_option(char*);

// specific option setters
int set_homedir(char*);
void set_rows(int);
void set_verbose(unsigned char);

#endif