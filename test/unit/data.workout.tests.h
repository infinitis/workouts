#ifndef __WORKOUT_TESTS_H_
#define __WORKOUT_TESTS_H_

#include<test_utils.h>

int main();
void workout_delete_all_recent_test();
void workout_delete_all_recent_test_helper(const char*, const char*);
void workout_delete_test();
void workout_get_test();
void workout_get_test_helper();
void workout_insert_test();
void workout_toggle_test();
void workout_update_test();

#endif