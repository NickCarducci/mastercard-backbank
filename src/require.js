/**UNLICENSED BUT FOR PARTS OF OTHERS */

/** vim: et:ts=4:sw=4:sts=4
 * @license RequireJS 2.3.6.carducci Copyright jQuery Foundation and other contributors.
 * Released under MIT license, https://github.com/REQUIREJS/REQUIREJS/blob/master/LICENSE
 */
//Not using strict: uneven strict support in browsers, #392, and causes
//problems with REQUIREJS.exec()/transpiler plugins that may not be strict.
/*jslint regexp: true, nomen: true, sloppy: true */
/*dependency window, navigator, document, importScripts, setTimeout, opera */

const App = function () {
  //allows mutable context, 'new' instantiatable 'iifeapp' for the "enclosing 'this'," else App() function
  class iifeapp {
    constructor() {
      const z = arguments[0];
      return function (construction = arguments[0], keys = arguments[1]) {
        const buff = construction.constructor === Array ? 0 : 1;
        construction =
          construction.constructor === Array ? () => {} : construction;
        keys = keys.constructor === Array ? keys : construction;
        construction.constructor === Function && construction();
        keys.constructor === Array &&
          keys.forEach((x, i) =>
            x.includes(".")
              ? (z[x.split(".")[0]][x.split(".")[1]] = arguments[i + buff])
              : (z[x] = arguments[i + buff])
          );
      };
    }
  } //this(and arguments) should relate to wherever function runs (fat has no 'this', iife can to append this[key])
  //const iifefunc = (construction, keys) => new iifeapp(construction, keys); //you can tell this is a [proper-]function[-invocation] with thiscontext here for iifeapp
  /**
    * 
          iifefunc(
            ((z) => {
              if (z.interscrpt && e_(z.interscrpt).interA())
                return this.interscrpt;
              // prettier-ignore
              e_().tag().sort((a, b) => b - a)
            .map((script) => e_(script).interA() && (z.interscrpt = script));
              return z.interscrpt;
            })(this),
            ["interscript"]
          );
    * 
    */
  var T = (x) => typeof x;
  var ctxs = {},
    REQUIREJS,
    // eslint-disable-next-line
    setTimeout = T(setTimeout === "undefined") ? undefined : setTimeout,
    interscrpt,
    scriptPends,
    defineables = [],
    configuration = {},
    useInteractive = false,
    ctx,
    M = {}; //"this";
  const _p = "packages",
    _b = "bundles",
    _s = "shim",
    _l = "location",
    _u = "baseUrl",
    _a = "urlArgs",
    _t = "string",
    _xf = "exportsFn",
    _x = "exports",
    _m = "module",
    _o = "onError",
    _dd = "defined",
    _dg = "defining",
    _ed = "enabled",
    _e = "error",
    _em = "emit",
    _ev = "events",
    _i = "init",
    _n = "undefined",
    _r = "require",
    Ar = "[object Array]",
    Fn = "[object Function]",
    _K = Object.keys,
    _S = Object.prototype.toString,
    _H = "hasOwnProperty",
    _P = "prototype",
    _SA = "setAttribute",
    _AE = "attachEvent",
    _AEL = "addEventListener",
    ctxReqProps = ["toUrl", "undef", "defined", "specified"],
    // eslint-disable-next-line
    version = "2.3.6.carducci",
    isBrowser = !!(T(window !== _n) && T(navigator !== _n) && window.document),
    // eslint-disable-next-line
    isWebWorker = !isBrowser && T(importScripts !== _n),
    //'loading', 'loaded', execution, 'complete'
    readyRegExp =
      isBrowser && navigator.platform === "PLAYSTATION 3"
        ? /^complete$/
        : /^(complete|loaded)$/,
    us = "_",
    //Oh the tragedy, detecting opera. See the usage of isOpera for reason.
    isOpera =
      // eslint-disable-next-line
      T(opera !== _n) && opera.toString() === "[object Opera]",
    createElement = (ns) =>
      document[`createElementNS${ns ? "NS" : ""}`](
        ns ? ("http://www.w3.org/1999/xhtml", "html:script") : "script"
      ),
    ga = "getAttribute";
  /*
    e_
    mixin
    BINDABLES.mk
    concat

    require=(dep,to)=>{
      define
      configuration(config?!require,build)
      convertName
      rmvScript
      hasPathFallback
      parseName
      normalize
      M
      Module
      build
      obj

      require=build
      newContext = {
        CONTEXT:{CG}
        this.dependencies
        makeModuleMap
        getModule
        on
        onError
        handlers
        clrRegstr
        checkLoaded
        init
        normalizeMod
        Module[_P]={init,defineDep,fetch,load,check,callPlugin,enable,on,emit}
        callGetModule
        getScriptData
        tkeGblQue
        evt
        CONTEXT:{…initial:{CG}}
        CONTEXT.require = CONTEXT.makeRequire()
        return CONTEXT
      }
      
      s = build.s
      build({})
      ctxReqProps
      head
      onError,createNode,load
      exec 
      build()
    }
    */ const define = (
      nm,
      ds,
      c
    ) => {
      const copy = { nm, ds, c }; //Allow for anonymous modules
      if (T(nm !== _t)) {
        nm = null;
        ds = copy.nm;
        c = copy.ds;
      } else if (e_(ds).string() !== Ar) {
        ds = null;
        c = copy.ds;
      }
      if (!ds && e_(c).string() === Fn && c.length) ds = concat(ds, c); // no deps nor name + cb is func => then CommonJS
      if (useInteractive) {
        const n =
          scriptPends ||
          (() => {
            if (interscrpt && e_(interscrpt).interA()) return interscrpt;
            // prettier-ignore
            e_().tag().sort((a, b) => b - a)
          .map((script) => e_(script).interA() && (interscrpt = script));
            return interscrpt;
          })();
        //iifeapp(["interscrpt"], "value");
        if (!nm) nm = n()[ga](dr(true));
        ctx = ctxs[n()[ga](dr())];
      }
      //getInteractiveScript Look for a data-main script attribute, which could also adjust the baseUrl. baseUrl from script tag with require.js in it.

      if (!ctx) return defineables.push([nm, ds, c]);
      ctx.defQueue.push([nm, ds, c]);
      ctx.defQueueMap[nm] = true;
      return { amd: { jQuery: true } };
    },
    dr = (m) => `data-require${m ? _m : "context"}`,
    concat = (
      { ds, cb } = (ds, cb) => {
        return {
          cb: cb
            .toString()
            .replace(
              /\/\*[\s\S]*?\*\/|([^:"'=]|^)\/\/.*$/gm /*comment */,
              (match, singlePrefix) => singlePrefix || ""
            )
            .replace(
              /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g /*requires */,
              (match, dep) => ds.push(dep)
            ),
          ds
        };
      } /*like ')//comment'; keep prefix*/
    ) => (cb.length === 1 ? [_r] : [_r, _x, _m]).concat(ds); //Potential-CommonJS use-case of exports and M, without 'require.';

  //M named by onload event, for anonymous modules or without context; IE 6-8 anonymous define() call, requires interactive document.getElementsByTagName("script")
  //...[ 'dataMain','baseElement', 'mainScript', 'subPath', 'src', 'head', 'dependency'].reduce((x,next)=>x[next]=null),
  var build = (REQUIREJS = function () {
      var ds = arguments[0],
        cb = arguments[1],
        eb = arguments[2],
        optional = arguments[3],
        ctx,
        cfg,
        ctn = us; //Caja compliant build for minified-scope name of dependency, cb for arr completion Find the right CONTEXT, use default
      if (!e_(ds).string() === Ar && T(ds !== _t)) {
        cfg = ds;
        return !e_(cb).a()
          ? (ds = [])
          : new iifeapp(["ds", "cb", "eb"], cb, eb, optional)(this);
      } // Determine if have CG object in the call. ds is a CG object Adjust args if there are this.dependencies
      ctn = cfg && cfg.context ? cfg.context : ctn;
      ctx = e_(ctxs).yes(ctn) && ctxs[ctn];
      ctx = ctx ? ctx : (ctxs[ctn] = new build.s.newContext(ctn, arguments[0])); //dependency
      cfg && ctx.configure(cfg);
      return ctx.require(ds, cb, eb);
    }),
    dataMain,
    baseElement,
    mainScript,
    subPath,
    src,
    head,
    dependency,
    e_ = (obj /*,string*/) => {
      const n = (NS) =>
        NS.constructor === "String" && NS.toUpperCase() === "NS";
      const yes = (name) => obj[_P][_H](name),
        string = () => _S(obj),
        tag = (ind) => document.getElementsByTagName(obj ? obj : "script")[ind];
      return {
        yes,
        reducer: (prop, nextProp) =>
          !obj[0]
            ? obj[1]
            : (obj[2] || !e_(obj[1]).yes(prop)) &&
              ((
                v,
                //prettier-ignore
                go = obj[3] && T( v === "object") && v && !e_(v).a() && !e_(v).string() === Fn &&  !(v instanceof RegExp)
              ) => {
                obj[1][prop] = !go ? v : obj[1][prop] ? obj[1][prop] : {};
                BINDABLES.mixin(obj[1][prop], v, obj[2], obj[3]);
                return obj[1];
              })(obj[0][prop]), //s,tgt,frc,dSM
        create: (ns = n) => createElement(ns),
        string,
        a: (x) => x.string() === Ar,
        tag,
        interA: (x) => x.readyState === "interactive"
      };
    }, //obj.prototype["hasOwnProperty"][name]; const method =string?"toString":"hasOwnProperty"
    BINDABLES = {
      mixin: (tgt, s, frc, dSM) =>
        _K(s).reduce(e_([s, tgt, frc, dSM]).reducer(), tgt),
      mk: (err) =>
        err.constructor === Object
          ? err
          : {
              //prettier-ignore
              ...new Error(`${err[1]}\nhttps://REQUIREJS.org/docs/errors.html#${err[0]}`),
              requireType: err[0],
              ids: err[3],
              originalError: err[2]
            }, //t, m, e, ids
      convertName: (nm, mp, applyMap, ph) => {
        if (!applyMap || !mp || (!ph && !mp["*"])) return nm;
        var n,
          i,
          map,
          starMap,
          nms = nm.split("/"),
          mpcf = mp && mp["*"]; //continue search ___ map CG, bigloop:
        for (let g = nms.length; g > 0; g -= 1) {
          var name = nms.slice(0, g).join("/"); //favor a "star map" unless shorter matching CG
          // prettier-ignore
          !starMap && mpcf && e_(mpcf).yes(name)&& (() => {starMap = mpcf[name];n = g;})();
          ph &&
            (() => {
              for (let f = ph.length; f > 0; f--) {
                const fP = ph.slice(0, f).join("/"),
                  mV = e_(mp).yes(fP) && mp[fP];
                if (!mV) continue;
                const s = e_(mV).yes(name) && mV[name];
                i = s ? g : i;
                if (s) break;
              }
            })();
        } // bigloop; //Match, update name to the new value.
        if (map) return (nm = nms.splice(0, i, map).join("/"));
        if (starMap) {
          map = starMap;
          i = n;
        }
        return nm;
      },
      concat,
      dr,
      rmvScrpt: (name, ctn) => {
        const ga = "getAttribute",
          e = (m) => (m ? name : ctn); //scriptNode
        return (
          isBrowser &&
          e_()
            .tag()
            .forEach(
              (sN) =>
                sN[ga](BINDABLES.dr(true)) === e(true) &&
                sN[ga](BINDABLES.dr()) === e() &&
                sN.parentNode.removeChild(sN)
            )
        );
      },
      hasPathFallback: (id, cP, ctx) => {
        var pC = e_(cP).yes(id) && cP[id]; //pathConfig,configPaths
        if (pC && e_(pC).string() === Ar && pC.length > 1) {
          pC.shift(); //config is live? but 'id' is variable as args.. [for the?] next try
          ctx.require.undef(id);
          ctx.makeRequire(null, { skipMap: true })([id]);
          return true;
        }
      },
      //'applyMap' for dependency ID, 'baseName' relative to 'name,' the most relative
      parseName: (nm, roots, conId) =>
        nm &&
        (() => {
          nm = nm.split("/");
          const l = nm.length - 1,
            isjs = /\.js$/,
            suffjs = conId && isjs.test(nm[l]);
          if (suffjs) nm[l] = nm[l].replace(isjs, "");
          if (nm[0].charAt(0) === "." && roots)
            nm = roots.slice(0, roots.length - 1).concat(nm); //Adjust any relative paths. node allows either .js or non .js, yet not in nameToUrl;baseName.push(nm), but new instead of length report
          for (let i = 0; i < nm.length; i++) {
            const solid = nm[i] === "." && nm.splice(i, 1); //:part === "..":null
            i = solid ? i - 1 : i;
            if (solid) continue;
            const more =
              i === 0 || (i === 1 && nm[2] === "..") || nm[i - 1] === "..";
            if (!more && i > 0 && nm.splice(i - 1, 2)) i -= 2;
          }
          return nm.join("/");
        })(), //just enabled, but unactivated, modules

      normalize: (nm, bn, applyMap, conId, map, configPkgs) => {
        const rs = bn && bn.split("/");
        nm = BINDABLES.parseName(nm, rs, conId);
        nm = BINDABLES.convertName(nm, map, applyMap, rs);
        return e_(configPkgs).yes(nm) ? configPkgs[nm] : nm;
      }
    }; // If package-name, package 'main,' roots

  class newContext {
    constructor() {
      const ctn = arguments[0],
        z = arguments[1];
      var CONTEXT = {
          CG: {
            waitSeconds: 7,
            baseUrl: "./",
            ...["paths", "bundles", "pkgs", "shim", "config"].map((x) => {
              return { [x]: {} };
            })
          }
        },
        { CG } = CONTEXT,
        defQueue = [],
        rqrCnt = 1,
        abnCnt = 1,
        clrsec,
        watch;
      [
        "dependencies",
        "enRgtry",
        "unDE",
        "defined",
        "urlFchd",
        "bdlMap"
      ].forEach((k) => (this[k] = {})); //abnormalCount - normalize() will run faster if there is no default //BR "bindingsRequire"
      const makeModuleMap = function (
        n = arguments[0],
        sourcemap = arguments[1],
        isNormed = arguments[2],
        applyMap = arguments[3]
      ) {
        //n, sourcemap, isNormed, applyMap
        var ptName = sourcemap ? sourcemap.name : null,
          gvnName = n,
          yesdef = true; //'applyMap' for dependency ID, 'isNormed' define() M ID, '[sourcemap]' to resolve relative names (&& require.normalize()), 'name' the most relative
        if (!n) yesdef = false;
        n = n ? n : "_@r" + (rqrCnt += 1); //internally-name a 'require' call, given no name

        const configGets = [CG.nodeIdCompat, CG.map, CG.pkgs],
          splitPrefix = (i = (n) => n.indexOf("!")) =>
            i > -1
              ? [n.substring(0, i), n.substring(i + 1, n.length)]
              : [n, ""];
        //[plugin=undefined, resource={}] if the name without a plugin prefix.
        var names = splitPrefix(n),
          p = names[0],
          pM,
          url,
          normed = "",
          id,
          suffix = p && !pM && !isNormed ? "_unnormalized" + (abnCnt += 1) : ""; //If it may be a plugin id that doesn't normalization, stamp it with a unique ID

        n = names[1];
        if (n)
          p
            ? new iifeapp(
                ["normed", "id"],
                isNormed
                  ? n
                  : pM && pM.normalize
                  ? //prettier-ignore
                    pM.normalize(n, (n) => BINDABLES.normalize(n, ptName, applyMap, ...configGets))
                  : n.indexOf("!") === -1
                  ? BINDABLES.normalize(n, ptName, applyMap, ...configGets)
                  : n,
                p + "!" + normed + suffix
              )(this)
            : new iifeapp(
                ["normed", "names", "p", "normed", "isNormed", "url", "id"],
                BINDABLES.normalize(n, ptName, applyMap, ...configGets),
                splitPrefix(normed),
                names[0],
                names[1],
                true,
                CONTEXT.nameToUrl(normed),
                normed + suffix
              )(this);

        //do not normalize if nested plugin references; albeit M deprecates resourceIds,
        //normalize after plugins are loaded and such normalizations allow for async loading of a loader plugin (#1131)
        //ok base name, relative path?.normalize's 'map CG application' might make normalized 'name' a plugin ID.'map CG values' are already normalized at M point.

        return {
          prefix: p,
          name: normed,
          parentMap: sourcemap,
          unnormalized: !!suffix,
          url,
          gvnName,
          yesdef,
          id
        };
      };

      const depMap = function () {
        return {
          dm: arguments[0],
          m:
            e_(this.dependencies).yes(arguments[0].id) &&
            this.dependencies[arguments[0].id]
        };
      };
      const getModule = ({ m, dm } = depMap) =>
        m
          ? m
          : //prettier-ignore
            this.dependencies[dm.id] = new CONTEXT.Module(dm, this.unDE, CG.shim);
      const on = ({ m, dm } = depMap, name, f) => {
        if (!e_(this.defined).yes(dm.id) || (m && !m.defineEmitComplete))
          return name === _dd && f(this.defined[dm.id]);
        m = BINDABLES.getModule(dm);
        if (m[_e] && name === _e) return f(m[_e]);
        m["on"](name, f);
      };
      const iserror = (err) =>
        e_(this.dependencies).yes(err) && this.dependencies[err];
      const onError = (err = BINDABLES.mk, eb = (eb) => eb && eb(err)) => {
        //reduce when finishes with mutable object, "all" errors - shallow? (like filter but with for - or mixin?)
        !err.ids.reduce(
          (
            md = (es = iserror) => {
              return { ...es, err };
            } //event, event.error, emit
          ) => md[_ev] && md[_ev][_e] && md[_em](_e, err) && true
        ) && build[_o](err);
      };
      const handlers = {
          require: (m) =>
            !m.require ? (m.require = CONTEXT.makeRequire(m.map)) : m.require,
          exports: (m) => {
            m.usingExports = true;
            if (!m.map.yesdef) return null;
            if (!m[_x]) return (m[_x] = this.defined[m.map.id] = {});
            return (this.defined[m.map.id] = m[_x]);
          },
          M: (m) =>
            (m[_m] = m[_m]
              ? m[_m]
              : {
                  id: m.map.id,
                  uri: m.map.url,
                  config: () =>
                    e_(CG.config).yes(m.map.id) ? CG.config[m.map.id] : {},
                  exports: m[_x] || (m[_x] = {})
                })
        },
        clrRegstr = (id) => {
          delete this.dependencies[id];
          delete this.enRgtry[id];
        },
        checkLoaded = () => {
          var err,
            fb,
            hs = [],
            reqCalls = [],
            wait = false,
            another = true,
            sec = CG.waitSeconds * 1000,
            halt = sec && CONTEXT.startTime + sec < new Date().getTime(); //It is possible to disable the wait interval by using waitSeconds of 0.

          // waitInterval - Do not bother if M call was a result of a cycle break.  hoist-"mixin" functional obj[prop]  traced,processed
          if (watch) return null;
          const mx = (m) => ({ m, s: m.depMaps, i: m.map.id });
          const progress = ({ m, s, i } = mx, t = {}, p = {}) => {
            t[i] = true;
            s.forEach((i = (d) => d.id, ix) => {
              var dep = e_(this.dependencies).yes(i) && this.dependencies[i]; // depMap force undefined (registered yet not matched in M)
              const c = dep && !m.depMatched[ix] && !p[i];
              // prettier-ignore
              if (c && (!e_(t).yes(i) || !t[i]))
              return progress(dep, t, p);
              // prettier-ignore
              c && m.defineDep(ix, this.defined[i]);
              c && m.check(); //pass false?
            });
            p[i] = true;
          };
          const brwr = isBrowser || isWebWorker;
          watch = true;
          const er = _e,
            mxx = (mod = (x) => this.enRgtry[x]) => {
              const {
                yesdef,
                fetched,
                prefix,
                error,
                enabled,
                inited
              } = mod.map;
              if (enabled && !yesdef) reqCalls.push(mod);
              mod.noCyc = fetched && yesdef && !prefix;
              return !inited && enabled && !error ? mod : {};
            }; //no keys, -fails
          _K(this.enRgtry).forEach(({ id, noCyc } = mxx, i) =>
            id && halt && !BINDABLES.hasPathFallback(id, CG.paths)
              ? BINDABLES.rmvScrpt(id, CONTEXT.ctn) && hs.push(id)
              : id &&
                new iifeapp(
                  ["fb", "wait", "another"],
                  halt && true,
                  true,
                  !halt && noCyc ? false : another
                )(this)
          ); //non-plugin-resource; Figure out the state of all the modules.//disabled or in error
          if (halt && hs.length) {
            // prettier-ignore
            err = BINDABLES.mk(["setTimeout", "Load setTimeout for modules: " + hs, null, hs]); //type, msg, err, requireModules
            err.ctn = CONTEXT.ctn;
            return onError(err); //If wait time expired, throw error of unloaded modules.
          } else
            return new iifeapp(
              (z) =>
                another &&
                reqCalls.forEach((m) =>
                  z[m][er] ? z[m][_em](er, z[m][er]) : progress(z[m])
                )(this), //construction
              ["watch", "clrsec"], //keys,...values
              false,
              (!halt || fb) &&
                wait &&
                brwr &&
                !clrsec &&
                setTimeout(() => checkLoaded() && null, 50) /*plugin-resource*/
            )(this); //args'-mutable iife=>"app"
        },
        //[], () => d, null,{enabled: true,ignore: true} if multiple define calls for the same M
        init = (depMaps, factory, eb, o = (o) => o || {}) => {
          if (M["inited"]) return null;
          M["factory"] = factory; //Register for errors on M M.
          if (eb) {
            M.on(_e, eb); //If no eb already, but there are error listeners
          } else if (M.events[_e]) eb = (err) => M.emit(_e, err); //construct((err) => M.emit(_e, err), M); //on M M, set up an eb to pass to the ds.
          const obj = {
            depMaps: depMaps && depMaps.slice(0),
            eb,
            inited: true,
            ignore: o.ignore
          }; //copy of 'source dependency arr inputs' (i.e. "shim" ds by depMaps arr)
          _K(obj).forEach((key) => (M[key] = obj[key]));
          if (o[_ed] || M[_ed]) return M.enable();
          M.check();
        },
        BF = {
          callGetModule: (args) =>
            !e_(this.defined).yes(args[0]) &&
            getModule(makeModuleMap(args[0], null, true))[_i](args[1], args[2]),
          getScriptData: (
            { rm, n } = (evt) => {
              return {
                rm: (node, func, name, ieName) =>
                  //prettier-ignore
                  !node.detachEvent || isOpera ? node.removeEventListener(name, func, false) : ieName && node.detachEvent(ieName, func),
                n: evt.currentTarget || evt.srcElement //REQUIREJS event info, remove listener from node //target
              };
            }
          ) => {
            rm(n, CONTEXT.onScriptLoad, "load", "onreadystatechange");
            rm(n, CONTEXT.onScriptError, _e);
            return { node: n, id: n && n.getAttribute(BINDABLES.dr(true)) };
          },
          tkeGblQue: () => {
            if (defineables.length)
              defineables.forEach((queueItem) => {
                var id = queueItem[0];
                if (T(id === _t)) CONTEXT.defQueueMap[id] = true;
                defQueue.push(queueItem);
              }); //globalQueue by internal method to M defQueue
            defineables = [];
          },
          getGlobal: (value) =>
            !value
              ? value //dont-notation dependency
              : value
                  .split(".")
                  .reduce((previous, key) => dependency[previous], {}),
          evt: (
            v = (evt) =>
              evt.type === "load" ||
              readyRegExp.test((evt.currentTarget || evt.srcElement).readyState)
          ) => {
            interscrpt = v ? null : interscrpt;
            return v && BF.getScriptData(BF.evt);
          } //interactiveScript - browser event for script loaded status
        },
        initial = {
          CG,
          ctn,
          defQueue,
          defQueueMap: {},
          makeModuleMap,
          nextTick: build.nextTick,
          onError
        };
      CONTEXT = {
        ...initial,
        urlFchd: this.urlFchd,
        defined: this.defined,
        dependencies: this.dependencies,
        configure: (c) => {
          if (c[_u] && c[_u].charAt(c[_u].length - 1) !== "/") c[_u] += "/"; //Make sure the baseUrl ends in a slash.
          if (T(c[_a] === _t))
            c[_a] = (id, url) => (url.indexOf("?") === -1 ? "?" : "&") + c[_a]; // Convert old style urlArgs string to a function.
          const shim = CG.shim; //save paths for special "additive processing"
          const mx = (op) => {
            const arr = ["paths", "bundles", "CG", "map"];
            !arr.includes(op)
              ? (CG[op] = c[op])
              : arr.forEach((op) => (CG[op] = !CG[op] ? {} : CG[op]));
            return op;
          }; //const objs = function (){arguments.forEach(x=>this[x]=true)}.apply({},["paths","bundles","CG","map"]);
          _K(c).forEach((prop = mx, i) =>
            BINDABLES.mixin(CG[prop], c[prop], true, true)
          );
          c[_b] &&
            _K(c[_b]).forEach((prop, i) =>
              c[_b][prop].forEach(
                (v) => (this.bdlMap[v] = v !== prop ? prop : this.bdlMap[v])
              )
            ); //Reverse map the bundles
          if (c[_s]) {
            _K(c[_s]).forEach((id, i) => {
              var v = c[_s][id];
              if (e_(v).string() === Ar) v = { ds: v }; //Merge shim, Normalize the structure
              if ((v[_x] || v[_i]) && !v[_xf])
                v[_xf] = CONTEXT.makeShimExports(v);
              shim[id] = v;
            });
            CG.shim = shim;
          }
          if (c[_p])
            c[_p].forEach((pkgObj) => {
              pkgObj = T(pkgObj === _t) ? { name: pkgObj } : pkgObj;
              var name = pkgObj.name,
                location = pkgObj[_l]; //Adjust packages if necessary.
              if (location) CG.paths[name] = pkgObj[_l];

              CG.pkgs[name] = `${pkgObj.name}/${(pkgObj.main || "main")
                .replace(/^\.\//, "")
                .replace(/\.js$/, "")}`; //normalize pkg name main M ID pointer paths
            }); //Update maps for "waiting to execute" modules in the this.dependencies.

          _K(this.dependencies).forEach(
            (
              id = (id) =>
                !this.dependencies[id].inited &&
                !this.dependencies[id].map.unnormalized &&
                id
            ) => (this.dependencies[id].map = makeModuleMap(id, null, true))
          ); //if inited and transient, unnormalized modules.
          if (c.ds || c.cb) CONTEXT.require(c.ds || [], c.cb); //When require is this.defined as a CG object before require.js is loaded,
        },
        makeShimExports: (value) =>
          function () {
            return (
              (value[_i] && value[_i].apply(dependency, arguments)) ||
              (value[_x] && BF.getGlobal(value[_x]))
            );
          }, //Shadowing of global property 'arguments'. (no-shadow-restricted-names)eslint
        makeRequire: (relMap, o = (options) => options || {}) => {
          const { tkeGblQue, callGetModule } = BF;
          const localRequire = (ds, cb, eb) => {
            var id, map, requireMod;

            if (o.enableBuildCallback && cb && e_(cb).string() === Fn)
              cb.__requireJsBuild = true;
            if (T(ds === _t))
              return e_(cb).string() === Fn
                ? onError(
                    BINDABLES.mk(["requireargs", "Invalid require call"]),
                    eb
                  ) //Invalid call; id, msg, err, requireModule
                : relMap && e_(handlers).yes(ds)
                ? handlers[ds](this.dependencies[relMap.id]) //when require|exports|M are requested && while M is being this.defined
                : build.get
                ? build.get(CONTEXT, ds, relMap, localRequire)
                : () => {
                    map = makeModuleMap(ds, relMap, false, true);
                    id = map.id; //Normalize M name from . or ..
                    return !e_(this.defined).yes(id)
                      ? // prettier-ignore
                        onError(BINDABLES.mk(["notloaded", `Module name ${id} has not been loaded yet for CONTEXT: ${ctn + (relMap ? "" : ". Use require([])")}`]))
                      : this.defined[id];
                  };
            //type, msg, err, requireModules
            const intakeDefines = () => {
              var args;
              tkeGblQue();
              while (defQueue.length) {
                args = defQueue.shift();

                if (args[0] === null)
                  return onError(
                    BINDABLES.mk([
                      "mismatch",
                      `Mismatched anonymous define() M: ${
                        args[args.length - 1]
                      }`
                    ])
                  );
                callGetModule(args);
              }
              CONTEXT.defQueueMap = {};
            }; //"intake modules" //type, msg, err, requireModules //...id, ds, factory; "normalized by define()"
            intakeDefines(); //Grab defines waiting in the dependency queue.
            CONTEXT.nextTick(() => {
              intakeDefines(); //Mark all the this.dependencies as needing to be loaded.
              requireMod = getModule(makeModuleMap(null, relMap)); //collect defines that could have been added since the 'require call'
              requireMod.skipMap = o.skipMap; //store if 'map CG' applied to M 'require call' for this.dependencies
              requireMod[_i](ds, cb, eb, { enabled: true });
              checkLoaded();
            });
            return localRequire;
          };
          BINDABLES.mixin(localRequire, {
            isBrowser,
            toUrl: (mNPE) => {
              //moduleNamePlusExt
              var ext,
                i = mNPE.lastIndexOf("."),
                seg = mNPE.split("/")[0],
                isRelative = seg === "." || seg === ".."; //URL path = M name + .extension; requires 'M name,' not 'plain URLs' like nameToUrl

              if (i !== -1 && (!isRelative || i > 1)) {
                ext = mNPE.substring(i, mNPE.length);
                mNPE = mNPE.substring(0, i);
              } //file extension alias, not 'relative path dots'

              const ar = [
                mNPE,
                relMap && relMap.id,
                true,
                CG.nodeIdCompat,
                CG.map,
                CG.pkgs
              ];
              return CONTEXT.nameToUrl(BINDABLES.normalize(ar), ext, true);
            },
            defined: (id) =>
              e_(this.defined).yes(makeModuleMap(id, relMap, false, true).id),
            specified: (
              id = (id) => makeModuleMap(id, relMap, false, true).id
            ) => e_(this.defined).yes(id) || e_(this.dependencies).yes(id)
          });
          if (!relMap)
            localRequire.undef = (id) => {
              tkeGblQue(); //Only allow undef on top level require calls
              var map = makeModuleMap(id, relMap, true), //Bind define() calls (fixes #408) to 'M' CONTEXT
                m = e_(this.dependencies).yes(id) && this.dependencies[id];
              m.undefed = true;
              ((z) => {
                BINDABLES.rmvScrpt(id, CONTEXT.ctn);
                delete z.defined[id];
                delete z.urlFchd[map.url];
                delete z.unDE[id];
              })(this);
              defQueue
                .sort((a, b) => b - a)
                .map((args, i) => args[0] === id && defQueue.splice(i, 1)); //Clean queued defines, backwards, so splices don't destroy the iteration
              delete CONTEXT.defQueueMap[id];
              this.unDE[id] =
                m && m.events.this.defined ? m.events : this.unDE[id]; //if different CG, same listeners
              m && clrRegstr(id);
            };
          return localRequire;
        },
        enable: (depMap) =>
          e_(this.dependencies).yes(depMap.id) &&
          this.dependencies[depMap.id] &&
          getModule(depMap).enable(),
        //if "m" M is in this.dependencies, parent's CONTEXT when overridden in "optimizer" (Not shown).
        completeLoad: (tkn) => {
          const { tkeGblQue, callGetModule, getGlobal } = BF;
          var found, args; //method used "internally" by environment adapters script-load or a synchronous load call.
          tkeGblQue();
          while (defQueue.length) {
            args = defQueue.shift();
            if (args[0] === null) {
              args[0] = tkn;
              if (found) break;
              found = true; //anonymous M bound to name already  M is another anon M waiting for its completeLoad to fire.
            } else if (args[0] === tkn) found = true;
            callGetModule(args);
          } //matched a define call in M script
          CONTEXT.defQueueMap = {};
          var m = e_(this.dependencies).yes(tkn) && this.dependencies[tkn]; // in case-/init-calls change the this.dependencies
          if (!found && !e_(this.defined).yes(tkn) && m && !m.inited) {
            var shim = e_(CG.shim).yes(tkn) ? CG.shim[tkn] : {};
            if (CG.enforceDefine && (!shim[_x] || !getGlobal(shim[_x])))
              return (
                !BINDABLES.hasPathFallback(tkn, CG.paths) &&
                onError(
                  BINDABLES.mk([
                    "nodefine",
                    "No define call for " + tkn,
                    null,
                    [tkn]
                  ])
                )
              ); //type, msg, err, requireModules
            callGetModule([tkn, shim.ds || [], shim.exportsFn]); //does not call define(), but simulated
          }
          checkLoaded(); //tkn = moduleName
        },
        nameToUrl: function () {
          //token, ext, skipExt, pkgMain
          var ext = arguments[1],
            skipExt = arguments[2],
            pkgMain = e_(CG.pkgs).yes(arguments[0]) && CG.pkgs[arguments[0]], //already-normalized-tkn as URL. Use toUrl for the public API.
            tkn = pkgMain ? pkgMain : arguments[0], //If slash or colon-protocol fileURLs contains "?" or even ends with ".js",
            id = e_(this.bdlMap).yes(tkn) && this.bdlMap[tkn]; //assume use of an url, not a M id.
          id && CONTEXT.nameToUrl(id, ext, skipExt); //filter out this.dependencies that are already paths.
          const geturl = (url = "") => {
            //Just a plain path, not M name lookup, so just return it.
            if (/^[/:?.]|(.js)$/.test(tkn)) return (url = tkn + (ext || "")); //Add extension if it is included. This is a bit wonky, only non-.js things pass
            var paths = CG.paths,
              syms = tkn.split("/"); //an extension, M method probably needs to be reworked. A M that needs to be converted to a path.
            for (let i = syms.length; i > 0; i -= 1) {
              var pM = syms.slice(0, i).join("/"); //per M name segment if path registered, start name, and work up
              var pP = e_(paths).yes(pM) && paths[pM]; //parentModule

              pP &&
                new iifeapp(
                  ["pP", "syms"],
                  e_(pP).a() ? pP[0] : pP,
                  syms.splice(0, i, pP)
                )(this);
              if (pP) break; //arr means a few choices; parentPath
            }
            url = syms.join("/"); //Join the path parts together, then figure out if baseUrl is needed.
            url +=
              ext || (/^data:|^blob:|\?/.test(url) || skipExt ? "" : ".js"); ///^data\:|^blob\:|\?/

            // prettier-ignore
            return `${(url.charAt(0) === "/" || url.match(/^[\w+.-]+:/) ? "" : CG.baseUrl) + url}`; ///^[\w\+\.\-]+:/
          }; //Delegates to build.load. Broken out as a separate function to
          return ((u) =>
            `${CG.urlArgs && !/^blob:/.test(u) ? u + CG.urlArgs(tkn, u) : u}`)(
            geturl
          );
        },

        load: (id, url) => build.load(CONTEXT, id, url),
        execCb: (name, cb, args, exports) => cb.apply(exports, args),
        onScriptLoad: (data = BF.evt) => CONTEXT.completeLoad(data.id),
        onScriptError: (evt) => {
          var data = BF.getScriptData(evt);
          if (!BINDABLES.hasPathFallback(data.id, CG.paths)) {
            const parents = _K(this.dependencies)
              .map((key, i) =>
                key.indexOf("_@r") !== 0
                  ? // prettier-ignore
                    this.dependencies[key].depMaps.forEach((depMap) => {
                if (depMap.id === data.id) { return key; } else
                  return "";
              })
                  : ""
              )
              .filter((x) => x !== "");
            return onError(
              // prettier-ignore
              BINDABLES.mk(["scripterror",`Script error for ${data.id+(parents.length?`" needed by: ${parents.join(", ")}` : '"')}`,evt,[data.id]])
            );
          }
        }
      }; //type, msg, err, requireModules

      var Module = (map, unDE, configShim) => {
        const obj = {
          events: (e_(unDE).yes(map.id) && unDE[map.id]) || {},
          map: map,
          shim: e_(configShim).yes(map.id) && configShim[map.id],
          depExports: [],
          depMaps: [],
          depMatched: [],
          pluginMaps: {},
          depCount: 0
        };
        _K(obj).forEach((key) => (M.key = obj[key]));
      }; //M.exports; M.factory; M.depMaps = [], M[_ed], M.fetched //const defaultOnError = (err) => err;
      //const construct = (f, obj) => function () { f.apply(obj, arguments); //in original JQuery RequireJS, obj is this or M }; //Function.prototype.construct (bind), with 'M' //https://stackoverflow.com/a/46700616/11711280

      Module[_P] = {
        init,
        defineDep: (i, depExports) => {
          if (!M.depMatched[i]) {
            M.depMatched[i] = true; //https://stackoverflow.com/questions/21939568/javascript-modules-prototype-vs-export
            M.depCount -= 1; //prototype is hydratable for async results, init only on M page by 'new' initialization
            M.depExports[i] = depExports; //multiple cb export cycles
          }
        },
        fetch: () => {
          if (M.fetched) return null;
          M.fetched = true;
          CONTEXT.startTime = new Date().getTime();
          var map = M.map;
          if (M.shim) {
            CONTEXT.makeRequire(M.map, {
              enableBuildCallback: true
            })(M.shim.ds || [], map.prefix ? M.callPlugin() : M.load()); //plugin-managed resource
          } else return map.prefix ? M.callPlugin() : M.load();
        },
        load: () => {
          if (!this.urlFchd[M.map.url]) {
            this.urlFchd[M.map.url] = true;
            CONTEXT.load(M.map.id, M.map.url);
          }
        },
        check: function () {
          if (!M[_ed] || M.enabling) return null;
          var id = M.map.id;
          if (!M["inited"])
            return !e_(CONTEXT.defQueueMap).yes(id) && M.fetch();
          if (M[_dg]) return M[_e] && M.emit(_e, M[_e]); // !defQueue.includes(M) M is ready to, and does, define itself
          var expts = M[_x],
            factory = M.factory;
          M[_dg] = true; //no redundant require-define
          if (M.depCount < 1 && !M.defined) {
            const isDefine = M.map.yesdef;
            if (e_(factory).string() === Fn) {
              var err,
                cjs,
                depExpo = M.depExports; //for define()'d  modules, use error listener, require errbacks should not be called (#699). Yet, if dependency-'onError,' use that.

              if ((M.events[_e] && isDefine) || build[_o] !== ((err) => err)) {
                // prettier-ignore
                try { expts = CONTEXT.execCb(id, factory, depExpo, expts); } catch (e) { err = e; } //factory.apply(exports, depExports),
              } else expts = CONTEXT.execCb(id, factory, depExpo, expts);
              if (isDefine && expts === undefined) {
                cjs = M[_m]; // Favor return value over exports. If node/cjs in play, then will not have a return value anyway. Favor
                if (cjs) {
                  expts = cjs[_x];
                } else if (M.usingExports) expts = M[_x];
              } // M.exports assignment over exports object. exports already set the this.defined value.

              err &&
                // new iifeapp(
                ((
                  z,
                  obj = {
                    requireMap: M.map,
                    requireModules: isDefine ? [M.map.id] : null,
                    requireType: isDefine ? "define" : _r
                  }
                ) => {
                  _K(obj).forEach((key) => (z.err[key] = obj[key]));
                  return onError((M[_e] = err)); //good example how 'err' prop read, no write, without iifeapp
                })(this); //if there were more solutions to be made, so is redundant here, actually
              //);
            } else expts = factory;

            M[_x] = expts;
            if (isDefine && !M.ignore) {
              this.defined[id] = expts;
              if (build.onResourceLoad)
                build.onResourceLoad(
                  CONTEXT,
                  M.map,
                  M["depMaps"].map((depMap) => depMap.normalizedMap || depMap)
                );
            }
            clrRegstr(id);
            M[_dd] = true;
          }
          M[_dg] = false; //Finished definition, so allow call-check again for 'define' notifications, by cycle.
          if (M[_dd] && !M.defineEmitted) {
            M["defineEmitted"] = true;
            M.emit(_dd, M[_x]);
            M["defineEmitComplete"] = true;
          }
        },
        normalizeMod: (plugin, mp) => {
          var { name, parentMap: pM } = M.map; //Normalize the ID if the plugin allows it.
          const { nodeIdCompat, map, pkgs } = CG;
          // prettier-ignore
          const namer = (name) => [name, pM ? pM.name : null, true, nodeIdCompat, map, pkgs]; //ptName
          if (plugin.normalize)
            name =
              plugin.normalize(name, (args = namer) =>
                BINDABLES.normalize(args)
              ) || ""; //prefix and name should already be normalized, no need
          var nM = makeModuleMap(mp.prefix + "!" + name, pM, true); //normalizedMap -for applying map CG again either.
          on(nM, _dd, (d) => {
            M.map.normalizedMap = nM;
            M[_i]([], () => d, null, {
              enabled: true,
              ignore: true
            });
          }); //construct
          var normMod =
            e_(this.dependencies).yes(nM.id) && this.dependencies[nM.id]; //normalizedMod
          if (normMod) {
            M["depMaps"].push(nM);
            if (M.events[_e]) normMod.on(_e, (err) => M.emit(_e, err)); //Mark M as a dependency for M plugin, so it can be traced for cycles.
            normMod.enable();
          }
        },
        callPlugin: () => {
          var map = M.map; //Map already normalized the prefix.
          var id = map.id; //Mark M as a dependency for M plugin, so it
          var pluginMap = makeModuleMap(map.prefix); //can be traced for cycles.
          M.depMaps.push(pluginMap);
          on(pluginMap, _dd, (plugin) => {
            if (M.map.unnormalized) return Module[_P].normalizeMod(plugin, map); //If current map is not normalized, wait for that
            var bundleId =
              e_(this.bdlMap).yes(M.map.id) && this.bdlMap[M.map.id]; //normalized name to load instead of continuing.
            if (bundleId) {
              M.map.url = CONTEXT.nameToUrl(bundleId);
              M.load();
              return null;
            } //If a paths CG, then just load that file instead to resolve the plugin, as it is built into that paths layer.
            const load = (factory) =>
              M[_i]([], () => factory, null, { enabled: true }); //depMaps, factory, eb, options
            load[_e] = (err) => {
              M["inited"] = true;
              M[_e] = err;
              err.requireModules = [id];
              _K(this.dependencies).forEach(
                (x, i) =>
                  this.dependencies[x].map.id.indexOf(id + "_unnormalized") ===
                    0 && clrRegstr(this.dependencies[x].map.id)
              );
              onError(err);
            }; //Remove temp unnormalized modules for M M, since they will never be resolved otherwise now. Allow plugins to load other code without having to know the
            const localRequire = CONTEXT.makeRequire(map.parentMap, {
              enableBuildCallback: true
            }); //CONTEXT or how to 'complete' the load.

            load.fromText = (text, textAlt) => {
              /*jslint evil: true */
              var tkn = map.name,
                moduleMap = makeModuleMap(tkn),
                hasInteractive = useInteractive; //2.1.0 onwards, pass text to reinforce fromText 1call/resource. pass tkn, ok, but discard tkn for internal ref.
              if (textAlt) text = textAlt;
              if (hasInteractive) useInteractive = false; //Turn off interactive script matching for IE for any define; calls in the text, then turn it back on at the end.
              getModule(moduleMap); //Prime the system by creating a M instance for
              if (e_(CG.config).yes(id)) CG.config[tkn] = CG.config[id]; //Transfer any CG to M other M.
              try {
                build.exec(text);
              } catch (e) {
                return onError(
                  BINDABLES.mk([
                    "fromtexteval",
                    `fromText eval for ${id} failed: ${e}`,
                    e,
                    [id]
                  ])
                );
              } //type, msg, err, requireModules
              if (hasInteractive) useInteractive = true; //Mark M as a dependency for the plugin resource
              M.depMaps.push(moduleMap);
              CONTEXT.completeLoad(tkn);
              localRequire([tkn], load); //Support anonymous modules. Bind the value of that M to the value for M resource ID.
            };
            plugin.load(map.name, localRequire, load, CG); //Use ptName here since the plugin's name is not reliable, could be some weird string with no path that actually wants to reference the ptName's path.
          });
          CONTEXT.enable(pluginMap, M);
          M.pluginMaps[pluginMap.id] = pluginMap;
        },
        enable: () => {
          this.enRgtry[M.map.id] = M;
          M[_ed] = true;
          M.enabling = true; //no inadvertent load and 0 depCount by

          //immediate calls to the this.defined callbacks for this.dependencies. Enable mapFunction 1,dependency
          M.depMaps.forEach((depMap, i) => {
            if (T(depMap === _t)) {
              const mp = M.map.yesdef ? M.map : M.map.parentMap;
              depMap = makeModuleMap(depMap, mp, false, !M.skipMap); //Dependency needs to be converted to a depMap
              M.depMaps[i] = depMap; //and wired up to M M.
              var handler = e_(handlers).yes(depMap.id) && handlers[depMap.id];
              if (handler) return (M.depExports[i] = handler(M));
              M["depCount"] += 1;
              on(depMap, _dd, (depExports) => {
                if (M.undefed) return null;
                M.defineDep(i, depExports);
                M.check();
              });
              if (M.eb) {
                on(depMap, _e, M.eb); // propagate the error correctly - something else is listening for errors
              } else if (M.events[_e]) on(depMap, _e, (err) => M.emit(_e, err));
            } // (No direct eb on M M)
            var id = depMap.id,
              m = this.dependencies[id]; //Skip special modules like 'require', 'exports', 'M'
            if (!e_(handlers).yes(id) && m && !m[_ed])
              CONTEXT.enable(depMap, M);
          }); //don't call enable if it is already enabled (circular ds)

          _K(M.pluginMaps).forEach(
            (pM = (x) => M.pluginMaps[x], i) =>
              e_(this.dependencies).yes(pM.id) &&
              this.dependencies[pM.id] &&
              !this.dependencies[pM.id][_ed] &&
              CONTEXT.enable(pM, M)
          );
          M.enabling = false;
          M.check();
        },
        on: (name, cb) =>
          (M.events[name] ? M.events[name] : (M.events[name] = [])).push(cb),
        emit: (name, evt) => {
          M.events[name].forEach((cb) => cb(evt));
          if (name === _e) delete M.events[name];
        }
      }; //remove broken Module instance from this.dependencies.//BS/BF 'bindingsFetch'

      CONTEXT.require = CONTEXT.makeRequire();
      return CONTEXT;
    }
  }

  //uses 'this' as 'z', but when called () the function is returned,
  var require = ((z) =>
    (T(define !== _n) ||
      (T(REQUIREJS !== _u) && e_(REQUIREJS).string() === Fn)) && // package-names, cb, returns a value to define the M of argument index[0]
    function () {
      //dependency = arguments[0],
      const notBaseUrl = T(REQUIREJS !== _u),
        notrequire = T(require !== _n) && !e_(require).string() === Fn;
      configuration = notBaseUrl ? (REQUIREJS ? notrequire : require) : null;
      REQUIREJS = notBaseUrl ? (undefined ? notrequire : undefined) : null;
      //(name,baseName,applyMap,configNodeIdCompat,configMap,configPkgs)

      const obj = {
        CG: (cfg) => z.build(cfg),
        nextTick: (fn) => (T(setTimeout !== _n) ? setTimeout(fn, 4) : fn())
      }; // globally agreed names for other potential AMD loaders

      _K(obj).forEach((key) => (z.build[key] = obj[key]));
      if (!require) require = z.build; //Exportable require
      ["version", "isBrowser"].forEach((k) => (z.build[k] = z[k]));

      //prettier-ignore
      /*jslint evil: true */
      z.build.exec = (text) =>new Promise((resolve, reject) =>new Function("resolve", `"use strict";return (${text})`)(resolve, text)); //eval(text);

      var s = (z.build.s = { contexts: ctxs, newContext }); //Create default CONTEXT.
      z.build({}); //'dependency require' CONTEXT-sensitive exported methods
      ctxReqProps.forEach(
        (prop) =>
          (z.build[prop] = function () {
            return ctxs[us].require[prop].apply(ctxs[us], arguments);
          })
      ); //apply arguments to requires on context
      //for the latest instance of the 'default CONTEXT CG'//not the 'early binding to default CONTEXT,' but ctxs during builds//ticketx to apology tour

      if (isBrowser)
        head = s.head = e_("base").tag(0)
          ? baseElement.parentNode
          : e_("head").tag();
      //(IE6) BASE appendChild (http://dev.jquery.com/ticket/2709)
      z.build[_o] = (err) => err; // node for the load command in browser env
      z.build.createNode = (CG, tkn, url) => {
        return {
          ...(CG.xhtml ? e_().create("NS") : e_().create()),
          type: CG.scriptType || "text/javascript",
          charset: "utf-8",
          async: true
        };
      };

      z.build.load = (CONTEXT, tkn, url) => {
        const { dr } = BINDABLES; // normalize, hasPathFallback, rmvScrpt, Module Do not overwrite an existing REQUIREJS instance/ amd loader.
        const CG = (CONTEXT && CONTEXT.CG) || {};
        //handle load request (in browser env); 'CONTEXT' for state, 'tkn' for name, 'url' for point
        if (isBrowser) {
          var n = z.build.createNode(CG, tkn, url); //browser script tag //testing for "[native code" https://github.com/REQUIREJS/REQUIREJS/issues/273
          n[_SA](dr(), CONTEXT.ctn);
          n[_SA](dr(true), tkn); //artificial native-browser support? https://github.com/REQUIREJS/REQUIREJS/issues/187 //![native code]. IE8, !node.attachEvent.toString()

          if (
            //prettier-ignore
            n[_AE] &&!(n[_AE].toString && n[_AE].toString().indexOf("[native code") < 0) &&!isOpera
          ) {
            useInteractive = true;
            n[_AE]("onreadystatechange", CONTEXT.onScriptLoad); //IE (6-8) doesn't script-'onload,' right after executing the script, cannot "tie" anonymous define call to a name,
            //yet for 'interactive'-script, 'readyState' triggers by 'define' call IE9 "addEventListener and script onload firings" issues should actually 'onload' event script, right after the script execution
            //https://connect.microsoft.com/IE/feedback/details/648057/script-onload-event-is-not-fired-immediately-after-script-execution
            //Opera.attachEvent does not follow the execution mode. IE9+ 404s, and 'onreadystatechange' fires before the 'error' handlerunless 'addEventListener,'
          } else
            (function () {
              n[_AEL]("load", CONTEXT.onScriptLoad, false);
              n[_AEL](_e, CONTEXT.onScriptError, false);
            })(); //yet that pathway not doing the 'execute, fire load event listener before next script'//node.attachEvent('onerror', CONTEXT.onScriptError);
          n.src = url; //Calling onNodeCreated after all properties on the node have been
          if (CG.onNodeCreated) CG.onNodeCreated(n, CG, tkn, url); //set, but before it is placed in the DOM.
          //IE 6-8 cache, script executes before the end
          scriptPends = n; //of the appendChild execution, so to tie an anonymous define
          if (baseElement) {
            head.insertBefore(n, baseElement);
          } else head.appendChild(n); //call to the M name (which is stored on the node), hold on to a reference to M node, but clear after the DOM insertion.
          scriptPends = null;
          return n; // bug in WebKit where the worker gets garbage-collected after calling
        } else if (isWebWorker) {
          try {
            setTimeout(() => {}, 0);
            importScripts(url);
            CONTEXT.completeLoad(tkn); // importScripts(): https://webkit.org/b/153317, so, Post a task to the event loop //Account for anonymous modules
          } catch (e) {
            CONTEXT[_o](
              BINDABLES.mk([
                "importscripts",
                `importScripts failed for ${tkn} at ${url}`,
                e,
                [tkn]
              ])
            );
          } //type, msg, err, requireModules
        }
      };
      if (isBrowser && !configuration.skipDataMain)
        e_()
          .tag()
          .sort((a, b) => b - a)
          .forEach((script) => {
            !head &&
              (() => {
                head = script.parentNode;
                dataMain = script.getAttribute("data-main");
              })(); //Set 'head' and append children to script's parent attribute 'data-main' script to load baseUrl, if it is not already set.
            if (dataMain) {
              mainScript = dataMain; //Preserve dataMain in case it is a path (i.e. contains '?')
              if (!configuration.baseUrl && mainScript.indexOf("!") === -1)
                new iifeapp(
                  ["src", "mainScript", "subPath", "configuration.baseUrl"],
                  mainScript.split("/"),
                  src.pop(),
                  src.length ? src.join("/") + "/" : "./",
                  subPath
                )(this);
              //baseUrl if data-main value is not a loader plugin M ID. data-main-directory as baseUrl //Strip off trailing .js mainScript, as is now a M name.
              mainScript = mainScript.replace(/\.js$/, ""); //If mainScript is still a mere path, fall back to dataMain
              if (/^[/:?.]|(.js)$/.test(mainScript)) mainScript = dataMain; //filter out this.dependencies that are already paths.//^\/|:|\?|\.js$
              configuration.ds = configuration.ds
                ? configuration.ds.concat(mainScript)
                : [mainScript]; //Put the data-main script in the files to load.
              return true;
            }
          });
      //Set up with CG info.
      z.build(configuration);
    })(this); //App (same - both)
  return { require: new require(this), define: define };
};

const Required = () => new App();
export { Required as default };
