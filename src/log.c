#include<log.h>

int verbose_flag = LOG_LEVEL_DEFAULT;

void log_message(enum log_level level, FILE *out_stream, const char *format,...) {
	if(level<=verbose_flag) {
		va_list args;
		va_start(args,format);
		vfprintf(out_stream,format,args);
		va_end(args);
	}
}