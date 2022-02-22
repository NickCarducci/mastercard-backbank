import { terser } from 'rollup-plugin-terser'
import { commonjs } from '@rollup/plugin-commonjs'
export default {
  input: "src/shim.mjs",
  output: {
    exports: 'named',
    strict: false,
    file: "dist/shim.mjs",
    format: "es",
    sourcemap: true
  },
  plugins: [
    commonjs({
     exclude: ["node_modules/**/*", "notes/**/*", "src/builders/**/*", "src/notes/**/*"],
     include: "src/**/*",
    }),
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
