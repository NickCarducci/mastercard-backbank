import Dependency /*, { defineables, SETDEFINABLES }*/ from "./dependency.js";
import { dr, iifeapp, mk, nameToUrl, normalize, reduce } from "./functions";

const _S = Object.prototype.toString,
  _H = "hasOwnProperty",
  createElement = (ns) =>
    document[`createElementNS${ns ? "NS" : ""}`](
      ns ? ("http://www.w3.org/1999/xhtml", "html:script") : "script"
    ),
  _oE = "onError",
  _e = "error",
  _em = "emit",
  _ev = "events";
export const KeyValue = (key, value, delet) =>
    delet === "delete" ? delete buildable[key] : (buildable[key] = value),
  SETSTATE = (STAT) => (buildable = STAT),
  e_ = (obj /*,string*/) => {
    /* !obj && console.log(obj + " error obj in ", thi);*/
    const n = (NS) => NS.constructor === "String" && NS.toUpperCase() === "NS",
      yes = (name) => obj[_H](name) /*[_P]*/,
      string = () => _S(obj),
      tag = (ind) => document.getElementsByTagName(obj ? obj : "script")[ind];
    return {
      yes,
      reducer: (prop, nextProp) => {
        const go =
          obj[3] &&
          T(obj[0][prop] === "object") &&
          obj[0][prop] &&
          !e_(obj[0][prop]).a() &&
          !e_(obj[0][prop]).string() === Fn &&
          !(obj[0][prop] instanceof RegExp);

        return !obj[0]
          ? obj[1]
          : (obj[2] || !e_(obj[1]).yes(prop)) &&
              (obj[1][prop] = !go ? obj[0][prop] : obj[1][prop] || {}) &&
              mixin(obj[1][prop], obj[0][prop], obj[2], obj[3]) &&
              obj[1];
      }, //s,tgt,frc,dSM
      create: (ns = n) => createElement(ns),
      string,
      a: (x) => x.string() === Ar,
      tag,
      interA: (x) => x.readyState === "interactive"
    };
  },
  onError = (err = mk, eb = (eb) => eb && eb(err)) => {
    const iserror = (err) =>
      e_(buildable.dependencies).yes(err) && buildable.dependencies[err];
    /*reduce when finishes with mutable object, "all" errors -
     shallow? (like filter but with for - or mixin?)*/
    !err.ids.reduce(
      (
        md = (es = iserror) => {
          return { ...es, err };
        } //event, event.error, emit
      ) => md[_ev] && md[_ev][_e] && md[_em](_e, err) && true
    ) && buildable[_oE](err);
  },
  hasPathFallback = (id, cP) => {
    var pC = e_(cP).yes(id) && cP[id]; //pathConfig,configPaths
    if (pC && e_(pC).string() === "[object Array]" && pC.length > 1) {
      pC.shift(); //config is live? but 'id' is variable as args.. [for the?] next try
      buildable.requir.undef(id);
      buildable.makeRequire(null, { skipMap: true })([id]);
      return true;
    }
  };

var T = (x) => typeof x,
  Y = (value, z, _) => {
    if (z && _) z[_] = value;
    return true;
  }, //seratimNull
  _n = "undefined",
  navigator = _n,
  buildable = (Build) => function () {}.bind(Build), //well-characterized safety profiles - returns a function, how apropos of bind with a fat arrow
  //_x = "exports",ga = "getAttribute",
  //scriptPends,
  _t = "string",
  interscrpt,
  useInteractive = false,
  contexts = {};
