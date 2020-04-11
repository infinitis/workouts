#include<usage.h>

void usage() {
	printf("Usage:\n");
	printf("\tworkouts [options] [ls] [--filter {attribute filter}] [search term]\n");
	printf("\tworkouts [options] add [!name] [date]\n");
	printf("\tworkouts [options] new [!name] [attributes]\n");
	printf("\tworkouts [options] attr [ls]\n");
	printf("\tworkouts [options] attr add [!name]\n");
	printf("\tworkouts [options] toggle [!workout name] [!attr]\n");
	printf("\tworkouts [options] recent\n");
	printf("\n");
	printf("Options:\n");
	printf("\t--help,-h\n");
	printf("\t--homedir=<path>\n");
	printf("\t--rows=<number>\n");
	printf("\t--verbose,-v\n");
	printf("\n");
	printf("{attribute filter} refers to string in bit flags corresponding to active attributes.\n\n");
	printf("The character '!' in front of a variable name means required.\n");
}