//import Module from "./exec.js";
import FSA from "./fileserve.js";
//import FSA from "../a.out.wasm";
import { rollup, watch } from "rollup";
import path from "path";
import { wasm } from '@rollup/plugin-wasm';//import { babel } from "@rollup/plugin-babel";

const inputOptions = {
  //external: ['cors', 'mastercard-locations','mastercard-places'],
  input: "a.out.wasm",
  plugins:[
    wasm()
    /*babel({
      babelHelpers: "bundled",
      presets:[["@babel/preset-env",{ targets: 'defaults', modules: "auto",}]],
        //{"esmodules": true};"@babel/preset-react"
      exclude: "node_modules/**" // only transpile our source code
    })*/
  ]
};
const output = {
  name: "Window",//banner,footer,
  //strict: false,
  file: "src/backbank.mjs",
  format: "es",
  sourcemap: false,
  //globals:{"Window":this.storage
};
const watchOptions = {
  ...inputOptions,
  output: [output],
  watch: {
    buildDelay: 5000,
    chokidar: {},
    clearScreen: true,
    skipWrite: false,
    exclude: ["node_modules/**/*","notes/**/*","src/builders/**/*","src/notes/**/*"],
    include: "**/**"
  }
};
console.log("PLUGINS PASSED");
const watcher = watch(watchOptions);
console.log("WATCHER INITIALIZED");
watcher.on("event", (event) => {
  console.log("G-FORCE:rollup: ", JSON.stringify(event));
  if (event.code === "BUNDLE_START") {
  } else if (event.code === "START") {
  } else if (event.code === "END") {
    watcher.close();
  } else if (event.code === "ERROR") {
  } else if (event.code === "BUNDLE_END") {
  }
  if (event.result) {
    event.result.close();
  }
});

rollup(inputOptions)
  .then(async (bundle) => {
    await bundle.write(output);
  })
  .catch((err) => console.log("rollup.rollup error", err.message));


// Initialize WebAssembly module
let output = "";
// By default, stdout/stderr is output to console.log/warn
export default async function MasterCardPHP(request) {
  async function app() {
    //var asmArg = { __asyncjs__openXML: () => FSA({ startIn: "src/backbank.mjs" }) };
    //const info = { env: asmArg, wasi_snapshot_preview1: asmArg }; //asmLibraryArg
    //fetch the final return/arrow, 'this-deepest-function'
    return await WebAssembly.instantiateStreaming(fetch("src/backbank.mjs")
      //info /*fetch('a.out.wasm')*/ /*await fetch('a.out.wasm').then(response =>
        //response.arrayBuffer()//WebAssembly.instantiateStreaming(fetch('a.out.wasm'), importObject)*/
    )
      .then((bufferSource) => {
        if (!WebAssembly.validate(bufferSource))
          throw {
            name: "not bufferable",
            message: "cloudflare workers buffers array 'in-house'"
          };
        console.log(
          "the buffer is WAM binary: fetch(), return param arrayBuffer()=initiateStreaming()"
        );
        return WebAssembly.instantiate(bufferSource, arguments).instance
          .exports;
      })
      .catch(async (err) => {
        console.log(
          "the source is not a bufferable 'WAM binary': should then be already instantiable thru" +
            " 'new WebAssembly.Instance.exports' emcc out[-file] ['exec'].js"
        );
        if (!WebAssembly.validate(this))
          return console.log({
            name: "not bufferable",
            message: "instantiable already-buffered by cf workers"
          });
        return await new WebAssembly.Instance(this, arguments).exports; //callback(inst);
      });
  }
  return app.apply(BACKBANK_WASM, request);
  //if (Module["instantiateWasm"]) {}

  /*return await Module({
        locateFile: function(path, prefix) { // if (path.endsWith(".mem")) return "https://mycdn.com/memory-init-dir/" + path
          let url = new URL(request.url); // if it's a mem init file, return custom dir
          return /*prefix* /url + path;// (default) prefix dir + path
        },
        //{env:{ memory: new WebAssembly.Memory({initial: 512}) }},//32MB wasmMemory
        print: text => output += `${text}\n`,
        printErr: text => output += `${text}\n`,// Instead of downloading the .wasm file, fetch it from a global var
        instantiateWasm: (imports, callback) => {
          if(!WebAssembly.validate(BACKBANK_WASM)) return console.log({name:"not bufferable",message: "instantiable already-buffered by cf workers"});
          const inst = new WebAssembly//https://cloudflare.tv/event/5H5JZQgQZWQwYonKhekr80 7-9'
                        //wrangler.toml\(wasm_modules={BACKBANK_WASM="./backbank.wasm"};)
                        .Instance(BACKBANK_WASM,imports);//resource-binding-UI/API.
          callback(inst);
          return inst.exports;
        }
      }).then(module=>{
        return {
          app: module.ccall("index", null/*return type* /, [null]/*argument types* /, request/*arguments* /, {async:"true"})
        }
      }).catch(err=>console.log(err.message));//'null' == object return/argument type "since the beginning of javascript" - MDN typeof
      
  });*/
}
