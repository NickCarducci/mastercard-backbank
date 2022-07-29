use serde::Serialize;
use worker::{
  async_trait, durable_object, js_sys, wasm_bindgen, wasm_bindgen_futures, worker_sys, Env,
  Request, Response, Result, State,
};
#[derive(Serialize)]
struct Product {
  ivity: String,
}
#[derive(Serialize)]
struct Noth {
  ing: String,
}
#[durable_object]
pub struct DurableObjectExample {
  app: String, //Vec<u8>,
  initialized: bool,
  state: State,
  env: Env, // access `Env` across requests, use inside `fetch`
}

/*fn pathify(path: &str) -> std::path::PathBuf {
  let mut input_file = std::path::PathBuf::new();
  let _arr: () = path.split("/").map(|x| input_file.push(x)).collect();
  return input_file;
}*/
/*struct Closure1 {
    client: (),
}
impl FnOnce for Closure1 {
    type Output = ();
}*/

use serde::Deserialize;
#[derive(Deserialize, Debug)]
#[serde(rename_all = "camelCase")]//https://github.com/serde-rs/serde/issues/1435
struct Body {//
  page_offset: u8,
  page_length: u8,
  postal_code: String,
}
//https://juliano-alves.com/2020/01/06/rust-deserialize-json-with-serde/
#[durable_object]
impl DurableObject for DurableObjectExample {
  fn new(state: State, env: Env) -> Self {
    Self {
      app: "initialapp".to_owned(), //format!(""),vec![]
      //https://www.hackertouch.com/how-to-create-and-check-string-is-empty-rust.html
      initialized: false,
      state: state,
      env,
    }
  } //https://github.com/cloudflare/durable-objects-template/issues/14
    //"Can't read from request stream after response has been sent" or just read _req (?)
  async fn fetch(&mut self, req: Request) -> Result<Response> {
    //let _state = &self.state;
    //let _env = &self.env;
    //let _req = req; //.arrayBuffer();
    //if (!_req.url)
    //return R({ response: "abnormal" }, [400, "abnormal", dataHead]);

    //let url = new URL(_req.url);
    //let  value = null;
    //self.state.storage().put("app", self.app).await?;
    let mut s = req.clone()?;
    let body: Body = s.json().await?; //.clone();//.clone()?;

    let _page_offset = body.page_offset;
    let _page_length = body.page_length;
    let _postal_code = body.postal_code;
    if !self.initialized {
      self.initialized = true;
      self.app = self.state.storage().get("app").await?;
      //self.app = self.app.unwrap_or(self.app.to_owned()); //uses the default from new
    }
    self.env.secret("SOME_SECRET")?.to_string();
    //dyn std::future::Future<worker::Response>
    /*pub trait FnOnce<Args> {
      type Output;

      extern "rust-call" fn call_once(self, args: Args) -> Self::Output;
    }
    fn consume_with_relish<F>(func: F)
    where
      F: FnOnce() -> worker::Response,
    {
      call_once()
      //func() then use of moved value` error
    }*/
    self.state.storage().put("app", &self.app).await?;
    //.and_then(consume_with_relish(relish));
    //let relish =
    /*async move {
      match req.path().as_str() {
        "/" => Response::from_json(&Product {
          ivity: self.app.to_string(),
        }),
        &_ => Response::from_json(&Noth { ing: "".to_owned() }), /*"/" => Response::ok(&format!(
                                                                   "[durable_object]: self.app: {}", //secret value: {}",
                                                                   self.app,
                                                                   //self.env.secret("SOME_SECRET")?.to_string()
                                                                 ))*/
      }
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
    }
    .await*/
    Response::from_json(&Product {
      ivity: self.app.to_string(),
    })
    //.or_else(|err| Response::error(err.to_string(), 500));
  }
}
//advocates against false advertisement and countersuables
//lock up the italians::sweaty
//profits are only left over value than utility is valuation by payment installments
//inelasticity as left over
//flip phillips to misery to complementary

//better effort for deflating efficiency than non-accelerating inflation rate of unemployment

//if I cannot say kill russians on facebook but likely cannot donate without being red flagged
//asylum for conscripts
//repo credit purchases, inventory no debit in debenture/stock fiduciary... only by royalty gives debenture a different name

//worked at it through the generations
//Is propensity exclusively genetic part of athleticism potential?

//the shim is my business partner
