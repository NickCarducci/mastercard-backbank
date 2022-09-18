//"lib(wasm).rs"
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
//use std::sync::atomic::{AtomicBool, Ordering};
use wasm_bindgen::prelude::wasm_bindgen;
use worker::{
    //event,
    js_sys::{Error, Promise},
    wasm_bindgen::JsValue,
    wasm_bindgen_futures,
};

mod index;
mod utils;
/*static GLOBAL_STATE: AtomicBool = AtomicBool::new(false);
#[event(start)]
pub fn start() {
    utils::set_panic_hook();
    GLOBAL_STATE.store(true, Ordering::SeqCst);
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
//#[wasm_bindgen(start)]
pub fn main() -> Result<(), JsValue> {
    let window = web_sys::window().expect("no global `window` exists");
    let document = window.document().expect("should have a document on window");
    let body = document.body().expect("document should have a body"); //'Element','HtmlElement','Node', web_sys features
    let val = document.create_element("p")?;
    val.set_inner_html("Hello from Rust!");

    body.append_child(&val)?;

    Ok(())
} //import init, {appApp} from ""

//"Native" Workers support with fetch https://blog.cloudflare.com/workers-rust-sdk/
                
#[wasm_bindgen] //https://github.com/cloudflare/serde-wasm-bindgen/blob/master/src/lib.rs
extern "C" {
    type ObjectExt;

    #[wasm_bindgen(method, indexing_getter)]
    fn get_with_ref_key(this: &ObjectExt, key: &JsString) -> JsValue;

    #[wasm_bindgen(method, indexing_setter)]
    fn set(this: &ObjectExt, key: JsString, value: JsValue);
}
//#[wasm_bindgen] //https://rustwasm.github.io/wasm-bindgen/examples/without-a-bundler.html
pub async fn app_app(body: String) -> Result<Promise, Error> {
    let _body: Body = match serde_json::from_str(&body) {
        Ok(e) => e,
        Err(_e) => Body {
            page_offset: [""].map(String::from).to_vec(),
            page_length: [""].map(String::from).to_vec(),
            postal_code: [""].map(String::from).to_vec(),
        },
    }; //json!(body); /*serde_json::Value*/
       //(1) Reactor
    enum TaskState {
        Ready,
        NotReady(Waker),
        Finished,
    } //https://cfsamson.github.io/books-futures-explained/6_future_example.html
    struct Reactor {
        dispatcher: Sender<Event>,
        handle: Option<JoinHandle<()>>,
        tasks: HashMap<usize, TaskState>,
    }
    #[derive(Debug)]
    enum Event {
        Close,
        Timeout(u64, usize),
    }
    impl Reactor {
        fn new() -> Arc<Mutex<Box<Self>>> {
            let (tx, rx) = channel::<Event>();
            let reactor = Arc::new(Mutex::new(Box::new(Reactor {
                dispatcher: tx,
                handle: None,
                tasks: HashMap::new(),
            })));
            let reactor_clone = Arc::downgrade(&reactor);
            let handle = thread::spawn(move || {
                let mut handles = vec![];
                for event in rx {
                    println!("REACTOR: {:?}", event);
                    let reactor = reactor_clone.clone();
                    match event {
                        Event::Close => break,
                        Event::Timeout(duration, id) => {
                            let event_handle = thread::spawn(move || {
                                thread::sleep(Duration::from_secs(duration));
                                let reactor = reactor.upgrade().unwrap();
                                reactor.lock().map(|mut r| r.wake(id)).unwrap();
                            });
                            handles.push(event_handle);
                        }
                    }
                }
                handles
                    .into_iter()
                    .for_each(|handle| handle.join().unwrap());
            });
            reactor.lock().map(|mut r| r.handle = Some(handle)).unwrap();
            reactor
        }
        fn wake(&mut self, id: usize) {
            self.tasks
                .get_mut(&id)
                .map(|state| match mem::replace(state, TaskState::Ready) {
                    TaskState::NotReady(waker) => waker.wake(),
                    TaskState::Finished => {
                        panic!("Called 'wake' twice on task: {}", id)
                    }
                    _ => unreachable!(),
                })
                .unwrap();
        }
        fn register(&mut self, duration: u64, waker: Waker, id: usize) {
            if self.tasks.insert(id, TaskState::NotReady(waker)).is_some() {
                panic!("Tried to insert a task with id: '{}', twice!", id);
            }
            self.dispatcher.send(Event::Timeout(duration, id)).unwrap();
        }
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
            Task {
                app: match pathstr {
                    "/" => {
                        fn pathify(path: &str) -> std::path::PathBuf {
                            let mut input_file = std::path::PathBuf::new();
                            let _arr: () = path.split("/").map(|x| input_file.push(x)).collect();
                            return input_file;
                        }
                        let lock: std::path::PathBuf = pathify("./exec.c");
                        let appel = cc::Build::new().file(lock).expand();
                        u64::from_be_bytes(appel.try_into().expect(""))
                    }
                    &_ => u64::from_be_bytes("".as_bytes().try_into().expect("")),
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
    let reactor = Reactor::new();
    let id = 1;
    let future1 = Task::new("/", reactor.clone(), id);
    let promise =
        wasm_bindgen_futures::future_to_promise(async { Ok(JsValue::from(future1.await)) });
    Ok(promise)
    /*loop {
        match Future::poll(future1.as_mut(), &mut cx) {
            Poll::Ready(val) => break val,
            Poll::Pending => parker.park(), // <--- NB!
        };
    }*/
    //let app = ||{
    //let app = async {future1.await};
    //app//.unwrap().app};
    //Ok(app)
}
//no conditions - bolic "throw "
//'salaam comrades' end patriarchy (pay em! /fatwa doubling down on borrower and lender with fraud)
//coms

//"[do not kill fellow, but not the individual]"

//There is no God but Allah and Mohammed is his prophet.
//ٱلرِّقَابِfree necks but he could have taken retribution
//وَلَـٰكِن
//لَٱنتَصَرَ
//https://www.quora.com/unanswered/What-do-Islamists-think-about-this-%D9%84%D9%8E%D9%B1%D9%86%D8%AA%D9%8E%D8%B5%D9%8E%D8%B1%D9%8E%D9%88%D9%8E%D9%84%D9%8E%D9%80%D9%B0%D9%83%D9%90%D9%86%D9%B1%D9%84%D8%B1%D9%90%D9%91%D9%82%D9%8E%D8%A7%D8%A8%D9%90
//Does 'had Allah willed, He could have taken retribution' in 47:4 not mean to bound the slaves of infidels alone?
