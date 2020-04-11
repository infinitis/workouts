#include<recent.h>

void print_recent(const unsigned char *workout, const unsigned char *date) {
	printf("%s\t%s\n",workout,date);
}

int recent(int i, int argc, char **argv) {
	if(i!=argc) {
		printf("wrong number of arguments for recent\n");
		return EXIT_FAILURE;
	}

	if(recent_get(global_opts.rows,&print_recent)<0) {
		printf("command failed\n");
		return EXIT_FAILURE;
	}

	return EXIT_SUCCESS;
}