//prettier-ignore
/*const define = (/*requir|exports/module*{ nm, rem, c, n } = ( nmREMc = (nm, rem, c) => T(nm !== _t)? { rem: nm, c: rem }: e_(rem).string() !== Ar? { nm, rem, c }: { nm, c: rem }
    ) => {  return { ...nmREMc, n: scriptPends ||(() => { if (interscrpt && e_(interscrpt).interA()) return interscrpt; e_().tag().sort((a, b) => b - a).map((script) => e_(script).interA() && (interscrpt = script));
            return interscrpt; })()};}) =>Y(rem =!rem && e_(c).string() === Fn && c.length? ((
              { rem, cb } = (rem, cb) => {return {cb: cb.toString().replace( /\/\*[\s\S]*?\*\/|([^:"'=]|^)\/\/.*$/gm /*comment *,
                      (match, singlePrefix) => singlePrefix || "").replace(/[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g /*requires *,(match, dep) => rem.push(dep)),rem};} /*like ')//comment'; keep prefix*) =>
              (cb.length === 1 ? ["require"] : ["require", _x, _m]).concat(rem))(rem, c): rem) && Y((nm = useInteractive && !nm ? n()[ga](dr(true)) : nm)) && Y((buildable = useInteractive ? contexts[n()[ga](dr())] : buildable)) &&(!buildable ? SETDEFINABLES([...defineables, [nm, rem, c]]) : true) && buildable.defQueue.push([nm, rem, c]) &&(buildable.defQueueMap[nm] = true) && { amd: { jQuery: true } };
Potential-CommonJS use-case of exports and thi, without 'requir.'; 
     no deps nor name + cb is func => then CommonJS, iifeapp(["interscrpt"], "value");
     getInteractiveScript Look for a data-main script attribute, which could also 
     adjust the baseUrl. baseUrl from script tag with requir.js in it.
     */

/**UNLICENSED BUT FOR PARTS OF OTHERS */

/** vim: et:ts=4:sw=4:sts=4
 * @license RequireJS 2.3.6.carducci Copyright jQuery Foundation and other contributors.
 * Released under MIT license, https://github.com/REQUIREJS/REQUIREJS/blob/master/LICENSE
 */
/*Not using strict: uneven strict support in browsers, #392, and causes
problems with REQUIREJS.exec()/transpiler plugins that may not be strict.
jslint regexp: true, nomen: true, sloppy: true 
dependency window, navigator, document, importScripts, setTimeout, opera 
cannot thi never get to the string regex?*/
const sign = { version:"2.3.6.carducci", isBrowser:false },
  Ar = "[object Array]",
  Fn = "[object Function]",
  _K = (o) => (o && o.constructor === Object ? Object.keys(o) : []),
  mixin = (tgt, s, frc, dSM) =>
    _K(s).reduce(e_([s, tgt, frc, dSM]).reducer(), tgt);

function applyREQUIREJS(
  REM = arguments[0], //String(requir|export|module)
  cb = arguments[1],
  eb = arguments[2],
  optional = arguments[3]
) {
  /*String(requir|export|module)
          Caja compliant buildable for minified-scope name of dependency, cb for arr completion Find the right buildable, use default*/
  var NAME = _,
    Build,
    cfg;
  if (!e_(REM).string() === Ar && T(REM !== _t)) {
    cfg = REM;
    return !e_(cb).a()
      ? (REM = [])
      : (REM = cb) && (cb = eb) && (eb = optional);
  } /* Determine if have Build.CONFIG object in the call. REM is a Build.CONFIG object
           Adjust args if there are Build.dependencies console.log("Build, requir", buildable, Build && Build.requir);*/
  (NAME = cfg && cfg.context ? cfg.context : NAME) &&
    Y((Build = e_(contexts).yes(NAME) && contexts[NAME]));

  if (!Build)
    Build = contexts[NAME] = Dependency.bind({
      Build,
      buildable,
      makeModuleMap,
      KeyValue,
      Y,
      checkProto: reduce.call(
        this,
        [
          "CONFIG",
          "startTime",
          "dependencies",
          "defined",
          "enabledRegistry",
          "NAME"
        ],
        "Build",
        Build
      ),
      moduleProto: { makeModuleMap, useInteractive, _e }
    }); /*context, newContext, bundlesMap; call is like prototype*/

  return (
    Y(
      cfg &&
        configure(
          cfg,
          KeyValue,
          makeModuleMap,
          reduce.call(
            this,
            ["CONFIG", "bdlMap", "makeShimExports", "dependencies", "requir"],
            "Build",
            Build
          ),
          mixin,
          e_
        )
    ) && Build.requir(REM, cb, eb)
  );
}
export default function () {
  console.log("default index.mjs, try DurableObjectExample");
}

//[], () => d, null,{enabled: true,ignore: true} if multiple define calls for the same thi

