#include<add.tests.h>

int main() {
	setup_env();

	add_attribute_basic_test();
	add_recent_basic_test();
	add_workout_basic_test();

	clean();

	return EXIT_SUCCESS;
}

void add_attribute_basic_test() {
	global_opts.target = WORKOUT_DATA_TYPE_ATTRIBUTE;

	char *argv[] = {
		"add",
		"alsdkfjalksdfj",
		NULL
	};

	assert(EXIT_FAILURE==add(1,argv));
	assert(EXIT_SUCCESS==add(2,argv));
	assert(EXIT_FAILURE==add(2,argv));

	reset_env();
}

void add_recent_basic_test() {
	global_opts.target = WORKOUT_DATA_TYPE_RECENT;

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

void add_workout_basic_test() {
	global_opts.target = WORKOUT_DATA_TYPE_WORKOUT;

	assert(attribute_insert("test")==1);
	assert(attribute_insert("test2")==1);
	assert(attribute_insert("test3")==1);
	assert(attribute_insert("test4")==1);
	assert(attribute_insert("test5")==1);
	assert(attribute_insert("test6")==1);

	char *argv[] = {
		"add",
		"testworkout",
		"000012",
		NULL
	};

	assert(EXIT_FAILURE==add(1,argv));
	assert(EXIT_SUCCESS==add(2,argv));
	assert(EXIT_FAILURE==add(3,argv));

	argv[1] = "testworkout2";

	assert(EXIT_SUCCESS==add(3,argv));

	argv[1] = "testworkout3";
	argv[2] = "000";

	assert(EXIT_FAILURE==add(3,argv));

	reset_env();
}