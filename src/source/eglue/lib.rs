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

#[wasm_bindgen]//pub mod main start, promise::Promise
pub fn main () -> read("src/source/eglue/promise.rs").Promise {
  
  // async fn out() -> cc::Build::new().file("src/source/exec.c").expand()
  let Mast = async { cc::Build::new().file("src/source/exec.c").expand() = Default::default();};//<i32>
  wasm_bindgen_futures::future_to_promise(Mast);
}
