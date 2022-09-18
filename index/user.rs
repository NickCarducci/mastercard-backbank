/*
fn from_config(config: config::Config) -> Result<WranglerUser> {
    // Get all the possible authentication methods
    let api_token = config.get_str("api_token");
    let oauth_token = config.get_str("oauth_token");
    let email = config.get_str("email");
    let api_key = config.get_str("api_key");
    let refresh_token = config.get_str("refresh_token");
    let expiration_time = config.get_str("expiration_time");

    // The only cases that are not allowed are:
    //      1) (partial or complete) OAuth token + API token
    //      2) (partial or complete) OAuth token + Global API key (partial or complete)
    //      3) Invalid authentication methods (e.g. partial Oauth token, partial Global API key, and empty configuration file + no environment variables)
    // API token has priority over global API key both in environment variables and in configuration file
    if (api_token.is_ok()
        && (oauth_token.is_ok() || refresh_token.is_ok() || expiration_time.is_ok()))
        || ((oauth_token.is_ok() || refresh_token.is_ok() || expiration_time.is_ok())
            && (email.is_ok() || api_key.is_ok()))
    {
        let error_info = "\nMore than one authentication method (e.g. API token and OAuth token, or OAuth token and Global API key) has been found in the configuration file. Please use only one.";
        let wrangler_logout_msg = styles::highlight("`wrangler logout`");
        let config_path = get_global_config_path();
        let more_info = format!("{}\nIf you'd like to edit the configuration file, it can be found at {}. Consider also running {} to clean up the configuration file.", error_info, config_path.to_str().unwrap(), wrangler_logout_msg);

        show_config_err_info(Some(more_info), config)
    } else if let Ok(api_token) = api_token {
        Ok(WranglerUser::ApiTokenAuth { api_token })
    } else if let (Ok(email), Ok(api_key)) = (email, api_key) {
        Ok(WranglerUser::GlobalKeyAuth { email, api_key })
    } else if let (Ok(oauth_token), Ok(refresh_token), Ok(expiration_time)) =
        (oauth_token, refresh_token, expiration_time)
    {
        Ok(WranglerUser::OAuthTokenAuth {
            oauth_token,
            refresh_token,
            expiration_time,
        })
    } else {
        // Empty configuration file and no environment variables, or missing variable for global API key
        let error_info = "\nNo (valid) authentication method has been found.";
        show_config_err_info(Some(error_info.to_string()), config)
    }
}
fn from_env<T: 'static + QueryEnvironment>(environment: T) -> Option<Result<WranglerUser>>
where
    T: config::Source + Send + Sync,
{
    // if there's some problem with gathering the environment,
    // or if there are no relevant environment variables set,
    // fall back to config file.
    if environment.empty().unwrap_or(true) {
        None
    } else {
        let mut s = config::Config::new();
        s.merge(environment).ok();

        Some(from_config(s))
    }
}
fn from_file(config_path: PathBuf) -> Result<WranglerUser> {
    let mut s = config::Config::new();

    let config_str = config_path
        .to_str()
        .expect("global config path should be a string");

    // Skip reading global config if non existent
    // because envs might be provided
    if config_path.exists() {
        log::info!(
            "Config path exists. Reading from config file, {}",
            config_str
        );

        match s.merge(config::File::with_name(config_str)) {
            Ok(_) => (),
            Err(_) => {
                let error_info = "\nFailed to read information from configuration file.";
                return show_config_err_info(Some(error_info.to_string()), s);
            }
        }
    } else {
        anyhow::bail!(
            "config path does not exist {}. Try running `wrangler login` or `wrangler config`",
            config_str
        );
    }
    from_config(s)
}

//https://github.com/cloudflare/wrangler/blob/master/Cargo.toml
//let config_path = get_global_config_path();
fn show_config_err_info(
    info: Option<std::string::String>,
    config: config::Config,
) -> Result<WranglerUser> {
    let wrangler_login_msg = styles::highlight("`wrangler login`");
    let wrangler_config_msg = styles::highlight("`wrangler config`");
    let vars_msg = styles::url("https://developers.cloudflare.com/workers/tooling/wrangler/configuration/#using-environment-variables");
    let additional_info = match info {
        Some(text) => text,
        None => "".to_string(),
    };

    let msg = format!(
            "{} Your authentication details are improperly configured.{}\nPlease run {}, {}, or visit\n{}\nfor info on configuring with environment variables",
            emoji::WARN,
            additional_info,
            wrangler_login_msg,
            wrangler_config_msg,
            vars_msg
        );

    log::info!("{:?}", config);
    anyhow::bail!(msg)
}
use settings::{get_global_config_path, global_user::GlobalUser as WranglerUser, QueryEnvironment};
use std::path::PathBuf;
use terminal::{emoji, styles};
use worker::Result;
use wrangler::{settings, terminal};
//use std::path::PathBuf;
//let config = config::Config::new();
//https://github.com/cloudflare/wrangler/blob/acfa2dd9e97dcd914235e88ca2bceb212be4b10d/src/settings/global_user.rs#L136
pub fn main<T: 'static + QueryEnvironment>(
    environment: T,
    config_path: PathBuf,
) -> Result<WranglerUser>
where
    T: config::Source + Send + Sync,
{
    if let Some(user) = from_env(environment) {
        user
    } else {
        from_file(config_path)
    }
}
*/
