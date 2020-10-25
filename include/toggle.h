#ifndef __TOGGLE_H_
#define __TOGGLE_H_

#include<stdio.h>
#include<stdlib.h>

#include<data.h>
#include<usage.h>

#define TOGGLE_MESSAGE_WRONG_NUM_ARGS "wrong number of arguments for toggle\n"
#define TOGGLE_MESSAGE_UNABLE "unable to toggle attribute %s for workout %s\n"
#define TOGGLE_MESSAGE_SUCCESS "Successfully toggled %s attribute for workout %s\n"

int toggle(int,char**);

#endif