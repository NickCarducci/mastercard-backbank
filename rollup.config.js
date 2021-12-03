import { terser } from 'rollup-plugin-terser'
import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import cjs from "rollup-plugin-cjs-es";
//nodePolyfills() => -assert node_modules/resolve/lib/core.json (2:9)
/*1: {
2:   "assert": true,
             ^
3:   "assert/strict": ">= 15",
  +builtin  node_modules/globals/globals.json (2:10)
15
1: {
16
2:   "builtin": {*/

import nodePolyfills from 'rollup-plugin-polyfill-node';
import legacy from '@rollup/plugin-legacy';
import { dependencies } from './package.json';

const exportType = moduleId=>{
  
  
  return {//export as sourceMap<Object> or Promise?
    "src/index.mjs": "function"
  }
    
}

export default {
  //inlineDynamicImports:true,
  input: "src/shim.mjs",
    external: Object.keys(dependencies),
  output: {
    exports: 'named',
    //name: "app",
    strict: false,
    file: "dist/shim.mjs",
    format: "es",
    sourcemap: true
  },
  plugins: [
    cjs({exportType,
      nested: true
    }),
  legacy({  'browserii.js': 'Window' }),
    commonjs({include: 'node_modules/**'}),nodePolyfills(),nodeResolve({browser: true,}),terser()]
};
