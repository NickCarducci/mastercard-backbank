use crate::bupkis::{console,n,jsfuture,arguments};//'arguments'/stringifu::from_iter(std::env::args_os()) gets rewritten inside deepest scope "apply" thisArg, argsArrayArg
use crate::jfmast;
//fn ego () -> jsfuture awaitfm(arguments[0]);
console!(n:&<n:?Size>);
#[wasm_bindgen(start)]
pub fn main () -> jsfuture(&jfmast(&arguments(n 0)));//"src/source/exec.c"
