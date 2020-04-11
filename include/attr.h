#ifndef __ATTR_H_
#define __ATTR_H_

#include<stdio.h>
#include<stdlib.h>
#include<string.h>

#include<data.h>
#include<usage.h>

int attr(int,int,char**);
int attr_add(char*);
int attr_ls();
void print_attr(const unsigned char*);

#endif