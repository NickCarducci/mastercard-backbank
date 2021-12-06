import locs from "mastercard-locations";
import places from "mastercard-places";
import crs from "cors";
import { rollup, watch } from "rollup";
import path from "path";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import nodeResolve from "@rollup/plugin-node-resolve";
import legacy from '@rollup/plugin-legacy';
//import { generate } from 'astring';
import multiInput from 'rollup-plugin-multi-input';

const presets = [
[
  "@babel/preset-env",
  {
    targets: 'defaults',
    //"esmodules": true,
    modules: "auto"
  }
],
//"@babel/preset-react"
];
const plugins = [
multiInput(),
nodeResolve({
  browser: true
}),
/*legacy({  'src/browserii.js': 'Window' }),
commonjs({
  include: ["node_modules/**"],
  exclude: ["node_modules/process-es6/**","notes/**","src/builders/**"]
}),*/
terser()
];
/*const inputOptions = {
//external: ['cors', 'mastercard-locations','mastercard-places'],
input: "src/browseri.js",//[cors,places,locs],
plugins
};*/
const output = {
//banner,footer,
name: "Window",
strict: false,
file: "src/browserii.js",
format: "es",//"umd"
sourcemap: false,
//globals:{"Window":this.storage
};

export default {
  //inlineDynamicImports:true,
    //external: Object.keys(dependencies),
  manualChunks: {
    'vendor': ['mastercard-locations', 'mastercard-places', 'cors']
  },
  output,
  input: [crs,places,locs],//"src/browseri.js",
  plugins
};

/*
const watchOptions = {
...inputOptions,
output: [output],
watch: {
  buildDelay: 5000,
  chokidar: {},
  clearScreen: true,
  skipWrite: false,
  exclude: ["node_modules/** /*","notes/** /*","src/builders/** /*"],
  include: "src/** /*"
}
};
console.log("PLUGINS PASSED");
const watcher = watch(watchOptions);
console.log("WATCHER INITIALIZED");
watcher.on("event", (event) => {
//event.result.cache.modules.ast.sourceType = "module"
//const ast = event.result.cache.modules.ast//.body

//const esm = generate(ast)
//this.el.storage.put("esm", JSON.stringify(esm)) 

console.log("G-FORCE:rollup: ", JSON.stringify(event));
if (event.code === "BUNDLE_START") {
} else if (event.code === "START") {
  //   START        — the watcher is (re)starting
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
.catch((err) => console.log("rollup.rollup error", err.message));*/
