import { wasm } from '@rollup/plugin-wasm';

export default {
  input: "a.out.wasm",
  output: {
    //name: "default",
    exports: 'named',
    //strict: false,
    file: "src/iwam.mjs",
    format: "cjs"
  },
  plugins: [
    wasm()
  ]
};

