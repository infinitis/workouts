#include<config.h>
#include<server.h>

#define PORT "8080"
#define BACKLOG 10

int main(int argc, char **argv) {
	struct addrinfo hints, *res;
	memset(&hints, 0, sizeof hints);
	hints.ai_family = AF_UNSPEC;
	hints.ai_socktype = SOCK_STREAM;
	hints.ai_flags = AI_PASSIVE;

	getaddrinfo(NULL, PORT, &hints, &res);

	int sockfd;
	if((sockfd=socket(PF_INET,SOCK_STREAM,0))==-1) { return EXIT_FAILURE; }
	
	int yes = 1;
	if (setsockopt(sockfd,SOL_SOCKET,SO_REUSEADDR,&yes,sizeof(int))==-1) { return EXIT_FAILURE; }
	
	if (bind(sockfd,res->ai_addr,res->ai_addrlen)==-1) { return EXIT_FAILURE; }
	if (listen(sockfd, BACKLOG) == -1) { return EXIT_FAILURE; }

	struct sigaction sa;
	sa.sa_handler = sigchld_handler; // reap all dead processes
	sigemptyset(&sa.sa_mask);
	sa.sa_flags = SA_RESTART;
	if(sigaction(SIGCHLD,&sa,NULL)==-1) { return EXIT_FAILURE; }

	printf("server started on port %s\nwaiting for connections...\n",PORT);

	while(1) {  // main accept() loop
		int new_fd;
		if((new_fd=accept(sockfd,NULL,NULL))==-1) { continue; }

		if(!fork()) { // this is the child process
			close(sockfd); // child doesn't need the listener

			request(new_fd);
			close(new_fd);

			exit(EXIT_SUCCESS);
		}
		close(new_fd);  // parent doesn't need this
	}

	return EXIT_SUCCESS;
}

void request(int sock) {
	char buf[1024];
	FILE *fp = NULL;

	if(recv(sock,buf,1024,0)==-1) { perror("recv"); }

	if(memcmp(buf,"GET / HTTP/1.1\r\n",16)==0) {
		fp = fopen("index.html","r");
	} else if(memcmp(buf,"GET /workouts.js HTTP/1.1\r\n",16)==0) {
		fp = fopen("workouts.js","r");
	} else if(memcmp(buf,"POST ",5)==0) {
		char *body_p;
		int body_len = body(buf,1024,&body_p);
		if(body_len>0) {
			passthru(sock,body_p,body_len);
			return;
		} else {
			http_error(sock);
			return;
		}
	} else {
		http_not_found(sock);
		return;
	}

	if(NULL==fp) {
		perror("fopen");
		http_not_found(sock);
		return;
	}

	struct stat stats;
	int fd = fileno(fp);
	if(fstat(fd,&stats)==-1) {
		perror("fstat");
		http_error(sock);
		return;
	}

	if(header(sock,stats.st_size)<0) {
		http_error(sock);
		return; 
	}

	off_t offset = 0;
	if(sendfile(sock,fileno(fp),&offset,stats.st_size)==-1) { perror("sendfile"); }

	if(fclose(fp)!=0) { perror("fclose"); }
}

int header(int sock, long int size) {
	char buf[1024];
	int len;
	if(size>=0) {
		len = sprintf(buf,HTTP_RESPONSE_HEADER_CONTENT_LENGTH,size);
		if(len<0) { return -1; }
	}
	
	if(send(sock,HTTP_RESPONSE_OK,HTTP_RESPONSE_OK_LENGTH,0)==-1) { perror("send"); }
	if(send(sock,HTTP_RESPONSE_HEADER_SERVER,HTTP_RESPONSE_HEADER_SERVER_LENGTH,0)==-1) { perror("send"); }

	if(size<0) { // transfer encoding
		if(send(
			sock,
			HTTP_RESPONSE_HEADER_TRANSFER_ENCODING,
			HTTP_RESPONSE_HEADER_TRANSFER_ENCODING_LENGTH,
			0
		)==-1) { perror("send"); }
	} else { // Content-Length
		if(send(sock,buf,len,0)==-1) { perror("send"); }
	}
	
	if(send(
		sock,
		HTTP_RESPONSE_HEADER_CONTENT_TYPE,
		HTTP_RESPONSE_HEADER_CONTENT_TYPE_LENGTH,
		0
	)==-1) { perror("send"); }
	if(send(
		sock,
		HTTP_RESPONSE_HEADER_DONE,
		HTTP_RESPONSE_HEADER_DONE_LENGTH,
		0
	)==-1) { perror("send"); }

	return 1;
}

