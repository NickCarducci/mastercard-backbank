import bundle from './index.js';
import { createRequire } from 'module'
const handlers = bundle.handlers;;
const require = createRequire(import.meta.url);
const buffer = require('buffer/');
const assert = require('assert/');
const crypto = require("crypto-browserify");
const http = require("stream-http");
const https = require("https-browserify");
const path = require("path-browserify");
const querystring = require("querystring-es3");
const stream = require("stream-browserify");
const url = require('url/');
const util = require('util/');
const zlib = require("browserify-zlib");

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

/*export class Stripe {
    checkout: typeof checkout

    constructor(
        stripe_secret: string,
        params?: {
            apiVersion?: string
            fetch?: Function
            userAgent?: string
        },
    ) {
        let client = new HTTPClient(
            stripe_secret,
            params?.apiVersion,
            params?.userAgent,
            params?.fetch,
        )

        this.checkout = checkout
        this.checkout.client = client.request
    }
}*/
export { handlers as default,
  assert: require.resolve("assert/"),
  buffer: require.resolve("buffer/"),
  crypto: require.resolve("crypto-browserify"),
  http: require.resolve("stream-http"),
  https: require.resolve("https-browserify"),
  path: require.resolve("path-browserify"),
  querystring: require.resolve("querystring-es3"),
  stream: require.resolve("stream-browserify"),
  url: require.resolve("url/"),
  util: require.resolve("util/"),
  zlib: require.resolve("browserify-zlib") }
