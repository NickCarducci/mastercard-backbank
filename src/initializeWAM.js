import Module from "./exec.js";

// Initialize WebAssembly module
let output = "";
// By default, stdout/stderr is output to console.log/warn
export default async function MasterCardPHP () { 
  return await Module({
    wasmMemory: new WebAssembly.Memory({initial: 512}),//32MB
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
  });
}
