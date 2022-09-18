//use wasm_bindgen::prelude::wasm_bindgen;
//use wasm_bindgen_futures::{JsFuture, future_to_promise};
//const API_MAX_PAIRS: usize = 10000;
//pub const BATCH_KEY_MAX: usize = API_MAX_PAIRS / 2;
//const UPLOAD_MAX_SIZE: usize = 50 * 1024 * 1024;

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
use worker::{
    event,
    wasm_bindgen::JsValue,
    wasm_bindgen_futures, //::future_to_promise//
    Env,
    Request,
    Response,
    Result,
    Router, //, Url,
};
//use wasm_bindgen_futures::{JsFuture, future_to_promise};
//use wasm_bindgen_macro_support;

mod index;
mod utils;
static GLOBAL_STATE: AtomicBool = AtomicBool::new(false);
#[event(start)]
pub fn start() {
    utils::set_panic_hook();
    GLOBAL_STATE.store(true, Ordering::SeqCst);
}

struct SomeSharedData {
    //data: u8, //regex::Regex,
}
use serde::Serialize;
use std::{
    collections::HashMap,
    future::Future,
    mem,
    pin::Pin,
    sync::mpsc::{channel, Sender},
    sync::{Arc, Mutex},
    task::{Context, Poll, Waker},
    thread::{self, JoinHandle},
    time::Duration,
};
#[derive(Serialize)]
struct Product {
    ivity: String,
}
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
    let router = Router::with_data(info);
    router
        .get("/", |_, _| {
            //res_headers.set("Access-Control-Allow-Origin", "*")?;
            Response::ok(&("{error:get (method?) ".to_owned() + "}" + "")) //, 202
                                                                           //Response::error(&("{error:get (method?) ".to_owned() + "}" + ""), 202)
                                                                           /*let binding = ctx.durable_object("EXAMPLE_CLASS_DURABLE_OBJECT");
                                                                           binding?
                                                                               .id_from_name("DurableObjectExample")?
                                                                               .get_stub()?
                                                                               .fetch_with_request(req)
                                                                               .await*/
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
        .post_async(
            "/",
            |req, _ctx| async move {
                //(1) Reactor
                // The different states a task can have in this Reactor
                enum TaskState {
                    Ready,
                    NotReady(Waker),
                    Finished,
                } //https://cfsamson.github.io/books-futures-explained/6_future_example.html

                // This is a "fake" reactor. It does no real I/O, but that also makes our
                // code possible to run in the book and in the playground
                struct Reactor {
                    // we need some way of registering a Task with the reactor. Normally this
                    // would be an "interest" in an I/O event
                    dispatcher: Sender<Event>,
                    handle: Option<JoinHandle<()>>,

                    // This is a list of tasks
                    tasks: HashMap<usize, TaskState>,
                }

                // This represents the Events we can send to our reactor thread. In this
                // example it's only a Timeout or a Close event.
                #[derive(Debug)]
                enum Event {
                    Close,
                    Timeout(u64, usize),
                }

                impl Reactor {
                    // atomic reference counted, mutex protected, heap allocated `Reactor`.
                    // 1. only thread-safe reactors will be created.
                    // 2. heap allocating obtains a stable address reference
                    // not dependent on function stack frame caller of `new`
                    fn new() -> Arc<Mutex<Box<Self>>> {
                        let (tx, rx) = channel::<Event>();
                        let reactor = Arc::new(Mutex::new(Box::new(Reactor {
                            dispatcher: tx,
                            handle: None,
                            tasks: HashMap::new(),
                        })));

                        // `weak` reference so our `Reactor` will not get `dropped`
                        // when our main thread is finished for the Reactor as internal references.

                        // collect `JoinHandles` from threads spawned & joined
                        // `Reactor` will be alive longer than any reference held by the threads we spawn here.
                        let reactor_clone = Arc::downgrade(&reactor);

                        // 'Reactor-thread'. now merely spawn new thread timers.
                        let handle = thread::spawn(move || {
                            let mut handles = vec![];

                            // This simulates some I/O resource
                            for event in rx {
                                println!("REACTOR: {:?}", event);
                                let reactor = reactor_clone.clone();
                                match event {
                                    Event::Close => break,
                                    Event::Timeout(duration, id) => {
                                        // serve spawn new thread timer & call `Waker` `wake` when done.
                                        let event_handle = thread::spawn(move || {
                                            thread::sleep(Duration::from_secs(duration));
                                            let reactor = reactor.upgrade().unwrap();
                                            reactor.lock().map(|mut r| r.wake(id)).unwrap();
                                        });
                                        handles.push(event_handle);
                                    }
                                }
                            }

                            // This is important for us since we need to know that these
                            // threads don't live longer than our Reactor-thread. Our
                            // Reactor-thread will be joined when `Reactor` gets dropped.
                            handles
                                .into_iter()
                                .for_each(|handle| handle.join().unwrap());
                        });
                        reactor.lock().map(|mut r| r.handle = Some(handle)).unwrap();
                        reactor
                    }

                    // The wake function will call wake on the waker for the task with the
                    // corresponding id.
                    fn wake(&mut self, id: usize) {
                        self.tasks
                            .get_mut(&id)
                            .map(|state| {
                                // No matter what state the task was in we can safely set it
                                // to ready at this point. This lets us get ownership over the
                                // the data that was there before we replaced it.
                                match mem::replace(state, TaskState::Ready) {
                                    TaskState::NotReady(waker) => waker.wake(),
                                    TaskState::Finished => {
                                        panic!("Called 'wake' twice on task: {}", id)
                                    }
                                    _ => unreachable!(),
                                }
                            })
                            .unwrap();
                    }

                    // Register a new task with the reactor. In this particular example
                    // we panic if a task with the same id get's registered twice
                    fn register(&mut self, duration: u64, waker: Waker, id: usize) {
                        if self.tasks.insert(id, TaskState::NotReady(waker)).is_some() {
                            panic!("Tried to insert a task with id: '{}', twice!", id);
                        }
                        self.dispatcher.send(Event::Timeout(duration, id)).unwrap();
                    }

                    // We simply checks if a task with this id is in the state `TaskState::Ready`
                    fn is_ready(&self, id: usize) -> bool {
                        self.tasks
                            .get(&id)
                            .map(|state| match state {
                                TaskState::Ready => true,
                                _ => false,
                            })
                            .unwrap_or(false)
                    }
                }

                impl Drop for Reactor {
                    fn drop(&mut self) {
                        // We send a close event to the reactor so it closes down our reactor-thread.
                        // If we don't do that we'll end up waiting forever for new events.
                        self.dispatcher.send(Event::Close).unwrap();
                        self.handle.take().map(|h| h.join().unwrap()).unwrap();
                    }
                }
                //(2) Task
                #[derive(Clone)]
                pub struct Task {
                    app: u64,
                    reactor: Arc<Mutex<Box<Reactor>>>,
                    id: usize,
                }
                impl Task {
                    fn new(pathstr: &str, reactor: Arc<Mutex<Box<Reactor>>>, id: usize) -> Self {
                        //Task {
                        Task {
                            app: match pathstr {
                                //let s: String = match pathstr {
                                "/" => {
                                    fn pathify(path: &str) -> std::path::PathBuf {
                                        let mut input_file = std::path::PathBuf::new();
                                        let _arr: () =
                                            path.split("/").map(|x| input_file.push(x)).collect();
                                        return input_file;
                                    }
                                    let lock: std::path::PathBuf = pathify("./exec.c");
                                    let appel = cc::Build::new().file(lock).expand();
                                    //String::from_utf8(appel).unwrap()
                                    u64::from_be_bytes(appel.try_into().expect(""))
                                    //.iter().collect()
                                }
                                &_ => u64::from_be_bytes("".as_bytes().try_into().expect("")),
                                //};
                                //u64::from_str_radix(s.expect("")) //,16
                            },
                            reactor,
                            id,
                        }
                    }
                }
                // (3) Future implementation
                impl Future for Task {
                    type Output = usize;

                    fn poll(self: Pin<&mut Self>, cx: &mut Context<'_>) -> Poll<Self::Output> {
                        //let mut r = self.app;
                        let mut r = self.reactor.lock().unwrap();
                        if r.is_ready(self.id) {
                            *r.tasks.get_mut(&self.id).unwrap() = TaskState::Finished;
                            Poll::Ready(self.id)
                        } else if r.tasks.contains_key(&self.id) {
                            r.tasks
                                .insert(self.id, TaskState::NotReady(cx.waker().clone()));
                            Poll::Pending
                        } else {
                            r.register(self.app, cx.waker().clone(), self.id);
                            Poll::Pending
                        }
                    }
                }
                let path = req.path(); //longer lived with let
                let pathstr: &str = path.as_str();
                let reactor = Reactor::new();
                let id = 1;
                let future1 = Task::new(pathstr, reactor.clone(), id);
                /*let fut1: Result<JsValue> = async move {
                    let am: JsValue = future1.await;
                    am
                    //let val = future1.await;
                    //println!("Got {} at time: {:.2}.", val, start.elapsed().as_secs_f32());
                };*/
                //let promise = future_to_promise(fut1);
                /*Response::from_json(&Product {
                    ivity: fut1.await.to_string(),
                })*/
                /*let result: Result<Future<&str>> = match "true" {
                    "true" => async move { fut1.await.to_string() },
                    &_ => async move{}
                };*/
                //async move {future1.await}//future1.await.try_into().map(JsValue::from).unwrap()//.try_into().unwrap()
                //let promise = future1.await.into_iter().then(|i| async { i });
                let promise = wasm_bindgen_futures::future_to_promise(async {
                    Ok(JsValue::from(future1.await))
                });
                /*let wasm_bindgen_code =
                    wasm_bindgen_macro_support::expand(future1.ex(), wrapper_fn)
                        .expect("wasm_bindgen macro failed to expand");
                let output = quote! {
                    #input_fn

                    #wasm_bindgen_code
                };*/
                Response::from_body(promise)
                /*Response::ok(
                    {
                        promise.await
                        //Ok(JsValue::null())
                    }
                    .to_string(),
                )*/ //https://github.com/cloudflare/workers-rs/blob/main/worker/src/schedule.rs
                  //.read().unwrap().contains())
                  //https://github.com/cloudflare/workers-rs/blob/78a72a4f52fc4a8bfa01d25ca92fafa807290150/worker-macros/src/durable_object.rs#L70

                //&Noth { ing:
                //impl TryFuture<Ok = Response> for Body {
                /*"/" => Response::ok(&format!(
                  "[durable_object]: self.app: {}", //secret value: {}",
                  self.app,
                  //self.env.secret("SOME_SECRET")?.to_string()
                ))*/

                //return Response::ok("");
                //let lock: std::path::PathBuf = pathify("./exec.c");
                //let _app = &self.app;//hardly any use to add the c>php code to the keyvalue storage
                //self.app: Vec<v8> = extensionfrom cc::Build().expand
                //self.app: String = String::from_utf8(self.app).unwrap();
                //self.state.storage().put("app", self.app).await?;
                //let appel: Vec<u8> = cc::Build::new().file(lock).expand();
                /*return*/ /*self.data = *///Response::ok(String::from_utf8(appel).unwrap())
                //self.data = data::to_string();//https://doc.rust-lang.org/std/macro.format.html
                //return Response::ok(&format!("{} data.", self.data));

                //fn make_try_future() -> impl TryFuture<Ok = Response> {
                //fn into_future(&self) -> Self::Future {
                //Body.into_future()

                //make_try_future()
                //fn take_future(future: impl Future<Output = Result<Response>>) {}
                //take_future(make_try_future())
            }, /*let binding = ctx.durable_object("EXAMPLE_CLASS_DURABLE_OBJECT");
               binding?
                   .id_from_name("DurableObjectExample")?
                   .get_stub()?
                   .fetch_with_request(req)
                   .await*/
               //Response::ok(&("{error:'post (method?)' ".to_owned() + "}" + ""))//405
        )
        .run(req, env)
        .await // == Ok for Result<T> not return (hoist); https://stackoverflow.com/questions/60020738/expected-enum-stdresultresult-found
}
//Does Dick Morris think tips do not have to be taxed?
//Is having to pay taxes on tips 'tyranny' that people shouldn't have to pay?
//Why are tips nor billed services not gifts yet discounted or damaged sales are?

/*Fff. Is the burden of this feature availing in [miniflare](https://github.com/cloudflare/miniflare/issues/301) ([my report](https://community.cloudflare.com/t/using-authorization-credential-bearer-in-lieu-of-same-origin/409702)), `global_async_io`?  [576](https://github.com/NickCarducci/mastercard-backbank/runs/7797953689?check_suite_focus=true#step:6:577)
````
= note: `async` trait functions are not currently supported
= note: consider using the `async-trait` crate: https://crates.io/crates/async-trait
````
Is there no way to make '[Modify request property](https://developers.cloudflare.com/workers/examples/modify-request-property/)', `workers/examples`, functional, before: 'Wrangler 2 Service Bindings' without miniflare? It showcases `POST` functionality, ..albeit only outside of[ a] cloudflare zone[s?]. edit: I was mixing wrangler dev and publish properties, but now I am left wondering what is the point of cross-origin resource sharing JSON when URI provides query params?

Why does ‘Modify request property’, workers/examples showcase POST functionality (…albeit outside of a Cloudflare zone)? Can I bypass cross-origin resource sharing for JSON with GET URI query params? If not, is global_async_io the reason for workers only being able to send requests to other zones or service bindings 1?*/

//I don't wannt to waste my time nigger

//finance is contractor prodits? merchant manufacturers Ukranian
//apr plus concentration stock indices

//it's a challange but it is right to not be polytheistic for G-d but body of course (come hell or high water do not lose your will)

//end the patriarchy gobless
//stoner doesn't need guns
//fatherly depravity

//downvote!

//how do you hijag nations with personal requests, or put people to Hell on behalf  of damnation elsewhere

//"you will need to have policy positions at some point"
//"not left or right forward, don't you have to make a decision, common sense, consensus majority view. We are populist."
//Do non-voters waiting for anti-finance candidates care about the spoiler affect?
//Is the Forward Party a direct democracy?

//"man manipulated," max "mercury[ cure/]vaccination."//"schizmatic"
//Is renegotiating premium not controlled instead of schismatic?

//don't make the standard the bastion of the mediocre

//listen guy, 'anti-religious abrogating polytheism
//renounce beliefs or be burned at the stake, you can be right with G-d if you aren't even to self-harm but without Iblis reprisal*

//Is self-harm not omnipotent as everyone and elsewhere but unto punishment for what but superflous torture of holds yet for immediacy
//concerted voter (sane faction irv)

//FBI* Supreme who? Sam Donaldson
//capture utilities of disparate planes of forges

//if you don't make weight (or event is cancelled) is it bonus[ stipulations without] or escrow (spoil)

//yikies waa