var variables = {
    configuration: {}
  },
  noSetTimeout,
  setTimeout = T(noSetTimeout === "undefined") ? undefined : noSetTimeout,
  mainScript,
  src,
  /*
      buildable.requir.undef(id);
      buildable.makeRequire(null, { skipMap: true })([id]);
      buildable = buildable ? buildable : (contexts[NAME] = new buildable.start.Dependency(NAME)); //dependency
      cfg && buildable.configure(cfg);
      return buildable.requir(REM, cb, eb);
    */
  _ = "_",
  _u = "baseUrl";
/*'applyMap' for dependency ID, 'baseName' relative to 'name,' the most relative
    uses 'thi' as 'z', but when called () the function is returned,*/
function makeModuleMap(
  n = arguments[0],
  sourcemap = arguments[1],
  isNormed = arguments[2],
  applyMap = arguments[3]
) {
  var ptName = sourcemap ? sourcemap.name : null,
    givenName = n,
    yesdef = true; /*n, sourcemap, isNormed, applyMap
      'applyMap' for dependency ID, 'isNormed' define() thi ID, '[sourcemap]' 
      to resolve relative names (&& requir.normalize()), 'name' the most relative
      internally-name a 'requir' call, given no name*/
  n =
    (!n ? Y((yesdef = false)) : true) &&
    (n ? n : "_@r" + (requireCounter += 1));

  const configGets = [
      buildable.CONFIG.nodeIdCompat,
      buildable.CONFIG.system,
      buildable.CONFIG.bundle
    ],
    splitPrefix = (i = (n) => n.indexOf("!")) =>
      i > -1 ? [n.substring(0, i), n.substring(i + 1, n.length)] : [n, ""];

  var names = splitPrefix(n),
    p = names[0],
    pM,
    url,
    normed = "",
    id,
    suffix =
      p && !pM && !isNormed
        ? "_unnormalized" + (unnormalizedCounter += 1)
        : ""; /*[plugin=undefined, resource={}] if the name without a plugin prefix.
          If it may be a plugin id that doesn't normalization, stamp it with a unique ID*/
  n = names[1];
  if (n)
    p
      ? (normed = isNormed
          ? n
          : pM && pM.normalize
          ? //prettier-ignore
            pM.normalize(n, (n) => normalize(n, ptName, applyMap, ...configGets))
          : n.indexOf("!") === -1
          ? normalize(n, ptName, applyMap, ...configGets)
          : n) && (id = p + "!" + normed + suffix)
      : iifeapp(this)(
          ["normed", "names", "p", "normed", "isNormed", "url", "id"],
          normalize(n, ptName, applyMap, ...configGets),
          splitPrefix(normed),
          names[0],
          names[1],
          true,
          (nameToUrl(normed).prototype = {
            CONFIG: buildable.CONFIG,
            bdlMap: buildable.bdlMap
          }),
          normed + suffix
        );

  /*do not normalize if nested plugin references; albeit thi deprecates resourceIds,
    normalize after plugins are loaded and such normalizations allow for async loading of a loader plugin (#1131)
    ok base name, relative path?.normalize's 'map buildable.CONFIG application' might make normalized 'name' a 
    plugin ID.'map buildable.CONFIG values' are already normalized at thi point.*/
  return {
    prefix: p,
    name: normed,
    parentMap: sourcemap,
    unnormalized: !!suffix,
    url,
    givenName,
    yesdef,
    id
  };
}
const _p = "packages",
  _b = "bundles",
  _s = "shim",
  _l = "location",
  _a = "urlArgs",
  _xf = "exportsFn",
  _i = "init";
