import path from "path";
import commonjs from "@rollup/plugin-commonjs";
import autoExternal from "rollup-plugin-auto-external";
import nodeResolve from "@rollup/plugin-node-resolve";

export default {
  input: "src/index.js",
  output: {
    name: "app",
    strict: false,
    file: "dist/index.js",
    format: "iife",
    sourcemap: false
  },
  plugins: [
    autoExternal(),
    nodeResolve({
      only: [/^\.{0,2}\//],
      extensions: [".js", ".ts"],
      mainFields: ["module", "main"]
    }),
    commonjs({
      include: ["node_modules/**"],
      exclude: ["node_modules/process-es6/**"]
    })
  ]
};
