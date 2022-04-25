import Dependency, { defineables, SETDEFINABLES } from "./dependency.mjs";
import { configure, nameToUrl } from "./functions.mjs";
var STATE = {},
  _f = "*",
  T = (x) => typeof x,
  Y = (value, z, _) => {
    if (z && _) z[_] = value;
    return true;
  }, //seratimNull
  version = "2.3.6.carducci",
  _n = "undefined",
  window = _n,
  navigator = _n,
  BUILD = (build) => function () {}.bind(build), //well-characterized safety profiles
  _oE = "onError",
  _e = "error",
  _em = "emit",
  _ev = "events",
  iserror = (err) => e_(STATE.dependencies).yes(err) && STATE.dependencies[err],
  _r = "require",
  _x = "exports",
  scriptPends,
  ga = "getAttribute",
  _t = "string",
  interscrpt,
  useInteractive = false,
  contexts = {},
  define = (
    //require|exports/module
    { nm, rem, c, n } = (
      nmREMc = (nm, rem, c) =>
        T(nm !== _t)
          ? { rem: nm, c: rem }
          : e_(rem).string() !== Ar
          ? { nm, rem, c }
          : { nm, c: rem }
    ) => {
      return {
        ...nmREMc,
        n:
          scriptPends ||
          (() => {
            if (interscrpt && e_(interscrpt).interA()) return interscrpt;
            // prettier-ignore
            e_().tag().sort((a, b) => b - a)
                                .map((script) => e_(script).interA() && (interscrpt = script));
            return interscrpt;
          })()
      };
    }
  ) =>
    Y(
      (rem =
        !rem && e_(c).string() === Fn && c.length
          ? ((
              { rem, cb } = (rem, cb) => {
                return {
                  cb: cb
                    .toString()
                    .replace(
                      /\/\*[\s\S]*?\*\/|([^:"'=]|^)\/\/.*$/gm /*comment */,
                      (match, singlePrefix) => singlePrefix || ""
                    )
                    .replace(
                      /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g /*requires */,
                      (match, dep) => rem.push(dep)
                    ),
                  rem
                };
              } /*like ')//comment'; keep prefix*/
            ) => (cb.length === 1 ? [_r] : [_r, _x, _m]).concat(rem))(rem, c)
          : rem) //Potential-CommonJS use-case of exports and thi, without 'require.';
    ) &&
    // no deps nor name + cb is func => then CommonJS, iifeapp(["interscrpt"], "value");
    Y((nm = useInteractive && !nm ? n()[ga](dr(true)) : nm)) &&
    Y((STATE = useInteractive ? contexts[n()[ga](dr())] : STATE)) &&
    //getInteractiveScript Look for a data-main script attribute, which could also adjust the baseUrl. baseUrl from script tag with require.js in it.

    (!STATE ? SETDEFINABLES([...defineables, [nm, rem, c]]) : true) &&
    STATE.defQueue.push([nm, rem, c]) &&
    (STATE.defQueueMap[nm] = true) && { amd: { jQuery: true } };

export const KeyValue = (key, value, delet) =>
    delet === "delete" ? delete STATE[key] : (STATE[key] = value),
  isBrowser = T(window !== _n) && T(navigator !== _n) && window.document,
  SETSTATE = (STAT) => (STATE = STAT),
  tryCatch = (exec, args = []) => {
    var erro = null;
    try {
      exec(...args);
    } catch (e) {
      erro = e;
    }
    return erro; //z is a thi binding ...as args
  },
  onError = (err = mk, eb = (eb) => eb && eb(err)) => {
    //reduce when finishes with mutable object, "all" errors - shallow? (like filter but with for - or mixin?)
    !err.ids.reduce(
      (
        md = (es = iserror) => {
          return { ...es, err };
        } //event, event.error, emit
      ) => md[_ev] && md[_ev][_e] && md[_em](_e, err) && true
    ) && BUILD[_oE](err);
  },
  mk = (err) =>
    err.constructor === Object
      ? err
      : {
          //prettier-ignore
          ...new Error(`${err[1]}\nhttps://REQUIREJS.org/docs/errors.html#${err[0]}`),
          requireType: err[0],
          ids: err[3],
          originalError: err[2]
        }, //t, m, e, ids
  iifeapp = class iifeapp {
    constructor() {
      const z = arguments[0]; //allows mutable context, 'new' instantiatable 'iifeapp' for the "enclosing 'thi'," else App() function
      return function () {
        var construction = arguments[0],
          keys = arguments[1];
        const buff = construction.constructor === Array ? 0 : 1;
        (construction =
          construction.constructor === Array ? () => {} : construction) &&
          (keys = keys.constructor === Array ? keys : construction) &&
          Y(construction.constructor === Function && construction()) &&
          Y(keys.constructor === Array) &&
          keys.forEach((x, i) =>
            x.includes(".")
              ? (z[x.split(".")[0]][x.split(".")[1]] = arguments[i + buff])
              : (z[x] = arguments[i + buff])
          );
      };
    }
  }, //thi(and arguments) should relate to wherever function runs (fat has no 'thi', iife can to append thi[key])
  //const iifefunc = (construction, keys) => new iifeapp(construction, keys); //you can tell thi is a [proper-]function[-invocation] with thiscontext here for iifeapp
  /**
                  * 
                        iifefunc(
                          ((z) => {
                            if (z.interscrpt && e_(z.interscrpt).interA())
                              return thi.interscrpt;
                            // prettier-ignore
                            e_().tag().sort((a, b) => b - a)
                          .map((script) => e_(script).interA() && (z.interscrpt = script));
                            return z.interscrpt;
                          })(thi),
                          ["interscript"]
                        );
                  * 
                  */
  dr = (m) => `data-require${m ? _m : "context"}`,
  hasPathFallback = (id, cP) => {
    var pC = e_(cP).yes(id) && cP[id]; //pathConfig,configPaths
    if (pC && e_(pC).string() === Ar && pC.length > 1) {
      pC.shift(); //config is live? but 'id' is variable as args.. [for the?] next try
      STATE.require.undef(id);
      STATE.makeRequire(null, { skipMap: true })([id]);
      return true;
    }
  },
  normalize = (nm, bn, applyMap, conId, system, configPkgs) => {
    const tool = () => {
        return {
          parseName: (...args) => {
            var name = args[0],
              roots = args[1],
              suffjs = args[2];

            if (!name) return null;
            if (name[0].charAt(0) === "." && roots)
              name = roots.slice(0, roots.length - 1).concat(name);

            /\.js$/.test(name[name.length - 1]) &&
              suffjs &&
              name[name.length - 1].replace(/\.js$/, "");

            //Adjust any relative paths. node allows either .js or non .js, yet not in nameToUrl;baseName.push(nm), but new instead of length report
            for (let i = 0; i < name.length; i++) {
              const solid = name[i] === "." && name.splice(i, 1);
              if (solid) continue;
              i = solid ? i - 1 : i;
              const more =
                i === 0 ||
                (i === 1 && name[2] === "..") ||
                name[i - 1] === "..";
              if (!more && i > 0 && name.splice(i - 1, 2)) i -= 2;
            }
            return name.join("/");
          }, //just enabled, but unactivated, modules
          convertName: (nm, mp, applyMap, ph) => {
            if (!applyMap || !mp || (!ph && !mp[_f])) return nm;
            var n,
              i,
              nms = nm.split("/"),
              folder; //continue search ___ map STATE.CONFIG, bigloop:

            for (let g = nms.length; g > 0; g -= 1) {
              const name = nms.slice(0, g).join("/"), //favor a "star map" unless shorter matching STATE.CONFIG
                mV = (fP = (f) => ph.slice(0, f).join("/")) =>
                  e_(mp).yes(fP) && mp[fP],
                loop = (sum = 0) => {
                  let add = (sum = ph.length);
                  var maybe = mV && e_(mV).yes(name) && mV[name],
                    set = () => (i = g),
                    more = mV && e_(mV).yes(name) && mV[name],
                    loo = (add, sum) => (sum = add);
                  /*for (f = z.ph.length; f > 0; f--) {
                                        var bre = null;
                                        if (s) bre = true;
                                        if (z.mV && e_(z.mV).yes(name) && z.mV[name]) set();
                                        if (bre) break;
                                      }*/

                  return maybe && set() && (more ? loo(add--, sum) : null);
                };

              var configMap = mp && mp[_f];
              Y(
                mp &&
                  mp[_f] &&
                  e_(mp[_f]).yes(name) &&
                  (folder = configMap[name]) &&
                  ph &&
                  loop() &&
                  //prettier-ignore
                  !folder &&
                  configMap &&
                  e_(configMap).yes(name) &&
                  (folder = configMap[name]) &&
                  (n = g)
              ) &&
                ph &&
                loop();
            } // bigloop; //Match, update name to the new value.

            if (system) return (nm = nms.splice(0, i, system).join("/"));
            if (folder) {
              system = folder;
              i = n;
            }
            return nm;
          }
        };
      },
      rs = bn && bn.split("/");
    nm =
      tool().parseName(nm, rs, conId) &&
      tool().convertName(nm, system, applyMap, rs);
    return e_(configPkgs).yes(nm) ? configPkgs[nm] : nm;
  },
  e_ = (obj /*,string*/) => {
    // !obj && console.log(obj + " error obj in ", thi);
    const n = (NS) => NS.constructor === "String" && NS.toUpperCase() === "NS";
    const yes = (name) => obj[_H](name) /*[_P]*/,
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
  }; //obj.prototype["hasOwnProperty"][name]; const method =string?"toString":"hasOwnProperty"

/**UNLICENSED BUT FOR PARTS OF OTHERS */

/** vim: et:ts=4:sw=4:sts=4
 * @license RequireJS 2.3.6.carducci Copyright jQuery Foundation and other contributors.
 * Released under MIT license, https://github.com/REQUIREJS/REQUIREJS/blob/master/LICENSE
 */
//Not using strict: uneven strict support in browsers, #392, and causes
//problems with variables.REQUIREJS.exec()/transpiler plugins that may not be strict.
/*jslint regexp: true, nomen: true, sloppy: true */
/*dependency window, navigator, document, importScripts, setTimeout, opera */

//cannot thi never get to the string regex?
const sign = { version, isBrowser },
  _m = "module",
  _S = Object.prototype.toString,
  _H = "hasOwnProperty",
  Ar = "[object Array]",
  Fn = "[object Function]",
  _K = (o) => (o && o.constructor === Object ? Object.keys(o) : []),
  mixin = (tgt, s, frc, dSM) =>
    _K(s).reduce(e_([s, tgt, frc, dSM]).reducer(), tgt),
  createElement = (ns) =>
    document[`createElementNS${ns ? "NS" : ""}`](
      ns ? ("http://www.w3.org/1999/xhtml", "html:script") : "script"
    );
export class handlers {
  constructor() {
    const module = (m = arguments[0]) =>
        !m[_m] &&
        (m[_m] = {
          id: m.map.id,
          uri: m.map.url,
          config: () => (e_(config).yes(m.map.id) ? config[m.map.id] : {}),
          exports: m.exports || (m.exports = {})
        }), //STATE.CONFIG.config
      config = arguments[1],
      makeRequire = arguments[2],
      defined = arguments[3];
    this.require = (m) =>
      !m.require ? (m.require = makeRequire(m.map)) : m.require;
    this.exports = (m) =>
      (m.usingExports = true) &&
      m.map.yesdef &&
      (!m.exports
        ? (m.exports = defined[m.map.id] = {})
        : (defined[m.map.id] = m.exports));

    return module;
  }
}
export default function () {
  console.log("default index.mjs, try DurableObjectExample");
}
function Require() {
  //[], () => d, null,{enabled: true,ignore: true} if multiple define calls for the same thi

  var variables = {
      configuration: {},
      REQUIREJS: null
    },
    setTimeout;
  //s eslint-disable-next-line
  setTimeout = T(setTimeout === "undefined") ? undefined : setTimeout;
  var mainScript,
    src,
    /**
            STATE.require.undef(id);
            STATE.makeRequire(null, { skipMap: true })([id]);
            STATE = STATE ? STATE : (contexts[NAME] = new BUILD.start.Dependency(NAME)); //dependency
            cfg && STATE.configure(cfg);
            return STATE.require(REM, cb, eb);
          */
    _ = "_",
    _u = "baseUrl",
    _oE = "onError",
    _e = "error",
    _SA = "setAttribute",
    _AE = "attachEvent",
    _AEL = "addEventListener",
    ctxReqProps = ["toUrl", "undef", "defined", "specified"],
    //'applyMap' for dependency ID, 'baseName' relative to 'name,' the most relative

    //uses 'thi' as 'z', but when called () the function is returned,
    BUILD = (variables.REQUIREJS = (
      REM, //String(require|export|module)
      cb,
      eb,
      optional
    ) => {
      //String(require|export|module)
      var STATE,
        cfg,
        NAME = _; //Caja compliant BUILD for minified-scope name of dependency, cb for arr completion Find the right STATE, use default
      if (!e_(REM).string() === Ar && T(REM !== _t)) {
        cfg = REM;
        return !e_(cb).a()
          ? (REM = [])
          : (REM = cb) && (cb = eb) && (eb = optional);
      } // Determine if have STATE.CONFIG object in the call. REM is a STATE.CONFIG object Adjust args if there are STATE.dependencies
      (NAME = cfg && cfg.context ? cfg.context : NAME) &&
        Y((STATE = e_(contexts).yes(NAME) && contexts[NAME]));
      console.log(STATE, STATE && STATE.require);
      if (!STATE) {
        const {
          CONFIG,
          startTime,
          dependencies,
          defined,
          enabledRegistry,
          NAME: name
        } = STATE;
        //context, newContext, bundlesMap
        STATE = contexts[NAME] = Dependency.bind({
          STATE,
          BUILD,
          makeModuleMap,
          KeyValue,
          Y,
          checkProto: {
            CONFIG,
            startTime,
            dependencies,
            defined,
            enabledRegistry,
            NAME: name
          },
          moduleProto: { makeModuleMap, useInteractive, _e }
        }); //call is like prototype
      }
      console.log(STATE, STATE && STATE.require);

      let newobject = {};
      [
        "CONFIG",
        "bdlMap",
        "makeShimExports",
        "dependencies",
        "require"
      ].forEach((key) => (newobject[key] = STATE[key]));
      return (
        Y(
          cfg && configure(cfg, KeyValue, makeModuleMap, newobject, mixin, e_)
        ) && STATE.require(REM, cb, eb)
      );
    });
  console.log("In Require: ", "BUILD", BUILD);
  function makeModuleMap(
    n = arguments[0],
    sourcemap = arguments[1],
    isNormed = arguments[2],
    applyMap = arguments[3]
  ) {
    //n, sourcemap, isNormed, applyMap
    var ptName = sourcemap ? sourcemap.name : null,
      givenName = n,
      yesdef = true; //'applyMap' for dependency ID, 'isNormed' define() thi ID, '[sourcemap]' to resolve relative names (&& require.normalize()), 'name' the most relative
    n =
      (!n ? Y((yesdef = false)) : true) &&
      (n ? n : "_@r" + (requireCounter += 1)); //internally-name a 'require' call, given no name

    const configGets = [
        STATE.CONFIG.nodeIdCompat,
        STATE.CONFIG.system,
        STATE.CONFIG.bundle
      ],
      splitPrefix = (i = (n) => n.indexOf("!")) =>
        i > -1 ? [n.substring(0, i), n.substring(i + 1, n.length)] : [n, ""];
    //[plugin=undefined, resource={}] if the name without a plugin prefix.
    var names = splitPrefix(n),
      p = names[0],
      pM,
      url,
      normed = "",
      id,
      suffix =
        p && !pM && !isNormed
          ? "_unnormalized" + (unnormalizedCounter += 1)
          : ""; //If it may be a plugin id that doesn't normalization, stamp it with a unique ID

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
              CONFIG: STATE.CONFIG,
              bdlMap: STATE.bdlMap
            }),
            normed + suffix
          );

    //do not normalize if nested plugin references; albeit thi deprecates resourceIds,
    //normalize after plugins are loaded and such normalizations allow for async loading of a loader plugin (#1131)
    //ok base name, relative path?.normalize's 'map STATE.CONFIG application' might make normalized 'name' a plugin ID.'map STATE.CONFIG values' are already normalized at thi point.

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
  //s eslint-disable-next-line
  const isWebWorker = !isBrowser && false, // && T(importScripts !== _n),
    //'loading', 'loaded', execution, 'complete'
    readyRegExp =
      isBrowser && navigator.platform === "PLAYSTATION 3"
        ? /^complete$/
        : /^(complete|loaded)$/,
    //Oh the tragedy, detecting opera. See the usage of isOpera for reason.
    isOpera =
      //s eslint-disable-next-line
      false; //T(opera !== _n) && opera.toString() === "[object Opera]";
  /*  
          e_
        mixin
        mk
        concat
    
        require=(dep,to)=>{
          define
          configuration(config?!require,BUILD)
          convertName
          rmvScript
          hasPathFallback
          parseName
          normalize
          thi
          Module
          BUILD
          obj
    
          require=BUILD
          Dependency = {
            STATE:{STATE.CONFIG}
            STATE.dependencies
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
            STATE:{…initial:{STATE.CONFIG}}
            STATE.require = STATE.makeRequire()
            return STATE
          }
          
          s = BUILD.start
          BUILD({})
          ctxReqProps
          head
          onError,createNode,load
          exec 
          BUILD()
        }
        */
  console.log(
    "In Require: ",
    "makeModuleMap",
    "configure",
    makeModuleMap,
    configure
  );

  var baseElement,
    subPath,
    head,
    initialConfig = {
      waitSeconds: 7,
      baseUrl: "./", //bundle used to be packages
      ...["paths", "bundles", "bundle", "shim", "config"].map((x) => {
        return { [x]: {} };
      })
    },
    STATE = {
      NAME: null,
      CONFIG: initialConfig
    },
    requireCounter = 1,
    unnormalizedCounter = 1,
    evt = (
      v = (evt) =>
        evt.type === "load" ||
        readyRegExp.test((evt.currentTarget || evt.srcElement).readyState)
    ) =>
      Y("undefined"((interscrpt = v ? null : interscrpt))) &&
      v &&
      getScriptData(evt), //interactiveScript - browser event for script loaded status
    onScriptLoad = (data = evt) => STATE.completeLoad(data.id),
    onScriptError = (evt) => {
      var data = getScriptData(evt);
      if (!hasPathFallback(data.id, STATE.CONFIG.paths)) {
        const parents = _K(STATE.dependencies)
          .map((key, i) =>
            key.indexOf("_@r") !== 0
              ? STATE.dependencies[key].depMaps.forEach((depMap) =>
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

  //console.log("In Require: ", "Dependency", BUILD.start.Dependency);
  BUILD({}); //'dependency require' STATE-sensitive exported methods
  console.log("In Require: ", "BUILD(.start)", BUILD);
  BUILD.start = {
    contexts
    //(NAME) =>
  };

  Y(
    ctxReqProps.forEach(
      (prop) =>
        (BUILD[prop] = function () {
          //apply an initial state to a function
          return contexts[_].require[prop].apply(contexts[_], arguments);
        })
    )
  ) && //apply arguments to requires when context
  //for the latest instance of the 'default STATE STATE.CONFIG'//not the 'early binding to default STATE,' but contexts during builds//ticketx to apology tour
  isBrowser &&
  (head = BUILD.start.head = e_("base").tag(0)
    ? baseElement.parentNode
    : e_("head").tag()) &&
  //(IE6) BASE appendChild (http://dev.jquery.com/ticket/2709)
  (BUILD[_oE] = (err) => err) && // node for the load command in browser env
    (BUILD.createNode = (CONFIG, tkn, url) => {
      return {
        ...(CONFIG.xhtml ? e_().create("NS") : e_().create()),
        type: CONFIG.scriptType || "text/javascript",
        charset: "utf-8",
        async: true
      };
    }) &&
    (BUILD.load = (STATE, tkn, url) => {
      // normalize, hasPathFallback, rmvScrpt, Module Do not overwrite an existing variables.REQUIREJS instance/ amd loader.
      const CONFIG = (STATE && STATE.CONFIG) || initialConfig;
      //handle load request (in browser env); 'STATE' for state, 'tkn' for name, 'url' for point
      if (isBrowser) {
        var n = BUILD.createNode(CONFIG, tkn, url); //browser script tag //testing for "[native code" https://github.com/REQUIREJS/REQUIREJS/issues/273
        n[_SA](dr(), STATE.NAME);
        n[_SA](dr(true), tkn); //artificial native-browser support? https://github.com/REQUIREJS/REQUIREJS/issues/187 //![native code]. IE8, !node.attachEvent.toString()

        if (
          //prettier-ignore
          n[_AE] && !(n[_AE].toString && n[_AE].toString().indexOf("[native code") < 0) && !isOpera
        ) {
          useInteractive = true;
          n[_AE]("onreadystatechange", onScriptLoad); //IE (6-8) doesn't script-'onload,' right after executing the script, cannot "tie" anonymous define call to a name,
          //yet for 'interactive'-script, 'readyState' triggers by 'define' call IE9 "addEventListener and script onload firings" issues should actually 'onload' event script, right after the script execution
          //https://connect.microsoft.com/IE/feedback/details/648057/script-onload-event-is-not-fired-immediately-after-script-execution
          //Opera.attachEvent does not follow the execution mode. IE9+ 404s, and 'onreadystatechange' fires before the 'error' handlerunless 'addEventListener,'
        } else
          (() => {
            n[_AEL]("load", onScriptLoad, false);
            n[_AEL](_e, onScriptError, false);
          })(); //yet that pathway not doing the 'execute, fire load event listener before next script'//node.attachEvent('onerror', STATE.onScriptError);
        n.src = url; //Calling onNodeCreated after all properties when the node have been
        if (CONFIG.onNodeCreated) CONFIG.onNodeCreated(n, CONFIG, tkn, url); //set, but before it is placed in the DOM.
        //IE 6-8 cache, script executes before the end
        scriptPends = n; //of the appendChild execution, so to tie an anonymous define
        if (baseElement) {
          head.insertBefore(n, baseElement);
        } else head.appendChild(n); //call to the thi name (which is stored when the node), hold when to a reference to thi node, but clear after the DOM insertion.
        scriptPends = null;
        return n; // bug in WebKit where the worker gets garbage-collected after calling
      } else if (isWebWorker) {
        /*(runs once to define or logical && 'Short-circuit evaluation')() */
        const e = tryCatch(
          setTimeout(() => {}, 0) &&
            //s eslint-disable-next-line
            //importScripts(url);
            STATE.completeLoad(tkn) // importScripts(): https://webkit.org/b/153317, so, Post a task to the event loop //Account for anonymous modules
        );
        e &&
          STATE[_oE](
            mk([
              "importscripts",
              `importScripts failed for ${tkn} at ${url}`,
              e,
              [tkn]
            ])
          );
        //type, msg, err, requireModules
      }
    }) &&
    //thi named by onload event, for anonymous modules or without context; IE 6-8 anonymous define() call, requires interactive document.getElementsByTagName("script")
    //...[ 'dataMain','baseElement', 'mainScript', 'subPath', 'src', 'head', 'dependency'].reduce((x,next)=>x[next]=null),
    console.log("BUILD product (of Require) :", BUILD);
  const state = {
    //This...
    //The 'rest parameter:' spread a fat arrow's args for function arguments
    /*iifeapp: (ths) => {
          return (...args) => new iifeapp(ths)(args);
          }, */ //(object/class/prototype-'thi'-prop)
    BUILD, //allows 'const' instead of 'var' _sorted_run, also needs name for instantiation inside 'BUILD' function
    requir:
      /*T(define === _n) ||*/ T(variables.REQUIREJS === _u) ||
      e_(variables.REQUIREJS).string() !== Fn
        ? BUILD // package-names, cb, returns a value to define the thi of argument index[0]
        : () => {
            //dependency = arguments[0],
            const notBaseUrl = T(variables.REQUIREJS !== _u),
              notrequire = T(require !== _n) && !e_(require).string() === Fn;
            Y(
              "configuration",
              notBaseUrl ? (variables.REQUIREJS ? notrequire : require) : null
            ) &&
              Y(
                "REQUIREJS",
                notBaseUrl ? (undefined ? notrequire : undefined) : null
              );
            //(name,baseName,applyMap,configNodeIdCompat,configMap,configPkgs)

            const obj = {
              CONFIG: (cfg) => BUILD(cfg),
              nextTick: (fn) =>
                T(setTimeout !== _n) ? setTimeout(fn, 4) : fn()
            }; // globally agreed names for other potential AMD loaders

            return Y(_K(obj).forEach((key) => (BUILD[key] = obj[key]))) &&
              // if (!require) require = BUILD; //Exportable require
              Y(
                ["version", "isBrowser"].forEach((k) => (BUILD[k] = sign[k]))
              ) &&
              //prettier-ignore
              /*jslint evil: true */
              //BUILD.exec = (text) =>new Promise((resolve, reject) =>new Function("resolve", `"use strict";return (${text})`)(resolve, text)); //eval(text);
              //BUILD.exec = (text) =>new Promise((resolve, reject) => resolve(function resolve(){"use strict";return text})); //eval(text);
              //merely to prepend with 'use strict', don't bother

              isBrowser &&
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
                          return (
                            (head = pro.head) &&
                            (dataMain = pro.dataMain) &&
                            pro
                          );
                        }
                      ) =>
                        dataMain &&
                        //Set 'head' and append children to script's parent attribute 'data-main' script to load baseUrl, if it is not already set.

                        Y((mainScript = dataMain ? dataMain : mainScript)) && //Preserve dataMain in case it is a path (i.e. contains '?')
                        (!variables.configuration.baseUrl &&
                        mainScript.indexOf("!") === -1
                          ? (src = mainScript.split("/")) &&
                            (mainScript = src.pop()) &&
                            (subPath = src.length
                              ? src.join("/") + "/"
                              : "./") &&
                            (variables.configuration.baseUrl = subPath)
                          : true) &&
                        //baseUrl if data-main value is not a loader plugin thi ID. data-main-directory as baseUrl //Strip off trailing .js mainScript, as is now a thi name.
                        (mainScript = mainScript.replace(/\.js$/, "")) && //If mainScript is still a mere path, fall back to dataMain
                        (/^[/:?.]|(.js)$/.test(mainScript)
                          ? (mainScript = dataMain)
                          : true) && //filter out STATE.dependencies that are already paths.//^\/|:|\?|\.js$
                        (variables.configuration.REM = variables.configuration
                          .REM
                          ? variables.configuration.REM.concat(mainScript)
                          : [mainScript]) //Put the data-main script in the files to load.
                    )
                )
              : true &&
                  //Set up with STATE.CONFIG info.
                  BUILD(variables.configuration);
          },
    define
  };
  return (
    Y(
      Object.keys(state).forEach(
        (key, i) => (this[key] = Object.values(state)[i])
      )
    ) && this
  );
}
/*

BUILD[prop] = function() {contexts.require[prop].apply(contexts[_],arguments)}
BUILD.onError
BUILD.createNode
BUILD.load
function Require (){return{build,require}}
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
      const { requir } = Require();
      const locs = requir("mastercard-locations");
      const places = requir("mastercard-places");
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
      //const require =  makeRequire(req, env);
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
