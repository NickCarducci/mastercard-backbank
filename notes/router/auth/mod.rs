#[derive(Clone, Debug)]
pub enum Credentials {
    UserAuthKey { email: String, key: String },
    UserAuthToken { token: String },
    Service { key: String },
}

impl Credentials {
    pub fn headers(&self) -> Vec<(&'static str, String)> {
        match self {
            Self::UserAuthKey { email, key } => {
                vec![("X-Auth-Email", email.clone()), ("X-Auth-Key", key.clone())]
            }
            Self::UserAuthToken { token } => {
                vec![("Authorization", format!("Bearer {}", token.clone()))]
            }
            Self::Service { key } => vec![("X-Auth-User-Service-Key", key.clone())],
        }
    }
}

pub trait AuthClient {
    fn auth(self, credentials: &Credentials) -> Self;
}

//fair game is community oddity 
//bourgoise committee 
//implausible use leases

//analyzing calsulus by declared insignificance

//salt is money declarations... not sour lemony
//acidic not sodium
//open docket. if you cannot desist you must acquit!

//democracy requires direct and honest factions play irv/rcv to lose

//take the trash out of governent all you have is cops. 
//velocity of commodity without capital or capital less commodity velocitys

//youtube paid advertisers no cookies' abstract usernames