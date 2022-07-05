//#![crate_type="cdylib"] // only this bytecode not ./build.rs .. don't use binary/"bin" at all instead of binarily _serialized_ bytecode?
//extern crate bindgen;//https://stackoverflow.com/a/50307802/11711280
//extern crate bindgen;//mod use crate::c;
//use bindgen;//use ::ifcrate
// attribute
use wasm_bindgen::prelude::wasm_bindgen;
// utils
use wasm_bindgen_futures;
use cc;
use promise;

#[wasm_bindgen]//pub mod main start
fn main () -> promise::Promise {
  // async fn out() -> cc::Build::new().file("src/source/exec.c").expand()
  let Mast = async { cc::Build::new().file("src/source/exec.c").expand() = Default::default();};//<i32>
  wasm_bindgen_futures::future_to_promise(Mast);
}
