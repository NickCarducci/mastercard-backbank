/*import * as locs from "mastercard-locations";
import * as places from "mastercard-places";
import * as crs from "cors";*/
import { rollup, watch } from "rollup";
import path from "path";
import commonjs from "@rollup/plugin-commonjs";
//import { terser } from "rollup-plugin-terser";
import nodeResolve from "@rollup/plugin-node-resolve";
import legacy from '@rollup/plugin-legacy';
import internal from 'rollup-plugin-internal';
import autoExternal from 'rollup-plugin-auto-external';
//const locs = require("mastercard-locations");
//const places = require("mastercard-places");
//const crs = require("cors");

const plugins = [
nodeResolve({
      jsnext: true
}),
legacy({  './browserii.js': 'Window' }),
commonjs({
  // non-CommonJS modules will be ignored, but you can also
  // specifically include/exclude files
  include: ["node_modules/**"],
  exclude: ["node_modules/process-es6/**","notes/**","src/builders/**"],
  dynamicRequireTargets: [
    // include using a glob pattern (either a string or an array of strings)
    'node_modules/rollup/dist/shared/*.js',

    // exclude files that are known to not be required dynamically, this allows for better optimizations
    '!node_modules/logform/index.js',
    '!node_modules/logform/format.js',
    '!node_modules/logform/levels.js',
    '!node_modules/logform/browser.js'
  ],//https://stackoverflow.com/a/62113284/11711280

  // if true then uses of `global` won't be dealt with by this plugin
  ignoreGlobal: false, // Default: false

  // if false then skip sourceMap generation for CommonJS modules
  sourceMap: false // Default: true
}),
  autoExternal(),
internal(['cors', 'mastercard-locations', 'mastercard-places']),
//terser()
];

const output = {
//banner,footer,
name: "Window",//no default
strict: false,
file: "./browserii.js",
format: "iife",//"umd",//cannot call a namespace/no default, "Window"//"es",
sourcemap: false,
//globals:{"Window":this.storage}
};

export default {
      onwarn: (message) =>{
    if (message.code === 'UNRESOLVED_IMPORT' && message.source === 'cors') {
      throw new Error(`Could not resolved "cors" module`)
    }else 
    if (message.code === 'UNRESOLVED_IMPORT' && message.source === 'mastercard-places') {
      throw new Error(`Could not resolved "mastercard-places" module`)
    }else 
    if (message.code === 'UNRESOLVED_IMPORT' && message.source === 'mastercard-locations') {
      throw new Error(`Could not resolved "mastercard-locations" module`)
    }
  },
  inlineDynamicImports:true,
    //external: Object.keys(dependencies),
  /*manualChunks: {
    'vendor': ['mastercard-locations', 'mastercard-places', 'cors']
  },*/
  output,
  input: "./browseri.js",//[crs,places,locs],
  plugins
};
