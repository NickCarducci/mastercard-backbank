### Build source to enable `emcc` in command line terminals

git clone https://github.com/emscripten-core/emsdk.git
cd emsdk

brew install python
./emsdk install latest
./emsdk activate latest

source "/Users/YOUR_NAME/YOUR_CODING/emcc_enable_folder_/emsdk/emsdk_env.sh"
echo 'source "/Users/YOUR_NAME/YOUR_CODING/emcc_enable_folder_/emsdk/emsdk_env.sh"' >> $HOME/.zprofile

