AM_CPPFLAGS = -I$(top_builddir)/include/ -I$(top_srcdir)/include/

bin_PROGRAMS = workouts
workouts_SOURCES = \
	src/add.c \
	src/data/attr.c \
	src/data/recent.c \
	src/data/setup.c \
	src/data/workout.c \
	src/default.c \
	src/log.c \
	src/ls.c \
	src/main.c \
	src/opt/homedir.c \
	src/opt/loglvl.c \
	src/opt/rows.c \
	src/opt/target.c \
	src/rm.c \
	src/toggle.c \
	src/usage.c
workouts_SOURCES += \
	include/add.h \
	include/data.h \
	include/default.h \
	include/log.h \
	include/ls.h \
	include/main.h \
	include/opt.h \
	include/rm.h \
	include/toggle.h \
	include/usage.h

SUBDIRS = gui server test/integration test/unit

if HAVE_DOCKER
IMAGE_NAME=workouts
CONTAINER_NAME=workouts-test
build:
	make dist
	docker build -t $(IMAGE_NAME) --build-arg VERSION=$(VERSION) .

run: build
	docker run -d \
		-p "8080:8080" \
		--cap-add=SYS_PTRACE --security-opt seccomp=unconfined \
		--name $(CONTAINER_NAME) \
	 	$(IMAGE_NAME)

start: build
	-docker run -it --rm \
		-p "8080:8080" \
		--cap-add=SYS_PTRACE --security-opt seccomp=unconfined \
		$(IMAGE_NAME)

stop:
	docker stop $(CONTAINER_NAME)
	docker rm $(CONTAINER_NAME);
else
build: missing-local
run: missing-local
start: missing-local
stop: missing-local
missing-local:
	@echo "docker not found"
endif