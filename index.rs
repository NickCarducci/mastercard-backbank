use worker::{
  async_trait, durable_object, js_sys, wasm_bindgen, wasm_bindgen_futures, worker_sys, Env,
  Request, Response, Result, State,
};
#[durable_object]
pub struct DurableObjectExample {
  app: String,//Vec<u8>,
  initialized: bool,
  state: State, 
  env: Env, // access `Env` across requests, use inside `fetch`
}

fn pathify(path: &str) -> std::path::PathBuf {
  let mut input_file = std::path::PathBuf::new();
  let _arr: () = path.split("/").map(|x| input_file.push(x)).collect();
  return input_file;
}

#[durable_object]
impl DurableObject for DurableObjectExample {
  fn new(state: State, env: Env) -> Self {
    Self {
      app: "".to_owned(), //format!(""),vec![]
      //https://www.hackertouch.com/how-to-create-and-check-string-is-empty-rust.html
      initialized: false,
      state: state,
      env,
    }
  }
  async fn fetch(&mut self, _req: Request) -> Result<Response> {
    let _state = &self.state;
    let _env = &self.env;
    //if (!_req.url)
    //return R({ response: "abnormal" }, [400, "abnormal", dataHead]);

    //let url = new URL(_req.url);
    //let  value = null;
    if !self.initialized {
      self.initialized = true;
      //self.app = self.state.storage().get("app").await.unwrap_or(0);
    }
    //return Response::ok("");
    let lock: std::path::PathBuf = pathify("./exec.c");
    let _app = &self.app;//hardly any use to add the c>php code to the keyvalue storage
    //self.app: Vec<v8> = extensionfrom cc::Build().expand
    //self.app: String = String::from_utf8(self.app).unwrap();
    //self.state.storage().put("app", self.app).await?;
    let appel: Vec<u8> = cc::Build::new().file(lock).expand();
    /*return*/ /*self.data = */Response::ok(String::from_utf8(appel).unwrap())
    //self.data = data::to_string();//https://doc.rust-lang.org/std/macro.format.html
    //return Response::ok(&format!("{} data.", self.data));
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
