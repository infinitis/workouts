#include<test_utils.h>

void clean() {
	free(global_opts.db_location);
	free(global_opts.homedir);
}

void reset_env() {
	assert(remove(global_opts.db_location)==0);
	assert(setup()==1);
}

void setup_env() {
	assert(defaults()==0);
	assert(setup()==1);
}