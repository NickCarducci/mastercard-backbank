//#![crate_type="cdylib"] // only this bytecode not ./build.rs .. don't use binary/"bin" at all instead of binarily _serialized_ bytecode?
//extern crate bindgen;//https://stackoverflow.com/a/50307802/11711280
//extern crate bindgen;//mod use crate::c;
use ::bindgen;
#[wasm_bindgen]
pub fn start() -> Promise {
  // async fn out() -> cc::Build::new().file("src/source/exec.c").expand()
  wasm_bindgen_futures::future_to_promise(async { cc::Build::new().file("src/source/exec.c").expand() = Default::default(); })
}
