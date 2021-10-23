
import buffer from 'buffer/';
import assert from 'assert/';
import crypto from "crypto-browserify";
import http from "stream-http";
import https from "https-browserify";
import path from "path-browserify";
import querystring from "querystring-es3";
import stream from "stream-browserify";
import url from 'url/';
import util from 'util/';
import zlib from "browserify-zlib";
import {handlers} from './index.js';
import { createRequire } from 'module'
//const handlers = bundle.handlers;
//const require = createRequire(import.meta.url);
/*
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
*/

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
export { 
  handlers as default,
  assert,
  buffer,
  crypto,
  http,
  https,
  path,
  querystring,
  stream,
  url,
  util,
  zlib
}
