#include<opt.h>

struct options global_opts = {
	NULL,
	NULL,
	-1,
	0
};

int option(char *str) {
	int len;

	if(NULL==str) { return OPTION_NO_MORE; }
	len = strlen(str);
	if(len<2) { return OPTION_NO_MORE; }

	if('-'==str[0]) {
		if('-'==str[1]) {
			return long_option(&(str[2]));
		} else {
			return short_option(&(str[1]));
		}
	}
	
	return OPTION_NO_MORE;
}

#define LONG_OPTION_HELP "help"
#define LONG_OPTION_HELP_LENGTH 4
#define LONG_OPTION_HOMEDIR "homedir"
#define LONG_OPTION_HOMEDIR_LENGTH 7
#define LONG_OPTION_ROWS "rows"
#define LONG_OPTION_ROWS_LENGTH 4
#define LONG_OPTION_VERBOSE "verbose"
#define LONG_OPTION_VERBOSE_LENGTH 7

int long_option(char *str) {
	if(memcmp(str,LONG_OPTION_HELP,LONG_OPTION_HELP_LENGTH)==0) {
		return OPTION_HELP;
	} else if(memcmp(str,LONG_OPTION_VERBOSE,LONG_OPTION_VERBOSE_LENGTH)==0) {
		set_verbose(1);
		return OPTION_SUCCESS;
	} else if(memcmp(str,LONG_OPTION_HOMEDIR,LONG_OPTION_HOMEDIR_LENGTH)==0) {
		int len = strlen(str);
		len -= (LONG_OPTION_HOMEDIR_LENGTH+1);
		if(len<1) { return OPTION_INVALID; }

		if(set_homedir(&(str[LONG_OPTION_HOMEDIR_LENGTH+1]))<0) {
			printf("unable to set home directory: %s\nCheck directory exists and has correct permissions\n",&(str[LONG_OPTION_HOMEDIR_LENGTH+1]));
			return OPTION_EXIT;
		}
		return OPTION_SUCCESS;
	} else if(memcmp(str,LONG_OPTION_ROWS,LONG_OPTION_ROWS_LENGTH)==0) {
		char *end_p;
		set_rows(strtoul(&(str[LONG_OPTION_ROWS_LENGTH+1]),&end_p,10));
		return OPTION_SUCCESS;
	} else {
		return OPTION_INVALID;
	}
}

#define SHORT_OPTION_HELP 'h'
#define SHORT_OPTION_VERBOSE 'v'

int short_option(char *str) {
	if(SHORT_OPTION_HELP==str[0]) {
		return OPTION_HELP;
	} else if(SHORT_OPTION_VERBOSE==str[0]) {
		set_verbose(1);
		return OPTION_SUCCESS;
	} else {
		return OPTION_INVALID;
	}
}