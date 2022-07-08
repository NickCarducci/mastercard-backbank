mod bupkis;
use crate::bupkis::{jsfuture,arguments};
use crate::jfmast;

struct Number(u8);//vec![0]
//see `../bumkis/null.rs` `src/source/eglue/bumkis/null.rs` for potential `ident` example
macro_rules! arguments {
    ($($args:expr),*) => {{
        $(
           jfmast( &arguments(Number(0)) );
        )*
    }}
}

fn main() -> arguments!(1, 2, "Hello");
//https://stackoverflow.com/a/57454769/11711280

//fn main () -> jfmast( &arguments(Number(0)) );
