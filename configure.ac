AC_PREREQ([2.69])
AC_INIT([workouts], [0.0.1])

# Store build files not in main directory
AC_CONFIG_AUX_DIR([build-aux])

AM_INIT_AUTOMAKE([foreign subdir-objects nostdinc -Wall -Werror])

AC_CONFIG_SRCDIR([src/main.c])
AC_CONFIG_HEADERS([include/config.h])

AC_ARG_ENABLE([gui],
  [AS_HELP_STRING([--disable-gui],
  [disable gui (enabled by default if node is present)])],
  [enable_gui=$enableval],
  [enable_gui=yes])

AC_ARG_ENABLE([tests],
  [AS_HELP_STRING([--disable-tests],
  [disable tests (enabled by default)])],
  [enable_tests=$enableval],
  [enable_tests=yes])

AC_ARG_ENABLE([memcheck],
  [AS_HELP_STRING([--disable-memcheck],
  [disable valgrind (enabled by default)])],
  [enable_memcheck=$enableval],
  [enable_memcheck=yes])

AC_PATH_PROG([DOCKER], [docker])
AM_CONDITIONAL([HAVE_DOCKER], [test -n "$DOCKER"])
AC_PATH_PROG([NODE], [node])
AM_CONDITIONAL([HAVE_NODE], [test -n "$NODE"])
AC_PATH_PROG([VALGRIND], [valgrind])
AM_CONDITIONAL([HAVE_VALGRIND], [test -n "$VALGRIND"])

dnl disable gui if neither docker nor node are found
if test "x$enable_gui" = "xyes"; then
  if test -z "$NODE"; then
  	if test -z "$DOCKER"; then
  		enable_gui=no
  	fi
  fi
fi

AC_MSG_CHECKING([if gui should be enabled])
if test x$enable_gui != xno; then
  AC_MSG_RESULT(yes)
else
  AC_MSG_RESULT(no)
fi

AM_CONDITIONAL([ENABLE_GUI],[test x$enable_gui = xyes])

dnl disable memcheck if valgrind not found
if test "x$enable_memcheck" != "xno"; then
  if test -z "$VALGRIND"; then
    enable_memcheck=no
  fi
fi

AC_MSG_CHECKING([if memcheck should be enabled])
if test x$enable_memcheck != xno; then
  AC_MSG_RESULT(yes)
else
  AC_MSG_RESULT(no)
fi

AM_CONDITIONAL([ENABLE_MEMCHECK],[test x$enable_memcheck = xyes])

# Checks for programs.
AC_PROG_CC

# Checks for libraries.
AC_CHECK_LIB([sqlite3], [sqlite3_open_v2])

# Checks for header files.
AC_CHECK_HEADERS([stdlib.h string.h])

# Checks for typedefs, structures, and compiler characteristics.

# Checks for library functions.
AC_FUNC_MALLOC
AC_CHECK_FUNCS([strtoul])

AC_CONFIG_FILES([Makefile
				         gui/Makefile
                 test/integration/Makefile
                 test/unit/Makefile])
AC_CONFIG_SUBDIRS([server])
AC_OUTPUT
