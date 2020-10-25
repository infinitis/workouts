#include<data.workout.tests.h>

int main() {
	setup_env();

	workout_get_test();
	workout_insert_test();
	workout_toggle_test();
	workout_update_test();

	clean();

	return EXIT_SUCCESS;
}

int i;

void workout_get_test() {
	i = 0;

	assert(workout_get(NULL,NULL,-1,&workout_get_test_helper)==1);
	assert(i==0);

	assert(workout_insert("test",0)==1);
	assert(workout_insert("test2",3)==1);
	assert(workout_insert("hello3",4)==1);
	assert(workout_insert("apple",5)==1);

	assert(workout_get(NULL,NULL,-1,&workout_get_test_helper)==1);
	assert(i==4);

	i = 0;
	assert(workout_get("test",NULL,-1,&workout_get_test_helper)==1);
	assert(i==2);

	i = 0;
	assert(workout_get("test",NULL,1,&workout_get_test_helper)==1);
	assert(i==1);

	i = 0;
	assert(workout_get("apple",NULL,-1,&workout_get_test_helper)==1);
	assert(i==1);

	i = 0;
	assert(workout_get("test","x1",-1,&workout_get_test_helper)==1);
	assert(i==1);

	i = 0;
	assert(workout_get(NULL,"10x",-1,&workout_get_test_helper)==1);
	assert(i==2);

	reset_env();
}

void workout_get_test_helper(const unsigned char *name, int flags, const unsigned char *date) {
	i++;
}

void workout_insert_test() {
	assert(workout_insert("test",0)==1);
	assert(workout_insert("test",1)<0);

	reset_env();
}

void workout_toggle_test() {
	assert(attribute_insert("lower")==1);
	assert(attribute_insert("upper")==1);

	assert(workout_insert("test",0)==1);
	assert(workout_insert("test2",3)==1);

	assert(workout_toggle("test3","lower")==-1);
	assert(workout_toggle("test","lower")==1);

	reset_env();
}

void workout_update_test() {
	assert(attribute_insert("lower")==1);
	assert(attribute_insert("upper")==1);

	assert(workout_insert("test",0)==1);
	assert(workout_insert("test2",3)==1);

	assert(recent_insert("test","2020-07-04")==1);

	assert(workout_update("test","test3",0)<0);
	assert(workout_update("test","test",1)==1);

	assert(workout_update("test2","test5",8)==1);

	reset_env();
}