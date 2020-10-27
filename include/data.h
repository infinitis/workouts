#ifndef __DATA_H_
#define __DATA_H_

#include<stdlib.h>

#include<sqlite3.h>

#include<opt.h>

#define EMPTY_STRING ""

// attributes
#define ATTRIBUTE_TABLE_NAME_SQL "attributes"
#define ATTRIBUTE_CREATE_TABLE_SQL \
	"CREATE TABLE IF NOT EXISTS `" ATTRIBUTE_TABLE_NAME_SQL "` ( " \
	"`name` TEXT NOT NULL PRIMARY KEY, " \
	"`order` INT DEFAULT 0" \
	");"

#define ATTRIBUTE_COUNT_SQL "SELECT COUNT(*) FROM " ATTRIBUTE_TABLE_NAME_SQL ";"
int attribute_count();

#define ATTRIBUTE_DELETE_SQL "DELETE FROM `" ATTRIBUTE_TABLE_NAME_SQL "` WHERE `name` = ?;"
int attribute_delete(char*);

#define ATTRIBUTE_GET_SQL "SELECT `name` FROM " ATTRIBUTE_TABLE_NAME_SQL " WHERE 1 ORDER BY `order` ASC;"
int attribute_get(void (*)(const unsigned char*));
int attribute_index(char*);
void attribute_index_helper(const unsigned char*);

#define ATTRIBUTE_INSERT_SQL "INSERT INTO " ATTRIBUTE_TABLE_NAME_SQL " (`name`,`order`) VALUES (?,(SELECT MAX(`order`)+1 FROM `" ATTRIBUTE_TABLE_NAME_SQL "`));"
int attribute_insert(char*);
int attribute_parse(char*,int*,int*);

// recent
#define RECENT_TABLE_NAME_SQL "recent"
#define RECENT_CREATE_TABLE_SQL \
	"CREATE TABLE IF NOT EXISTS `" RECENT_TABLE_NAME_SQL "` ( " \
	"`name` TEXT NOT NULL, " \
	"`date` TEXT NOT NULL, " \
	"PRIMARY KEY(`name`,`date`), "\
	"FOREIGN KEY(`name`) REFERENCES `workouts`(`name`)" \
	");"

#define RECENT_DELETE_SQL "DELETE FROM `" RECENT_TABLE_NAME_SQL "` WHERE `name` = ? AND `date` = ?;"
int recent_delete(char*,char*);

#define RECENT_GET_SQL "SELECT name, date FROM `" RECENT_TABLE_NAME_SQL "` ORDER BY date(`date`) DESC,`name` ASC LIMIT ?;"
int recent_get(int,void(*)(const unsigned char*,const unsigned char*));

#define RECENT_INSERT_SQL "INSERT INTO " RECENT_TABLE_NAME_SQL " (name,date) VALUES (?,?);"
int recent_insert(char*,char*);

// workouts
#define WORKOUT_TABLE_NAME_SQL "workouts"
#define WORKOUT_CREATE_TABLE_SQL \
	"CREATE TABLE IF NOT EXISTS `" WORKOUT_TABLE_NAME_SQL "` ( " \
	"`name` TEXT NOT NULL PRIMARY KEY, " \
	"`attributes` INT DEFAULT 0" \
	");"

#define WORKOUT_DELETE_SQL "DELETE FROM `" WORKOUT_TABLE_NAME_SQL "` WHERE `name` = ?;"
int workout_delete(char*);

#define WORKOUT_GET_BASE_SQL "SELECT " \
	"`" WORKOUT_TABLE_NAME_SQL "`.name, " \
	"`" WORKOUT_TABLE_NAME_SQL "`.attributes, " \
	"`" RECENT_TABLE_NAME_SQL "`.date as last " \
	"FROM `" WORKOUT_TABLE_NAME_SQL "` LEFT JOIN "\
	"(SELECT name,date FROM `" RECENT_TABLE_NAME_SQL "` GROUP BY `name` HAVING MAX(date(`date`))) as `" RECENT_TABLE_NAME_SQL "`" \
	" ON `" WORKOUT_TABLE_NAME_SQL "`.name = `" RECENT_TABLE_NAME_SQL "`.name"

#define WORKOUT_GET_SQL WORKOUT_GET_BASE_SQL " WHERE (attributes & ?1) = ?1 AND (~attributes & ?2) = ?2 ORDER BY `last` DESC, `" WORKOUT_TABLE_NAME_SQL "`.name ASC LIMIT ?;"
#define WORKOUT_GET_SEARCH_SQL WORKOUT_GET_BASE_SQL " WHERE `" WORKOUT_TABLE_NAME_SQL "`.name LIKE ('%' || ? || '%') AND (attributes & ?2) = ?2 AND (~attributes & ?3) = ?3 ORDER BY `last` DESC, `" WORKOUT_TABLE_NAME_SQL "`.name ASC LIMIT ?;"
int workout_get(char*,char*,int,void (*)(const unsigned char*,int,const unsigned char*));

#define WORKOUT_INSERT_SQL "INSERT INTO " WORKOUT_TABLE_NAME_SQL " (name,attributes) VALUES (?,?);"
int workout_insert(char*, unsigned int);

int workout_toggle(char*,char*);
void workout_toggle_helper(const unsigned char*,int,const unsigned char*);

#define WORKOUT_UPDATE_SQL "UPDATE `" WORKOUT_TABLE_NAME_SQL "` SET name = ?, attributes = ? WHERE name = ?;"
int workout_update(char*,char*,int);

#define CREATE_SCHEMA_SQL ATTRIBUTE_CREATE_TABLE_SQL RECENT_CREATE_TABLE_SQL WORKOUT_CREATE_TABLE_SQL

int setup();

#endif