import { wasm } from '@rollup/plugin-wasm';

export default {
  input: "iWAM.mjs",
  output: {
    //name: "default",
    exports: 'named',
    //strict: false,
    file: "iwam.mjs",
    format: "cjs"
  },
  plugins: [
    wasm()
  ]
};

