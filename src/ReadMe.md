### Build source to enable `emcc` in command line terminals

git clone https://github.com/emscripten-core/emsdk.git
cd emsdk

brew install python
./emsdk install latest
./emsdk activate latest

source "/Users/YOUR_NAME/YOUR_CODING/emcc_enable_folder_/emsdk/emsdk_env.sh"
echo 'source "/Users/YOUR_NAME/YOUR_CODING/emcc_enable_folder_/emsdk/emsdk_env.sh"' >> $HOME/.zprofile

#### Using Emscripten 2.0.25 https://cloudflare.tv/event/5H5JZQgQZWQwYonKhekr80
#### Serverless WebAssembly with Cloudflare Workers, Aired on June 1, 2022 @ 2:00 – 2:30 PM (EDT)

emcc -02 exec.c
  -o index.mjs \
  -s MODULARIZE=1 \
  -s INVOKE_RUN=0 \
  -s EXPORTED_RUNTIME_METHODS=["callMain"]
