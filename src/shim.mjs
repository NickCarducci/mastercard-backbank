import bundle from './index.js'
const handlers = bundle.handlers

const app = { 
  "assert": require.resolve("assert/"),
  "buffer": require.resolve("buffer/"),
  "crypto": require.resolve("crypto-browserify"),
  "http": require.resolve("stream-http"),
  "https": require.resolve("https-browserify"),
  "path": require.resolve("path-browserify"),
  "querystring": require.resolve("querystring-es3"),
  "stream": require.resolve("stream-browserify"),
  "url": require.resolve("url/"),
  "util": require.resolve("util/"),
  "zlib": require.resolve("browserify-zlib")
}

export { handlers as default }
