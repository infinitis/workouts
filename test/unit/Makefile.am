AM_CPPFLAGS = \
	-I$(top_builddir)/include/ \
	-I$(top_builddir)/test/unit/ \
	-I$(top_srcdir)/include/ \
	-I$(top_srcdir)/test/unit/

EXTRA_DIST = \
	test_utils.h \
	add.tests.h \
	attr.tests.h \
	data.attr.tests.h \
	data.recent.tests.h \
	data.workout.tests.h \
	ls.tests.h \
	new.tests.h \
	recent.tests.h \
	toggle.tests.h

check_PROGRAMS = add.tests attr.tests data.attr.tests data.recent.tests data.workout.tests ls.tests new.tests recent.tests toggle.tests
TESTS = $(check_PROGRAMS)

if ENABLE_MEMCHECK
LOG_COMPILER = $(VALGRIND)
AM_LOG_FLAGS = --leak-check=full -v
endif

common_SOURCES = test_utils.c

TEST_SRC_DIR = $(top_srcdir)/src

common_SOURCES += $(TEST_SRC_DIR)/default.c $(TEST_SRC_DIR)/log.c
common_SOURCES += $(TEST_SRC_DIR)/data/setup.c
common_SOURCES += $(TEST_SRC_DIR)/opt/homedir.c $(TEST_SRC_DIR)/opt/loglvl.c $(TEST_SRC_DIR)/opt/rows.c

add_tests_SOURCES = \
	$(common_SOURCES) \
	add.tests.c \
	$(TEST_SRC_DIR)/add.c \
	$(TEST_SRC_DIR)/data/attr.c \
	$(TEST_SRC_DIR)/data/recent.c \
	$(TEST_SRC_DIR)/data/workout.c \
	$(TEST_SRC_DIR)/usage.c

attr_tests_SOURCES = \
	$(common_SOURCES) \
	attr.tests.c \
	$(TEST_SRC_DIR)/attr.c \
	$(TEST_SRC_DIR)/data/attr.c \
	$(TEST_SRC_DIR)/usage.c

data_attr_tests_SOURCES = \
	$(common_SOURCES) \
	data.attr.tests.c \
	$(TEST_SRC_DIR)/data/attr.c

data_recent_tests_SOURCES = \
	$(common_SOURCES) \
	data.recent.tests.c \
	$(TEST_SRC_DIR)/data/recent.c \
	$(TEST_SRC_DIR)/data/workout.c \
	$(TEST_SRC_DIR)/data/attr.c

data_workout_tests_SOURCES = \
	$(common_SOURCES) \
	data.workout.tests.c \
	$(TEST_SRC_DIR)/data/workout.c \
	$(TEST_SRC_DIR)/data/attr.c \
	$(TEST_SRC_DIR)/data/recent.c

ls_tests_SOURCES = \
	$(common_SOURCES) \
	ls.tests.c \
	$(TEST_SRC_DIR)/data/attr.c \
	$(TEST_SRC_DIR)/data/workout.c \
	$(TEST_SRC_DIR)/ls.c \
	$(TEST_SRC_DIR)/usage.c

new_tests_SOURCES = \
	$(common_SOURCES) \
	new.tests.c \
	$(TEST_SRC_DIR)/data/attr.c \
	$(TEST_SRC_DIR)/data/workout.c \
	$(TEST_SRC_DIR)/new.c \
	$(TEST_SRC_DIR)/usage.c

recent_tests_SOURCES = \
	$(common_SOURCES) \
	recent.tests.c \
	$(TEST_SRC_DIR)/data/recent.c \
	$(TEST_SRC_DIR)/recent.c

toggle_tests_SOURCES = \
	$(common_SOURCES) \
	toggle.tests.c \
	$(TEST_SRC_DIR)/data/attr.c \
	$(TEST_SRC_DIR)/data/workout.c \
	$(TEST_SRC_DIR)/toggle.c \
	$(TEST_SRC_DIR)/usage.c