#ifndef __MAIN_H_
#define __MAIN_H_

#include<getopt.h>
#include<stdio.h>
#include<stdlib.h>

#include<add.h>
#include<attr.h>
#include<default.h>
#include<ls.h>
#include<new.h>
#include<opt.h>
#include<recent.h>
#include<toggle.h>
#include<usage.h>

#define UTIL_ADD "add"
#define UTIL_ATTR "attr"
#define UTIL_LS "ls"
#define UTIL_NEW "new"
#define UTIL_RECENT "recent"
#define UTIL_TOGGLE "toggle"
#define UTIL_VERSION "version"

int main(int,char**);

#endif