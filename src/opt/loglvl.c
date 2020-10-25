#include<opt.h>

void opt_set_log_level(enum log_level level) {
	global_opts.verbose = level;
}