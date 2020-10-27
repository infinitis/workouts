#ifndef __RM_H_
#define __RM_H_

#include<data.h>
#include<log.h>

#define RM_MESSAGE_ATTR_WRONG_NUM_ARGS "wrong number of arguments\n"
#define RM_MESSAGE_ATTR_DELETE_FAILED "attribute_delete() failed\n"
#define RM_MESSAGE_ATTR_DELETED "attribute %s deleted\n"

#define RM_MESSAGE_RECENT_WRONG_NUM_ARGS "wrong number of arguments\n"
#define RM_MESSAGE_RECENT_DELETE_FAILED "recent_delete() failed\n"
#define RM_MESSAGE_RECENT_DELETED "workout %s on %s deleted\n"

#define RM_MESSAGE_WORKOUT_WRONG_NUM_ARGS "wrong number of arguments\n"
#define RM_MESSAGE_WORKOUT_DELETE_FAILED "workout_delete() failed\n"
#define RM_MESSAGE_WORKOUT_DELETED "workout %s deleted\n"

int rm(int,char**);
int rm_attribute(int,char**);
int rm_recent(int,char**);
int rm_workout(int,char**);

#endif