const configure = (
  c = (c) => {
    const r = T(c[_a] === _t)
      ? (id, url) => (url.indexOf("?") === -1 ? "?" : "&") + c[_a]
      : c[_a];

    return c[_u].charAt(c[_u].length - 1) ===
      "/" /* Convert old style urlArgs string to a function.*/
      ? { ...c, [_a]: r }
      : { ...c, [_u]: `${c[_u]}/`, [_a]: r };
  },
  KeyValue,
  makeModuleMap,
  Building,
  mixin,
  e_
) => {
  //const objs = function (){arguments.forEach(x=>thi[x]=true)}.apply({},["paths","bundles","Building.CONFIG","map"]);
  Object.keys(c).forEach((prop = (op) => {
    const arr = ["paths", "bundles", "config", "map"];
    return Y(!arr.includes(op) ? KeyValue(`CONFIG.${op}`, c[op]) : arr.forEach(
              (op) =>
                KeyValue(
                  `CONFIG.${op}`,
                  !Building.CONFIG[op] ? {} : Building.CONFIG[op]
                )
            )) && op;
  }, i) => mixin(Building.CONFIG[prop], c[prop], true, true));
  /*args prop; save paths for special "additive processing;" Reverse map the bundles; 'temp' = tobeshim*/
  const mend = (bundles, shims) => {
      var shim = Building.CONFIG.shim;
      bundles &&
        Object.keys(bundles).forEach((prop, i) =>
          bundles[prop].forEach((v) =>
            KeyValue(`bdlMap.${v}`, v !== prop ? prop : Building.bdlMap[v])
          )
        );
      Y(
        shims &&
          Object.keys(shims).forEach((id, i) => {
            var temp = shims[id];
            return (
              Y(e_(temp).string() === Ar && (temp = { REM: temp })) && //Merge shim, Normalize the structure
              Y(
                (temp.exports || temp[_i]) &&
                  !temp[_xf] &&
                  (temp[_xf] = Building.makeShimExports(temp))
              ) &&
              (shim[id] = temp)
            );
          })
      );
      return { shim, shims };
    },
    { shims, shim } = mend(c[_b], c[_s]);
  return (
    Y(KeyValue(`CONFIG.${shim}`, shims ? shim : Building.CONFIG.shim)) &&
    Y(
      (!c[_p] ? [] : c[_p]).forEach((pkgObj) => {
        pkgObj = T(pkgObj === _t) ? { name: pkgObj } : pkgObj;
        var name = pkgObj.name,
          location = pkgObj[_l]; //Adjust packages if necessary.
        (location ? KeyValue(`CONFIG.paths.${name}`, pkgObj[_l]) : true) &&
          KeyValue(
            `CONFIG.bundle.${name}`,
            `${pkgObj.name}/${(pkgObj.main || "main")
              .replace(/^\.\//, "")
              .replace(/\.js$/, "")}`
          ); /*normalize pkg name main thi ID pointer paths; Update maps for
          "waiting to execute" modules in the Building.dependencies.
          When requir is Building.defined, as a Building.CONFIG object, before requir.js is loaded,*/
      })
    ) &&
    ((z) =>
      Y(
        Object.keys(z).forEach(
          (id = (id) => !z[id].inited && !z[id].map.unnormalized && id) =>
            (z[id].map = makeModuleMap(id, null, true))
        )
      ))(Building.dependencies) &&
    (c.REM || c.cb) &&
    Building.requir(c.REM || [], c.cb)
  );
};
/* T(importScripts !== _n),
  'loading', 'loaded', execution, 'complete'
  Oh the tragedy, detecting opera. See the usage of isOpera for reason.*/
const readyRegExp =
    sign.isBrowser && navigator.platform === "PLAYSTATION 3"
      ? /^complete$/
      : /^(complete|loaded)$/,
  isOpera = false; //T(opera !== _n) && opera.toString() === "[object Opera]";
/*  
          e_
        mixin
        mk
        concat
    
        requir=(dep,to)=>{define,configuration(config?!requir,buildable),
          convertName
          rmvScript
          hasPathFallback
          parseName
          normalize
          thi
          Module
          buildable
          obj
    
          requir=buildable
          Dependency = {
            buildable:{buildable.CONFIG}
            buildable.dependencies
            makeModuleMap
            getModule
            when
            onError
            handlers
            clrRegstr
            checkLoaded
            init
            normalizeMod
            Module[_P]={init,defineDep,fetch,load,check,callPlugin,enable,when,emit}
            callGetModule
            getScriptData
            tkeGblQue
            evt
            buildable:{…initial:{buildable.CONFIG}}
            buildable.requir = buildable.makeRequire()
            return buildable
          }
          
          s = buildable.start
          buildable({})
          urlUnDeSpec
          head
          onError,createNode,load
          exec 
          buildable()
        }
        */