void http_not_found(int sock) {
	if(send(sock,HTTP_RESPONSE_NOT_FOUND,HTTP_RESPONSE_NOT_FOUND_LENGTH,0)==-1) { perror("send"); }
	if(send(sock,HTTP_RESPONSE_HEADER_DONE,HTTP_RESPONSE_HEADER_DONE_LENGTH,0)==-1) { perror("send"); }
}

void http_error(int sock) {
	if(send(sock,HTTP_RESPONSE_INTERNAL_SERVER_ERROR,HTTP_RESPONSE_INTERNAL_SERVER_ERROR_LENGTH,0)==-1) { perror("send"); }
	if(send(sock,HTTP_RESPONSE_HEADER_DONE,HTTP_RESPONSE_HEADER_DONE_LENGTH,0)==-1) { perror("send"); }
}

void sigchld_handler(int s) {
	// waitpid() might overwrite errno, so we save and restore it:
	int saved_errno = errno;
	while(waitpid(-1, NULL, WNOHANG) > 0);
	errno = saved_errno;
}

int body(char *buf, int buf_len, char **body_p) {
	int body_len = -1;
	int pos = 0;
	while(pos<buf_len) {
		if(memcmp(&(buf[pos]),HTTP_REQUEST_HEADER_CONTENT_LENGTH,HTTP_REQUEST_HEADER_CONTENT_LENGTH_LENGTH)==0) {
			body_len = atoi(&(buf[pos+HTTP_REQUEST_HEADER_CONTENT_LENGTH_LENGTH]));
		}

		char *next_line = strstr(&(buf[pos]),HTTP_SEPARATOR);
		if(NULL==next_line) {
			*body_p = &(buf[pos]);
			return body_len;
		} else {
			pos += (next_line - &(buf[pos]))+HTTP_SEPARATOR_LENGTH;
		}
	}
	return -1;
}

void passthru(int sock, char *p,int len) {
	char buffer[4096];
	char *argv[10] = {NULL};
	const char filename[] = "workouts";
	
	char *home = getenv("HOME");
	strcpy(buffer,"HOME=");
	strcat(buffer,home);
	char *envp[2] = {buffer,NULL};
	
	int argc = 1;
	argv[0] = filename;
	argv[1] = &(p[0]);

	for(int i=0;i<len;i++) {
		if(p[i]=='\n') {
			p[i] = '\0';
			argc++;
			if(i+1!=len) {
				argv[argc] = &(p[i+1]);
			}
		}
	}

	int fds[2];
	if(pipe(fds)==-1) {
		perror("pipe");
		http_error(sock);
		return;
	}

	pid_t pid = fork();
	if(pid==-1) {
		perror("fork");
		http_error(sock);
		return;
	} else if(pid==0) {
		while((dup2(fds[1],STDOUT_FILENO)==-1)&&(errno==EINTR)) {}
		close(fds[1]);
		close(fds[0]);
		execve("/usr/local/bin/workouts",argv,envp);
		perror("execve");
		exit(1);
	}
	close(fds[1]);

	int status = 0;
	if(wait(&status)==-1) {
		perror("wait");
		http_error(sock);
		return;
	}

	if(status!=0) {
		printf("invalid status [%d]\n",status);
		// ssize_t count = read(fds[0],buffer,sizeof(buffer));
		// printf("%s\n",buffer);
		http_error(sock);
		return;
	}

	if(header(sock,-1)<0) {
		http_error(sock);
		return;
	}

	char chunk_buf[30];
	while(1) {
		ssize_t count = read(fds[0],buffer,sizeof(buffer));
		if(-1==count) {
			if(EINTR==errno) {
				continue;
			} else {
				perror("read");
				return;
			}
		} else if(0==count) {
			break;
		}

		len = sprintf(chunk_buf,HTTP_RESPONSE_HEADER_TRANSFER_CHUNK,count);
		if(len<0) { return; }

		if(send(sock,chunk_buf,len,0)==-1) { perror("send"); }

		if(send(sock,buffer,count,0)!=count) {
			perror("send");
			return;
		}

		if(send(sock,HTTP_SEPARATOR,HTTP_SEPARATOR_LENGTH,0)==-1) { perror("send"); }
	}

	len = sprintf(chunk_buf,HTTP_RESPONSE_HEADER_TRANSFER_CHUNK,0);
	if(len<0) { return; }

	if(send(sock,chunk_buf,len,0)==-1) { perror("send"); }
	if(send(sock,HTTP_SEPARATOR,HTTP_SEPARATOR_LENGTH,0)==-1) { perror("send"); }
}