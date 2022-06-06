import { terser } from 'rollup-plugin-terser'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
export default {
  input: "src/index.mjs",
  output: {
    exports: 'named',
    //strict: false,
    file: "index.mjs",
    format: "umd",//es
    sourcemap: true
  },
  plugins: [
    commonjs({
      /*
      depreciated, done automatically, not the problem!
      namedExports: {
        'node_modules/picomatch/index.js': ['pm']
      },*/
     //exclude: ["node_modules/**/*", "notes/**/*", "src/notes/**/*"],
     //include: "src/**/*",
    }),
    nodeResolve({browser:true}),
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
