/**UNLICENSED BUT FOR PARTS OF OTHERS */

/** vim: et:ts=4:sw=4:sts=4
 * @license RequireJS 2.3.6.carducci Copyright jQuery Foundation and other contributors.
 * Released under MIT license, https://github.com/REQUIREJS/REQUIREJS/blob/master/LICENSE
 */
//Not using strict: uneven strict support in browsers, #392, and causes
//problems with REQUIREJS.exec()/transpiler plugins that may not be strict.
/*jslint regexp: true, nomen: true, sloppy: true */
/*dependency window, navigator, document, importScripts, setTimeout, opera */

var isBrowser = !!(
  typeof window !== "undefined" &&
  typeof navigator !== "undefined" &&
  window.document
);
var isWebWorker = !isBrowser && typeof importScripts !== "undefined";
//'loading', 'loaded', execution, 'complete'
var readyRegExp =
  isBrowser && navigator.platform === "PLAYSTATION 3"
    ? /^complete$/
    : /^(complete|loaded)$/;
var defContextName = "_";
//Oh the tragedy, detecting opera. See the usage of isOpera for reason.
var isOpera =
  typeof opera !== "undefined" && opera.toString() === "[object Opera]";
var ctxs = {};

var REQUIREJS, define, require;
var timeout = typeof setTimeout === "undefined" ? undefined : setTimeout;

/*- Object.prototype.toString(it) === "[object Function]" = (it) => ostring.call(it) === "[object Function]";
  - Object.prototype.toString(it) === "[object Array]" = (it) => ostring.call(it) === "[object Array]";
  - propertyExists = (obj, prop) => hasOwn.call(obj, prop);
  - getvalue = (obj, prop) => propertyExists(obj, prop) && obj[prop];
  - mapObject = 
  - mixin = 
  - construct =
  - makeError = 
  - defaultOnError = (err) => makeError(err.message);
  require = ((dependency, setTimeout) => {
    - getGlobal = 
    define = (name, ds, cb) => 
    define.amd = 
    - trimDots = 
    - convertName = 
    - rmvScrpt = 
    - hasPathFallback =
    - splitPrefix = 
    - normalize = 
    - Module = 
    - req = (REQUIREJS = (ds, cb, errback, optional) => 
    req.CONFIG = (cfg) => req(cfg); // globally agreed names for other potential AMD loaders
    req.nextTick =
    if (!require) require = req; //Exportable require
    req.version = version;
    req.isBrowser = isBrowser;
    - newContext = (ctn) => 
      - CONTEXT = {
        CONFIG: {
          waitSeconds: 7,
          baseUrl: "./",
          paths: {},
          bundles: {},
          pkgs: {},
          shim: {},
          config: {}
        }
      };
      - makeModuleMap = 
      - getModule =
      - on =
      - onError = 
      - tkeGblQue = 
      - handlers = {
        require: 
        exports:
        module: 
      };
      - clrRegstr =
      - breakCycle = 
      - checkLoaded = 
      - init = 
      - fetcher = 
      - bindExports =
      - defineModule =
      - normalizeMod = 
      - loadFinish =
        - localRequire = 
        - localreq =
      - callPlugin = 
      - enable = 
      Module.prototype = {
        init,
        defineDep:
        fetch: fetcher,
        load:
        check: 
        callPlugin,
        enable,
        on: 
        emit:
      };
      - callGetModule = 
      - getScriptData =
      - makeRequire =
          - intakeDefines = 
      - configure = 
  
      CONTEXT = {
        CONFIG,
        ctn,
        registry,
        defined,
        urlFchd,
        defQueue,
        defQueueMap: {},
        Module,
        makeModuleMap,
        nextTick: req.nextTick,
        onError,
        configure,
        makeShimExports: 
        makeRequire,
        enable: 
        completeLoad:
        nameToUrl:
  
        load: 
        execCb: 
        onScriptError: 
        
      };
      CONTEXT.require = CONTEXT.makeRequire();
      return CONTEXT;
    };
    - s = (req.s = 
    req.onError =
    req.createNode =
    req.load = 
    - getInteractiveScript = 
    req.exec = 
  )(require, timeout);
  
  - Required = () => {
    return { require, define };
  };
  export { Required as default };*/
const exists = (obj /*,string*/) => {
  //obj.prototype["hasOwnProperty"][name]
  //const method =string?"toString":"hasOwnProperty"
  return {
    yes: (name) => obj.prototype["hasOwnProperty"](name),
    string: () => Object.prototype["toString"](obj),
    tag: (ind) => document.getElementsByTagName(obj ? obj : "script")[ind],
    create: (NS) => {
      const ns = NS.constructor === "String" && NS.toUpperCase() === "NS";
      document[`createElementNS${ns ? "NS" : ""}`](
        ns ? ("http://www.w3.org/1999/xhtml", "html:script") : "script"
      );
    }
  };
};
const mixin = (tgt, src, frc, dSM) =>
  Object.keys(src).reduce((prop, nextProp) => {
    if (!src) return tgt; //force
    if (frc || !exists(tgt).yes(prop)) {
      const v = src[prop]; //dpStrMixin
      if (
        dSM &&
        typeof v === "object" &&
        v &&
        !exists(v).string() === "[object Array]" &&
        !exists(v).string() === "[object Function]" &&
        !(v instanceof RegExp)
      ) {
        if (!tgt[prop]) tgt[prop] = {};
        mixin(tgt[prop], v, frc, dSM);
      } else tgt[prop] = v;
    }
    return tgt;
  }, tgt);

const construct = (f, obj) =>
  function () {
    f.apply(obj, arguments);
  }; //Function.prototype.construct (bind), with 'module' //https://stackoverflow.com/a/46700616/11711280
