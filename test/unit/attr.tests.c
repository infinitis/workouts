#include<attr.tests.h>

int main() {
	setup_env();

	attribute_count_test();
	attribute_get_test();
	attribute_index_test();
	attribute_insert_test();
	attribute_parse_test();

	clean();

	return EXIT_SUCCESS;
}

void attribute_count_test() {
	assert(attribute_count()==0);

	assert(attribute_insert("test")==1);
	assert(attribute_count()==1);

	assert(attribute_insert("test2")==1);
	assert(attribute_count()==2);

	reset_env();
}

int i;

void attribute_get_test() {
	i = 0;
	assert(attribute_get(&attribute_get_test_helper)==1);
	assert(i==0);

	assert(attribute_insert("test")==1);
	assert(attribute_get(&attribute_get_test_helper)==1);
	assert(i==1);

	reset_env();
}

void attribute_get_test_helper(const unsigned char *attr) {
	i++;
}

void attribute_index_test() {
	assert(attribute_index("test")<0);

	assert(attribute_insert("test")==1);
	assert(attribute_index("test")==0);
	assert(attribute_index("test2")<0);

	assert(attribute_insert("test2")==1);
	assert(attribute_index("test")==0);
	assert(attribute_index("test2")==1);

	assert(attribute_insert("hello")==1);
	assert(attribute_index("test")==0);
	assert(attribute_index("test2")==1);
	assert(attribute_index("hello")==2);

	reset_env();
}

void attribute_insert_test() {
	assert(attribute_insert("test")==1);

	reset_env();
}

void attribute_parse_test() {
	int required = 0;
	int exclude = 0;
	
	assert(attribute_parse("311",&required,&exclude)<0);

	required = 0;
	exclude = 0;
	assert(attribute_parse("011",&required,&exclude)==1);
	assert(required==3);
	assert(exclude==4);

	required = 0;
	exclude = 0;
	assert(attribute_parse("x01",&required,&exclude)==1);
	assert(required==1);
	assert(exclude==2);
}