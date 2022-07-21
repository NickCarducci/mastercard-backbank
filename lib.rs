//https://github.com/cloudflare/workers-rs/issues/94
//"you'll need to define the Durable Object in a separate module. ...this:"
//"https://github.com/cloudflare/workers-rs/blob/main/worker-sandbox/src/lib.rs"

// We're able to specify a start event that is called when the WASM is initialized before any
// requests. This is useful if you have some global state or setup code, like a logger. This is
// only called once for the entire lifetime of the worker.
//use wasm_bindgen::JsValue;
use std::sync::atomic::{AtomicBool, Ordering};
//use web_sys::Url; //web_sys
use worker::{event, Env, Request, Response, Result, Router};

mod utils;
static GLOBAL_STATE: AtomicBool = AtomicBool::new(false);
#[event(start)]
pub fn start() {
    utils::set_panic_hook();
    // Change some global state so we know that we ran our setup function.
    GLOBAL_STATE.store(true, Ordering::SeqCst);
}

/*fn handle_a_request<D>(req: Request, _ctx: RouteContext<D>) -> Result<Response> {
    Response::ok(&format!(
        "req at: {}, located at: {:?}, within: {}",
        req.path(),
        req.cf().coordinates().unwrap_or_default(),
        req.cf().region().unwrap_or_else(|| "unknown region".into())
    ))
}
async fn handle_async_request<D>(req: Request, _ctx: RouteContext<D>) -> Result<Response> {
    Response::ok(&format!(
        "[async] req at: {}, located at: {:?}, within: {}",
        req.path(),
        req.cf().coordinates().unwrap_or_default(),
        req.cf().region().unwrap_or_else(|| "unknown region".into())
    ))
}*/

struct SomeSharedData {
    data: u8, //regex::Regex,
}
//https://github.com/rust-lang/rfcs/pull/2600; //https://github.com/rust-lang/rust/issues/23416, type ascription ob.key: Type=value
#[event(fetch)] //#![feature(type_ascription)]//https://stackoverflow.com/questions/36389974/what-is-type-ascription
pub async fn main(req: Request, env: Env, _ctx: worker::Context) -> Result<Response> {
    let info = SomeSharedData {
        data: 0, //regex::Regex::new(r"^\d{4}-\d{2}-\d{2}$").unwrap(),
    };

    let router = Router::with_data(info); // if no data is needed, pass `()` or any other valid data

    router
        .get_async("/:id", |_req, ctx| async move {
            //get, async move
            let namespace = ctx.durable_object("EXAMPLE_CLASS_DURABLE_OBJECT")?;
            let stub = namespace.id_from_name("A")?.get_stub()?;
            //https://stackoverflow.com/questions/70309403/updating-html-canvas-imagedata-using-rust-webassembly
            // when calling fetch to a Durable Object, a full URL must be used. Alternatively, a
            // compatibility flag can be provided in wrangler.toml to opt-in to older behavior:
            // https://developers.cloudflare.com/workers/platform/compatibility-dates#durable-object-stubfetch-requires-a-full-url
            //stub.fetch_with_str("https://fake-host/").await
            //let _req: Request = _req.dyn_into()?;
            //let url:Result<worker::Url> = _req.url();
            match _req.url() {
                //Result
                //Url::new(&url.host_str()
                Ok(url) => match url.host_str() {
                    //Option
                    Some(url) => stub.fetch_with_str(url).await,
                    None =>  format!("worker _req.url() match Ok host_str None"),
                },
                Err(e) => eprintln!("noope"),
            }
            //let url = Url::new(&_req.url())?;//req.url().host_str()//https://developers.cloudflare.com/workers/tutorials/workers-kv-from-rust/#using-the-wrapper
            //stub.fetch_with_str(&Url::new(&_req.url())?.pathname()).await
        })
        /*.or_else_any_method_async("/ *catchall", |_, ctx| async move {
            console_log!(
                "[or_else_any_method_async] caught: {}",
                ctx.param("catchall").unwrap_or(&"?".to_string())
            );
            Fetch::Url("https://github.com/404".parse().unwrap())
                .send()
                .await
                .map(|resp| resp.with_status(404))
        })*/
        .run(req, env)
        .await
}
