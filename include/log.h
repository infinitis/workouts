#ifndef __LOG_H_
#define __LOG_H_

#include<stdarg.h>
#include<stdio.h>

extern int verbose_flag;

enum log_level {
	LOG_LEVEL_SILENT = 0, /* suppresses all output */
	LOG_LEVEL_ERRORS = 1,  /* only prints errors */
	LOG_LEVEL_DEFAULT = 2, /* normal output */
	LOG_LEVEL_VERBOSE = 3  /* logging and debugging info */
};

#define log_err(...) log_message(LOG_LEVEL_ERRORS,stderr,__VA_ARGS__)
#define log_info(...) log_message(LOG_LEVEL_VERBOSE,stdout,__VA_ARGS__)
#define log_msg(...) log_message(LOG_LEVEL_DEFAULT,stdout,__VA_ARGS__)

void log_message(enum log_level,FILE*,const char*,...);

#endif