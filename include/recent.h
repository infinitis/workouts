#ifndef __RECENT_H_
#define __RECENT_H_

#include<stdio.h>

#include<data.h>

#define RECENT_COMMAND_FAILED "command failed\n"

void print_recent(const unsigned char*,const unsigned char*);
int recent();

#endif