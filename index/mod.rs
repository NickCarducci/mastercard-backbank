/*use wrangler::{login::check_update_oauth_token, settings};
//https://github.com/cloudflare/wrangler/blob/master/src/settings/global_user.rs
//use global_user::GlobalUser;
use settings::{
  get_global_config_path,
  global_user::GlobalUser as WranglerUser,
  Environment, //, QueryEnvironment,
};
//use std::path::PathBuf;
mod user; //user.rs
*/
//use serde::Serialize;
use worker::{
  async_trait, durable_object, js_sys, wasm_bindgen, wasm_bindgen_futures, worker_sys, Env,
  Request, Response, Result, State,
};
pub use worker_sys::{console_debug, console_error, console_log, console_warn};
 
#[durable_object]
pub struct DurableObjectExample {
  app: String, //usize,//Result<Response>, //String, //Vec<u8>,
  initialized: bool,
  state: State,
  env: Env,
}

/*trait Boody {
  fn clone_dyn(&self) -> Box<dyn Boody>;
}
use serde::{Deserialize, Serialize};*/
#[derive(Serialize, Deserialize, Debug, Clone)] //https://stackoverflow.com/questions/58422438/struct-with-partial-move-errors
#[serde(rename_all = "camelCase")] //https://github.com/serde-rs/serde/issues/1435
struct Body {
  //miracle:Organ,
  page_offset: Vec<String>,
  page_length: Vec<String>,
  postal_code: Vec<String>,
}
/*impl Boody for Body {
  fn clone_dyn(&self) -> Box<dyn Boody> {
    Box::new(Body {
      page_offset: self.page_offset.clone(),
      page_length: self.page_length.clone(),
      postal_code: self.postal_code.clone(),
    })
  }
}

impl Clone for Box<dyn Boody> {
  fn clone(&self) -> Self {
    self.clone_dyn()
  }
} *///https://stackoverflow.com/questions/67251470/type-does-not-implement-copy-error-when-using-supertrait-of-copy-in-an-enum

use serde::{Deserialize, Serialize};
#[derive(Serialize, Deserialize, Debug, Clone)] //https://stackoverflow.com/questions/58422438/struct-with-partial-move-errors
#[serde(rename_all = "camelCase")] //https://github.com/serde-rs/serde/issues/1435
struct Bodi {
  page_offset: Vec<String>,
  page_length: Vec<String>,
  postal_code: Vec<String>,
}
//use async_trait::async_trait;
//#[async_trait(?Send)]
#[durable_object]
impl DurableObject for DurableObjectExample {
  fn new(state: State, env: Env) -> Self {
    //const CF_API_TOKEN: &str = CF_API_TOKEN; //"CF_API_TOKEN";env.CF_API_TOKEN
    //const CF_API_KEY: &str = CF_API_KEY; //"CF_API_KEY";
    //const CF_EMAIL: &str = CF_EMAIL; //"CF_EMAIL";

    /*use serde::{Deserialize, Serialize};
    #[derive(Clone, Debug, Deserialize, Serialize, PartialEq)]
    #[serde(untagged)]
    enum GlobalUser {
      ApiTokenAuth {
        api_token: String,
      },
      OAuthTokenAuth {
        oauth_token: String,
        refresh_token: String,
        expiration_time: String,
      },
      GlobalKeyAuth {
        email: String,
        api_key: String,
      },
    } //https://users.rust-lang.org/t/derive-default-for-enum-non-only-struct/44046
    impl Default for GlobalUser {
      fn default() -> Self {
        //Self for enum as struct
        GlobalUser::ApiTokenAuth {
          api_token: "".to_owned(),
        }
      }
    }*/

    /*static ENV_VAR_WHITELIST: [&str; 3] = [CF_API_TOKEN, CF_API_KEY, CF_EMAIL];
    fn rust_local_authentication() -> Result<WranglerUser> {
      let environment = Environment::with_whitelist(ENV_VAR_WHITELIST.to_vec());

      let config_path = get_global_config_path();
      let mut new_user = user::main(environment, config_path);

      // Check if oauth token is expired
      if let Ok(ref mut oauth_user) = new_user {
        // Let caller handle possible errors
        match check_update_oauth_token(oauth_user) {
          Ok(v) => v,
          Err(e) => (), //GlobalUser::default()
        };
      }
      new_user
    }
    rust_local_authentication();*/
    Self {
      app: "".to_string(), //0,//Response::from_json(serde_json::json!({})), //"initialapp".to_owned(), //format!(""),vec![]
      //https://www.hackertouch.com/how-to-create-and-check-string-is-empty-rust.html
      initialized: false,
      state: state,
      env,
    }
  } //https://github.com/cloudflare/durable-objects-template/issues/14
    //"Can't read from request stream after response has been sent" or just read _req (?)

