#ifndef __SERVER_H_
#define __SERVER_H_

#include<errno.h>
#include<netdb.h>
#include<netinet/in.h>
#include<signal.h>
#include<stdio.h>
#include<stdlib.h>
#include<string.h>
#include<sys/sendfile.h>
#include<sys/socket.h>
#include<sys/stat.h>
#include<sys/wait.h>
#include<unistd.h>

#define HTTP_SEPARATOR "\r\n"
#define HTTP_SEPARATOR_LENGTH 2

#define HTTP_RESPONSE_OK "HTTP/1.1 200 OK\r\n"
#define HTTP_RESPONSE_OK_LENGTH 17
#define HTTP_RESPONSE_NOT_FOUND "HTTP/1.1 404 Not Found\r\n"
#define HTTP_RESPONSE_NOT_FOUND_LENGTH 24
#define HTTP_RESPONSE_INTERNAL_SERVER_ERROR "HTTP/1.1 500 Internal Server Error\r\n"
#define HTTP_RESPONSE_INTERNAL_SERVER_ERROR_LENGTH 36
#define HTTP_RESPONSE_BAD_REQUEST "HTTP/1.1 400 Bad Request\r\n"
#define HTTP_RESPONSE_BAD_REQUEST_LENGTH 26
#define HTTP_RESPONSE_HEADER_SERVER "Server: workouts\r\n"
#define HTTP_RESPONSE_HEADER_SERVER_LENGTH 18
#define HTTP_RESPONSE_HEADER_CONTENT_LENGTH "Content-Length: %ld\r\n"
#define HTTP_RESPONSE_HEADER_CONTENT_TYPE "Content-Type: text/html; charset=UTF-8\r\n"
#define HTTP_RESPONSE_HEADER_CONTENT_TYPE_LENGTH 40
#define HTTP_RESPONSE_HEADER_TRANSFER_ENCODING "Transfer-Encoding: chunked\r\n"
#define HTTP_RESPONSE_HEADER_TRANSFER_ENCODING_LENGTH 28
#define HTTP_RESPONSE_HEADER_TRANSFER_CHUNK "%x" HTTP_SEPARATOR
#define HTTP_RESPONSE_HEADER_DONE HTTP_SEPARATOR
#define HTTP_RESPONSE_HEADER_DONE_LENGTH HTTP_SEPARATOR_LENGTH

#define HTTP_REQUEST_HEADER_CONTENT_LENGTH "Content-Length: "
#define HTTP_REQUEST_HEADER_CONTENT_LENGTH_LENGTH 16

int main(int,char**);
int header(int,long int);
void http_not_found(int);
void http_error(int);
void request(int);
void sigchld_handler(int);
int body(char*,int,char**);
void passthru(int,char*,int);

#endif