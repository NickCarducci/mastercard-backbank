//https://github.com/cloudflare/workers-rs/issues/94
//"you'll need to define the Durable Object in a separate module. ...this:"
//"https://github.com/cloudflare/workers-rs/blob/main/worker-sandbox/src/lib.rs"

// We're able to specify a start event that is called when the WASM is initialized before any
// requests. This is useful if you have some global state or setup code, like a logger. This is
// only called once for the entire lifetime of the worker.
//use wasm_bindgen::JsValue;
//use std::sync::atomic::{AtomicBool, Ordering /*,Result as Resultt*/};
//use web_sys::Url; //web_sys
//use wasm_bindgen::prelude::wasm_bindgen;
//use wasm_bindgen_futures::ResponseInit; wrong
//use web_sys::{ResponseInit,Response as webRes};

use worker::{
    /*console_log, Headers,RequestInit, Fetch,*/ event, Env, Request, Response, Result, Router,
};

mod index;
/*mod utils;
static GLOBAL_STATE: AtomicBool = AtomicBool::new(false);
#[event(start)]
pub fn start() {
    utils::set_panic_hook();
    // Change some global state so we know that we ran our setup function.
    GLOBAL_STATE.store(true, Ordering::SeqCst);
}*/

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

/*#[wasm_bindgen]
pub fn handle(option:Option<String>) ->Resultt<webRes,worker::Error>  {
    //let req: Request = req.dyn_into()?;
    //let mut init = ResponseInit::new();
    //init.status(200);
    let option = option.as_deref();
    return webRes::new_with_opt_str(option);//webRes::new_with_opt_str(None, &init);
}*/

