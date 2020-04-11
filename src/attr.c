#include<attr.h>

int attr(int i, int argc, char **argv) {
	if(i>argc) { return EXIT_FAILURE; }

	if(i==argc) { return attr_ls(); }

	if(0==memcmp(argv[i],"add",3)) {
		if(i+2!=argc) {
			printf("wrong number of arguments for attr add\n");
			usage();
			return EXIT_FAILURE;
		}

		return attr_add(argv[i+1]);
	}

	if(i+1!=argc) {
		printf("unknown command attr \"%s\"\n",argv[i+1]);
		usage();
		return EXIT_FAILURE;
	}

	return attr_ls();
}

int attr_add(char *name) {
	if(attribute_insert(name)<0) {
		printf("attribute insert failed\n");
		return EXIT_FAILURE;
	}

	printf("New attribute added: %s\n",name);
	return EXIT_SUCCESS;
}

int attr_ls() {
	if(attribute_get(&print_attr)<0) {
		printf("command failed\n");
		return EXIT_FAILURE;
	}

	return EXIT_SUCCESS;
}

void print_attr(const unsigned char *name) {
	printf("%s\n",name);
}