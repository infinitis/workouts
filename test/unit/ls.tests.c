#include<ls.tests.h>

int main() {
	setup_env();

	ls_basic_test();

	clean();

	return EXIT_SUCCESS;
}

void ls_basic_test() {
	char *bad_opt[] = {
		"ls",
		"-b",
		NULL
	};

	assert(attribute_insert("test")==1);
	assert(attribute_insert("test2")==1);
	assert(attribute_insert("test3")==1);
	assert(attribute_insert("test4")==1);
	assert(attribute_insert("test5")==1);
	assert(attribute_insert("test6")==1);

	assert(EXIT_SUCCESS==ls(1,bad_opt));
	assert(EXIT_FAILURE==ls(2,bad_opt));

	char *badfilter[] = {
		"ls",
		"--filter",
		"lkasdlfkjsldkf",
		NULL
	};

	assert(EXIT_SUCCESS==ls(1,badfilter));
	assert(EXIT_FAILURE==ls(2,badfilter));
	assert(EXIT_FAILURE==ls(3,badfilter));

	char *argv[] = {
		"ls",
		"--filter",
		"00x0x1",
		"P90X",
		NULL
	};

	assert(EXIT_SUCCESS==ls(1,argv));
	assert(EXIT_FAILURE==ls(2,argv));
	assert(EXIT_SUCCESS==ls(3,argv));
	assert(EXIT_SUCCESS==ls(4,argv));
	
	char *argv_reversed[] = {
		"ls",
		"P90X",
		"-f",
		"01x0x0",
		NULL
	};

	assert(EXIT_SUCCESS==ls(1,argv_reversed));
	assert(EXIT_SUCCESS==ls(2,argv_reversed));
	assert(EXIT_FAILURE==ls(3,argv_reversed));
	assert(EXIT_SUCCESS==ls(4,argv_reversed));

	reset_env();
}