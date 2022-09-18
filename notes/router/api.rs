mod auth;
use auth::Credentials;
use crate::settings::global_user::GlobalUser;
use cloudflare::framework::{Environment, HttpApiClient, HttpApiClientConfig};
use std::time::Duration;
use crate::http::feature::headers;
const API_MAX_PAIRS: usize = 10000;
// The consts below are halved from the API's true capacity to help avoid
// hammering it with large requests.
pub const BATCH_KEY_MAX: usize = API_MAX_PAIRS / 2;
const UPLOAD_MAX_SIZE: usize = 50 * 1024 * 1024;

// Create a special API client that has a longer timeout than usual, given that KV operations
// can be lengthy if payloads are large.
pub fn bulk_api_client(user: &GlobalUser) -> Result<HttpApiClient, failure::Error> {
    let config = HttpApiClientConfig {
        http_timeout: Duration::from_secs(5 * 60),
        default_headers: headers(None),
    };

    HttpApiClient::new(
        Credentials::from(user.to_owned()),
        config,
        Environment::Production,
    )
}