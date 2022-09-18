#[macro_export]
macro_rules! validreturn {
    ($($type:tt, $assertion:ident),*) => {
        {
            fn ass<T>(_: &T) -> String {
                std::any::type_name::<T>().to_string()
            }
          let erted = $(ass(&$assertion))*;
            let displaytype = format!("{:?}", $($type)*);
               match matches!(displaytype, erted) {
                true => {
                    console_log!("displaytype {}", displaytype);
                    true
                }
                false => {
                    console_log!(
                        "validreturn {}",
                        "'validreturn': ".to_owned() + &erted + " type begging: " + &displaytype
                    );
                    false
                }
            }
        }
    };
}
use std::sync::atomic::{AtomicBool, Ordering};
use wasm_bindgen::prelude::wasm_bindgen;
use worker::{
    event,
    js_sys::Error,
    wasm_bindgen::JsValue,
    wasm_bindgen_futures,
};

mod index;
mod utils;
static GLOBAL_STATE: AtomicBool = AtomicBool::new(false);
#[event(start)]
pub fn start() {
    utils::set_panic_hook();
    GLOBAL_STATE.store(true, Ordering::SeqCst);
}

use serde::Serialize;
#[derive(Serialize)]
struct Product {
    ivity: String,
}
use serde::Deserialize;
trait Boody {
    fn clone_dyn(&self) -> Box<dyn Boody>;
}
#[derive(Serialize, Deserialize, Debug, Clone)] //https://stackoverflow.com/questions/58422438/struct-with-partial-move-errors
#[serde(rename_all = "camelCase")] //https://github.com/serde-rs/serde/issues/1435
struct Body {
    page_offset: Vec<String>,
    page_length: Vec<String>,
    postal_code: Vec<String>,
}
impl Boody for Body {
    fn clone_dyn(&self) -> Box<dyn Boody> {
        Box::new(Body {
            page_offset: self.page_offset.clone(),
            page_length: self.page_length.clone(),
            postal_code: self.postal_code.clone(),
        })
    }
}
#[wasm_bindgen(start)]
pub fn main() -> Result<(), JsValue> {
    let window = web_sys::window().expect("no global `window` exists");
    let document = window.document().expect("should have a document on window");
    let body = document.body().expect("document should have a body");//'Element','HtmlElement','Node', web_sys features
    let val = document.create_element("p")?;
    val.set_inner_html("Hello from Rust!");

    body.append_child(&val)?;

    Ok(())
} //import init, {appApp} from ""
#[wasm_bindgen]//https://rustwasm.github.io/wasm-bindgen/examples/without-a-bundler.html
pub async fn app_app(body: String) -> Result<String, Error> {
    let body: Body = serde_json::json!(body); /*serde_json::Value*/
   
    fn pathify(path: &str) -> std::path::PathBuf {
        let mut input_file = std::path::PathBuf::new();
        let _arr: () = path.split("/").map(|x| input_file.push(x)).collect();
        return input_file;
    }
    let lock: std::path::PathBuf = pathify("./exec.c");
    let appel = cc::Build::new().file(lock).expand();//get_compiler().to_command();
    Ok(u64::from_be_bytes(appel.try_into().expect("")).to_string())
    //Ok(promise)
}