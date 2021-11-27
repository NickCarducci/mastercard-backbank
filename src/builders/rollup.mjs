import { rollup, watch } from "rollup";
import path from "path";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import nodeResolve from "@rollup/plugin-node-resolve";
import json from "@rollup/plugin-json";

const plugins = [
  nodeResolve({
      browser: true,
    only: [/^\.{0,2}\//],
    extensions: [".js"],
    mainFields: ["module", "main"]
  }),
  commonjs({
    include: ["node_modules/**"],
    exclude: ["node_modules/process-es6/**/*","notes/**/*","src/builders/**/*"]
  }),
  json(),
  terser()
];
const inputOptions = {
  input: "src/browseri.js",
  plugins
};
const output = {
  name: "Window",
  strict: false,
  file: "src/browserii.js",
  format: "umd",
  sourcemap: false
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
  console.log("G-FORCE:rollup: ", event);
  if (event.code === "BUNDLE_START") {
    //   BUNDLE_START — building an individual bundle
    //                  * event.input will be the input options object if present
    //                  * event.output contains an array of the "file" or
    //                    "dir" option values of the generated outputs
  } else if (event.code === "START") {
    //   START        — the watcher is (re)starting
  } else if (event.code === "END") {
    //   END          — finished building all bundles
    // stop watching
    watcher.close();
  } else if (event.code === "ERROR") {
    //   ERROR        — encountered an error while bundling
    //                  * event.error contains the error that was thrown
    //                  * event.result is null for build errors and contains the
    //                    bundle object for output generation errors. As with
    //                    "BUNDLE_END", you should call "event.result.close()" if
    //                    present once you are done.
  } else if (event.code === "BUNDLE_END") {
    //   BUNDLE_END   — finished building a bundle
    //                  * event.input will be the input options object if present
    //                  * event.output contains an array of the "file" or
    //                    "dir" option values of the generated outputs
    //                  * event.duration is the build duration in milliseconds
    //                  * event.result contains the bundle object that can be
    //                    used to generate additional outputs by calling
    //                    bundle.generate or bundle.write. This is especially
    //                    important when the watch.skipWrite option is used.
    //                  You should call "event.result.close()" once you are done
    //                  generating outputs, or if you do not generate outputs.
    //                  This will allow plugins to clean up resources via the
    //                  "closeBundle" hook.
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
