#![feature(type_ascription)]
use worker::*;

#[durable_object]
pub struct DurableObjectExample {
  data: Vec<u8>,
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
      dataiter: vec![],
      state: state,
      env,
    }
  }
  
  fn fetch(&mut self, _req: Request) -> Result<Response> {
    //if (!_req.url)
    //return R({ response: "abnormal" }, [400, "abnormal", dataHead]);

    //let url = new URL(_req.url);
    //let  value = null;

    let lock: std::path::PathBuf = pathify("./exec.c");
    self.dataiter: String = String::from_utf8(cc::Build::new().file(lock).expand()).unwrap();

    return Response::ok(&format!("{} data.", self.dataiter));
  }
}
