//exports, and imports, at the same time!
//import * as Read from "./index.mjs";
//const Require = { ...Read };
export { DurableObjectExample } from "./index.mjs";
export { Require } from "./require.mjs";

export default {
  async fetch(request, env /*, ctx*/) {
    //Response class must be a promise
    try {
      return await noException(request, env);
      // wrap the body of your callback in a try/catch block to ensure it cannot throw an exception.
      // is return, "the body?"
    } catch (e) {
      return new Response(e.message);
    }
  }
};
async function noException(req, env) {
  // key => Object ID; return new Response(JSON.stringify(backbank));
  // boot instance, if necessary //https://<worker-name>.<your-namespace>.workers.dev/
  //https://linc.sh/blog/durable-objects-in-production
  //const clientId = request.headers.get("cf-connecting-ip");
  const path = new URL(req.url).pathname,
    Backbank = env.EXAMPLE_CLASS_DURABLE_OBJECT.idFromName(path),
    instance = env.EXAMPLE_CLASS_DURABLE_OBJECT.get(Backbank);
  //Require = env.REQUIRE_CLASS_DURABLE_OBJECT.idFromName(path);
  //env.instanceR = env.REQUIRE_CLASS_DURABLE_OBJECT.get(Require);

  return (
    instance &&
    //env.instanceR &&
    instance
      .fetch(req, Object.assign(env)) // Forward the current HTTP request to it
      .then(async (res) => await res.json())
      .then((r) => {
        /*return new Response(`{
        ok: true,
        data: ${r}
    }`);*/
        const dataHead = {
            "Content-Type": "application/json"
          },
          responseobject = (key, r, ok) => `{${key}: ${r}, ${ok}}`;

        return !r
          ? new Response(responseobject("data", {}), {
              status: "no response from durable object chain",
              message: "",
              headers: dataHead
            })
          : !r.data
          ? new Response(responseobject("response", JSON.stringify(r)), {
              status: r.status,
              message: r.statusText ? r.statusText : r.message,
              headers: dataHead
            })
          : new Response(responseobject(true, JSON.stringify(r.data), true), {
              status: "200",
              message: "success: " + req.url,
              headers: dataHead
            });
      })
  );
  //new Response({})
}
//new instance class fetch waits without await
//Non-Durable-Object-Worker protocol:
// Send a non-blocking POST request.
// ~> Completes before the Worker exits.
/*ctx.waitUntil(
  fetch('https://.../logs', {
    method: 'POST',
    body: JSON.stringify({
      url: req.url,
      // ...
    })
  })
);*/

/*import buffer from 'buffer/';
import assert from 'assert/';
import crypto from "crypto-browserify";
import http from "stream-http";
import https from "https-browserify";
import path from "path-browserify";
import querystring from "querystring-es3";
import stream from "stream-browserify";
import url from 'url/';
import util from 'util/';
import zlib from "browserify-zlib";*/
//import { createRequire } from 'module'
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
//var work = require('webworkify');
//var worker = work(handlers);//require('./worker.js')
/*w.addEventListener('message', function (ev) {
    console.log(ev.data);
});*/
//w.postMessage(4); // send the worker a message
/*export { 
  DurableObjectExample as default,
  /*assert,
  buffer,
  crypto,
  http,
  https,
  path,
  querystring,
  stream,
  url,
  util,
  zlib*
}*/
