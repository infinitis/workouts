#include<recent.tests.h>

int main() {
	setup_env();
	
	recent_get_test();
	recent_insert_test();

	clean();

	return EXIT_SUCCESS;
}

int i;

void recent_get_test() {
	i = 0;
	assert(recent_get(-1,&recent_get_test_helper)==1);
	assert(i==0);

	assert(workout_insert("test",0)==1);
	assert(workout_insert("test2",0)==1);

	assert(recent_insert("test","2020-07-04")==1);
	assert(recent_insert("test2","2020-07-04")==1);

	assert(recent_get(-1,&recent_get_test_helper)==1);
	assert(i==2);

	i = 0;
	assert(recent_get(1,&recent_get_test_helper)==1);
	assert(i==1);

	reset_env();
}

void recent_get_test_helper(const unsigned char *name, const unsigned char *date) {
	i++;
}

void recent_insert_test() {
	assert(workout_insert("test",0)==1);
	assert(workout_insert("test2",0)==1);

	assert(recent_insert("test","2020-07-04")==1);
	assert(recent_insert("test2","2020-07-04")==1);
	assert(recent_insert("test2","2020-07-04")==-1);

	reset_env();
}