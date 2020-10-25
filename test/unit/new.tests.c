#include<new.tests.h>

int main() {
	setup_env();

	new_basic_test();

	clean();

	return EXIT_SUCCESS;
}

void new_basic_test() {
	char *bad[] = {
		"new",
		"testworkout",
		"012001",
		NULL
	};

	assert(attribute_insert("test")==1);
	assert(attribute_insert("test2")==1);
	assert(attribute_insert("test3")==1);
	assert(attribute_insert("test4")==1);
	assert(attribute_insert("test5")==1);
	assert(attribute_insert("test6")==1);

	assert(EXIT_FAILURE==new_workout(1,bad));
	assert(EXIT_SUCCESS==new_workout(2,bad));
	assert(EXIT_FAILURE==new_workout(3,bad));

	char *argv[] = {
		"new",
		"test workout",
		"010001",
		NULL
	};

	assert(EXIT_SUCCESS==new_workout(3,argv));

	reset_env();
}