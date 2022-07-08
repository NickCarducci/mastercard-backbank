
use wasm_bindgen_futures::JsFuture;
use wasm_bindgen::prelude::wasm_bindgen;
struct Jship(Result<JsValue, JsValue>);
#[wasm_bindgen(start)]
pub fn jfmast() -> Jship {
    let args = &arguments();
    let lock = &mods::pathify(&args[0].split("/"));

    fn mastbosun() -> impl Future {
        async { cc::Build::new().file(lock).expand() = Default::default(&args[1]) };
    };
    wasm_bindgen_futures::future_to_promise(mastbosun());
}
