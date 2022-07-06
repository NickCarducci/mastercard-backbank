use crate::pub::jsfuture;
use crate::jfmast;
//use crate::pub::arguments//gets rewritten inside deepest scope "apply" thisArg, argsArrayArg
//fn ego () -> jsfuture awaitfm(arguments[0]);
pub fn main () -> jsfuture jfmast("src/source/exec.c");
