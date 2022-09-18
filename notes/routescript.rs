
use wrangler::settings::global_user::GlobalUser;

use crate::blockingshim::{blockingapi,HttpApiClient};
//use HttpApiClient; //pub (crate) mod lib;

//private
//use wrangler::http::feature::headers;
const API_MAX_PAIRS: usize = 10000;
// The consts below are halved from the API's true capacity to help avoid
// hammering it with large requests.
pub const BATCH_KEY_MAX: usize = API_MAX_PAIRS / 2;
const UPLOAD_MAX_SIZE: usize = 50 * 1024 * 1024;

// Create a special API client that has a longer timeout than usual, given that KV operations
// can be lengthy if payloads are large. routescript = "bulk_api_client"
pub fn routescript(user: &GlobalUser) -> Result<HttpApiClient, worker::Error> {
    blockingapi(user)
}
//"bless soul"
