AM_CPPFLAGS = \
	-I$(top_builddir)/include/ \
	-I$(top_builddir)/test/unit/ \
	-I$(top_srcdir)/include/ \
	-I$(top_srcdir)/test/unit/

EXTRA_DIST = \
	test_utils.h \
	workout.tests.h \
	recent.tests.h \
	attr.tests.h

check_PROGRAMS = attr.tests recent.tests workout.tests
TESTS = $(check_PROGRAMS)

common_SOURCES = test_utils.c

TEST_SRC_DIR = $(top_srcdir)/src

common_SOURCES += $(TEST_SRC_DIR)/default.c $(TEST_SRC_DIR)/opt.c
common_SOURCES += $(TEST_SRC_DIR)/data/setup.c
common_SOURCES += $(TEST_SRC_DIR)/opt/homedir.c $(TEST_SRC_DIR)/opt/rows.c $(TEST_SRC_DIR)/opt/verbose.c

attr_tests_SOURCES = attr.tests.c $(TEST_SRC_DIR)/data/attr.c $(common_SOURCES)
recent_tests_SOURCES = recent.tests.c $(TEST_SRC_DIR)/data/recent.c $(TEST_SRC_DIR)/data/workout.c $(TEST_SRC_DIR)/data/attr.c $(common_SOURCES)
workout_tests_SOURCES = workout.tests.c $(TEST_SRC_DIR)/data/workout.c $(TEST_SRC_DIR)/data/attr.c $(TEST_SRC_DIR)/data/recent.c $(common_SOURCES)

if ENABLE_MEMCHECK
memcheck:
	-valgrind --leak-check=full ./attr.tests
	-valgrind --leak-check=full ./recent.tests
	-valgrind --leak-check=full ./workout.tests
else
memcheck:
	@echo "memcheck not enabled"
endif