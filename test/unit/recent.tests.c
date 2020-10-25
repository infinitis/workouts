#include<recent.tests.h>

int main() {
	setup_env();

	recent_basic_test();

	clean();

	return EXIT_SUCCESS;
}

void recent_basic_test() {
	assert(EXIT_SUCCESS==recent());
}