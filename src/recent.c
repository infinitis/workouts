#include<recent.h>

#define RECENT_PRINT_FORMAT "%s\t%s\n"

void print_recent(const unsigned char *workout, const unsigned char *date) {
	printf(RECENT_PRINT_FORMAT,workout,date);
}

int recent() {
	if(recent_get(global_opts.rows,&print_recent)<0) {
		log_err(RECENT_COMMAND_FAILED);
		return EXIT_FAILURE;
	}

	return EXIT_SUCCESS;
}