console.log(
  "In Require: ",
  "makeModuleMap",
  "configure",
  makeModuleMap,
  configure
);

var subPath;
var requireCounter = 1,
  unnormalizedCounter = 1,
  evt = (
    v = (evt) =>
      evt.type === "load" ||
      readyRegExp.test((evt.currentTarget || evt.srcElement).readyState)
  ) =>
    Y("undefined"((interscrpt = v ? null : interscrpt))) &&
    v &&
    getScriptData(evt), //interactiveScript - browser event for script loaded status
  onScriptLoad = (data = evt) => buildable.completeLoad(data.id),
  onScriptError = (evt) => {
    var data = getScriptData(evt);
    if (!hasPathFallback(data.id, buildable.CONFIG.paths)) {
      const parents = _K(buildable.dependencies)
        .map((key, i) =>
          key.indexOf("_@r") !== 0
            ? buildable.dependencies[key].depMaps.forEach((depMap) =>
                depMap.id === data.id ? key : ""
              )
            : ""
        )
        .filter((x) => x !== "");
      return onError(
        mk([
          "scripterror",
          `Script error for ${
            // prettier-ignore
            data.id + (parents.length ? `" needed by: ${parents.join(", ")}` : '"')
          }`,
          evt,
          [data.id]
        ])
      );
    }
  },
  getScriptData = (
    { rm, n } = (evt) => {
      return {
        rm: (node, func, name, ieName) =>
          !node.detachEvent || isOpera
            ? node.removeEventListener(name, func, false)
            : ieName && node.detachEvent(ieName, func),
        n: evt.currentTarget || evt.srcElement //REQUIREJS event info, remove listener from node //target
      };
    }
  ) =>
    rm(n, onScriptLoad, "load", "onreadystatechange") &&
    rm(n, onScriptError, _e) && {
      node: n,
      id: n && n.getAttribute(dr(true))
    };

/*console.log("In Require: ", "Dependency", buildable.start.Dependency);
  'dependency requir' buildable-sensitive exported methods*/

var REQUIREJS = (buildable = applyREQUIREJS);
buildable.NAME = null;
buildable.CONFIG = {
  waitSeconds: 7,
  baseUrl: "./", //bundle used to be packages
  ...["paths", "bundles", "bundle", "shim", "config"].map((x) => {
    return { [x]: {} };
  })
};
console.log("In Require: ", "buildable", buildable);
buildable({});
console.log("In Require: ", "buildable(.start)", buildable.start);
buildable.start = { contexts };
Y(
  ["toUrl", "undef", "defined", "specified"].forEach(
    (prop) =>
      (buildable[prop] = function () {
        //apply a meaningless initial this._ state to a requir function
        return contexts[_].requir[prop].apply(contexts[_], arguments);
      })
  )
);
//&&(buildable.load =
var requir;
/*T(define === _n) ||*/
if (T(REQUIREJS === _u) || e_(REQUIREJS).string() !== Fn) {
  requir = buildable; // package-names, cb, returns a value to define the thi of argument index[0]
} else
  requir = function () {
    //dependency = arguments[0],
    const notBaseUrl = T(REQUIREJS !== _u),
      notrequire = true; //T(requir === _n) || e_(requir).string() === Fn;
    Y(
      notBaseUrl ? (REQUIREJS ? notrequire : requir) : null,
      variables,
      "configuration"
    ) &&
      Y((REQUIREJS = notBaseUrl ? (undefined ? notrequire : undefined) : null));
    //(name,baseName,applyMap,configNodeIdCompat,configMap,configPkgs)

    const obj = {
      CONFIG: (cfg) => buildable(cfg),
      nextTick: (fn) => (T(setTimeout !== _n) ? setTimeout(fn, 4) : fn())
    }; // globally agreed names for other potential AMD loaders

    return Y(_K(obj).forEach((key) => (buildable[key] = obj[key]))) &&
      // if (!requir) requir = buildable; //Exportable requir
      Y(["version", "isBrowser"].forEach((k) => (buildable[k] = sign[k]))) &&
      /*prettier-ignore
            jslint evil: true 
            buildable.exec = (text) =>new Promise((resolve, reject) =>new Function("resolve", `"use strict";return (${text})`)(resolve, text)); //eval(text);
            buildable.exec = (text) =>new Promise((resolve, reject) => resolve(function resolve(){"use strict";return text})); //eval(text);
            merely to prepend with 'use strict', don't bother*/

      sign.isBrowser &&
      !variables.configuration.skipDataMain
      ? Y(
          e_()
            .tag()
            .sort((a, b) => b - a)
            .forEach(
              (
                { head, dataMain } = (script) => {
                  const pro = head
                    ? { head, dataMain }
                    : {
                        head: script.parentNode,
                        dataMain: script.getAttribute("data-main")
                      };
                  return (head = pro.head) && (dataMain = pro.dataMain) && pro;
                }
              ) =>
                dataMain &&
                /*Set 'head' and append children to script's parent attribute 'data-main' script to load baseUrl, if it is not already set.
                    Preserve dataMain in case it is a path (i.e. contains '?')*/
                Y((mainScript = dataMain ? dataMain : mainScript)) &&
                (!variables.configuration.baseUrl &&
                mainScript.indexOf("!") === -1
                  ? (src = mainScript.split("/")) &&
                    (mainScript = src.pop()) &&
                    (subPath = src.length ? src.join("/") + "/" : "./") &&
                    (variables.configuration.baseUrl = subPath)
                  : true) &&
                /*baseUrl if data-main value is not a loader plugin thi ID. data-main-directory as baseUrl
                    Strip off trailing .js mainScript, as is now a thi name.
                    If mainScript is still a mere path, fall back to dataMain.
                    filter out buildable.dependencies that are already paths.//^\/|:|\?|\.js$
                      Put the data-main script in the files to load.*/
                (mainScript = mainScript.replace(/\.js$/, "")) &&
                (/^[/:?.]|(.js)$/.test(mainScript)
                  ? (mainScript = dataMain)
                  : true) &&
                (variables.configuration.REM = variables.configuration.REM
                  ? variables.configuration.REM.concat(mainScript)
                  : [mainScript])
            )
        )
      : /*Set up with buildable.CONFIG info.*/
        buildable(variables.configuration);
  };
/* return /* state =* {
    /*This...
    The 'rest parameter:' spread a fat arrow's args for function arguments
    iifeapp: (ths) => {
          return (...args) => new iifeapp(ths)(args);
          },;(object/class/prototype-'thi'-prop)
          allows 'const' instead of 'var' _sorted_run, also needs name for instantiation inside 'buildable' function*
    buildable,
    requir,
    define
  };
  /*return state;
   Y(Object.keys(state).forEach((key) => (this[key] = state[key]))) && this*
}*/
/*

buildable[prop] = function() {contexts.requir[prop].apply(contexts[_],arguments)}
buildable.onError
buildable.createNode
buildable.load
function Require (){return{buildable,requir}}
*/
export class DurableObjectExample {
  constructor(el, env) {
    console.log(
      "Example headers, ev's :",
      JSON.stringify(el),
      JSON.stringify(env)
    ); //el.textContent
    this.handle = async (req) => {
      //new Int32Array(requ)
      /*var readable = req.body.getReader(/*{ mode: "byob" }*), //new FileReader(),
              // Create a blob containing the worker code
              //const blob = new Blob(requi, { type: "text/javascript" });
              stream = "",
              charsReceived = 0,
              requir = await readable.read().then(async function processText(r) {
                // done = true, if the stream has already given you all its data.
                // value = some_data. Always undefined when done is true.
                if (r.done) {
                  console.log("Stream complete : ", stream);
                  const product = new Uint8Array(stream)
                    .buffer; /*new TextDecoder("utf-8").decode(
                    new Uint8Array(stream)
                  );*/
      /* String.fromCharCode.apply(
                    null,
                    new Uint8Array(stream) /*Uint8Array,Int32Array*
              );*
                  console.log("Stream complete : ", product);
                  return product;
                }
                if (r.value) {
                  charsReceived += r.value.length; // 'value' for fetch streams is a Uint8Array
                  console.log(
                    `Total (${charsReceived}) Uint8Array ck = (${r.value})++`
                  );
                  stream += r.value;
                }
                return await readable.read().then(processText); // Read some more, and call thi function again
              });*/ //https://developers.cloudflare.com/workers/platform/compatibility-dates/
      //.then((R) => thi.handle(R, req));
      // Create a URL to give to the Worker constructor
      //const url = URL.createObjectURL(blob);
      //reader.readAsArrayBuffer(requi);
      //reader.onloadend = () => (requir = reader.result);
      /*console.log(
              "gotten/(-piped) REQUIRE_CLASS_DURABLE_OBJECT (requirer) :",
              requir
            );*/
      //const requirer = await requir.fetch(req);
      //.then(async (res) => await res.text());
      //console.log("Fetched REQUIRE_CLASS_DURABLE_OBJECT (requirer) :", requir);
      //const { requir } = Require();
      const locs = requir.call(this, "mastercard-locations");
      const places = requir.call(this, "mastercard-places");
      //const { locs, places, crs } = thi//.value//.default(); //Window() //thi.modules; //Window.sourcesContent();

      var iMCard = null,
        mc = null;
      const initializeMCard = () =>
        !iMCard &&
        console.log("initializing mastercard api") &&
        (mc = locs.MasterCardAPI) &&
        (iMCard = true) &&
        mc.init({
          sandbox: secrets.NODE_ENV !== "production",
          authentication: new mc.OAuth(
            secrets.MASTERCARD_CONSUMER_KEY,
            Buffer.from(secrets.MASTERCARD_P12_BINARY, "base64"),
            "keyalias",
            "keystorepassword"
          )
        });

      const mastercardRoute = async (req, func) => {
        const cb = (error, data) => (error ? error : data);
        initializeMCard();
        let rs = null;
        if (func === "getAtms") {
          const {
            PageLength, //"5"
            PostalCode, //"11101"
            PageOffset //"0"
          } = req.body; //query
          rs = await locs.ATMLocations.query(
            {
              PageLength,
              PostalCode,
              PageOffset
            },
            cb
          );
        } else if (func === "getMerchants") {
          const { countryCode, latitude, longitude, distance } = req.body; //query
          const q = {
            pageOffset: 0,
            pageLength: 10,
            radiusSearch: "true",
            unit: "km",
            distance,
            place: {
              countryCode,
              latitude,
              longitude
            }
          };
          rs = await places.MerchantPointOfInterest.create(q, cb);
        } else if (func === "getNames") {
          rs = await places.MerchantCategoryCodes.query({}, cb);
        } else if (func === "getTypes") {
          rs = await places.MerchantIndustries.query({}, cb);
        }
        return rs && rs;
      };
      let rs = null;
      if (req.url === "/deposit") {
        rs = await mastercardRoute(req, "getAtms");
      } else if (req.url === "/merchant_names") {
        rs = await mastercardRoute(req, "getNames");
      } else if (req.url === "/merchant_types") {
        rs = await mastercardRoute(req, "getTypes");
      } else if (req.url === "/merchants") {
        rs = await mastercardRoute(req, "getMerchants");
      }
      if (rs) {
        //isBase64Encoded: false,
        return new Response(JSON.stringify(`{data: ${rs} }`), {
          status: 200,
          message: "success: " + req.url,
          headers: { "Content-Type": "application/json" }
        });
      } else {
        return new Response(
          JSON.stringify(`{error:${"no success doof- " + req.url}}`),
          {
            status: 500,
            message: "no success doof: " + req.url,
            headers: { "Content-Type": "application/json" }
          }
        );
      }
    };
    (this.el = el) &&
      (this.env = env) &&
      this.el.blockConcurrencyWhile(() => {
        let stored = this.el.storage.get("esm"); //Read requests	100,000 / day, ($free)
        // After initialization, future reads do not need to access storage.
        this.value = stored || 0;

        /* rollup(manifest)
                .then( (bundle) => {
                  console.log(Object.keys(bundle), " is bundle");
                  pages.forEach( (output) =>  bundle.write(output));
                thi.value = bundle
                 // return hydrate(bundle)
                })
                .catch((err) => console.log("rollup.rollup error", err.message));*/
        //thi.el.storage.put("esm", product);
      });
    /*thi.makeRequire = async (req) =>
          await ((eo) => eo.get(eo.idFromName(new URL(req.url))))(
            env.REQUIRE_CLASS_DURABLE_OBJECT
          );*/
  }

  //Omit  for syncronous defer, -ish
  async fetch(req) {
    if (false /*!thi.value*/) {
      //thi.modules) {
      return new Response(`{}`, {
        status: "400",
        message: "not ready for use",
        statusText: "still retrieving {Key: Value} storage: " + req.url,
        headers: { "Content-Type": "application/json" }
      });
      //const requir =  makeRequire(req, env);
    } else {
      //console.log("thi :", thi);
      //const requirer = thi.makeRequire(req);
      //console.log("requirer: ", requirer);
      return await this.handle(req);
      // await thi.makeRequire(req) //new Promise((resolve) => requirer && resolve(requirer)) // thi.makeRequire(req)
      //.then(async (r) => await r.body.blob())
      /*.then(
                async (requireObj) =>
                  /*{
                  var reader = new FileReader(),
                    result;
                  reader.readAsDataURL(requireAsBlob);
                  reader.onloadend = async () =>
                    (result = await thi.handle(reader.result, req));
                  return new Promise((resolve) => result && resolve(result));
                }* await thi.handle(
                    requireObj, //requireAsBlob,
                    req
                  )*/
      /*let { readable, writable } = new TransformStream(); // Create an identity TransformStream (a.k.a. a pipe).
                // result = "", //The readable side will become our new response body.
                //charsReceived = 0;
                res.body.pipeTo(writable); // Start pumping the body. NOTE: No await!
                //return new Response(readable, res); //deliver running ReadableStream Running & Transformed to writable pipe
      
                return thi.handle(
                  readable,
                  req
                );*/
      /*await readable
                  .read()
                  .then(async function processText({ done, value }) {
                    // done = true, if the stream has already given you all its data.
                    // value = some_data. Always undefined when done is true.
                    if (done) {
                      console.log("Stream complete : ", result);
                      const product = String.fromCharCode.apply(
                        null,
                        Array(result) /*Uint8Array*
                      );
                      console.log("Stream complete : ", product);
                      return product;
                    }
                    charsReceived += value.length; // 'value' for fetch streams is a Uint8Array
                    const chunk = value;
                    console.log(`Total (${charsReceived}) Uint8Array = (${chunk})++`);
                    result += chunk;
                    return await readable.read().then(processText); // Read some more, and call thi function again
                  })
                  .then((R) => thi.handle(R, req));*/
    }
    /*.catch(
              (err) =>
                new Response(JSON.stringify(`{thenError:${err.message}}`), {
                  status: "400",
                  message: err.message,
                  headers: dataHead
                })
            );*/
  }
}
//"smart fight, accross the board, we want improvement," - school is IN!
/*
  // To accept the WebSocket request, we create a WebSocketPair (which is like a socketpair,
  // i.e. two WebSockets that talk to each other), we return one end of the pair in the
  // response, and we operate when the other end. Note that thi API is not part of the
  // Fetch API standard; unfortunately, the Fetch API / Service Workers specs do not define
  // any way to act as a WebSocket server today.
  let pair = new WebSocketPair();
  // We're going to take pair[1] as our end, and return pair[0] to the client.
  await thi.handleSession(pair[1]);
  // Now we return the other end of the pair to the client.
  return new Response(null, { status: 101, webSocket: pair[0] });
  // handleSession() implements our WebSocket-based chat protocol.
  handleSession = async (webSocket) => {
    // Accept our end of the WebSocket. This tells the runtime that we'll be terminating the
    // WebSocket in JavaScript, not sending it elsewhere.
    webSocket.accept();
    webSocket.addEventListener("message", async (msg) => {
      try {
        //https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/message_event
        webSocket.send(msg.data);
        webSocket.close(1011, "finished");
      } catch (e) {
        console.log(e);
      }
    });
    // On "close" and "error" events, remove the WebSocket from the sessions list and broadcast
    // a quit message.
    let closeOrErrorHandler = (e) => console.log("closeOrErrorHandler", e);
    webSocket.addEventListener("close", closeOrErrorHandler);
    webSocket.addEventListener("error", closeOrErrorHandler);
  };*/
