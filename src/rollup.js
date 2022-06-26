import { rollup, watch } from "rollup";
import path from "path";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import nodeResolve from "@rollup/plugin-node-resolve";
import json from "@rollup/plugin-json";
import { babel } from "@rollup/plugin-babel";
import legacy from '@rollup/plugin-legacy';
import replace from '@rollup/plugin-replace';

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
    replace({ 
      include: './src/browseri.js',
      values: {//https://stackoverflow.com/questions/40568580/rollup-js-how-import-a-js-file-not-es6-module-without-any-change-myvarextras
        'module.exports =': 'export default'
      }//like banner, footer
    }),
  nodeResolve({
    browser: true,
    only: [/^\.{0,2}\//],
    extensions: [".js"],
    mainFields: ["module", "main"]
  }),
  legacy({  'browserii.js': 'Window' }),
  commonjs({
    include: ["node_modules/**"],
    exclude: ["node_modules/process-es6/**/*","notes/**/*","src/builders/**/*"]
  }),
  babel({
    babelHelpers: "bundled",
    presets,
    exclude: "node_modules/**" // only transpile our source code
  }),
  json(),
  terser()
];
const inputOptions = {
  external: ['cors', 'mastercard-locations','mastercard-places'],
  input: "src/browseri.js",
  plugins
};
const output = {
  //banner,footer,
  name: "Window",
  strict: false,
  file: "src/browserii.js",
  format: "iife",
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
    exclude: ["node_modules/**/*","notes/**/*","src/builders/**/*"],
    include: "src/**/*"
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
  
