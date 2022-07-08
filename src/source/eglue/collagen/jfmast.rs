
use wasm_bindgen::prelude::wasm_bindgen;
use wasm_bindgen_futures::JsFuture;
pub struct Jship(Result<JsValue, JsValue>);
#[wasm_bindgen(start)]
pub fn jfmast(&args: String) -> Jship {
    /* rust has command arguments. the type of Fn are Option<u8,String,etc>
    let args = &arguments();//arguments from scope is made by javascript but not rust.
    let lock = &mods::pathify(&args[0].split("/"));
    //use in a (!) `macro_rule!` if MacroFragSpec path exists?
    ($p:path; $i:ident) => {
        {
            use $p as srcpath;
            do_stuff(srcpath::$i)
        }
    }
    */

    fn mastbosun() -> impl Future {
        async { cc::Build::new().file(lock).expand() = Default::default(&args) };
    };
    wasm_bindgen_futures::future_to_promise(mastbosun());
}
