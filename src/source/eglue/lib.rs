//#![crate_type="cdylib"] // only this bytecode not ./build.rs .. don't use binary/"bin" at all instead of binarily _serialized_ bytecode?
//extern crate bindgen;//https://stackoverflow.com/a/50307802/11711280
//extern crate bindgen;//mod use crate::c;
//use bindgen;//use ::ifcrate
// attribute
use wasm_bindgen::prelude::wasm_bindgen;
// utils
use wasm_bindgen_futures;
use cc;
//use crate::promise;
//use promise;
/*error[E0774]: `derive` may only be applied to `struct`s, `enum`s and `union`s
   --> /home/runner/.cargo/registry/src/github.com-1ecc6299db9ec823/promise-rs-0.3.0/src/lib.rs:192:9
    |
192 |         #[derive(Debug)]
    |         ^^^^^^^^^^^^^^^^ not applicable here
193 |         // let mut pending_promises_threads: Vec<Arc<Mutex<Option<std::thread::JoinHandle<()>>>>> = vec![];
194 |         let mut resoved_results: Vec<String> = vec![];
    |         ---------------------------------------------- not a `struct`, `enum` or `union`
*/

fn read () -> Result<(), syn_file_expand::Error> {
  //https://docs.rs/syn-file-expand/latest/syn_file_expand/fn.read_full_crate_source_code.html
  let args = Vec::<OsString>::from_iter(std::env::args_os());
  if args.len() != 2 {
      std::process::exit(1);//"Reads rust source file, including referred modules and expands them into a single source with all modules inline"
  }
  let source = syn_file_expand::read_full_crate_source_code(&args[1], |_|Ok(false))?;
  println!("{}", source.into_token_stream());
  Ok(())
}
let mut input_file = std::path::PathBuf::new();
input_file.push("src");
input_file.push("source");
input_file.push("eglue");
input_file.push("promise.rs");
//Result<(), syn_file_expand::Error>::
#[wasm_bindgen]//pub mod main start, promise::Promise
pub fn main () -> read(input_file)./*promise::*/Promise {
  
  // async fn out() -> cc::Build::new().file("src/source/exec.c").expand()
  let Mast = async { cc::Build::new().file("src/source/exec.c").expand() = Default::default();};//<i32>
  wasm_bindgen_futures::future_to_promise(Mast);
}
