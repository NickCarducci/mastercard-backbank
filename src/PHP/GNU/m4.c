//https://www.gnu.org/software/m4/
//https://savannah.gnu.org/projects/m4/
//https://git.savannah.gnu.org/cgit/m4.git/tree/src/m4.c?h=branch-1.4
//pointer first struct definition declaration 
/*
http://www.cs.toronto.edu/~heap/270F02/node31.html
struct node is that it includes a pointer to itself. From the 
point-of-view of the compiler, it ensures that struct node has 
a member that is a pointer to struct node before it has even 
completed the statement (reached the semicolon) creating struct node
*/
struct macro_definition
{
  struct macro_definition *next;
  int code; /* D, U, s, t, '\1', or DEBUGFILE_OPTION.  */
  const char *arg;
};
typedef struct macro_definition macro_definition;
