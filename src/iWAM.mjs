import Module from "./exec.js";

// Initialize WebAssembly module
let output = "";
// By default, stdout/stderr is output to console.log/warn
export default async function MasterCardPHP (request) { 
  //fetch the final return/arrow, 'this-deepest-function'
  return await fetch('a.out.wasm').then(response =>
    response.arrayBuffer()//WebAssembly.instantiateStreaming(fetch('a.out.wasm'), importObject)
  ).then(bufferSource => {
    if(!WebAssembly.validate(bufferSource)) throw {name:"not bufferable",message: "cloudflare workers buffers array 'in-house'"}
    console.log("the buffer is WAM binary, fetch() return param arrayBuffer()=initiateStreaming()");
    return new WebAssembly.Instance(BACKBANK_WASM,imports).exports;
  })
  .catch( async err => {
    console.log("the source is not a bufferable 'WAM binary', Instance with the emcc out[-file] .js helper");
    return await Module({
        locateFile: function(path, prefix) {
          let url = new URL(request.url);
          //if (path.endsWith(".mem")) // if it's a mem init file, use a custom dir
            //return "https://mycdn.com/memory-init-dir/" + path;
          return /*prefix*/url + path;// otherwise, use the default, the prefix (JS file's dir) + the path
        },
        //{env:{ memory: new WebAssembly.Memory({initial: 512}) }},//32MB wasmMemory
        print: text => output += `${text}\n`,
        printErr: text => output += `${text}\n`,// Instead of downloading the .wasm file, fetch it from a global var
        instantiateWasm: (imports, callback) => {
          //resource-binding-UI/API.
          const inst = new WebAssembly//https://cloudflare.tv/event/5H5JZQgQZWQwYonKhekr80 7-9'
                        //wrangler.toml\(wasm_modules={BACKBANK_WASM="./backbank.wasm"};)
                        .Instance(BACKBANK_WASM,imports);
          callback(inst);
          return inst.exports;
        }
      }).then(module=>{
        return {
          app: module.ccall("index", null/*return type*/, [null]/*argument types*/, request/*arguments*/, {async:"true"})
        }
      });//'null' == object return/argument type "since the beginning of javascript" - MDN typeof
  });
}
