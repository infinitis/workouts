#ifndef __LS_H_
#define __LS_H_

#include<getopt.h>
#include<stdio.h>
#include<stdlib.h>
#include<string.h>

#include<data.h>
#include<usage.h>

#define LS_RECENT_COMMAND_FAILED "command failed\n"

int ls(int,char**);
int ls_attribute();
int ls_recent();
int ls_workout(int,char**);
void print_attribute(const unsigned char*);
void print_recent(const unsigned char*,const unsigned char*);
void print_header(const unsigned char*);
void print_workout(const unsigned char*,int,const unsigned char*);

#endif