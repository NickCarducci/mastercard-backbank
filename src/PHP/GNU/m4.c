//https://www.gnu.org/software/m4/
//https://savannah.gnu.org/projects/m4/
//https://git.savannah.gnu.org/cgit/m4.git/tree/src/m4.c?h=branch-1.4
struct macro_definition
{
  struct macro_definition *next;
  int code; /* D, U, s, t, '\1', or DEBUGFILE_OPTION.  */
  const char *arg;
};
typedef struct macro_definition macro_definition;
