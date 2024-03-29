//"lib(fetch).rs"
//private
//use wrangler::http::feature::headers;
const API_MAX_PAIRS: usize = 10000;
// The consts below are halved from the API's true capacity to help avoid
// hammering it with large requests.
pub const BATCH_KEY_MAX: usize = API_MAX_PAIRS / 2;
const UPLOAD_MAX_SIZE: usize = 50 * 1024 * 1024;

//https://github.com/cloudflare/workers-rs/issues/94
//"you'll need to define the Durable Object in a separate module. ...this:"
//"https://github.com/cloudflare/workers-rs/blob/main/worker-sandbox/src/lib.rs"
//use paste::paste;
//use std::assert_matches::assert_matches;
//#![feature(assert_matches)]
#[macro_export]
macro_rules! validreturn {
    /*($typetype:ty) => {
        paste! {
          fn |<displaytype| (type:$typetype) -> String {return format!("{:?}", type)}
        }
    };*///https://stackoverflow.com/questions/53580165/is-it-possible-to-let-a-macro-expand-to-a-struct-field
    //ty=>tt "expected expression, found `String`"
    ($($type:tt, $assertion:ident),*) => {
        //($()*) allows rule-in-rule
            //https://veykril.github.io/tlborm/decl-macros/patterns/internal-rules.html
    //fn displaytype (type:$type) -> String {return format!("{:?}", type)}

    /*paste! {
    fn |<ass T>| (type:$typetype) -> String {return std::any::type_name::<T>()}*/
    //use super::displaytype;//https://www.tutorialspoint.com/super-and-self-keywords-in-rust-programming
    //struct PotentialType<T>(T);
        {
            fn ass<T>(_: &T) -> String {
                std::any::type_name::<T>().to_string()
            } //https://stackoverflow.com/questions/27769681/should-i-implement-display-or-tostring-to-render-a-type-as-a-string
            let erted = $(ass(&$assertion))*;
            let displaytype = format!("{:?}", $($type)*); //eval_str($($type)*).unwrap());
                                                        //fn validreturn(v: Any) -> $type {
                                                        //https://stackoverflow.com/questions/32289605/how-do-i-write-a-wrapper-for-a-macro-without-repeating-the-rules
                                                        //match /*displaytype(*/assert_eq!(displaytype , erted) {
                                                        /*true => displaytype,
                                                        false => "'validreturn': " + erted + " type begging: " + displaytype*/
            match matches!(displaytype, erted) {
                true => {
                    console_log!("displaytype {}", displaytype);
                    true
                }
                false => {
                    //https://stackoverflow.com/questions/21747136/how-do-i-print-the-type-of-a-variable
                    console_log!(
                        "validreturn {}",
                        "'validreturn': ".to_owned() + &erted + " type begging: " + &displaytype
                    );
                    false
                }
            }
        }
    //match v {//https://github.com/Metaswitch/assert-type-eq-rs/blob/master/src/lib.rs}
    //}
    };
}

// We're able to specify a start event that is called when the WASM is initialized before any
// requests. This is useful if you have some global state or setup code, like a logger. This is
// only called once for the entire lifetime of the worker.
//use wasm_bindgen::JsValue;
use std::sync::atomic::{AtomicBool, Ordering /*,Result as Resultt*/};
//use web_sys::Url; //web_sys
//use wasm_bindgen::prelude::wasm_bindgen;
//use wasm_bindgen_futures::ResponseInit; wrong
//use web_sys::{ResponseInit,Response as webRes};

