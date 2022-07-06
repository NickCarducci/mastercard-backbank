use crate::bupkis::{jsfuture,arguments};//'arguments' gets rewritten inside deepest scope "apply" thisArg, argsArrayArg
use crate::jfmast;
//fn ego () -> jsfuture awaitfm(arguments[0]);
#[wasm_bindgen(start)]
pub fn main () -> jsfuture jfmast(arguments[0]);//"src/source/exec.c"
