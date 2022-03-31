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
  - bind =
  - makeError = 
  - defaultOnError = (err) => makeError(err.message);
  require = ((dependency, setTimeout) => {
    - getGlobal = 
    define = (name, ds, cb) => 
    define.amd = 
    - trimDots = 
    - convertName = 
    - removeScript = 
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
      - takeGlobalQueue = 
      - handlers = {
        require: 
        exports:
        module: 
      };
      - cleanRegistry =
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
        urlFetched,
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
const mixin = (target, source, force, deepStringMixin) => {
  if (source)
    Object.keys(source).forEach((prop, i) => {
      const value = Object.values(source)[i];
      if (force || !exists(target).yes(prop)) {
        if (
          deepStringMixin &&
          typeof value === "object" &&
          value &&
          !exists(value).string() === "[object Array]" &&
          !exists(value).string() === "[object Function]" &&
          !(value instanceof RegExp)
        ) {
          if (!target[prop]) target[prop] = {};
          mixin(target[prop], value, force, deepStringMixin);
        } else target[prop] = value;
      }
    });
  return target; // If non-redundant, stop
};
const bind = (obj, f) =>
  function () {
    f.apply(obj, arguments);
  }; //Function.prototype.bind, with 'module'
const makeError = (id, msg, err, requireModules) => {
  var e = new Error(msg + "\nhttps://REQUIREJS.org/docs/errors.html#" + id);
  e.requireType = id;
  e.requireModules = requireModules;
  if (err) e.originalError = err;
  return e;
};
const defaultOnError = (err) => err;
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
  var defineables = [];
  var currentlyAddingScript,
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
      ga = "getAttribute",
      getInteractiveScript = () => {
        if (interscrpt && interscrpt.readyState === "interactive")
          return interscrpt;

        exists()
          .tag()
          .sort((a, b) => b - a)
          .map(
            (script) =>
              script.readyState === "interactive" && (interscrpt = script)
          );
        return interscrpt; //Look for a data-main script attribute, which could also adjust the baseUrl.
      }; //baseUrl from script tag with require.js in it.
    if (useInteractive) {
      var n = currentlyAddingScript || getInteractiveScript(); //node
      //IE 6-8 anonymous define() call, requires interactive document.getElementsByTagName("script")
      if (n) {
        if (!nm) nm = n[ga](m(true));
        ctx = ctxs[n[ga](m())];
      }
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
  const removeScript = (name, ctn) => {
    const sa = "getAttribute";
    const e = (m) => (m ? name : ctn);
    isBrowser &&
      exists()
        .tag()
        .forEach((sn) => {
          if (sn[sa](m(true)) === e(true) && sn[sa](m()) === e()) {
            sn.parentNode.removeChild(sn);
            return true; //scriptNode
          }
        });
  };
  const hasPathFallback = (id, configPaths, ctx) => {
    var pC = exists(configPaths).yes(id) && configPaths[id]; //pathConfig
    if (pC && exists(pC).string() === "[object Array]" && pC.length > 1) {
      pC.shift(); //next try
      ctx.require.undef(id);
      ctx.makeRequire(null, {
        skipMap: true
      })([id]); //no map translation, ID, absolutely-, already mapped/resolved.
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
  var Module = (map, undefEvents, configShim) => {
    module.events =
      (exists(undefEvents).yes(map.id) && undefEvents[map.id]) || {};
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
    var inCheckLoaded,
      checkLoadedTimeoutId,
      registry = {},
      enabledRegistry = {},
      undefEvents = {},
      defQueue = [],
      defined = {},
      urlFetched = {},
      bundlesMap = {},
      requireCounter = 1,
      unnormalizedCounter = 1; //normalize() will run faster if there is no default
    const makeModuleMap = (name, sourcemap, isNormalized, applyMap) => {
      var parentName = sourcemap ? sourcemap.name : null; //'applyMap' for dependency ID, 'isNormalized' define() module ID,
      var givenname = name; //'[sourcemap]' to resolve relative names (&& require.normalize()), 'name' the most relative
      var isDefine = true;
      if (!name) {
        isDefine = false; //internally-name a 'require' call, given no name
        name = "_@r" + (requireCounter += 1);
      }
      const configGets = [CONFIG.nodeIdCompat, CONFIG.map, CONFIG.pkgs];
      const splitPrefix = (name) => {
        var prefix;
        var i = name ? name.indexOf("!") : -1;
        if (i > -1) {
          prefix = name.substring(0, i);
          name = name.substring(i + 1, name.length);
        }
        return [prefix, name]; //[plugin=undefined, resource={}] if the name without a plugin prefix.
      };
      var names = splitPrefix(name);
      var prefix = names[0];
      name = names[1];
      var pluginModule, url;
      if (prefix) {
        prefix = normalize(prefix, parentName, applyMap, ...configGets);

        pluginModule = exists(defined).yes(prefix) && defined[prefix];
      }
      var normalizedName = "";
      if (name) {
        normalizedName = !prefix
          ? normalize(name, parentName, applyMap, ...configGets)
          : isNormalized
          ? name
          : pluginModule && pluginModule.normalize
          ? pluginModule.normalize(name, (name) =>
              normalize(name, parentName, applyMap, ...configGets)
            ) //do not normalize if nested plugin references; albeit module deprecates resourceIds,
          : name.indexOf("!") === -1
          ? normalize(name, parentName, applyMap, ...configGets)
          : name; //normalize after plugins are loaded and such normalizations allow for async loading of a loader plugin (#1131)
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
          ? "_unnormalized" + (unnormalizedCounter += 1)
          : ""; //If it may be a plugin id that doesn't normalization, stamp it with a unique ID
      return {
        prefix,
        name: normalizedName,
        parentMap: sourcemap,
        unnormalized: !!suffix,
        url,
        givenname,
        isDefine,
        id: (prefix ? prefix + "!" + normalizedName : normalizedName) + suffix
      }; //module mapping includes plugin prefix, module name, and path
    };
    const getModule = (depMap) => {
      var mod = exists(registry).yes(depMap.id) && registry[depMap.id];
      if (!mod)
        mod = registry[depMap.id] = new CONTEXT.Module(
          depMap,
          undefEvents,
          CONFIG.shim
        );
      return mod;
    };
    const on = (depMap, name, fn) => {
      var mod = exists(registry).yes(depMap.id) && registry[depMap.id];
      if (exists(defined).yes(depMap.id) && (!mod || mod.defineEmitComplete)) {
        if (name === "defined") fn(defined[depMap.id]);
      } else {
        mod = getModule(depMap);
        if (mod["error"] && name === "error") return fn(mod["error"]);
        mod["on"](name, fn);
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
        if (!mod.map.isDefine) return null;
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
    const cleanRegistry = (id) => {
      delete registry[id];
      delete enabledRegistry[id];
    };
    const checkLoaded = () => {
      var err,
        usingPathFallback,
        waitInterval = CONFIG.waitSeconds * 1000,
        //It is possible to disable the wait interval by using waitSeconds of 0.
        expired =
          waitInterval &&
          CONTEXT.startTime + waitInterval < new Date().getTime(),
        noLoads = [],
        reqCalls = [],
        stillLoading = false,
        needCycleCheck = true;
      if (inCheckLoaded) return null; //Do not bother if module call was a result of a cycle break.
      inCheckLoaded = true;
      Object.keys(enabledRegistry).forEach((x, i) => {
        const mod = Object.values(enabledRegistry)[i];
        var map = mod.map; //Figure out the state of all the modules.
        var modId = map.id; //disabled or in error
        if (!mod.enabled) return null;
        if (!map.isDefine) reqCalls.push(mod);
        if (!mod["error"] && !mod.inited) {
          if (expired) {
            if (hasPathFallback(modId, CONFIG.paths)) {
              usingPathFallback = true;
              stillLoading = true;
            } else {
              noLoads.push(modId);
              removeScript(modId, CONTEXT.ctn);
            }
          } else if (mod.fetched && map.isDefine) {
            stillLoading = true;
            if (!map.prefix) needCycleCheck = false; //non-plugin-resource
          }
        }
      }); //If wait time expired, throw error of unloaded modules.
      if (expired && noLoads.length) {
        err = makeError(
          "timeout",
          "Load timeout for modules: " + noLoads,
          null,
          noLoads
        ); //id, msg, err, requireModules
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
        if ((!expired || usingPathFallback) && stillLoading) {
          if ((isBrowser || isWebWorker) && !checkLoadedTimeoutId)
            checkLoadedTimeoutId = setTimeout(() => {
              checkLoadedTimeoutId = 0; //plugin-resource
              checkLoaded();
            }, 50);
        }
        inCheckLoaded = false;
      }
    };
    const init = (depMaps, factory, errback, options) => {
      options = options || {}; //if multiple define calls for the same module
      if (module.inited) return null;
      module.factory = factory; //Register for errors on module module.
      if (errback) {
        module.on("error", errback); //If no errback already, but there are error listeners
      } else if (module.events.error)
        errback = bind(module, (err) => module.emit("error", err)); //on module module, set up an errback to pass to the ds.
      module.depMaps = depMaps && depMaps.slice(0);
      module.errback = errback; //copy of 'source dependency arr inputs' (i.e. "shim" ds by depMaps arr)
      module.inited = true;
      module.ignore = options.ignore;
      if (options.enabled || module.enabled) return module.enable();
      module.check(); //init as, or previously, -enabled, yet dependencies unknown until init
    };

    const normalizeMod = (plugin, map) => {
      var name = module.map.name; //Normalize the ID if the plugin allows it.
      if (plugin.normalize)
        name =
          plugin.normalize(name, (name) =>
            normalize(
              name,
              module.map.parentMap ? module.map.parentMap.name : null, //parentName
              true,
              CONFIG.nodeIdCompat,
              CONFIG.map,
              CONFIG.pkgs
            )
          ) || ""; //prefix and name should already be normalized, no need
      var normalizedMap = makeModuleMap(
        map.prefix + "!" + name,
        module.map.parentMap,
        true
      ); //for applying map CONFIG again either.
      on(
        normalizedMap,
        "defined",
        bind(module, (value) => {
          module.map.normalizedMap = normalizedMap;
          module.init([], () => value, null, {
            enabled: true,
            ignore: true
          });
        })
      );

      var normalizedMod =
        exists(registry).yes(normalizedMap.id) && registry[normalizedMap.id];
      if (normalizedMod) {
        module.depMaps.push(normalizedMap); //Mark module as a dependency for module plugin, so it
        if (module.events.error)
          normalizedMod.on(
            "error",
            bind(module, (err) => module.emit("error", err))
          ); //can be traced for cycles.

        normalizedMod.enable();
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
            bind(module, () =>
              map.prefix ? module.callPlugin() : module.load()
            )
          ); //plugin-managed resource
        } else return map.prefix ? module.callPlugin() : module.load(); //Regular dependency.
      },
      load: () => {
        if (!urlFetched[module.map.url]) {
          urlFetched[module.map.url] = true; //Regular dependency.
          CONTEXT.load(module.map.id, module.map.url);
        }
      },
      check: () => {
        if (!module.enabled || module.enabling) return null;
        var id = module.map.id; // module is ready to, and does, define itself
        if (!module.inited) {
          if (!exists(CONTEXT.defQueueMap).yes(id)) module.fetch(); // !defQueue.includes(module)
        } else if (module.error) {
          module.emit("error", module.error);
        } else {
          if (module.defining) return null;
          var exports = module.exports, //no edundant require-define
            factory = module.factory;
          module.defining = true;
          if (module.depCount < 1 && !module.defined) {
            if (exists(factory).string() === "[object Function]") {
              var err; //for define()'d  modules, use error listener,
              var cjsModule; //require errbacks should not be called (#699).
              var depExports = module.depExports; //Yet, if dependency-'onError,' use that.
              if (
                (module.events.error && module.map.isDefine) ||
                req.onError !== defaultOnError
              ) {
                try {
                  exports = CONTEXT.execCb(id, factory, depExports, exports); //factory.apply(exports, depExports),
                } catch (e) {
                  err = e;
                }
              } else exports = CONTEXT.execCb(id, factory, depExports, exports); // Favor return value over exports. If node/cjs in play,
              if (module.map.isDefine && exports === undefined) {
                cjsModule = module.module; // then will not have a return value anyway. Favor
                if (cjsModule) {
                  exports = cjsModule.exports; // module.exports assignment over exports object.
                } else if (module.usingExports) exports = module.exports; //exports already set the defined value.
              }
              if (err) {
                err.requireMap = module.map;
                err.requireModules = module.map.isDefine
                  ? [module.map.id]
                  : null;
                err.requireType = module.map.isDefine ? "define" : "require";
                return onError((module.error = err));
              }
            } else exports = factory; //Just a literal value
            module.exports = exports;
            if (module.map.isDefine && !module.ignore) {
              defined[id] = exports;
              if (req.onResourceLoad)
                req.onResourceLoad(
                  CONTEXT,
                  module.map,
                  module.depMaps.map((depMap) => depMap.normalizedMap || depMap)
                );
            }
            cleanRegistry(id);
            module.defined = true;
          }
          module.defining = false; //Finished definition, so allow call-check again for 'define' notifications, by cycle.
          if (module.defined && !module.defineEmitted) {
            module.defineEmitted = true;
            module.emit("defined", module.exports);
            module.defineEmitComplete = true;
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
          bind(module, (plugin) => {
            if (module.map.unnormalized) return normalizeMod(plugin, map); //If current map is not normalized, wait for that
            var bundleId =
              exists(bundlesMap).yes(module.map.id) &&
              bundlesMap[module.map.id]; //normalized name to load instead of continuing.
            if (bundleId) {
              module.map.url = CONTEXT.nameToUrl(bundleId); //If a paths CONFIG, then just load that file instead to
              module.load(); //resolve the plugin, as it is built into that paths layer.
              return null;
            }

            const load = bind(module, (factory) =>
              module.init([], () => factory, null, {
                enabled: true
              })
            ); //depMaps, factory, errback, options
            load.error = bind(module, (err) => {
              module.inited = true; //Remove temp unnormalized modules for module module,
              module.error = err; //since they will never be resolved otherwise now.
              err.requireModules = [id];
              Object.keys(registry).forEach((x, i) => {
                const mod = Object.values(registry)[i];
                mod.map.id.indexOf(id + "_unnormalized") === 0 &&
                  cleanRegistry(mod.map.id);
              });
              onError(err);
            }); //Allow plugins to load other code without having to know the
            const localRequire = CONTEXT.makeRequire(map.parentMap, {
              enableBuildCallback: true
            }); //CONTEXT or how to 'complete' the load.
            const localreq = (text, textAlt) => {
              /*jslint evil: true */
              var moduleName = map.name;
              var moduleMap = makeModuleMap(moduleName); //2.1.0 onwards, pass text to reinforce fromText 1call/resource.
              var hasInteractive = useInteractive; //pass moduleName, ok, but discard moduleName for internal ref.
              if (textAlt) text = textAlt; //Turn off interactive script matching for IE for any define
              if (hasInteractive) useInteractive = false; //calls in the text, then turn it back on at the end.
              getModule(moduleMap); //Prime the system by creating a module instance for
              if (CONFIG.config.prototype.hasOwnProperty(id))
                CONFIG.config[moduleName] = CONFIG.config[id]; //Transfer any CONFIG to module other module.
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
              CONTEXT.completeLoad(moduleName); //Support anonymous modules.
              localRequire([moduleName], load); //Bind the value of that module to the value for module resource ID.
            };
            load.fromText = bind(module, localreq);
            //Use parentName here since the plugin's name is not reliable,
            //could be some weird string with no path that actually wants to
            //reference the parentName's path.
            plugin.load(map.name, localRequire, load, CONFIG);
          })
        );
        CONTEXT.enable(pluginMap, module);
        module.pluginMaps[pluginMap.id] = pluginMap;
      },
      enable: () => {
        enabledRegistry[module.map.id] = module; //no inadvertent load and 0 depCount by
        module.enabled = true; //immediate calls to the defined callbacks for dependencies
        module.enabling = true; //Enable mapFunction 1,dependency

        module.depMaps.forEach(
          bind(module, (depMap, i) => {
            if (typeof depMap === "string") {
              depMap = makeModuleMap(
                depMap,
                module.map.isDefine ? module.map : module.map.parentMap,
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
              module.depCount += 1;
              on(
                depMap,
                "defined",
                bind(module, (depExports) => {
                  if (module.undefed) return null;
                  module.defineDep(i, depExports);
                  module.check();
                })
              );
              if (module.errback) {
                on(depMap, "error", bind(module, module.errback)); // propagate the error correctly - something else is listening for errors
              } else if (module.events.error)
                on(
                  depMap,
                  "error",
                  bind(module, (err) => module.emit("error", err))
                ); // (No direct errback on module module)
            }
            var id = depMap.id; //Skip special modules like 'require', 'exports', 'module'
            var mod = registry[id];
            if (!handlers.prototype.hasOwnProperty(id) && mod && !mod.enabled)
              CONTEXT.enable(depMap, module); //don't call enable if it is already enabled (circular ds)
          })
        ); //dependency plugins, enabled
        Object.keys(module.pluginMaps).forEach(
          bind(module, (x, i) => {
            const pluginMap = Object.values(module.pluginMaps)[i];
            var mod =
              exists(registry).yes(pluginMap.id) && registry[pluginMap.id];
            if (mod && !mod.enabled) CONTEXT.enable(pluginMap, module);
          })
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
      !defined.prototype.hasOwnProperty(args[0]) &&
      getModule(makeModuleMap(args[0], null, true)).init(args[1], args[2]); //Skip modules already defined.
    const getScriptData = (evt) => {
      const removeListener = (node, func, name, ieName) => {
        if (node.detachEvent && !isOpera) {
          if (ieName) node.detachEvent(ieName, func);
        } else node.removeEventListener(name, func, false);
      };
      var node = evt.currentTarget || evt.srcElement; //REQUIREJS event info, remove listener from node //target
      removeListener(node, CONTEXT.onScriptLoad, "load", "onreadystatechange");
      removeListener(node, CONTEXT.onScriptError, "error");
      return {
        node: node,
        id: node && node.getAttribute(m(true))
      };
    };

    const takeGlobalQueue = () => {
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
    CONTEXT = {
      CONFIG,
      ctn,
      registry,
      defined,
      urlFetched,
      defQueue,
      defQueueMap: {},
      Module,
      makeModuleMap,
      nextTick: req.nextTick,
      onError,
      configure: (configuration) => {
        if (
          configuration.baseUrl &&
          configuration.baseUrl.charAt(configuration.baseUrl.length - 1) !== "/"
        )
          configuration.baseUrl += "/"; //Make sure the baseUrl ends in a slash.
        if (typeof configuration.urlArgs === "string")
          configuration.urlArgs = (id, url) =>
            (url.indexOf("?") === -1 ? "?" : "&") + configuration.urlArgs; // Convert old style urlArgs string to a function.
        var shim = CONFIG.shim; //save paths for special "additive processing"
        var objs = {
          paths: true,
          bundles: true,
          CONFIG: true,
          map: true
        };
        Object.keys(configuration).forEach((prop, i) => {
          const value = Object.values(configuration)[i];
          if (!objs[prop]) return (CONFIG[prop] = value);
          if (!CONFIG[prop]) CONFIG[prop] = {};
          mixin(CONFIG[prop], value, true, true);
        });
        if (configuration.bundles)
          Object.keys(configuration.bundles).forEach((prop, i) => {
            const value = Object.values(configuration.bundles)[i];
            value.forEach((v) => {
              if (v !== prop) bundlesMap[v] = prop; //Reverse map the bundles
            });
          });
        if (configuration.shim) {
          Object.keys(configuration.shim).forEach((id, i) => {
            var value = Object.values(configuration.shim)[i];
            if (exists(value).string() === "[object Array]")
              value = {
                ds: value
              }; //Merge shim, Normalize the structure
            if ((value.exports || value.init) && !value.exportsFn)
              value.exportsFn = CONTEXT.makeShimExports(value);
            shim[id] = value;
          });
          CONFIG.shim = shim;
        }
        if (configuration.packages)
          configuration.packages.forEach((pkgObj) => {
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
          var mod = Object.values(registry)[i];
          if (!mod.inited && !mod.map.unnormalized)
            mod.map = makeModuleMap(id, null, true); //Info, like URLs to load, may have changed.
        }); //if inited and transient, unnormalized modules.
        if (configuration.ds || configuration.cb)
          CONTEXT.require(configuration.ds || [], configuration.cb); //When require is defined as a CONFIG object before require.js is loaded,
      }, //call require with those args, if a ds arr or a CONFIG cb is specified
      makeShimExports: (value) => {
        function fn() {
          var ret; //Shadowing of global property 'arguments'. (no-shadow-restricted-names)eslint
          if (value.init) ret = value.init.apply(dependency, arguments);
          return ret || (value.exports && getGlobal(value.exports));
        }
        return fn;
      },
      makeRequire: (relMap, options) => {
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
            if (relMap && handlers.prototype.hasOwnProperty(ds))
              return handlers[ds](registry[relMap.id]); //when require|exports|module are requested && while module is being defined
            if (req.get) return req.get(CONTEXT, ds, relMap, localRequire);
            map = makeModuleMap(ds, relMap, false, true);
            id = map.id; //Normalize module name from . or ..
            if (!defined.prototype.hasOwnProperty(id))
              return onError(
                makeError(
                  "notloaded",
                  'Module name "' +
                    id +
                    '" has not been loaded yet for CONTEXT: ' +
                    ctn +
                    (relMap ? "" : ". Use require([])")
                ) //id, msg, err, requireModules
              );
            return defined[id];
          }
          const intakeDefines = () => {
            var args;
            takeGlobalQueue(); //"intake modules"
            while (defQueue.length) {
              args = defQueue.shift();
              if (args[0] === null)
                return onError(
                  makeError(
                    "mismatch",
                    "Mismatched anonymous define() module: " +
                      args[args.length - 1]
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
          isBrowser: isBrowser,
          toUrl: (moduleNamePlusExt) => {
            var ext; //URL path = module name + .extension; requires 'module name,' not 'plain URLs' like nameToUrl
            var index = moduleNamePlusExt.lastIndexOf(".");
            var segment = moduleNamePlusExt.split("/")[0];
            var isRelative = segment === "." || segment === "..";
            if (index !== -1 && (!isRelative || index > 1)) {
              ext = moduleNamePlusExt.substring(
                index,
                moduleNamePlusExt.length
              ); //file extension alias, not 'relative path dots'
              moduleNamePlusExt = moduleNamePlusExt.substring(0, index);
            }
            return CONTEXT.nameToUrl(
              normalize(
                moduleNamePlusExt,
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
            defined.prototype.hasOwnProperty(
              makeModuleMap(id, relMap, false, true).id
            ),
          specified: (id) => {
            id = makeModuleMap(id, relMap, false, true).id;
            return (
              defined.prototype.hasOwnProperty(id) ||
              registry.prototype.hasOwnProperty(id)
            );
          }
        });
        if (!relMap)
          localRequire.undef = (id) => {
            takeGlobalQueue(); //Only allow undef on top level require calls
            var map = makeModuleMap(id, relMap, true); //Bind define() calls (fixes #408) to 'module' CONTEXT
            var mod = exists(registry).yes(id) && registry[id];
            mod.undefed = true;
            removeScript(id, CONTEXT.ctn);
            delete defined[id];
            delete urlFetched[map.url];
            delete undefEvents[id];
            defQueue
              .sort((a, b) => b - a)
              .map((args, i) => args[0] === id && defQueue.splice(i, 1)); //Clean queued defines, backwards, so splices don't destroy the iteration
            delete CONTEXT.defQueueMap[id];
            if (mod) {
              if (mod.events.defined) undefEvents[id] = mod.events; //if different CONFIG, same listeners
              cleanRegistry(id);
            }
          };
        return localRequire;
      },
      enable: (depMap) =>
        exists(registry).yes(depMap.id) &&
        registry[depMap.id] && //if "mod" module is in registry, parent's CONTEXT when
        getModule(depMap).enable(), // overridden in "optimizer" (Not shown).
      completeLoad: (moduleName) => {
        var found, args; //method used "internally" by environment adapters script-load or a synchronous load call.
        takeGlobalQueue();
        while (defQueue.length) {
          args = defQueue.shift();
          if (args[0] === null) {
            args[0] = moduleName;
            if (found) break; //anonymous module bound to name already
            found = true; //module is another anon module waiting for its completeLoad to fire.
          } else if (args[0] === moduleName) found = true; //matched a define call in module script
          callGetModule(args);
        }
        CONTEXT.defQueueMap = {};

        var mod = exists(registry).yes(moduleName) && registry[moduleName]; // in case-/init-calls change the registry
        if (
          !found &&
          !defined.prototype.hasOwnProperty(moduleName) &&
          mod &&
          !mod.inited
        ) {
          var shim = exists(CONFIG.shim).yes(moduleName)
            ? CONFIG.shim[moduleName]
            : {};
          if (
            CONFIG.enforceDefine &&
            (!shim.exports || !getGlobal(shim.exports))
          )
            return hasPathFallback(moduleName, CONFIG.paths)
              ? null
              : onError(
                  makeError(
                    "nodefine",
                    "No define call for " + moduleName,
                    null,
                    [moduleName]
                  ) //id, msg, err, requireModules
                );
          callGetModule([moduleName, shim.ds || [], shim.exportsFn]); //does not call define(), but simulated
        }
        checkLoaded();
      },
      nameToUrl: (moduleName, ext, skipExt) => {
        var pkgMain =
          exists(CONFIG.pkgs).yes(moduleName) && CONFIG.pkgs[moduleName]; //already-normalized-moduleName as URL. Use toUrl for the public API.
        if (pkgMain) moduleName = pkgMain; //If slash or colon-protocol fileURLs contains "?" or even ends with ".js",
        var bundleId =
          exists(bundlesMap).yes(moduleName) && bundlesMap[moduleName]; //assume use of an url, not a module id.
        if (bundleId) CONTEXT.nameToUrl(bundleId, ext, skipExt); //filter out dependencies that are already paths.
        const geturl = (url = "") => {
          //Just a plain path, not module name lookup, so just return it.
          if (/^[/:?.]|(.js)$/.test(moduleName)) {
            url = moduleName + (ext || ""); //Add extension if it is included. This is a bit wonky, only non-.js things pass
          } else {
            var paths = CONFIG.paths; //an extension, module method probably needs to be reworked.
            var syms = moduleName.split("/"); //A module that needs to be converted to a path.

            for (let i = syms.length; i > 0; i -= 1) {
              var parentModule = syms.slice(0, i).join("/"); //per module name segment if path registered, start name, and work up
              var parentPath =
                exists(paths).yes(parentModule) && paths[parentModule];
              if (parentPath) {
                if (exists(parentPath).string() === "[object Array]")
                  parentPath = parentPath[0];
                syms.splice(0, i, parentPath); //arr means a few choices
                break;
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
          ? url + CONFIG.urlArgs(moduleName, url)
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
  req.onError = defaultOnError;
  req.createNode = (CONFIG, moduleName, url) => {
    var node = CONFIG.xhtml ? exists().create("NS") : exists().create(); // node for the load command in browser env
    node.type = CONFIG.scriptType || "text/javascript";
    node.charset = "utf-8";
    node.async = true;
    return node;
  };
  req.load = (CONTEXT, moduleName, url) => {
    const sa = "setAttribute",
      ae = "attachEvent",
      ael = "addEventListener",
      CONFIG = (CONTEXT && CONTEXT.CONFIG) || {};
    //handle load request (in browser env); 'CONTEXT' for state, 'moduleName' for name, 'url' for point
    if (isBrowser) {
      var n = req.createNode(CONFIG, moduleName, url); //browser script tag //testing for "[native code" https://github.com/REQUIREJS/REQUIREJS/issues/273
      n[sa](m(), CONTEXT.ctn); //artificial native-browser support? https://github.com/REQUIREJS/REQUIREJS/issues/187
      n[sa](m(true), moduleName); //![native code]. IE8, !node.attachEvent.toString()
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
      if (CONFIG.onNodeCreated)
        CONFIG.onNodeCreated(n, CONFIG, moduleName, url); //set, but before it is placed in the DOM.
      //IE 6-8 cache, script executes before the end
      currentlyAddingScript = n; //of the appendChild execution, so to tie an anonymous define
      if (baseElement) {
        head.insertBefore(n, baseElement); //call to the module name (which is stored on the node), hold on
      } else head.appendChild(n); //to a reference to module node, but clear after the DOM insertion.
      currentlyAddingScript = null;
      return n; // bug in WebKit where the worker gets garbage-collected after calling
    } else if (isWebWorker) {
      try {
        setTimeout(() => {}, 0); // importScripts(): https://webkit.org/b/153317, so, Post a task to the event loop
        importScripts(url);
        CONTEXT.completeLoad(moduleName); //Account for anonymous modules
      } catch (e) {
        CONTEXT.onError(
          makeError(
            "importscripts",
            "importScripts failed for " + moduleName + " at " + url,
            e,
            [moduleName]
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
