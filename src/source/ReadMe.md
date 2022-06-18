### Build source to enable `emcc` in command line terminals
1. Use [tip of tree](https://github.com/emscripten-core/emsdk/issues/671) "emscripten" [build](https://emscripten.org/docs/getting_started/downloads.html) or tot=latest
````
git clone https://github.com/emscripten-core/emsdk.git
cd emsdk

brew install python &&
./emsdk install tot &&
./emsdk activate tot
````
2. START [A NEW](https://github.com/emscripten-core/emscripten/issues/5696) TERMINAL
````
cd ~/Users/YOUR_NAME/YOUR_CODING/emcc_enable_folder_/emsdk &&
source ./emsdk_env.sh

## safely ignore the following when cd ~/Users/YOUR_NAME/YOUR_CODING/emcc_enable_folder_/
source "/Users/YOUR_NAME/YOUR_CODING/emcc_enable_folder_/emsdk/emsdk_env.sh"
echo 'source "/Users/YOUR_NAME/YOUR_CODING/emcc_enable_folder_/emsdk/emsdk_env.sh"' >> $HOME/.zprofile
````
Using [Emscripten 2.0.25](https://cloudflare.tv/event/5H5JZQgQZWQwYonKhekr80)

Serverless WebAssembly with Cloudflare Workers, Aired on June 1, 2022 @ 2:00 – 2:30 PM (EDT) [9 mo earlier](https://github.com/robertaboukhalil/cf-workers-emscripten/blob/main/README.md)

````
(-O2 not -02)
cd .. &&
emcc -O2 exec.c
  -o exec.js \
  -s MODULARIZE=1 \
  -s INVOKE_RUN=0 \
  -s EXPORTED_RUNTIME_METHODS=["callMain"]
````
3. changeDirectory one level up of `emcc_enable_folder_/emsdk` and *run the above command* (with the former installations && in a folder with `src/source/exec.c`, `src/source/backbank.php`) *then copy & paste* **`src/exec.js`** version of the c++ plugin.

4. Put `./backbank.wasm` in in the root outsice of `./src/source` for `iWAM.js` [instantiation](https://emscripten.org/docs/api_reference/module.html?highlight=instantiatewasm).

5. 
````
compatibility_date = "2021-10-18"
name = "mastercard-backbank-dev"
type = "javascript" # webpack
account_id = "9ddca7c9df604668fc6d14f079b2f066"
workers_dev = true #if extending default subdomain
````
> RECAP: `index.mjs` CAN use the `backbank.php` dependency

`wasm_modules={BACKBANK_WASM="./backbank.wasm"}`-`wrangler.toml`, `exec.js`-instantiable, `c` class
..., first serialized to `exec.c`

`package.json\{main: "dist/shim.mjs"}` "~/eyeball"

````
kv_namespaces = [{ binding="backbank", id="e4609a2b6fa943aab9e44185293dae3a"}]
[env.production]
name = "_"
[env.staging]
name = "_-staging"
[durable_objects]
bindings = [{ name="EXAMPLE_CLASS_DURABLE_OBJECT", class_name="DurableObjectExample"}]
[env.staging.durable_objects]
bindings = [{ name="EXAMPLE_CLASS_DURABLE_OBJECT", class_name="DurableObjectExample"}]
[env.production.durable_objects]
bindings = [{ name="EXAMPLE_CLASS_DURABLE_OBJECT", class_name="DurableObjectExample"}]
[env.preview.durable_objects]
bindings = [{ name="EXAMPLE_CLASS_DURABLE_OBJECT", class_name="DurableObjectExample"}]
[[migrations]]
tag = "v1" # initial migration
new_classes = ["DurableObjectExample"] # deleted_classes
[build.upload]
format = "modules" # "service-workers"
dir = "dist"
main = "./shim.mjs" # 'eyeball'
````
dir = 'build' folder of `~/rollup.config.js` [rollup-transformations](https://github.com/cloudflare/durable-objects-rollup-esm/blob/master/README.md) `src/shim.mjs` > `dist/shim.mjs` 

````
[build]
command = "npm install && npm run build"
[miniflare]
global_async_io = true # may or may not be required
````
