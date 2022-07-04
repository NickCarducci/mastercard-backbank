import { wasm } from '@rollup/plugin-wasm';

export default {
  input: "exec.js",
  output: {
    //name: "default",
    exports: 'named',
    //strict: false,
    file: "exec.mjs",
    format: "es"
  },
  plugins: [
    wasm()
  ]
};

