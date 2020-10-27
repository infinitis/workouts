#include<usage.h>

void usage() {
	log_err("Usage:\n");
	log_err("\tworkouts [options] add [!name] [date] [attributes]\n");
	log_err("\tworkouts [options] ls [--filter {attribute filter}] [search term]\n");
	log_err("\tworkouts [options] rm [!name] [date]\n");
	log_err("\tworkouts [options] toggle [!workout name] [!attr]\n");
	log_err("\n");
	log_err("Options:\n");
	log_err("\t--attribute, --attr, -a\n");
	log_err("\t--help, -h\n");
	log_err("\t--homedir, -d <path>\n");
	log_err("\t--quiet, -q\n");
	log_err("\t--recent, -l\n");
	log_err("\t--rows, -r <number>\n");
	log_err("\t--verbose, -v\n");
	log_err("\t--workout, -w\n");
	log_err("\n");
	log_err("{attribute filter} refers to a string of bit flags (0 = not, 1 = has, x = either) corresponding to active attributes.\n");
	log_err("Ex: 0100x00\n\n");
	log_err("The character '!' in front of a variable name means required.\n");
}