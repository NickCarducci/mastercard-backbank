extern crate bindgen;
#[wasm_bindgen]
pub fn start() -> Promise {
  wasm_bindgen_futures::future_to_promise(async { cc::Build::new().file("src/source/exec.c").expand(); })
}
