#ifndef __ADD_H_
#define __ADD_H_

#include<stdio.h>
#include<stdlib.h>
#include<time.h>

#include<data.h>
#include<log.h>
#include<usage.h>

#define ADD_ATTR_MESSAGE_WRONG_NUM_ARGS "wrong number of arguments\n"
#define ADD_ATTR_MESSAGE_ATTR_INSERT_FAILED "insert failed\n"
#define ADD_ATTR_MESSAGE_ATTR_ADDED "attribute %s added\n"

#define ADD_RECENT_MESSAGE_WRONG_NUM_ARGS "wrong number of arguments\n"
#define ADD_RECENT_MESSAGE_INVALID_DATE "invalid date given\n"
#define ADD_RECENT_MESSAGE_INSERT_FAILED "add failed\n"
#define ADD_RECENT_MESSAGE_SUCCESS "added workout %s on %s\n"

#define ADD_WORKOUT_MESSAGE_NUM_ATTRS_MISMATCH "invalid number of attributes given\n"
#define ADD_WORKOUT_MESSAGE_INSERT_FAILED "insert failed\n"
#define ADD_WORKOUT_MESSAGE_WORKOUT_ADDED "added workout %s\n"

int add(int,char**);
int add_attribute(int,char**);
int add_recent(int,char**);
int add_workout(int,char**);

#endif