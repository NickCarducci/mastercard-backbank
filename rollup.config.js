import { terser } from 'rollup-plugin-terser'
//import nodeResolve from "@rollup/plugin-node-resolve";
import { dependencies } from './package.json';

const exportType = moduleId=>{
  return {//export as sourceMap<Object> or Promise?
    "src/index.mjs": "function"
  }
}

export default {
  input: "src/shim.mjs",
  output: {
    exports: 'named',
    //name: "app",
    strict: false,
    file: "dist/shim.mjs",
    format: "es",
    sourcemap: true
  },
  plugins: [
    //nodeResolve({browser: true,}),
    terser()
  ]
};

/*
manualChunks: {
  'vendor': ['mastercard-locations', 'mastercard-places', 'cors']
},
inlineDynamicImports: true,
external: Object.keys(dependencies),
plugins: [cjs({exportType,nested: true}),
  nodePolyfills(),
  commonjs({transformMixedEsModules:true,include: 'node_modules/**'}),
  legacy({  'browserii.js': 'Window' }),
]
*/
