//#![crate_type="cdylib"] // only this bytecode not ./build.rs .. don't use binary/"bin" at all instead of binarily _serialized_ bytecode?
//extern crate bindgen;//https://stackoverflow.com/a/50307802/11711280
//extern crate bindgen;//mod use crate::c;
//use bindgen;//use ::ifcrate
// attribute
use wasm_bindgen::prelude::wasm_bindgen;
// utils
use wasm_bindgen_futures;
use cc;
use crate::mods::pathify;
use crate::readfm;
//use crate::promise;
//use promise;//"promise-rs"
/*error[E0774]: `derive` may only be applied to `struct`s, `enum`s and `union`s
   --> /home/runner/.cargo/registry/src/github.com-1ecc6299db9ec823/promise-rs-0.3.0/src/lib.rs:192:9
    |
192 |         #[derive(Debug)]
    |         ^^^^^^^^^^^^^^^^ not applicable here
193 |         // let mut pending_promises_threads: Vec<Arc<Mutex<Option<std::thread::JoinHandle<()>>>>> = vec![];
194 |         let mut resoved_results: Vec<String> = vec![];
    |         ---------------------------------------------- not a `struct`, `enum` or `union`
*/



//Result<(), syn_file_expand::Error>::
#[wasm_bindgen]//pub mod main start, promise::Promise
pub fn main () -> readfm(pathify("src/source/promise.rs".split("/")))::/*promise*/{Promise {
  
  // async fn out() -> cc::Build::new().file("src/source/exec.c").expand()
  let Mast = async { cc::Build::new().file("src/source/exec.c").expand() = Default::default();};//<i32>
  wasm_bindgen_futures::future_to_promise(Mast);
}}
