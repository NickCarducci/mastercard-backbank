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
//use Promise;
use threadpool::ThreadPool; //activate from cargo.toml; features=[]
                            //use futures::executor::ThreadPool;
use std::sync::atomic::{AtomicBool, Ordering};
use wasm_bindgen::prelude::wasm_bindgen;
use worker::{
    event,
    js_sys::{Error, Promise},
    wasm_bindgen::JsValue,
    wasm_bindgen_futures, //::future_to_promise//
    Env,
    Request,
    ResponseBody, //Response,
                  //Result,
                  //Router, //, Url,
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

/*struct SomeSharedData {
    //data: u8, //regex::Regex,
}*/
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
use serde::Deserialize;
trait Boody {
    fn clone_dyn(&self) -> Box<dyn Boody>;
}
#[derive(Serialize, Deserialize, Debug, Clone)] //https://stackoverflow.com/questions/58422438/struct-with-partial-move-errors
#[serde(rename_all = "camelCase")] //https://github.com/serde-rs/serde/issues/1435
struct Body {
    //miracle:Organ,
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
/*#[wasm_bindgen(start)]
pub async fn main() {
    app()
}

#[repr(C)]
pub struct Promise {
    pub x: ::std::os::raw::c_int,
    pub y: ::std::os::raw::c_int,
}
type Pair<'a> = (i32, &'a str);
#[wasm_bindgen]
extern "C" {
    type Promise;
    /*#[wasm_bindgen(extends=::js_sys::Object, js_name=Request)]
    #[derive(Debug, Clone, PartialEq, Eq)]
    type Request;*/
    #[wasm_bindgen(method, js_class = "Promise", js_name = appApp)]
    fn app_app(this:&Request)->Promise;
}*/
#[wasm_bindgen(start)]
pub fn main() -> Result<(), JsValue> {
    // Use `web_sys`'s global `window` function to get a handle on the global
    // window object.
    let window = web_sys::window().expect("no global `window` exists");
    let document = window.document().expect("should have a document on window");
    let body = document.body().expect("document should have a body");

    // Manufacture the element we're gonna append
    let val = document.create_element("p")?;
    val.set_inner_html("Hello from Rust!");

    body.append_child(&val)?;

    Ok(())
}
//impl wasm_bindgen::convert::FromWasmAbi for Body {}
//#[event(fetch, respond_with_errors)] //#![feature(type_ascription)]//https://stackoverflow.com/questions/36389974/what-is-type-ascription
#[wasm_bindgen]
//#[wasm_bindgen(catch, constructor, js_class=Request)]
pub async fn app_app(
    //req: &Request,
    //_env: Env, /*_ctx: worker::Context*/
    body: serde_json::Value,
) -> Result<Promise, Error> {
    //let body: Body = ResponseBody::Body(req.clone()?.bytes().await?);
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
                            let _arr: () = path.split("/").map(|x| input_file.push(x)).collect();
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

    //let promise =
    //wasm_bindgen_futures::future_to_promise(async { Ok(JsValue::from(future1.await)) });
    //let pool = ThreadPool::new(1); //.expect("Failed to build pool");
    //let (tx, rx) = mpsc::unbounded::<i32>();

    /*let promise = async move {
        pool.spawn_ok(future1);

        let fut_values = rx.map(|v| v * 2).collect();
        fut_values.await
    };*/
    //usize
    //pool.execute(async move{future1.await});
    /*let (tx, rx) = channel();
    for _ in 0..n_jobs {
        let tx = tx.clone();
        pool.execute(move || {
            tx.send(1)
                .expect("channel will be there waiting for the pool");
        });
    }//https://docs.rs/threadpool/1.8.1/src/threadpool/lib.rs.html#953
    //pool.spawn_ok(future1.await);
    let values: Vec<i32> = executor::block_on(pool);
    Ok(promise)*/
    /*use std::thread;
    let compute = thread::spawn(|| async move { future1.await });
    compute.join().unwrap();*/

    let promise =
        wasm_bindgen_futures::future_to_promise(async { Ok(JsValue::from(future1.await)) });
    Ok(promise)
    /*
    serde_json::to_string(&Body {
         page_offset: [""].map(String::from).to_vec(),
         page_length: [""].map(String::from).to_vec(),
         postal_code: [""].map(String::from).to_vec(),
       }
    */
    //https://docs.rs/futures/latest/futures/
}
//does name not cause personal copyright
//established instated commerce must sell (Saver)
//end the patriarchy! father/chores rats (whistleblower/fda)
//"the essence of justice is whattaboutism" bongino after reading Dersh
//"Squander not your wealth among yourselves in vanity, except it be a trade by mutual consent, and kill not one another"
//"O you who believe! Do not approach to prayers with a mind befogged, until you can understand all that you say"
//"The devil only wants to provoke animosity and hatred between you through intoxicants and gambling, and to repel you from the remembrance of God and from the Salat. So will you thus refrain? 5:91"
//hadud during salat (without punishment as others??)
//"And from the fruits of the palm trees and grapevines you take intoxicant and good provision"

//logic: redundancy
//negotiated! free premium price control
//established commerce > free market / open ingredient
//=> force open source and right to try
//no holds barred permits

//bagel fat or like not "racist?" How do you make taxes illegal without taxes. tip your cops

//defense nade riot illegal, how cop taxation without tax
//sinner by executor apprentice Iblis beyond universe; yet for personal recompense (less remorse).
//no treatment otherwise but for fatherly patronage by depravity
