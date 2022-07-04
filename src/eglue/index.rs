
fn main () {
    cc::Build::new()
        .file("exec.c")
        .compile("exec");
}
#[wasm_bindgen]
pub fn start() -> Promise {
    wasm_bindgen_futures::future_to_promise(async { exec(); })
}
