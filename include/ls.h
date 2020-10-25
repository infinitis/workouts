#ifndef __LS_H_
#define __LS_H_

#include<getopt.h>
#include<stdio.h>
#include<stdlib.h>
#include<string.h>

#include<data.h>
#include<usage.h>

int ls(int,char**);
void print_header(const unsigned char*);
void print_workout(const unsigned char*,int,const unsigned char*);

#endif