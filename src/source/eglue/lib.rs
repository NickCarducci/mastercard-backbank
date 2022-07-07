mod bupkis;
use crate::bupkis::{/*console,n,*/jsfuture,arguments};//'arguments'/stringifu::from_iter(std::env::args_os()) gets rewritten inside deepest scope "apply" thisArg, argsArrayArg
//mod jfmast; mod only needed if with pub mod
use crate::jfmast;

use wasm_bindgen_futures::JsFuture;
//fn ego () -> jsfuture awaitfm(arguments[0]);

#[wasm_bindgen(start)]
pub fn main () -> jfmast( &arguments((&*&0,)) );
//pub fn main () -> jsfuture println!("{}",  jfmast( &arguments((&*&0,)) ) );
/*pub fn main () -> jsfuture {
  console!(&<n:?Sized>);//&0:?Sized
  //impl JFMast for JsFuture;
  //https://docs.smithy.rs/wasm_bindgen_futures/index.html
  println!("{}",jfmast(&arguments( (&*&0,) )) );//"src/source/exec.c"
  //jsfuture(&jfmast(&arguments(n 0)));
}*/
