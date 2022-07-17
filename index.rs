use worker::*;

#[durable_object]
pub struct Index {
    data: Vec<Data>,
    state: State,
    env: Env, // access `Env` across requests, use inside `fetch`
}

#[durable_object]
impl ExampleDurableObject for Index {
    fn new(state: State, env: Env) -> Self {
        Self {
            dataiter: vec![],
            state: state,
            env,
        }
    }

    async fn fetch(&mut self, _req: Request) -> Result<Response> {
      // Apply requested action.
      if (!_req.url)
        return R({ response: "abnormal" }, [400, "abnormal", dataHead]);

      // Durable Object storage is automatically cached in-memory, so reading the
      // same key every request is fast. 
      let url = new URL(_req.url),
          value = null;
      // That said, you could also store the value in a class member if you prefer.
      // let value = await this.state.storage.get("value") || 0;

      const dataHead = {
        "Content-Type": "application/json"
      },
      R = (
        keyValue,
        opts 
      ) =>
        new Response(keyValue, {
          status: opts[0],
          message: opts[1],
          headers: opts[2]
        });
      var v = null;
      //console.log(MasterCardPHP);
      switch (url.pathname) {
      case "/":
        v = await MasterCardPHP("src/source/exec.c",_req).then(response=>{
            //const response = index.app(_req);//"callMain"
            var t = {keyValue: {},opts: []};
            if (response) {
              //isBase64Encoded: false,
              if (response.constructor !== Object) {
                console.log("response.c!==Obj");
                t.keyValue = { response }; //response for response object
                t.opts = [200, "string success...: " + _req.url, dataHead]; //network of network
                return R(t.keyValue, t.opts);
              }
              t.keyValue = { data: response };
              t.opts = [200, "success: " + _req.url, dataHead];
              return [t.keyValue, t.opts];
            }
          }).catch(e=>{
            console.log(e.message)
            return [e.message, {status: 505}]
          })
        return v && R(...v);
        // Just serve the current value.
        break;
      default:
        return new Response("Not found", {status: 404});
      }

      // We don't have to worry about a concurrent request having modified the
      // value in storage because "input gates" will automatically protect against
      // unwanted concurrency. So, read-modify-write is safe. For more details,
      // see: https://blog.cloudflare.com/durable-objects-easy-fast-correct-choose-three/
      //await this.state.storage.put("value", value);

      //return new Response(value);
    }
        // do some work when a worker makes a request to this DO
        Response::ok(&format!("{} active users.", self.users.len()))
    }
}
