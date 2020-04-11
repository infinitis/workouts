AM_CPPFLAGS = -I$(top_builddir)/include/ -I$(top_srcdir)/include/

bin_PROGRAMS = workouts
workouts_SOURCES = \
	src/add.c \
	src/attr.c \
	src/data/attr.c \
	src/default.c \
	src/ls.c \
	src/main.c \
	src/new.c \
	src/opt.c \
	src/recent.c \
	src/toggle.c \
	src/usage.c \
	src/data/recent.c \
	src/data/setup.c \
	src/data/workout.c \
	src/opt/homedir.c \
	src/opt/rows.c \
	src/opt/verbose.c
workouts_SOURCES += \
	include/add.h \
	include/attr.h \
	include/data.h \
	include/default.h \
	include/ls.h \
	include/main.h \
	include/new.h \
	include/opt.h \
	include/recent.h \
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