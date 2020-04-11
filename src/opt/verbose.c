#include<opt.h>

void set_verbose(unsigned char val) {
	if(val>0) {
		global_opts.verbose = 1;
	} else {
		global_opts.verbose = 0;
	}
}