const makeError = (id, msg, err, requireModules) => {
  var e = new Error(msg + "\nhttps://REQUIREJS.org/docs/errors.html#" + id);
  e.requireType = id;
  e.requireModules = requireModules;
  if (err) e.originalError = err;
  return e;
};
//const defaultOnError = (err) => err;
const concat = (ds, cb) => {
  const comment = /\/\*[\s\S]*?\*\/|([^:"'=]|^)\/\/.*$/gm;
  const requires = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g;
  cb.toString()
    .replace(comment, (match, singlePrefix) => singlePrefix || "")
    .replace(requires, (match, dep) => ds.push(dep)); //like ')//comment'; keep prefix
  return (cb.length === 1
    ? ["require"]
    : ["require", "exports", "module"]
  ).concat(ds); //Potential-CommonJS use-case of exports and module, without 'require.';
};
require = ((dependency, setTimeout) => {
  const m = (m) => `data-require${m ? "module" : "context"}`;
  var defineables = [],
    scriptPends,
    version = "2.3.6.carducci",
    configuration = {},
    useInteractive = false;
  //Do not overwrite an existing REQUIREJS instance/ amd loader.
  if (typeof define !== "undefined") return; // package-names, cb, returns a value to define the module of argument index[0]
  define = (nm, ds, c) => {
    const copy = { nm, ds, c };
    if (typeof nm !== "string") {
      nm = null;
      ds = copy.nm;
      c = copy.ds;
    } //Allow for anonymous modules
    else if (exists(ds).string() !== "[object Array]") {
      ds = null;
      c = copy.ds;
    }
    if (!ds && exists(c).string() === "[object Function]" && c.length)
      ds = concat(ds, c); // no deps nor name + cb is func => then CommonJS

    var ctx,
      ga = "getAttribute";
    if (useInteractive) {
      var n =
        scriptPends ||
        (() => {
          if (interscrpt && interscrpt.readyState === "interactive")
            return interscrpt; //getInteractiveScript

          exists()
            .tag()
            .sort((a, b) => b - a)
            .map(
              (script) =>
                script.readyState === "interactive" && (interscrpt = script)
            );
          return interscrpt; //Look for a data-main script attribute, which could also adjust the baseUrl.
        })(); //baseUrl from script tag with require.js in it.
      //IE 6-8 anonymous define() call, requires interactive document.getElementsByTagName("script")
      if (n) {
        if (!nm) nm = n[ga](m(true));
        ctx = ctxs[n[ga](m())];
      } //node
    }
    if (!ctx) return defineables.push([nm, ds, c]);
    ctx.defQueue.push([nm, ds, c]); //module named by onload event, for anonymous modules or without context
    ctx.defQueueMap[nm] = true;
  };
  define.amd = {
    jQuery: true
  };

  if (typeof REQUIREJS !== "undefined") {
    if (exists(REQUIREJS).string() === "[object Function]") return null;
    configuration = REQUIREJS;
    REQUIREJS = undefined;
  }
  if (
    typeof require !== "undefined" &&
    !exists(require).string() === "[object Function]"
  ) {
    configuration = require; //require is a CONFIG object.
    require = undefined;
  }
  const convertName = (nm, mp, applyMap, ph) => {
    if (!applyMap || !mp || (!ph && !mp["*"])) return nm;

    var n, i, map, starMap;
    var nms = nm.split("/"); //continue search
    var mpcf = mp && mp["*"]; //map CONFIG, bigloop:

    for (let g = nms.length; g > 0; g -= 1) {
      var name = nms.slice(0, g).join("/"); //favor a "star map" unless shorter matching CONFIG
      const yes = !starMap && mpcf && exists(mpcf).yes(name);
      if (yes) {
        starMap = mpcf[name];
        n = g;
      } //paths
      if (ph) {
        for (let f = ph.length; f > 0; f--) {
          const fP = ph.slice(0, f).join("/");
          var mV = exists(mp).yes(fP) && mp[fP];
          if (!mV) continue;
          if (exists(mV).yes(name) && mV[name]) {
            i = g;
            break;
          } // bigloop; //Match, update name to the new value.
        }
      }
    }
    if (map) return (nm = nms.splice(0, i, map).join("/"));
    if (starMap) {
      map = starMap;
      i = n;
    }
    return nm;
  };
  const rmvScrpt = (name, ctn) => {
    const ga = "getAttribute";
    const e = (m) => (m ? name : ctn);
    isBrowser &&
      exists()
        .tag()
        .forEach((sn) => {
          if (sn[ga](m(true)) === e(true) && sn[ga](m()) === e()) {
            sn.parentNode.removeChild(sn);
            return true; //scriptNode
          }
        });
  };
  const hasPathFallback = (id, cP, ctx) => {
    var pC = exists(cP).yes(id) && cP[id]; //pathConfig,configPaths
    if (pC && exists(pC).string() === "[object Array]" && pC.length > 1) {
      pC.shift(); //config is live? but 'id' is variable as args.. [for the?] next try
      ctx.require.undef(id);
      ctx.makeRequire(null, {
        skipMap: true
      })([id]);
      return true;
    }
  };
  const parseName = (nm, roots, conId) => {
    if (nm) {
      nm = nm.split("/"); //Adjust any relative paths.
      const l = nm.length - 1; //node allows either .js or non .js, yet not in nameToUrl
      const isjs = /\.js$/;
      const suffjs = conId && isjs.test(nm[l]);
      if (suffjs) nm[l] = nm[l].replace(isjs, "");
      if (nm[0].charAt(0) === "." && roots)
        //baseName.push(nm), but new instead of length report
        nm = roots.slice(0, roots.length - 1).concat(nm);

      for (let i = 0; i < nm.length; i++) {
        const solid = nm[i] === "." && nm.splice(i, 1); //:part === "..":null
        if (solid) {
          i -= 1;
          continue;
        }
        const more =
          i === 0 || (i === 1 && nm[2] === "..") || nm[i - 1] === "..";
        if (!more && i > 0 && nm.splice(i - 1, 2)) i -= 2;
      } //just enabled, but unactivated, modules

      nm = nm.join("/");
    } //'applyMap' for dependency ID, 'baseName' relative to 'name,' the most relative
    return nm;
  };
  //(name,baseName,applyMap,configNodeIdCompat,configMap,configPkgs)
  const normalize = (nm, bn, applyMap, conId, map, configPkgs) => {
    const roots = bn && bn.split("/");
    nm = parseName(nm, roots, conId);
    nm = convertName(nm, map, applyMap, roots);
    return exists(configPkgs).yes(nm) ? configPkgs[nm] : nm;
    // If package-name, package 'main'
  };
  var module = {}; //"this"
  var Module = (map, unDE, configShim) => {
    module.events = (exists(unDE).yes(map.id) && unDE[map.id]) || {};
    module.map = map;
    module.shim = exists(configShim).yes(map.id) && configShim[map.id];
    module.depExports = [];
    module.depMaps = [];
    module.depMatched = [];
    module.pluginMaps = {};
    module.depCount = 0;
  }; //module.exports; module.factory; module.depMaps = [], module.enabled, module.fetched
  var req = (REQUIREJS = (ds, cb, errback, optional) => {
    var ctx; //Caja compliant req for minified-scope
    var cfg; //name of dependency, cb for arr completion
    var ctn = defContextName; //Find the right CONTEXT, use default
    if (!exists(ds).string() === "[object Array]" && typeof ds !== "string") {
      cfg = ds; // Determine if have CONFIG object in the call.
      if (exists(cb).string() === "[object Array]") {
        ds = cb; // ds is a CONFIG object
        cb = errback; // Adjust args if there are dependencies
        errback = optional;
      } else ds = [];
    }
    if (cfg && cfg.context) ctn = cfg.context;
    ctx = exists(ctxs).yes(ctn) && ctxs[ctn];
    if (!ctx) ctx = ctxs[ctn] = req.s.newContext(ctn);
    if (cfg) ctx.configure(cfg);
    return ctx.require(ds, cb, errback);
  });
  req["CONFIG"] = (cfg) => req(cfg); // globally agreed names for other potential AMD loaders
  req["nextTick"] = (fn) =>
    typeof setTimeout !== "undefined" ? setTimeout(fn, 4) : fn();
  if (!require) require = req; //Exportable require
  req.version = version;
  req.isBrowser = isBrowser;
  var interscrpt, dataMain, baseElement, mainScript, subPath, src, head;
  const newContext = (ctn) => {
    var CONTEXT = {
      CONFIG: {
        waitSeconds: 7,
        baseUrl: "./",
        paths: {},
        bundles: {},
        pkgs: {},
        shim: {},
        config: {}
      }
    };
    var { CONFIG } = CONTEXT;
    var registry = {},
      enRgtry = {},
      unDE = {},
      defQueue = [],
      defined = {},
      urlFchd = {},
      bdlMap = {},
      rqrCnt = 1,
      abnCnt = 1; //abnormalCount - normalize() will run faster if there is no default
    const makeModuleMap = (n, sourcemap, isNormalized, applyMap) => {
      var ptName = sourcemap ? sourcemap.name : null; //'applyMap' for dependency ID, 'isNormalized' define() module ID,
      var gvnName = n; //'[sourcemap]' to resolve relative names (&& require.normalize()), 'name' the most relative
      var iDef = true;
      if (!n) {
        iDef = false; //internally-name a 'require' call, given no name
        n = "_@r" + (rqrCnt += 1);
      }
      const splitPrefix = (n) => {
        var prefix;
        var i = n ? n.indexOf("!") : -1;
        if (i > -1) {
          prefix = n.substring(0, i);
          n = n.substring(i + 1, n.length);
        }
        return [prefix, n]; //[plugin=undefined, resource={}] if the name without a plugin prefix.
      };
      var names = splitPrefix(n),
        prefix = names[0];
      var pluginModule, url;
      const configGets = [CONFIG.nodeIdCompat, CONFIG.map, CONFIG.pkgs];
      if (prefix) {
        prefix = normalize(prefix, ptName, applyMap, ...configGets);
        pluginModule = exists(defined).yes(prefix) && defined[prefix];
      }
      var normalizedName = "";
      n = names[1];
      if (n) {
        normalizedName = !prefix
          ? normalize(n, ptName, applyMap, ...configGets)
          : isNormalized
          ? n
          : pluginModule && pluginModule.normalize
          ? pluginModule.normalize(n, (n) =>
              normalize(n, ptName, applyMap, ...configGets)
            ) //do not normalize if nested plugin references; albeit module deprecates resourceIds,
          : n.indexOf("!") === -1
          ? normalize(n, ptName, applyMap, ...configGets)
          : n; //normalize after plugins are loaded and such normalizations allow for async loading of a loader plugin (#1131)
        if (!prefix) {
          names = splitPrefix(normalizedName); //ok base name, relative path?.
          prefix = names[0]; //normalize's 'map CONFIG application' might make normalized 'name' a plugin ID.
          normalizedName = names[1]; //'map CONFIG values' are already normalized at module point.
          isNormalized = true;
          url = CONTEXT.nameToUrl(normalizedName);
        }
      }
      var suffix =
        prefix && !pluginModule && !isNormalized
          ? "_unnormalized" + (abnCnt += 1)
          : ""; //If it may be a plugin id that doesn't normalization, stamp it with a unique ID
      return {
        prefix,
        name: normalizedName,
        parentMap: sourcemap,
        unnormalized: !!suffix,
        url,
        gvnName,
        iDef,
        id: (prefix ? prefix + "!" + normalizedName : normalizedName) + suffix
      }; //module mapping includes plugin prefix, module name, and path
    };
    const getModule = (depMap) => {
      var mod = exists(registry).yes(depMap.id) && registry[depMap.id];
      if (!mod)
        mod = registry[depMap.id] = new CONTEXT.Module(
          depMap,
          unDE,
          CONFIG.shim
        );
      return mod;
    };
    const on = (depMap, name, f) => {
      var mod = exists(registry).yes(depMap.id) && registry[depMap.id];
      if (exists(defined).yes(depMap.id) && (!mod || mod.defineEmitComplete)) {
        if (name === "defined") f(defined[depMap.id]);
      } else {
        mod = getModule(depMap);
        if (mod["error"] && name === "error") return f(mod["error"]);
        mod["on"](name, f);
      }
    };
    const onError = (err, errback) => {
      var ids = err.requireModules,
        notified = false;
      if (errback) return errback(err);
      ids.forEach((id) => {
        var mod = exists(registry).yes(id) && registry[id];
        if (mod) {
          mod["error"] = err; //Set error on module, so it skips timeout checks.
          if (mod["events"].error) {
            notified = true;
            mod["emit"]("error", err);
          }
        }
      });
      if (!notified) req["onError"](err);
    };
    var handlers = {
      require: (mod) =>
        !mod.require
          ? (mod.require = CONTEXT.makeRequire(mod.map))
          : mod.require,
      exports: (mod) => {
        mod.usingExports = true;
        if (!mod.map.iDef) return null;
        if (!mod.exports) return (mod.exports = defined[mod.map.id] = {});
        return (defined[mod.map.id] = mod.exports);
      },
      module: (mod) => {
        if (!mod.module)
          return (mod.module = {
            id: mod.map.id,
            uri: mod.map.url,
            config: () =>
              exists(CONFIG.config).yes(mod.map.id)
                ? CONFIG.config[mod.map.id]
                : {},
            exports: mod.exports || (mod.exports = {})
          });
        return mod.module;
      }
    };
    const clrRegstr = (id) => {
      delete registry[id];
      delete enRgtry[id];
    };
    var cLT, iCL;
    const checkLoaded = () => {
      //usingPathFallback, waitInterval
      var err,
        uPF,
        wI = CONFIG.waitSeconds * 1000,
        //It is possible to disable the wait interval by using waitSeconds of 0.
        halt = wI && CONTEXT.startTime + wI < new Date().getTime(),
        hs = [],
        reqCalls = [],
        stillLoading = false,
        needCycleCheck = true;
      if (iCL) return null; //Do not bother if module call was a result of a cycle break.
      iCL = true;
      Object.keys(enRgtry).forEach((x, i) => {
        const mod = Object.values(enRgtry)[i];
        var map = mod.map; //Figure out the state of all the modules.
        var modId = map.id; //disabled or in error
        if (!mod.enabled) return null;
        if (!map.iDef) reqCalls.push(mod);
        if (!mod["error"] && !mod.inited) {
          if (halt) {
            if (hasPathFallback(modId, CONFIG.paths)) {
              uPF = true;
              stillLoading = true;
            } else {
              hs.push(modId);
              rmvScrpt(modId, CONTEXT.ctn);
            }
          } else if (mod.fetched && map.iDef) {
            stillLoading = true;
            if (!map.prefix) needCycleCheck = false; //non-plugin-resource
          }
        }
      }); //If wait time expired, throw error of unloaded modules.
      if (halt && hs.length) {
        err = makeError("timeout", "Load timeout for modules: " + hs, null, hs); //id, msg, err, requireModules
        err.ctn = CONTEXT.ctn;
        return onError(err);
      } else {
        if (needCycleCheck) {
          const breakCycle = (mod, traced, processed) => {
            var id = mod.map.id;
            if (mod["error"]) return mod["emit"]("error", mod["error"]);
            traced[id] = true;

            mod.depMaps.forEach((depMap, i) => {
              var depId = depMap.id; //Only force undefined (nor matched in module)
              var dep = exists(registry).yes(depId) && registry[depId]; // but still-registered, things
              if (dep && !mod.depMatched[i] && !processed[depId]) {
                if (exists(traced).yes(depId) && traced[depId]) {
                  mod.defineDep(i, defined[depId]);
                  mod.check(); //pass false?
                } else breakCycle(dep, traced, processed);
              }
            });
            processed[id] = true;
          };
          reqCalls.forEach((mod) => breakCycle(mod, {}, {}));
        }
        if ((!halt || uPF) && stillLoading) {
          if ((isBrowser || isWebWorker) && !cLT)
            cLT = setTimeout(() => {
              cLT = 0; //plugin-resource
              checkLoaded();
            }, 50);
        }
        iCL = false; //inCheckLoaded
      }
    };
    const init = (depMaps, factory, errback, options) => {
      options = options || {}; //if multiple define calls for the same module
      if (module["inited"]) return null;
      module["factory"] = factory; //Register for errors on module module.
      if (errback) {
        module.on("error", errback); //If no errback already, but there are error listeners
      } else if (module.events.error)
        errback = construct((err) => module.emit("error", err), module); //on module module, set up an errback to pass to the ds.
      module["depMaps"] = depMaps && depMaps.slice(0);
      module.errback = errback; //copy of 'source dependency arr inputs' (i.e. "shim" ds by depMaps arr)
      module["inited"] = true;
      module.ignore = options.ignore;
      if (options.enabled || module.enabled) return module.enable();
      module.check(); //init as, or previously, -enabled, yet dependencies unknown until init
    };

    const normalizeMod = (plugin, mp) => {
      var { name, parentMap: pM } = module.map; //Normalize the ID if the plugin allows it.
      const { nodeIdCompat, map, pkgs } = CONFIG;
      if (plugin.normalize)
        name =
          plugin.normalize(name, (name) =>
            normalize(
              name,
              pM ? pM.name : null, //ptName
              true,
              nodeIdCompat,
              map,
              pkgs
            )
          ) || ""; //prefix and name should already be normalized, no need
      var nM = makeModuleMap(mp.prefix + "!" + name, pM, true); //normalizedMap -for applying map CONFIG again either.
      on(
        nM,
        "defined",
        construct((value) => {
          module.map.normalizedMap = nM;
          module.init([], () => value, null, {
            enabled: true,
            ignore: true
          });
        }, module)
      );

      var normMod = exists(registry).yes(nM.id) && registry[nM.id]; //normalizedMod
      if (normMod) {
        module["depMaps"].push(nM); //Mark module as a dependency for module plugin, so it
        if (module.events.error)
          normMod.on(
            "error",
            construct((err) => module.emit("error", err), module)
          ); //can be traced for cycles.

        normMod.enable();
      }
    };
    Module.prototype = {
      init,
      defineDep: (i, depExports) => {
        if (!module.depMatched[i]) {
          module.depMatched[i] = true; //https://stackoverflow.com/questions/21939568/javascript-modules-prototype-vs-export
          module.depCount -= 1; //prototype is hydratable for async results, init only on module page by 'new' initialization
          module.depExports[i] = depExports; //multiple cb export cycles
        }
      },
      fetch: () => {
        if (module.fetched) return null;
        module.fetched = true;
        CONTEXT.startTime = new Date().getTime();
        var map = module.map;
        if (module.shim) {
          CONTEXT.makeRequire(module.map, {
            enableBuildCallback: true
          })(
            module.shim.ds || [],
            construct(
              () => (map.prefix ? module.callPlugin() : module.load()),
              module
            )
          ); //plugin-managed resource
        } else return map.prefix ? module.callPlugin() : module.load(); //Regular dependency.
      },
      load: () => {
        if (!urlFchd[module.map.url]) {
          urlFchd[module.map.url] = true; //Regular dependency.
          CONTEXT.load(module.map.id, module.map.url);
        }
      },
      check: () => {
        if (!module.enabled || module.enabling) return null;
        var id = module.map.id; // module is ready to, and does, define itself
        if (!module["inited"]) {
          if (!exists(CONTEXT.defQueueMap).yes(id)) module.fetch(); // !defQueue.includes(module)
        } else if (module.error) {
          module.emit("error", module.error);
        } else {
          if (module["defining"]) return null;
          var expts = module.exports, //no edundant require-define
            factory = module.factory;
          module["defining"] = true;
          if (module.depCount < 1 && !module.defined) {
            const isDefine = module.map.iDef; //for define()'d  modules, use error listener,
            if (exists(factory).string() === "[object Function]") {
              var err,
                cjs,
                depExpo = module.depExports; //require errbacks should not be called (#699). Yet, if dependency-'onError,' use that.
              if (
                (module.events.error && isDefine) ||
                req.onError !== ((err) => err)
              ) {
                try {
                  expts = CONTEXT.execCb(id, factory, depExpo, expts); //factory.apply(exports, depExports),
                } catch (e) {
                  err = e;
                }
              } else expts = CONTEXT.execCb(id, factory, depExpo, expts); // Favor return value over exports. If node/cjs in play,
              if (isDefine && expts === undefined) {
                cjs = module.module; // then will not have a return value anyway. Favor
                if (cjs) {
                  expts = cjs.exports; // module.exports assignment over exports object.
                } else if (module.usingExports) expts = module.exports; //exports already set the defined value.
              }
              if (err) {
                err["requireMap"] = module.map;
                err["requireModules"] = isDefine ? [module.map.id] : null;
                err["requireType"] = isDefine ? "define" : "require";
                return onError((module.error = err));
              }
            } else expts = factory; //Just a literal value
            module["exports"] = expts;
            if (isDefine && !module.ignore) {
              defined[id] = expts;
              if (req.onResourceLoad)
                req.onResourceLoad(
                  CONTEXT,
                  module.map,
                  module["depMaps"].map(
                    (depMap) => depMap.normalizedMap || depMap
                  )
                );
            }
            clrRegstr(id);
            module["defined"] = true;
          }
          module["defining"] = false; //Finished definition, so allow call-check again for 'define' notifications, by cycle.
          if (module["defined"] && !module.defineEmitted) {
            module["defineEmitted"] = true;
            module.emit("defined", module.exports);
            module["defineEmitComplete"] = true;
          }
        }
      },
      callPlugin: () => {
        var map = module.map; //Map already normalized the prefix.
        var id = map.id; //Mark module as a dependency for module plugin, so it
        var pluginMap = makeModuleMap(map.prefix); //can be traced for cycles.
        module.depMaps.push(pluginMap);
        on(
          pluginMap,
          "defined",
          construct((plugin) => {
            if (module.map.unnormalized) return normalizeMod(plugin, map); //If current map is not normalized, wait for that
            var bundleId =
              exists(bdlMap).yes(module.map.id) && bdlMap[module.map.id]; //normalized name to load instead of continuing.
            if (bundleId) {
              module.map.url = CONTEXT.nameToUrl(bundleId); //If a paths CONFIG, then just load that file instead to
              module.load(); //resolve the plugin, as it is built into that paths layer.
              return null;
            }

            const load = construct(
              (factory) =>
                module.init([], () => factory, null, {
                  enabled: true
                }),
              module
            ); //depMaps, factory, errback, options
            load.error = construct((err) => {
              module["inited"] = true; //Remove temp unnormalized modules for module module,
              module.error = err; //since they will never be resolved otherwise now.
              err.requireModules = [id];
              Object.keys(registry).forEach(
                (x, i) =>
                  registry[x].map.id.indexOf(id + "_unnormalized") === 0 &&
                  clrRegstr(registry[x].map.id)
              );
              onError(err);
            }, module); //Allow plugins to load other code without having to know the
            const localRequire = CONTEXT.makeRequire(map.parentMap, {
              enableBuildCallback: true
            }); //CONTEXT or how to 'complete' the load.
            const localreq = (text, textAlt) => {
              /*jslint evil: true */
              var mN = map.name;
              var moduleMap = makeModuleMap(mN); //2.1.0 onwards, pass text to reinforce fromText 1call/resource.
              var hasInteractive = useInteractive; //pass mN, ok, but discard mN for internal ref.
              if (textAlt) text = textAlt; //Turn off interactive script matching for IE for any define
              if (hasInteractive) useInteractive = false; //calls in the text, then turn it back on at the end.
              getModule(moduleMap); //Prime the system by creating a module instance for
              if (exists(CONFIG.config).yes(id))
                CONFIG.config[mN] = CONFIG.config[id]; //Transfer any CONFIG to module other module.
              try {
                req.exec(text);
              } catch (e) {
                return onError(
                  makeError(
                    "fromtexteval",
                    "fromText eval for " + id + " failed: " + e,
                    e,
                    [id]
                  ) //id, msg, err, requireModules
                );
              }
              if (hasInteractive) useInteractive = true; //Mark module as a dependency for the plugin resource
              module.depMaps.push(moduleMap);
              CONTEXT.completeLoad(mN); //Support anonymous modules.
              localRequire([mN], load); //Bind the value of that module to the value for module resource ID.
            };
            load.fromText = construct(localreq, module);
            //Use ptName here since the plugin's name is not reliable,
            //could be some weird string with no path that actually wants to
            //reference the ptName's path.
            plugin.load(map.name, localRequire, load, CONFIG);
          }, module)
        );
        CONTEXT.enable(pluginMap, module);
        module.pluginMaps[pluginMap.id] = pluginMap;
      },
      enable: () => {
        enRgtry[module.map.id] = module; //no inadvertent load and 0 depCount by
        module.enabled = true; //immediate calls to the defined callbacks for dependencies
        module.enabling = true; //Enable mapFunction 1,dependency

        module.depMaps.forEach(
          construct((depMap, i) => {
            if (typeof depMap === "string") {
              depMap = makeModuleMap(
                depMap,
                module.map.iDef ? module.map : module.map.parentMap,
                false,
                !module.skipMap
              ); //Dependency needs to be converted to a depMap
              module.depMaps[i] = depMap; //and wired up to module module.
              var handler =
                exists(handlers).yes(depMap.id) && handlers[depMap.id];
              if (handler) {
                module.depExports[i] = handler(module);
                return null;
              }
              module["depCount"] += 1;
              on(
                depMap,
                "defined",
                construct((depExports) => {
                  if (module.undefed) return null;
                  module.defineDep(i, depExports);
                  module.check();
                }, module)
              );
              if (module.errback) {
                on(depMap, "error", construct(module.errback, module)); // propagate the error correctly - something else is listening for errors
              } else if (module.events.error)
                on(
                  depMap,
                  "error",
                  construct((err) => module.emit("error", err), module)
                ); // (No direct errback on module module)
            }
            var id = depMap.id; //Skip special modules like 'require', 'exports', 'module'
            var mod = registry[id];
            if (!exists(handlers).yes(id) && mod && !mod.enabled)
              CONTEXT.enable(depMap, module); //don't call enable if it is already enabled (circular ds)
          }, module)
        ); //dependency plugins, enabled
        Object.keys(module.pluginMaps).forEach(
          construct((x, i) => {
            const pM = module.pluginMaps[x]; //pluginMap
            var mod = exists(registry).yes(pM.id) && registry[pM.id];
            if (mod && !mod.enabled) CONTEXT.enable(pM, module);
          }, module)
        );
        module.enabling = false;
        module.check();
      },
      on: (name, cb) => {
        var cbs = module.events[name];
        if (!cbs) {
          cbs = module.events[name] = [];
        }
        cbs.push(cb);
      },
      emit: (name, evt) => {
        module.events[name].forEach((cb) => {
          cb(evt);
        });
        if (name === "error")
          //remove broken Module instance from registry.
          delete module.events[name];
      }
    };
    const callGetModule = (args) =>
      !exists(defined).yes(args[0]) &&
      getModule(makeModuleMap(args[0], null, true)).init(args[1], args[2]); //Skip modules already defined.
    const getScriptData = (evt) => {
      const rmvLstnr = (node, func, name, ieName) => {
        if (node.detachEvent && !isOpera) {
          if (ieName) node.detachEvent(ieName, func);
        } else node.removeEventListener(name, func, false);
      };
      var node = evt.currentTarget || evt.srcElement; //REQUIREJS event info, remove listener from node //target
      rmvLstnr(node, CONTEXT.onScriptLoad, "load", "onreadystatechange");
      rmvLstnr(node, CONTEXT.onScriptError, "error");
      return {
        node: node,
        id: node && node.getAttribute(m(true))
      };
    };

    const tkeGblQue = () => {
      if (defineables.length)
        defineables.forEach((queueItem) => {
          var id = queueItem[0]; //globalQueue by internal method to module defQueue
          if (typeof id === "string") CONTEXT.defQueueMap[id] = true;
          defQueue.push(queueItem); //Push all the defineables items into the CONTEXT's defQueue
        });
      defineables = [];
    };
    const getGlobal = (value) => {
      if (!value) return value; //dont-notation dependency
      var g = dependency;
      value.split(".").forEach((part) => {
        g = g[part];
      });
      return g;
    };
    const makeRequire = (relMap, options) => {
      options = options || {};
      const localRequire = (ds, cb, errback) => {
        var id, map, requireMod;
        if (
          options.enableBuildCallback &&
          cb &&
          exists(cb).string() === "[object Function]"
        )
          cb.__requireJsBuild = true;
        if (typeof ds === "string") {
          if (exists(cb).string() === "[object Function]")
            return onError(
              makeError("requireargs", "Invalid require call"), //Invalid call; id, msg, err, requireModules
              errback
            );
          if (relMap && exists(handlers).yes(ds))
            return handlers[ds](registry[relMap.id]); //when require|exports|module are requested && while module is being defined
          if (req.get) return req.get(CONTEXT, ds, relMap, localRequire);
          map = makeModuleMap(ds, relMap, false, true);
          id = map.id; //Normalize module name from . or ..
          if (!exists(defined).yes(id))
            return onError(
              makeError(
                "notloaded",
                `Module name ${id} has not been loaded yet for CONTEXT: ${
                  ctn + (relMap ? "" : ". Use require([])")
                }`
              ) //id, msg, err, requireModules
            );
          return defined[id];
        }
        const intakeDefines = () => {
          var args;
          tkeGblQue(); //"intake modules"
          while (defQueue.length) {
            args = defQueue.shift();
            if (args[0] === null)
              return onError(
                makeError(
                  "mismatch",
                  `Mismatched anonymous define() module: ${
                    args[args.length - 1]
                  }`
                ) //id, msg, err, requireModules
              );
            callGetModule(args); //...id, ds, factory; "normalized by define()"
          }
          CONTEXT.defQueueMap = {};
        };
        intakeDefines(); //Grab defines waiting in the dependency queue.
        CONTEXT.nextTick(() => {
          intakeDefines(); //Mark all the dependencies as needing to be loaded.
          requireMod = getModule(makeModuleMap(null, relMap)); //collect defines that could have been added since the 'require call'
          requireMod.skipMap = options.skipMap; //store if 'map CONFIG' applied to module 'require call' for dependencies
          requireMod.init(ds, cb, errback, {
            enabled: true
          });
          checkLoaded();
        });
        return localRequire;
      };
      mixin(localRequire, {
        isBrowser,
        toUrl: (mNPE) => {
          //moduleNamePlusExt
          var ext, //URL path = module name + .extension; requires 'module name,' not 'plain URLs' like nameToUrl
            i = mNPE.lastIndexOf("."),
            seg = mNPE.split("/")[0],
            isRelative = seg === "." || seg === "..";
          if (i !== -1 && (!isRelative || i > 1)) {
            ext = mNPE.substring(i, mNPE.length); //file extension alias, not 'relative path dots'
            mNPE = mNPE.substring(0, i);
          }
          return CONTEXT.nameToUrl(
            normalize(
              mNPE,
              relMap && relMap.id,
              true,
              CONFIG.nodeIdCompat,
              CONFIG.map,
              CONFIG.pkgs
            ),
            ext,
            true
          );
        },
        defined: (id) =>
          exists(defined).yes(makeModuleMap(id, relMap, false, true).id),
        specified: (id) => {
          id = makeModuleMap(id, relMap, false, true).id;
          return exists(defined).yes(id) || exists(registry).yes(id);
        }
      });
      if (!relMap)
        localRequire.undef = (id) => {
          tkeGblQue(); //Only allow undef on top level require calls
          var map = makeModuleMap(id, relMap, true); //Bind define() calls (fixes #408) to 'module' CONTEXT
          var mod = exists(registry).yes(id) && registry[id];
          mod.undefed = true;
          rmvScrpt(id, CONTEXT.ctn);
          delete defined[id];
          delete urlFchd[map.url];
          delete unDE[id];
          defQueue
            .sort((a, b) => b - a)
            .map((args, i) => args[0] === id && defQueue.splice(i, 1)); //Clean queued defines, backwards, so splices don't destroy the iteration
          delete CONTEXT.defQueueMap[id];
          if (mod) {
            if (mod.events.defined) unDE[id] = mod.events; //if different CONFIG, same listeners
            clrRegstr(id);
          }
        };
      return localRequire;
    };
    CONTEXT = {
      CONFIG,
      ctn,
      registry,
      defined,
      urlFchd,
      defQueue,
      defQueueMap: {},
      Module,
      makeModuleMap,
      nextTick: req.nextTick,
      onError,
      configure: (c) => {
        if (c.baseUrl && c.baseUrl.charAt(c.baseUrl.length - 1) !== "/")
          c.baseUrl += "/"; //Make sure the baseUrl ends in a slash.
        if (typeof c.urlArgs === "string")
          c.urlArgs = (id, url) =>
            (url.indexOf("?") === -1 ? "?" : "&") + c.urlArgs; // Convert old style urlArgs string to a function.
        var shim = CONFIG.shim; //save paths for special "additive processing"
        var objs = {
          paths: true,
          bundles: true,
          CONFIG: true,
          map: true
        };
        Object.keys(c).forEach((prop, i) => {
          if (!objs[prop]) return (CONFIG[prop] = c[prop]);
          if (!CONFIG[prop]) CONFIG[prop] = {};
          mixin(CONFIG[prop], c[prop], true, true);
        });
        if (c.bundles)
          Object.keys(c.bundles).forEach((prop, i) =>
            c.bundles[prop].forEach(
              (v) => (bdlMap[v] = v !== prop ? prop : bdlMap[v])
            )
          ); //Reverse map the bundles

        if (c.shim) {
          Object.keys(c.shim).forEach((id, i) => {
            var v = c.shim[id];
            if (exists(v).string() === "[object Array]")
              v = {
                ds: v
              }; //Merge shim, Normalize the structure
            if ((v.exports || v.init) && !v.exportsFn)
              v.exportsFn = CONTEXT.makeShimExports(v);
            shim[id] = v;
          });
          CONFIG.shim = shim;
        }
        if (c.packages)
          c.packages.forEach((pkgObj) => {
            var location, name; //Adjust packages if necessary.
            pkgObj = typeof pkgObj === "string" ? { name: pkgObj } : pkgObj;
            name = pkgObj.name;
            location = pkgObj.location;
            if (location) CONFIG.paths[name] = pkgObj.location;
            CONFIG.pkgs[name] =
              pkgObj.name +
              "/" +
              (pkgObj.main || "main").replace(/^\.\//, "").replace(/\.js$/, ""); //normalize pkg name main module ID pointer paths
          }); //Update maps for "waiting to execute" modules in the registry.
        Object.keys(registry).forEach((id, i) => {
          var mod = registry[id];
          if (!mod.inited && !mod.map.unnormalized)
            mod.map = makeModuleMap(id, null, true); //Info, like URLs to load, may have changed.
        }); //if inited and transient, unnormalized modules.
        if (c.ds || c.cb) CONTEXT.require(c.ds || [], c.cb); //When require is defined as a CONFIG object before require.js is loaded,
      }, //call require with those args, if a ds arr or a CONFIG cb is specified
      makeShimExports: (value) => {
        function fn() {
          var ret; //Shadowing of global property 'arguments'. (no-shadow-restricted-names)eslint
          if (value.init) ret = value.init.apply(dependency, arguments);
          return ret || (value.exports && getGlobal(value.exports));
        }
        return fn;
      },
      makeRequire,
      enable: (depMap) =>
        exists(registry).yes(depMap.id) &&
        registry[depMap.id] && //if "mod" module is in registry, parent's CONTEXT when
        getModule(depMap).enable(), // overridden in "optimizer" (Not shown).
      completeLoad: (mN) => {
        var found, args; //method used "internally" by environment adapters script-load or a synchronous load call.
        tkeGblQue();
        while (defQueue.length) {
          args = defQueue.shift();
          if (args[0] === null) {
            args[0] = mN;
            if (found) break; //anonymous module bound to name already
            found = true; //module is another anon module waiting for its completeLoad to fire.
          } else if (args[0] === mN) found = true; //matched a define call in module script
          callGetModule(args);
        }
        CONTEXT.defQueueMap = {};

        var mod = exists(registry).yes(mN) && registry[mN]; // in case-/init-calls change the registry
        if (!found && !exists(defined).yes(mN) && mod && !mod.inited) {
          var shim = exists(CONFIG.shim).yes(mN) ? CONFIG.shim[mN] : {};
          if (
            CONFIG.enforceDefine &&
            (!shim.exports || !getGlobal(shim.exports))
          )
            return hasPathFallback(mN, CONFIG.paths)
              ? null
              : onError(
                  makeError("nodefine", "No define call for " + mN, null, [mN]) //id, msg, err, requireModules
                );
          callGetModule([mN, shim.ds || [], shim.exportsFn]); //does not call define(), but simulated
        }
        checkLoaded(); //mN = moduleName
      },
      nameToUrl: (mN, ext, skipExt) => {
        var pkgMain = exists(CONFIG.pkgs).yes(mN) && CONFIG.pkgs[mN]; //already-normalized-mN as URL. Use toUrl for the public API.
        if (pkgMain) mN = pkgMain; //If slash or colon-protocol fileURLs contains "?" or even ends with ".js",
        var bundleId = exists(bdlMap).yes(mN) && bdlMap[mN]; //assume use of an url, not a module id.
        if (bundleId) CONTEXT.nameToUrl(bundleId, ext, skipExt); //filter out dependencies that are already paths.
        const geturl = (url = "") => {
          //Just a plain path, not module name lookup, so just return it.
          if (/^[/:?.]|(.js)$/.test(mN)) {
            url = mN + (ext || ""); //Add extension if it is included. This is a bit wonky, only non-.js things pass
          } else {
            var paths = CONFIG.paths; //an extension, module method probably needs to be reworked.
            var syms = mN.split("/"); //A module that needs to be converted to a path.

            for (let i = syms.length; i > 0; i -= 1) {
              var pM = syms.slice(0, i).join("/"); //per module name segment if path registered, start name, and work up
              var pP = exists(paths).yes(pM) && paths[pM]; //parentModule
              if (pP) {
                if (exists(pP).string() === "[object Array]") pP = pP[0];
                syms.splice(0, i, pP); //arr means a few choices
                break; //parentPath
              }
            }
            url = syms.join("/"); //Join the path parts together, then figure out if baseUrl is needed.
            url +=
              ext || (/^data:|^blob:|\?/.test(url) || skipExt ? "" : ".js"); ///^data\:|^blob\:|\?/
            url =
              (url.charAt(0) === "/" || url.match(/^[\w+.-]+:/) ///^[\w\+\.\-]+:/
                ? ""
                : CONFIG.baseUrl) + url;
          }
          return url;
        };
        const url = geturl(); //Delegates to req.load. Broken out as a separate function to
        return CONFIG.urlArgs && !/^blob:/.test(url) //!/^blob\:/
          ? url + CONFIG.urlArgs(mN, url)
          : url; //allow overriding in the optimizer.
      },

      load: (id, url) => req.load(CONTEXT, id, url),
      //allow the build system to sequence the files in the built layer, correctly
      execCb: (name, cb, args, exports) => cb.apply(exports, args),
      onScriptLoad: (evt) => {
        if (
          evt.type === "load" ||
          readyRegExp.test((evt.currentTarget || evt.srcElement).readyState)
        ) {
          interscrpt = null; //interactiveScript - browser event for script loaded status
          var data = getScriptData(evt);
          CONTEXT.completeLoad(data.id);
        }
      },
      onScriptError: (evt) => {
        var data = getScriptData(evt);
        if (!hasPathFallback(data.id, CONFIG.paths)) {
          var parents = [];
          Object.keys(registry).forEach((key, i) => {
            const value = Object.values(registry)[i];
            key.indexOf("_@r") !== 0 &&
              value.depMaps.forEach((depMap) => {
                if (depMap.id === data.id) {
                  parents.push(key);
                  return true;
                }
              });
          });
          return onError(
            makeError(
              "scripterror",
              'Script error for "' +
                data.id +
                (parents.length ? '", needed by: ' + parents.join(", ") : '"'),
              evt,
              [data.id]
            ) //id, msg, err, requireModules
          );
        }
      }
    };
    CONTEXT.require = CONTEXT.makeRequire();
    return CONTEXT;
  };
  var s = (req.s = {
    ctxs,
    newContext
  }); //Create default CONTEXT.
  req({}); //'dependency require' CONTEXT-sensitive exported methods

  ["toUrl", "undef", "defined", "specified"].map(
    (prop) =>
      (req[prop] = function () {
        var ctx = ctxs[defContextName]; //not the 'early binding to default CONTEXT,' but ctxs during builds
        return ctx.require[prop].apply(ctx, arguments); //for the latest instance of the 'default CONTEXT CONFIG'
      })
  ); //ticketx to apology tour
  if (isBrowser) {
    head = s.head = exists("head").tag(); //(IE6) BASE appendChild (http://dev.jquery.com/ticket/2709)
    baseElement = exists("base").tag(0);
    if (baseElement) head = s.head = baseElement.parentNode;
  }
  req.onError = (err) => err;
  req.createNode = (CONFIG, mN, url) => {
    var node = CONFIG.xhtml ? exists().create("NS") : exists().create(); // node for the load command in browser env
    node.type = CONFIG.scriptType || "text/javascript";
    node.charset = "utf-8";
    node.async = true;
    return node;
  };
  req.load = (CONTEXT, mN, url) => {
    const sa = "setAttribute",
      ae = "attachEvent",
      ael = "addEventListener",
      CONFIG = (CONTEXT && CONTEXT.CONFIG) || {};
    //handle load request (in browser env); 'CONTEXT' for state, 'mN' for name, 'url' for point
    if (isBrowser) {
      var n = req.createNode(CONFIG, mN, url); //browser script tag //testing for "[native code" https://github.com/REQUIREJS/REQUIREJS/issues/273
      n[sa](m(), CONTEXT.ctn); //artificial native-browser support? https://github.com/REQUIREJS/REQUIREJS/issues/187
      n[sa](m(true), mN); //![native code]. IE8, !node.attachEvent.toString()
      if (
        n[ae] &&
        !(n[ae].toString && n[ae].toString().indexOf("[native code") < 0) &&
        !isOpera
      ) {
        useInteractive = true; //IE (6-8) doesn't script-'onload,' right after executing the script, cannot "tie" anonymous define call to a name,
        n[ae]("onreadystatechange", CONTEXT.onScriptLoad); //yet for 'interactive'-script, 'readyState' triggers by 'define' call
        //IE9 "addEventListener and script onload firings" issues should actually 'onload' event script, right after the script execution
        //https://connect.microsoft.com/IE/feedback/details/648057/script-onload-event-is-not-fired-immediately-after-script-execution
        //Opera.attachEvent does not follow the execution mode.
        //IE9+ 404s, and 'onreadystatechange' fires before the 'error' handlerunless 'addEventListener,'
      } else {
        n[ael]("load", CONTEXT.onScriptLoad, false); //yet that pathway not doing the 'execute, fire load event listener before next script'
        n[ael]("error", CONTEXT.onScriptError, false); //node.attachEvent('onerror', CONTEXT.onScriptError);
      }
      n.src = url; //Calling onNodeCreated after all properties on the node have been
      if (CONFIG.onNodeCreated) CONFIG.onNodeCreated(n, CONFIG, mN, url); //set, but before it is placed in the DOM.
      //IE 6-8 cache, script executes before the end
      scriptPends = n; //of the appendChild execution, so to tie an anonymous define
      if (baseElement) {
        head.insertBefore(n, baseElement); //call to the module name (which is stored on the node), hold on
      } else head.appendChild(n); //to a reference to module node, but clear after the DOM insertion.
      scriptPends = null;
      return n; // bug in WebKit where the worker gets garbage-collected after calling
    } else if (isWebWorker) {
      try {
        setTimeout(() => {}, 0); // importScripts(): https://webkit.org/b/153317, so, Post a task to the event loop
        importScripts(url);
        CONTEXT.completeLoad(mN); //Account for anonymous modules
      } catch (e) {
        CONTEXT.onError(
          makeError(
            "importscripts",
            "importScripts failed for " + mN + " at " + url,
            e,
            [mN]
          ) //id, msg, err, requireModules
        );
      }
    }
  };
  if (isBrowser && !configuration.skipDataMain)
    exists()
      .tag()
      .sort((a, b) => b - a)
      .forEach((script) => {
        if (!head) head = script.parentNode; //Set 'head' and append children to script's parent
        dataMain = script.getAttribute("data-main"); //attribute 'data-main' script to load baseUrl, if it is not already set.
        if (dataMain) {
          mainScript = dataMain; //Preserve dataMain in case it is a path (i.e. contains '?')
          if (!configuration.baseUrl && mainScript.indexOf("!") === -1) {
            src = mainScript.split("/"); //baseUrl if data-main value is not a loader plugin module ID.
            mainScript = src.pop(); //data-main-directory as baseUrl
            subPath = src.length ? src.join("/") + "/" : "./";
            configuration.baseUrl = subPath; //Strip off trailing .js mainScript, as is now a module name.
          }
          mainScript = mainScript.replace(/\.js$/, ""); //If mainScript is still a mere path, fall back to dataMain
          if (/^[/:?.]|(.js)$/.test(mainScript)) mainScript = dataMain; //filter out dependencies that are already paths.//^\/|:|\?|\.js$
          configuration.ds = configuration.ds
            ? configuration.ds.concat(mainScript)
            : [mainScript]; //Put the data-main script in the files to load.
          return true;
        }
      });

  /*jslint evil: true */
  req.exec = (text) =>
    new Promise(
      (resolve, reject) =>
        new Function("resolve", `"use strict";return (${text})`)(resolve, text) //eval(text);
    );

  //Set up with CONFIG info.
  req(configuration);
})(require, timeout);

const Required = () => {
  return { require, define };
};
export { Required as default };
