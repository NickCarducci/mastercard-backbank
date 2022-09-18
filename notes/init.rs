use reqwest::blocking::RequestBuilder;
use serde::Serialize;
use std::net::SocketAddr;

use crate::framework::auth::Credentials;
use crate::framework::reqwest_adaptors::match_reqwest_method;
use crate::framework::{
    apiclient::ApiClient, auth, auth::AuthClient, endpoint, response, response::map_api_response,
    Environment, HttpApiClient, HttpApiClientConfig,
};

impl HttpApiClient {
    pub fn new(
        credentials: auth::Credentials,
        config: HttpApiClientConfig,
        environment: Environment,
    ) -> anyhow::Result<HttpApiClient> {
        let mut builder = reqwest::blocking::Client::builder()
            .timeout(config.http_timeout)
            .default_headers(config.default_headers);

        if let Some(address) = config.resolve_ip {
            let url = url::Url::from(&environment);
            builder = builder.resolve(
                url.host_str()
                    .expect("Environment url should have a hostname"),
                SocketAddr::new(address, 443),
            );
        }
        let http_client = builder.build()?;

        Ok(HttpApiClient {
            environment,
            credentials,
            http_client,
        })
    }
}

// TODO: This should probably just implement request for the Reqwest client itself :)
// TODO: It should also probably be called `ReqwestApiClient` rather than `HttpApiClient`.
impl ApiClient for HttpApiClient {
    /// Synchronously send a request to the Cloudflare API.
    fn request<ResultType, QueryType, BodyType>(
        &self,
        endpoint: &dyn endpoint::Endpoint<ResultType, QueryType, BodyType>,
    ) -> response::ApiResponse<ResultType>
    where
        ResultType: response::ApiResult,
        QueryType: Serialize,
        BodyType: Serialize,
    {
        // Build the request
        let mut request = self
            .http_client
            .request(
                match_reqwest_method(endpoint.method()),
                endpoint.url(&self.environment),
            )
            .query(&endpoint.query());

        if let Some(body) = endpoint.body() {
            request = request.body(serde_json::to_string(&body).unwrap());
            request = request.header(reqwest::header::CONTENT_TYPE, endpoint.content_type());
        }

        request = request.auth(&self.credentials);

        let response = request.send()?;

        map_api_response(response)
    }
}

impl AuthClient for RequestBuilder {
    fn auth(mut self, credentials: &Credentials) -> Self {
        for (k, v) in credentials.headers() {
            self = self.header(k, v);
        }
        self
    }
}

use std::time::Duration;
#[derive(Debug, Copy, Clone, PartialEq)]
pub enum Feature {
    Sites,
}
use reqwest::header::{HeaderMap, HeaderValue, USER_AGENT};

use wrangler::install;

use cloudflare::framework::{auth::Credentials, Environment, HttpApiClientConfig};

pub fn main(user: &GlobalUser) -> Result<HttpApiClient, worker::Error> {
    fn get_user_agent(feature: Option<Feature>) -> String {
        let version = if install::target::DEBUG {
            "dev"
        } else {
            env!("CARGO_PKG_VERSION")
        };

        let mut agent = format!("wrangler/{}", version);
        if let Some(feature) = feature {
            agent.push('/');
            let feat = format!("{:?}", feature).to_lowercase();
            agent.push_str(&feat);
        }
        agent
    }
    fn headers(feature: Option<Feature>) -> HeaderMap {
        let mut headers = HeaderMap::default();
        headers.insert(
            USER_AGENT,
            HeaderValue::from_str(&get_user_agent(feature)).unwrap(),
        );
        headers
    }
    use wrangler::settings::global_user::GlobalUser;

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
