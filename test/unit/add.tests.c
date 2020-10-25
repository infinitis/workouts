#include<add.tests.h>

int main() {
	setup_env();

	add_basic_test();

	clean();

	return EXIT_SUCCESS;
}

void add_basic_test() {
	char *bad_argv[] = {
		"add",
		"testworkout1notindb",
		"sdofjasdfiasjdof",
		"sldfkjalskdfjasd",
		NULL
	};

	char *argv[] = {
		"add",
		"testworkout1",
		"2020-10-06",
		NULL
	};

	assert(1==workout_insert("testworkout1",0));

	assert(EXIT_FAILURE==add(1,argv));
	assert(EXIT_SUCCESS==add(2,argv));
	assert(EXIT_SUCCESS==add(3,argv));

	assert(EXIT_FAILURE==add(1,bad_argv));
	assert(EXIT_FAILURE==add(2,bad_argv));
	assert(EXIT_FAILURE==add(3,bad_argv));

	reset_env();
}