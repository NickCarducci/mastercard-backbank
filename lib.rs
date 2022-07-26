//https://github.com/cloudflare/workers-rs/issues/94
//"you'll need to define the Durable Object in a separate module. ...this:"
//"https://github.com/cloudflare/workers-rs/blob/main/worker-sandbox/src/lib.rs"

// We're able to specify a start event that is called when the WASM is initialized before any
// requests. This is useful if you have some global state or setup code, like a logger. This is
// only called once for the entire lifetime of the worker.
//use wasm_bindgen::JsValue;
use std::sync::atomic::{AtomicBool, Ordering /*,Result as Resultt*/};
//use web_sys::Url; //web_sys
//use wasm_bindgen::prelude::wasm_bindgen;
//use wasm_bindgen_futures::ResponseInit; wrong
//use web_sys::{ResponseInit,Response as webRes};

use worker::{
    /*console_log, Headers,RequestInit, Fetch,*/ event, Env, Request, Response, Result, Router,
};

mod index;
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
#[event(fetch, respond_with_errors)] //#![feature(type_ascription)]//https://stackoverflow.com/questions/36389974/what-is-type-ascription
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
    let router = Router::with_data(info);
    router
        .get("/", |_, _| {
            Response::error(&("get (method?) ".to_owned() + ""), 405)
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
                }
                false => Response::error(&("no access from ".to_owned() + cors_origin), 403), //&format!("no access from ")
            };
        })
        .post_async("/", |_req, ctx| async move {
            //let url = Url::new(&_req.url()?)?;
            return match _req.url()?.host_str() {
                None => Response::ok("cannot host_str() ".to_owned() + ""),
                //Option resolution =>
                Some(url) => {
                    //get, async move
                    let binding = ctx.durable_object("EXAMPLE_CLASS_DURABLE_OBJECT");
                    return match binding.is_err() {
                        false => Response::error("none", 405),
                        true => {
                            let namespace = binding?;
                            let stub =
                                namespace.id_from_name("DurableObjectExample")?.get_stub()?;
                            /*let mut opts = RequestInit::new();
                            opts.method("GET");
                            opts.mode(RequestMode::Cors);
                            let url =
                                format!("https://api.github.com/repos/{}/branches/master", repo);
                            let request = Request::new_with_str_and_init(&url, &opts)?;
                            request
                                .headers()
                                .set("Accept", "application/vnd.github.v3+json")?;*/
                            //return Response::ok(url);
                            stub.fetch_with_str(&url).await
                        }
                    };
                }
            };
        })
        .run(req, env)
        .await
    /*.options("/ *catchall", |_, ctx| {
        Response::ok(ctx.param("catchall").unwrap())
    })
    .options("/:id", |_, _| {
        return Response::error(&("option (where?) ".to_owned() + ""), 404);
    })
    .get("/:id", |_, _| {
        return Response::error(&("get (where?) ".to_owned() + ""), 404);
        //return Ok(Response::error(&("get (where?) ".to_owned() + ""), 404)?);
    })
    .get("/", |_, _| {
        return Response::error(&("get (method?) ".to_owned() + ""), 405);
    })
    .or_else_any_method("/ *catchall", |req, ctx| {
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
    .await; */
    //return result;
    //return Response::ok("");
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
//payment installment ANWR, UT/NM/RY appalachian

//deposit with donee beneficiary is iffy (breakup fee)

//irrelevant to the case finding is malfeasant and administrative abude for countersuit without
//punition for abuse and contempt of justice. but for cop law!

//is his company only woth that much because he owns it? just selll it, fraud
//blind auction $100k/subsidiary

//shuffle non voters irv factions

//wild

//individuals square not round %
//advocate collective-action referrenda
//rolling case policy
//advocates against false advertisement and countersuables

//political prisoner diminunitive/unarmed gastroneuro
//Is a legal threat an assault?
//Is it 'best practice' to label assaults as schizophrenic?
//Stand up to impropriety

//eukaryote nucleic amino immunofluorecent

//Does public charity or private foundation not merely devalue claims on business inventory?

//covenance... "'whatever comeas naturally'"

//would a customer spoofable precinct police state borrow
//simple reproducable (^) feature seeking

//trying to slow roll Phillips==Demand/(Misery) Mom borrower (everything is paid for you just need to take credit and hunt)
//gem inventory

//blessings substitutive; bond not the cause of value for utility

//do the richer get richer and the poor poorer not because of the phillips curve hours inflating by producer surplus payment installment value for utility?

//lower than grandma for hour and price (Phillips/Misery)

//motivated by something not in the world does not require ingredient nor apochrophical connection.
//efficient labor market... a fundamental misery is not a study phillips
//efficient labor market... hours should deflate - complementary

//liberty riot
//work harder to deflate by substitutive supply complementary demand
//Make inelasticity natural again, hours make deflation again, substitutive market again. Misery/Phillips tech
// canvass - NJ transit station assault (donate for results of poll of wise and new)
//count loss of structures in GDP

//borrowing not in line with customer spoofable geohash/month
//$15k/customer/yr fits with kyc

//can I talk on strategic retreats away from family
//partisans nor voters

//permission granted!

//substitutive fixed costs is complementary to demand
