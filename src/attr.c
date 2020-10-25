#include<attr.h>

int attr(int argc, char **argv) {
	if(1==argc) { return attr_ls(); }

	if(0==strcmp(argv[1],ATTR_ADD_STRING)) {
		if(3!=argc) {
			log_err(ATTR_MESSAGE_WRONG_NO_ARGS);
			usage();
			return EXIT_FAILURE;
		}

		return attr_add(argv[2]);
	}
	
	if((2!=argc)||(0!=strcmp(argv[1],ATTR_LS_STRING))) {
		log_err(ATTR_MESSAGE_UNKNOWN_COMMAND,argv[1]);
		usage();
		return EXIT_FAILURE;
	}

	return attr_ls();
}

int attr_add(char *name) {
	if(attribute_insert(name)<0) {
		log_err(ATTR_MESSAGE_ATTR_INSERT_FAILED);
		return EXIT_FAILURE;
	}

	log_msg(ATTR_MESSAGE_ATTR_ADDED,name);
	return EXIT_SUCCESS;
}

int attr_ls() {
	if(attribute_get(&print_attr)<0) { return EXIT_FAILURE; }

	return EXIT_SUCCESS;
}

void print_attr(const unsigned char *name) {
	printf("%s\n",name);
}