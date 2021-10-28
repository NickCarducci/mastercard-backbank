import { terser } from 'rollup-plugin-terser'
//import commonjs from "@rollup/plugin-commonjs";
//import autoExternal from "rollup-plugin-auto-external";
//import nodeResolve from "@rollup/plugin-node-resolve";

export default {
  input: "src/shim.mjs",
  output: {
    exports: 'named',
    //name: "app",
    //strict: false,
    file: "dist/shim.mjs",
    format: "es",
    sourcemap: true
  },
  plugins: [
    //autoExternal(),
    /*commonjs({
      //include: ["node_modules/**"],
      //exclude: ["node_modules/process-es6/**"]
    }),*/
    /*nodeResolve({
      //preferBuiltins: false,
      browser: true,
      //only: [/^\.{0,2}\//],
      //extensions: [".js", ".ts"],
      //mainFields: ["module", "main"]
    }),
    terser()*/
  ]
};
