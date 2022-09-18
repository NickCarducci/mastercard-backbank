Try override set stable with rust-toolchain.toml set to nightly

````
scripts:{
...
    "course": "npm run bcargo && npm run bwasm",
    "bcargo": "cd eglue && cargo install cargo-expand && cargo build --target wasm32-unknown-unknown -Zbuild-std",
    "bcargo1": "cd eglue && cargo install cargo-expand && rustup override set stable && cargo build && cargo expand --lib lib",
   
````