  async fn fetch(&mut self, req: Request) -> Result<Response> {
    //let _state = &self.state;
    let _env = &self.env;
    let body = match req.clone()?.bytes().await {
      Ok(app) => serde_json::json!(app),
      Err(a) => {
        let g = |a| a;

        console_log!("{}", g(a));
        serde_json::json!({})
      }
    };
    console_log!("{}", body);
    //.clone();
    let bodi = match req.clone()?.json().await {
      Ok(app) => {
        let bodi: Bodi = app;
        bodi
      }
      Err(a) => {
        let g = |a| a;

        console_log!("{}", g(a));
        Bodi {
          page_offset: [""].map(String::from).to_vec(),
          page_length: [""].map(String::from).to_vec(),
          postal_code: [""].map(String::from).to_vec(),
        }
      }
    }; //.unwrap();?catch
       /*
       "Body { page_offset: \"0\", page_length: \"10\", postal_code: \"07704\"*/
    console_log!("{:?}", bodi);
    let _page_offset = bodi.page_offset;
    let _page_length = bodi.page_length;
    let _postal_code = bodi.postal_code;

    if !self.initialized {
      self.initialized = true; //serde_json::json!();::<Result<Response>>
                               //let cop = bodi.clone(); //let cop = body.clone();
      self.app = self
        .state
        .storage()
        .get("app")
        .await
        .unwrap_or(serde_json::to_string(&Body {
          page_offset: [""].map(String::from).to_vec(),
          page_length: [""].map(String::from).to_vec(),
          postal_code: [""].map(String::from).to_vec(),
        })?);
    }

    fn set(x: [&str; 2]) -> Vec<String> {
      let literally: String = x.into_iter().map(String::from).collect();
      vec![literally] //vec![literally];
    }
    let _s = set(["", ""]);

    match self
      .state
      .storage()
      .put("app", &serde_json::json!(&self.app))
      .await
    {
      Ok(app) => app,
      Err(a) => {
        let g = |a| a; //format!()
        console_log!("{}", g(a));
      }
    };
    Response::ok(&format!(
      "[durable_object]: self.app: {}", //, secret value: {}",
      serde_json::json!(&self.app)      //?.string(),
                                        //self.env.secret("SOME_SECRET")?.to_string()
    ))
    //.or_else(|err| Response::error(err.to_string(), 500));
  }
}
//unveil "did we do that"
//https://www.quora.com/unanswered/Is-ability-by-bone-marrow-transplant-without-budget-constraints-of-commerce-instead-of-capital-debenture-trusts-a-civil-right
//we suun ourselves realvelocity.asia

//schema macro !()

//short term employment not long un slave but not complain - direct and honest
//law by character waa hypo. commercoddities, no cap

//don't overuse that word, will lose its gravity/meaning/fraud

//plain english
//"concoct"

//commERCodities, no cap

//overtime change order implied

//does money increase supply bro realvelocity.asia
  //Why do they report it if they only do named, riots
  //knowledhhe
  //good and evil knowledge
  //We are humanity
  //a whole 1/3 of the country dont' care
  //overtime change order is the fraud waa hypocrisy
  //aid hurt foriegn us
  //bartender/beautician tax 
