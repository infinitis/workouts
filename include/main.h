#ifndef __MAIN_H_
#define __MAIN_H_

#include<getopt.h>
#include<stdio.h>
#include<stdlib.h>

#include<add.h>
#include<default.h>
#include<ls.h>
#include<opt.h>
#include<rm.h>
#include<toggle.h>
#include<usage.h>

#define MAIN_MESSAGE_UNKNOWN_CMD "Unknown cmd: %s\n"

#define UTIL_ADD "add"
#define UTIL_LS "ls"
#define UTIL_RECENT "recent"
#define UTIL_RM "rm"
#define UTIL_TOGGLE "toggle"

int main(int,char**);

#endif