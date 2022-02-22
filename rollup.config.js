import { terser } from 'rollup-plugin-terser'
import { nodeResolve } from '@rollup/plugin-node-resolve'

export default {
  input: "src/shim.mjs",
  output: {
    format: "es",
    sourcemap: true,
    strict: false,
    file: "dist/shim", 
    exports: 'named'//name: "app",mjs"
  },
  plugins: [
    nodeResolve({browser: true,}),
    terser()
  ]
};

/*
const exportType = moduleId=>{
  return {//export as sourceMap<Object> or Promise?
    "src/index.mjs": "function"
  }
}...{
  output: {
    format: "es",
    name: "app"
  },
  manualChunks: {
    'vendor': ['mastercard-locations', 'mastercard-places', 'cors']
  },
  inlineDynamicImports: true,
  external: Object.keys(dependencies),//import { dependencies } from './package.json';
  plugins: [
    cjs({exportType,nested: true}),
    nodePolyfills(), //nodeResolve({browser: true,}),
    commonjs({transformMixedEsModules:true,include: 'node_modules/**'}),
    legacy({  'browserii.js': 'Window' }),
  ]
}*/
