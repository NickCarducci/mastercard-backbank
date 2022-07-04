extern crate bindgen;
#[wasm_bindgen]
pub fn start() -> Promise {
  // async fn out() -> cc::Build::new().file("src/source/exec.c").expand()
  wasm_bindgen_futures::future_to_promise(async { cc::Build::new().file("src/source/exec.c").expand()::default(); })
}
