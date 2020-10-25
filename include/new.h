#ifndef __NEW_H_
#define __NEW_H_

#include<stdio.h>
#include<stdlib.h>

#include<data.h>
#include<opt.h>
#include<usage.h>

#define NEW_MESSAGE_NUM_ATTRS_MISMATCH "number of attributes don't match\n"
#define NEW_MESSAGE_INSERT_FAILED "workout insert failed\n"
#define NEW_MESSAGE_WORKOUT_ADDED "New workout added: %s\n"

int new_workout(int,char**);

#endif