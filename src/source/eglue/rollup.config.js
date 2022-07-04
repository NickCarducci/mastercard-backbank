import { wasm } from '@rollup/plugin-wasm';
/*import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import nodePolyfills from 'rollup-plugin-polyfill-node';*/

export default {
  input: ".",
  output: {
    //name: "default",
    exports: 'named',
    //strict: false,
    file: "src/exec.mjs",
    format: "es"
  },
  plugins: [
    /*nodePolyfills(),
    commonjs({}),
    nodeResolve({
      exportConditions: ['browser', 'worker'],
      browser:true
    })*/
    wasm()
  ]
};

