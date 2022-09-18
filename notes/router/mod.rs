//excusi implies acquittal but for separate publishment


use serde::Deserialize;
/// Workers KV Route
/// Routes are basic patterns used to enable or disable workers that match requests.
/// https://api.cloudflare.com/#worker-routes-properties
#[derive(Deserialize, Serialize, Debug, Clone, PartialEq, Eq)]
pub struct WorkersRoute {
    /// Namespace identifier tag.
    pub id: String,
    /// The basic pattern that should map to the script
    pub pattern: String,
    /// Name of the script to apply when the route is matched.
    /// The route is skipped when this is blank/missing.
    pub script: Option<String>,
}

use serde::de::DeserializeOwned;
use std::fmt::Debug;
trait ApiResult: DeserializeOwned + Debug {}
impl ApiResult for WorkersRoute {}
impl ApiResult for Vec<WorkersRoute> {}

/// A variant of WorkersRoute returned by the CreateRoute endpoint
/// We could make `pattern` and `script` into `Option<String>` types
/// but it feels wrong.
#[derive(Deserialize, Serialize, Debug, Clone, PartialEq, Eq)]
pub struct WorkersRouteIdOnly {
    /// Namespace identifier tag.
    pub id: String,
}

impl ApiResult for WorkersRouteIdOnly {}
//https://github.com/cloudflare/cloudflare-rs/search?q=ApiResult
//Endpoint by Workers Route Id Only - ApiResult is not enough

//"prosper, ...be merry"
//do not defile yourself in the name of G-d for that is chutspah but not abrogation for contextual positioning
// and not that for winning but hypocrisy
//it's in the name

//https://github.com/cloudflare/cloudflare-rs/blob/master/cloudflare/src/endpoints/workers/list_routes.rs
//use super::WorkersRoute;

//use crate::framework::endpoint::{Endpoint, Method};
//https://github.com/cloudflare/cloudflare-rs/blob/master/cloudflare/src/framework/endpoint.rs

//use crate::framework::Environment;
//https://github.com/cloudflare/cloudflare-rs/blob/master/cloudflare/src/framework/mod.rs
#[derive(Debug)]
pub enum Environment {
    Production,
    Custom(url::Url),
}

impl<'a> From<&'a Environment> for url::Url {
    fn from(environment: &Environment) -> Self {
        match environment {
            Environment::Production => {
                url::Url::parse("https://api.cloudflare.com/client/v4/").unwrap()
            }
            Environment::Custom(url) => url.clone(),
        }
    }
}
use serde::Serialize;
use url::Url;

pub enum Method {
    Get,
    Post,
    Put,
    Delete,
    Patch,
}

pub trait Endpoint<ResultType = (), QueryType = (), BodyType = ()>
where
    ResultType: ApiResult,
    QueryType: Serialize,
    BodyType: Serialize,
{
    fn method(&self) -> Method;
    fn path(&self) -> String;
    fn query(&self) -> Option<QueryType> {
        None
    }
    fn body(&self) -> Option<BodyType> {
        None
    }
    fn url(&self, environment: &Environment) -> Url {
        Url::from(environment).join(&self.path()).unwrap()
    }
    fn content_type(&self) -> String {
        "application/json".to_owned()
    }
}
//wealth of non voters?

/// List Routes
/// Lists all route mappings for a given zone
/// https://api.cloudflare.com/#worker-routes-list-routes
#[derive(Debug)]
pub struct ListRoutes<'a> {
    pub zone_identifier: &'a str,
}

impl<'a> Endpoint<Vec<WorkersRoute>> for ListRoutes<'a> {
    fn method(&self) -> Method {
        Method::Get
    }
    fn path(&self) -> String {
        format!("zones/{}/workers/routes", self.zone_identifier)
    }
}