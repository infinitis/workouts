#include<attr.tests.h>

int main() {
	setup_env();

	attr_basic_test();

	clean();

	return EXIT_SUCCESS;
}

void attr_basic_test() {
	char *argv[] = {
		"attr",
		"add",
		"alsdkfjalksdfj",
		NULL
	};

	char *ls_argv[] = {
		"attr",
		"ls",
		NULL
	};

	char *bad_argv[] = {
		"attr",
		"hahaha",
		"asdfoiasdf",
		NULL
	};

	assert(EXIT_SUCCESS==attr(1,ls_argv));
	assert(EXIT_SUCCESS==attr(2,ls_argv));

	assert(EXIT_SUCCESS==attr(1,bad_argv));
	assert(EXIT_FAILURE==attr(2,bad_argv));
	assert(EXIT_FAILURE==attr(3,bad_argv));

	assert(EXIT_SUCCESS==attr(1,argv));
	assert(EXIT_FAILURE==attr(2,argv));
	assert(EXIT_SUCCESS==attr(3,argv));

	reset_env();
}