struct SomeSharedData {
    //data: u8, //regex::Regex,
}
//https://github.com/rust-lang/rfcs/pull/2600; //https://github.com/rust-lang/rust/issues/23416, type ascription ob.key: Type=value
#[event(fetch)] //#![feature(type_ascription)]//https://stackoverflow.com/questions/36389974/what-is-type-ascription
pub async fn main(req: Request, env: Env, _ctx: worker::Context) -> Result<Response> {
    fn origin_url(req_headers: &worker::Headers) -> std::string::String {
        return match req_headers.get("Origin").unwrap() {
            Some(value) => value,
            None => "".to_owned() + "", //Response::empty(),
        };
    }
    let info = SomeSharedData {
        //data: 0, //regex::Regex::new(r"^\d{4}-\d{2}-\d{2}$").unwrap(),
    };
    /*match
    fn options(req_headers: &worker::Headers, cors_origin: &str) {
        //
    }*//* {
          Some(re)=> Response::ok(&(re)),
          None => Response::ok(&("options fault ".to_owned()+""))
      }*/
    /*return*/
    /*fn getIndexResponse() -> Result<Response> {
        let mut res_headers = worker::Headers::new();
            //headers.set("x-foo", "waffles")?;
        return Ok(Response::ok("waffles")?.with_headers(res_headers));
    }*/
    let result = Router::with_data(info) // if no data is needed, pass `()` or any other valid data
        /*if (request.method === "OPTIONS")
          return new Response(`preflight response for POST`, {
            status: 200,
            message: `preflight response for POST`,
            headers: {
              "Access-Control-Allow-Headers": [
                //"Access-Control-Allow-Origin",
                "Access-Control-Allow-Methods",
                "Content-Type"
                //"Origin",
                //"X-Requested-With",
                //"Accept"
              ],
              "Access-Control-Allow-Methods": ["POST", "OPTIONS"]
            }
          });
        return await noException(request, env);*/
          /*.options("/ *catchall", |_, ctx| {
              Response::ok(ctx.param("catchall").unwrap())
          })*/
        .options("/*catchall", |_, ctx| {
            Response::ok(ctx.param("catchall").unwrap())
        })
        .options("/:id", |_, _| {
            return Response::error(&("option (where?) ".to_owned() + ""), 404);
        })
        .options_async("/", |req, ctx| async move {
            let req_headers = req.headers(); //<&worker::Headers>
            let cors_origin = &ctx.var("CORS_ORIGIN")?.to_string(); //<&str>

            return match [
                "https://sausage.vau.money",
                "https://vau.money",
                "https://jwi5k.csb.app",
                "https://i7l8qe.csb.app", //,"https://mastercard-backbank.backbank.workers.dev"
            ]
            .iter()
            .any(|&s| s == cors_origin)
            {
                true => {
                    //options(req_headers, cors_origin)
                    //https://rodneylab.com/using-rust-cloudflare-workers/
                    //fn preflight_response(_,_)->Result<Response> {
                    let origin = origin_url(req_headers);
                    let mut res_headers = worker::Headers::new();
                    res_headers.set("Access-Control-Allow-Headers", "Content-Type")?;
                    res_headers.set("Access-Control-Allow-Methods", "POST")?;
                    //res_headers.set("Vary", "Origin")?;
                    for origin_element in cors_origin.split(',') {
                        if origin.eq(origin_element) {
                            res_headers.set("Access-Control-Allow-Origin", &origin)?;
                            break;
                        };
                    }
                    res_headers.set("Access-Control-Max-Age", "86400")?;
                    let req_method = req.method();
                    return Response::ok(req_method).map(|resp| resp.with_headers(res_headers));
                    /*.unwrap()
                    .with_headers(res_headers)
                    .with_status(204)*/
                }
                false => Response::error(&("no access from ".to_owned() + cors_origin), 403), //&format!("no access from ")
            };
        })
        .get("/:id", |_, _| {
            return Response::error(&("get (where?) ".to_owned() + ""), 404);
            //return Ok(Response::error(&("get (where?) ".to_owned() + ""), 404)?);
        })
        .get("/", |_, _| {
            return Response::error(&("get (method?) ".to_owned() + ""), 405);
        })
        .post_async("/", |_req, ctx| async move {
            //https://stackoverflow.com/questions/70309403/updating-html-canvas-imagedata-using-rust-webassembly
            // when calling fetch to a Durable Object, a full URL must be used. Alternatively, a
            // compatibility flag can be provided in wrangler.toml to opt-in to older behavior:
            // https://developers.cloudflare.com/workers/platform/compatibility-dates#durable-object-stubfetch-requires-a-full-url
            //stub.fetch_with_str("https://fake-host/").await
            //let _req: Request = _req.dyn_into()?;
            //let url:Result<worker::Url> = _req.url();

            //"when calling fetch to a Durable Object, a full URL must be used."
            //https://github.com/cloudflare/workers-rs/blob/70461fa402a8e22959855cbd108d0404a8438285/worker-sandbox/src/lib.rs#L350
            //"Unique IDs are unguessable, therefore they can be used in URL-based access control."
            //https://developers.cloudflare.com/workers/runtime-apis/durable-objects/#accessing-a-durable-object-from-a-worker
            //let id = ctx.newUniqueId();
            let url: worker::Url = _req.url()?;
            //return Ok(match _req.url().ok() {
            //Result.ok to Option
            //Url::new(&url.host_str()
            //Ok(.ok()?) to resolve
            //Ok(Response::ok/error()?) to resolve
            /*Some(url) => */
            return Response::ok(match url.host_str() {
                //Option resolution =>
                Some(url) => {
                    //get, async move
                    let namespace = ctx.durable_object("EXAMPLE_CLASS_DURABLE_OBJECT")?;
                    let stub = namespace.id_from_name("DurableObjectExample")?.get_stub()?;
                    return stub.fetch_with_str(url).await;
                    /*return match stub.fetch_with_str(url).await? {
                        Some(account) => Response::ok(stub.fetch_with_str(url).await?),//Handle(account.onmessage()),
                        None => Response::error("Not found", 404),
                    };*/
                    //eprintln!("noope"),
                    /*Some(url) => match stub.fetch_with_str(url).await {
                        Ok(res) => res,//Ok(res) => Response::ok(res),
                        Err(e) => Response::error("noope", 400), //Err(e) => eprintln!("noope"),
                    },
                    None => eprintln!("worker _req.url() match Ok host_str None"), //format!()*/
                }
                None => "cannot host_str() ".to_owned() + "",
            });
            /*None => Response::error(&("cannot req.url() ".to_owned() + ""), 505)?,
            });*/
            /*let mut init = RequestInit::new();
             init.with_method(worker::Method::Get);

             let mut req_headers = Headers::new();
             req_headers.set("x-foo", "waffles")?;
            return Ok(out)?.with_headers(req_headers);*/
            //let url = Url::new(&_req.url())?;//req.url().host_str()//https://developers.cloudflare.com/workers/tutorials/workers-kv-from-rust/#using-the-wrapper
            //stub.fetch_with_str(&Url::new(&_req.url())?.pathname()).await
        })
        .or_else_any_method("/*catchall", |req, ctx| {
            /*console_log!(
                "[or_else_any_method_async] caught: {}",
                ctx.param("catchall").unwrap_or(&"?".to_string())
            );*/
            /*Fetch::Url("https://github.com/404".parse().unwrap())
            .send()
            .await
            .map(|resp| resp.with_status(404)) */

            let req_headers = req.headers();
            let cors_origin = &ctx.var("CORS_ORIGIN")?.to_string(); //<&str>

            let mut res_headers = worker::Headers::new();
            res_headers.set("Access-Control-Allow-Headers", "Content-Type")?;
            res_headers.set("Access-Control-Allow-Methods", "POST")?;
            //headers.set("Vary", "Origin")?;
            let origin = origin_url(req_headers);
            for origin_element in cors_origin.split(',') {
                if origin.eq(origin_element) {
                    res_headers.set("Access-Control-Allow-Origin", &origin)?;
                    break;
                };
            }
            //return Response::ok("waffles")?.with_headers(res_headers);
            return Response::ok("waffles").map(|resp| resp.with_headers(res_headers));
        })
        .run(req, env)
        .await; //;
    return result;
    //return Response::error("key missing", 400);
}

