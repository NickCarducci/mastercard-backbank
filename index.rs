use worker::*;

#[durable_object]
pub struct DurableObjectExample {
  data: Vec<u8>,
  initialized: bool,
  state: State,
  env: Env, // access `Env` across requests, use inside `fetch`
}

fn pathify(path: &str) -> std::path::PathBuf {
  let mut input_file = std::path::PathBuf::new();
  let arr: () = path.split("/").map(|x| input_file.push(x)).collect();
  return input_file;
}

#[durable_object]
impl DurableObject for DurableObjectExample {
  fn new(state: State, env: Env) -> Self {
    Self {
      data: vec![],
      initialized: false,
      state: state,
      env,
    }
  }
  
  async fn fetch(&mut self, _req: Request) -> Result<Response> {
    if !self.initialized {
        self.initialized = true;
        //self.count = self.state.storage().get("count").await.unwrap_or(0);
    }
    //self.count += 10;
    //self.state.storage().put("count", self.count).await?;
    
    //if (!_req.url)
    //return R({ response: "abnormal" }, [400, "abnormal", dataHead]);

    //let url = new URL(_req.url);
    //let  value = null;

    let lock: std::path::PathBuf = pathify("./exec.c");
    let durr: Vec<u8> = cc::Build::new().file(lock).expand();
    self.data: Vec<String> = String::from_utf8(durr).unwrap();
    //self.data = data;
    return Response::ok(&format!("{} data.", self.data));
  }
}
