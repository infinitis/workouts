#ifndef __ATTR_H_
#define __ATTR_H_

#include<stdio.h>
#include<stdlib.h>
#include<string.h>

#include<data.h>
#include<log.h>
#include<usage.h>

#define ATTR_ADD_STRING "add"
#define ATTR_LS_STRING "ls"
#define ATTR_MESSAGE_WRONG_NO_ARGS "wrong number of arguments for attr add\n"
#define ATTR_MESSAGE_UNKNOWN_COMMAND "unknown command attr \"%s\"\n"
#define ATTR_MESSAGE_ATTR_INSERT_FAILED "attribute insert failed\n"
#define ATTR_MESSAGE_ATTR_ADDED "New attribute added: %s\n"

int attr(int,char**);
int attr_add(char*);
int attr_ls();
void print_attr(const unsigned char*);

#endif