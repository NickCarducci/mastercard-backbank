//#include <emscripten/val.h>
#include <stdio.h>
//#include <stdlib.h>
int main () {
  //std::system("backbank.php");
  fopen("backbank.php", "r");
  //emscripten::val("backbank.php");
  return 0;
}