//Is a contractor's profit not only producer surplus when they gain from payment installments in valuation?
//Why are liberals and conservatives against the subjective use of hard drugs?
//saver is a directive, not a vicarious materialization
//leisure direct
//Would an indirect mechanism not be payment installments in product? That can be as honest as ever exclusion honot be honest yourself real

//embargo all the holds! even the payment installments
//keep advocating countersuits

//Why does Trump want to kill unlicensed pharmacists?
//Why do conservatives and liberals think access instead of dying is granted by subsidies?
//true real mean would be square not a percentage net, I am not probability on the skew to recorder "deranged, son"

//spectrum is bunch of dipoles, factions for irv
//not disapproval of president partisans and non voters, never swing voters nor wall st.

//If an insignificant amount of people are without health insurance, is medicare for all to declare premium as fraud and payment installment surplus?

//contempt constitutional 
// prevent administrative abuse fine for successful appeal.

//embargo payment installments btw!
//Advocates are in contempt with a countersuit or unconstitutional state law or congressional law other than name(riots & invasion)

//audit phosph nucleic, amino
//I want immunofluorecent amino 

//maybe foreign criminal can claim asylum for sharia law, 
//only can kill conscripted citizen. should we take them in as asylum?
//trump wants to death chair illegal pharmacy
//bob "right-to-try" menendez
//payment installment ANWR, UT/NM/RYm aooalachian

//deposit with donee beneficiary is iffy (breakup fee)

//irrelevant to the case finding is malfeasant and administrative abude for countersuit without 
//punition for abuse and contempt of justice. but for cop law!

//is his company only woth that much because he owns it? just selll it, fraud
//blind auction $100k/subsidiary

//shuffle non voters irv factions

//wild
