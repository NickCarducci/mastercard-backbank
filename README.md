# mastercard-backbank

Why does VSCode not allow you to see `.wasm` as text? WebAssembly extension just translates it to `.wat`... 

https://vaults.quora.com/Can-you-boycott-credit-1

"node_version.h is [listed because the N-API version is taken from there](https://github.com/nodejs/node/blob/574ad6d89dd9db2cb7a4b449118d4f8befab9b05/Makefile#L155)
and included in config.gypi"

# [plasma-umass/browsix](https://github.com/plasma-umass/browsix)

## [Denoland_hello/rusty_v8](https://github.com/denoland/rusty_v8/blob/main/examples/hello_world.rs)

### [parity-wasm/build.rs](https://github.com/paritytech/parity-wasm/blob/master/examples/build.rs)

[push_global or FunctionBuilder](https://github.com/paritytech/parity-wasm/blob/0e9519711970b75d2c0e0a9ce0040417ba3b8a3d/src/builder/module.rs#L266)
````
// parity-wasm builder api as a method for small wasm module generation.

extern crate parity_wasm;
use std::env;
use parity_wasm::{builder, elements};

fn main() {

	let args = env::args().collect::<Vec<_>>();
	if args.len() != 2 {
		println!("Usage: {} backbank.wasm", args[0]);
		return //generated wasm module ^
	}

	let module = builder::module()
		.function()//factory
		.signature()//describe with param(arg), no return
		.with_param(elements::ValueType::I32)
		.build()
		.body()//no args, empty function
		.build()// module buildable
		.build()// wasm module
		.build();// wasm artefacts appendable empty module builder struct

	parity_wasm::serialize_to_file(&args[1], module).unwrap();// wasm serial
}
````
or rather wasm-bindgen [example](https://github.com/zebp/worker-kv/tree/master/example)
````
use js_sys::Promise;
use wasm_bindgen::prelude::*;
use worker_kv::*;

async fn list() -> Result<JsValue, KvError> {
    let kv = KvStore::create("EXAMPLE")?;
    let list_response = kv.list().limit(100).execute().await?;

    // Returns a pretty printed version of the listed key value pairs.
    serde_json::to_string_pretty(&list_response)
        .map(Into::into)
        .map_err(Into::into)
}

#[wasm_bindgen]
pub fn start() -> Promise {
    wasm_bindgen_futures::future_to_promise(async { list().await.map_err(Into::into) })
}
````
