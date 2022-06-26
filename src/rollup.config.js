import { wasm } from '@rollup/plugin-wasm';

export default {
  input: "src/iWAM.mjs",
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

