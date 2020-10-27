#ifndef __ATTR_TESTS_H_
#define __ATTR_TESTS_H_

#include<test_utils.h>

int main();
void attribute_count_test();
void attribute_delete_bit_shift_test();
void attribute_delete_bit_shift_test_helper(const unsigned char*,int,const unsigned char*);
void attribute_delete_test();
void attribute_get_test();
void attribute_get_test_helper(const unsigned char*);
void attribute_index_test();
void attribute_insert_test();
void attribute_parse_test();

#endif