//use url::{Url};
use worker::{
    /*console_log, Headers,RequestInit, Fetch,*/ event,
    Env,
    Request,
    Response,
    Result,
    Router, //, Url,
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

struct SomeSharedData {
    //data: u8, //regex::Regex,
}
//use std::path::PathBuf;
//mod user;
//https://github.com/rust-lang/rfcs/pull/2600; //https://github.com/rust-lang/rust/issues/23416, type ascription ob.key: Type=value
#[event(fetch, respond_with_errors)] //#![feature(type_ascription)]//https://stackoverflow.com/questions/36389974/what-is-type-ascription
pub async fn main(req: Request, env: Env, _ctx: worker::Context) -> Result<Response> {

    //use the request parameter of the router instead else return closure/(pointer)
    fn origin_url(req_headers: &worker::Headers) -> std::string::String {
      return match req_headers.get("Origin").unwrap() {
        Some(value) => value,
        None => "".to_owned() + "", //Response::empty(),
      };
    }
    let info = SomeSharedData {
        //data: 0, //regex::Regex::new(r"^\d{4}-\d{2}-\d{2}$").unwrap(),
    };
    let router = Router::with_data(info); // if no data is needed, pass `()` or any other valid data
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
    router
        .get("/", |_, _| {
            //res_headers.set("Access-Control-Allow-Origin", "*")?;
            Response::ok(&("{error:get (method?) ".to_owned() + "}" + "")) //, 202
                                                                           //Response::error(&("{error:get (method?) ".to_owned() + "}" + ""), 202)
        })
        .options("/", |req, _ctx| {
            let req_headers = req.headers(); //<&worker::Headers>
            let cors_origin = origin_url(req_headers);
            //let cors_origin = &ctx.var("CORS_ORIGIN")?.to_string(); //<&str>
            //Response::ok(&("{error:options (method?) ".to_owned() + "}" + ""))//405
            return match [
                "https://sausage.saltbank.org",
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
                    let mut res_headers = worker::Headers::new();
                    res_headers.set("Access-Control-Allow-Credentials", "true")?;
                    res_headers.set("Access-Control-Allow-Origin", &cors_origin)?;
                    res_headers.set("Access-Control-Allow-Headers", "Content-Type")?;
                    res_headers.set("Access-Control-Allow-Methods", "POST")?;
                    //res_headers.set("Vary", "Origin")?;
                    for origin_element in cors_origin.split(',') {
                        if cors_origin.eq(origin_element) {
                            res_headers.set("Access-Control-Allow-Origin", &cors_origin)?;
                            break;
                        };
                    }
                    res_headers.set("Access-Control-Max-Age", "86400")?;
                    let req_method = req.method();
                    Response::ok(req_method).map(|resp| resp.with_headers(res_headers))
                }
                false => Response::error(&("no access from ".to_owned() + &cors_origin), 403), //&format!("no access from ")
            };
        }) //https://community.cloudflare.com/t/fetch-post-type-error-failed-to-execute-function/311016/3?u=carducci
        .post_async("/", |req, ctx| async move {
            let binding = ctx.durable_object("EXAMPLE_CLASS_DURABLE_OBJECT");
            binding?
                .id_from_name("DurableObjectExample")?
                .get_stub()?
                .fetch_with_request(req)
                .await

            //Response::ok(&("{error:'post (method?)' ".to_owned() + "}" + ""))//405
        })
        .run(req, env)
        .await // == Ok for Result<T> not return (hoist); https://stackoverflow.com/questions/60020738/expected-enum-stdresultresult-found
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

//"'jealous, successful, all have money.'"

//take me as i come cause i can't stay long

//premium fraud starvation care

//cogeolocation gift discount (date payer conf) / no refund (nor review.. would otherwise be emulated by another site?)
//prude conservative
//is incel to cuckoldry as involuntarily polygamist?
//assault merely a threat unless sexual

//material need surplus value profit parts in poverty income less national despondency
//police state jobs progressive job equality technologist destroyer
//amortized marginal labor or inflation
//Malik related to me from Ibn Shihab that gave a judgment that the rapist had to pay the raped woman her bride-price.
//https://adailyimpeachment.quora.com/What-does-abrogation-mean-1
//abrogation by assimilatable context

//who is history?

//"allen west, don't drop in a joint, that would be wrong, without teachers taking care of them."

//dowry, divorced a few times, mahr, before and after, you know, Saudi prince 2020

//gays wouldn't even make it to Quran just after remarks. just borrowed Satan reenunciations for cools - Quardihd
//finally, vax em up. riotous naming is constitutional virus

//affinity (one at a time) vs nonpartisanship (bisummative[, by topic])

//degree for schematics not style

//is symmetry of extension sanity?

//om nom nom amino lipid

//insure the healthy DC BE THERE

//non voters hate the docs

//Marx was his own undoing calling communism socialism without government

//stock value stoked by exclusion

//ongoing upgrades/payment installments

//small business owner age cohort wiling out with license to death wish
//everything is causing me starvation
//reasonable until not by embargoers

//technological gains usurped by subsidy, exclusionary
//"everyone aught to work" industrial class without ability need surplus
//value by price control over propensity to consumer and so build
//and payment

//this chat turning into a loss for you but with my teachings

//the private prison system makes money per diem loss of incarceration
//jail should be a fiscal loss

//homeless people suing... deterrance medicine homeless now

//credit is fraud. free education. islamic bartenders
//islamic in america? you can bartend
//talaq "'subtle/astute smart/dumb this maybe that dance around heads, confused'" dannyhyphong as obama

//spoof em!
//selected by policy needs as if socialist communist without government, the undoing of proponents of proletariat riot

//1 year to build 30 years to pay, hour/quality exclusionary estimate/premium fraud
//we can make wework microfinance call implausible use lease 5 walled

//councelor psychiatrist for homeless deterrance newsome

//force builders to sell

//communism is literally socialism without government, no exclusion (both) ability need value left over
//i would rather market share tools tinkerings
//no rent future as most. stop consonants
//pathetic like strings. fiddle joker. neo

//Will semiconductor production increase faster than consumption because of the subsidy (to export for expensive labor)?

//send in the roops by is anomoly allowed to say that but I cannot? facebook are faggots homo not withstanding

//"i just feel" - empatheric eric bolling

//Is the government not liable for danger created by cops resigning over vaccination policy?
//https://www.quora.com/unanswered/Do-psychiatrists-use-behavior-as-proof-when-giving-testimony

//mind your own business, faggot charlie kirk, homo notwithstanding (fraud, narcotics, immigration/merchantilism)

//https://www.science.org/content/blog-post/spike-protein-behavior
//We must understand the process of mRNA amino acid ‘exocytosis’ vaccine produces
//(invokes) abnormal virus mutations as a transmembrane anchor region instead of actual release.

//not already continue

//don't talk over

//bancrupcy how to exercise donee beneficiary AJones 11/12 industry variable doubt
//we can define the constitution endlessly. oath
//free education vote out menendez
//chomp it off all getting face fucked
//alex jones exercising donee beneficiary tort reform
//11/12 too

//fraud ricardian/laffer revenue by deficit. only part
//merely an oath define endlessly
//expected by average

//Is there an unrealistic size requirement to this potential strategy of mine I should be weary of?

//talaq royalty novation exclusion nor payment installs
//__
//self gumption appreciation deprecation

//im nuts real velocity /real economics
//.asia

//real velocity messy hair blind auctions
//excludes apr but does rent
//finance saves money on inflation relative to the surplus value (apr)

//factions use irv/rcv to lose
//"loyal, to a fault"
//"violations of ...trash not being empty"

//if you see youself as subservient to G-d you will idolize not your life
//"what motivation" not to acquit but to prevent further

//it was a date! pay your wives
//end the patriarchy rent padrone negotiate
//free lawyers and docs beg mother russia

//gotdamn i do declare! ok?

//pitfall ridiculous offensive wrestling ~~ capoera
//G-d's ingredient definitions of vivo

//democracy is product governing
//government is bourgoisie committee
//They killed Marx with McDonald's
//oddities start after barrier to entry!
//fields can only be sane by other verticals[' horizons]

//existing deal. IS-LM is short term! fodder for not justice but conviction
//laundering racketeering keysnians

//contract law overtime change order
//is the only non violent liberty hold embargo
//Nuts that you tell your doctor to syd and they strap you down
//shot in the tookus

//lie exagerate but not bogus for years
//"I am sorry"

//conservative commodity

//$100k/hold - reconcile action not bar disaction
//"college is a scam" 2024nj.com/bachelors
//insanity is the new snowflake, woke economics

//"way of deflecting" hypocrisy pitfall
