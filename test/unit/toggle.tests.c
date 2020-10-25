#include<toggle.tests.h>

int main() {
	setup_env();

	toggle_basic_test();

	clean();

	return EXIT_SUCCESS;
}

void toggle_basic_test() {
	assert(attribute_insert("test")==1);
	assert(attribute_insert("test2")==1);
	assert(attribute_insert("test3")==1);
	assert(attribute_insert("test4")==1);
	assert(attribute_insert("test5")==1);
	assert(attribute_insert("test6")==1);

	assert(workout_insert("test",0)==1);

	char *bad[] = {
		"toggle",
		"test",
		"notanattribute",
		NULL
	};

	assert(EXIT_FAILURE==toggle(1,bad));
	assert(EXIT_FAILURE==toggle(2,bad));
	assert(EXIT_FAILURE==toggle(3,bad));

	char *argv[] = {
		"toggle",
		"test",
		"test3",
		NULL
	};

	assert(EXIT_FAILURE==toggle(1,argv));
	assert(EXIT_FAILURE==toggle(2,argv));
	assert(EXIT_SUCCESS==toggle(3,argv));

	reset_env();
}