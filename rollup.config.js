import { terser } from 'rollup-plugin-terser'
import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
//import nodePolyfills from 'rollup-plugin-polyfill-node';

export default {
  inlineDynamicImports:true,
  input: "src/shim.mjs",
  output: {
    exports: 'named',
    //name: "app",
    strict: false,
    file: "dist/shim.mjs",
    format: "es",
    sourcemap: true
  },
  plugins: [commonjs(),/*nodePolyfills(),*/nodeResolve({browser: true,}),terser()]
};
