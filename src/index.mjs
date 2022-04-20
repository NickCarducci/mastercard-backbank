/**UNLICENSED BUT FOR PARTS OF OTHERS */

/** vim: et:ts=4:sw=4:sts=4
 * @license RequireJS 2.3.6.carducci Copyright jQuery Foundation and other contributors.
 * Released under MIT license, https://github.com/REQUIREJS/REQUIREJS/blob/master/LICENSE
 */
//Not using strict: uneven strict support in browsers, #392, and causes
//problems with variables.REQUIREJS.exec()/transpiler plugins that may not be strict.
/*jslint regexp: true, nomen: true, sloppy: true */
/*dependency window, navigator, document, importScripts, setTimeout, opera */

//cannot this never get to the string regex?

class Require {
  constructor() {
    var variables = {
      configuration: {},
      REQUIREJS: null
    };
    var setTimeout,
      T = (x) => typeof x;
    //s eslint-disable-next-line
    setTimeout = T(setTimeout === "undefined") ? undefined : setTimeout;
    var mainScript,
      src,
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
        seratimNull(
          variables,
          "undefined",
          (rem =
            !rem && e_(c).string() === Fn && c.length
              ? WINDOW.concat(rem, c)
              : rem)
        ) &&
        // no deps nor name + cb is func => then CommonJS, iifeapp(["interscrpt"], "value");
        seratimNull(
          variables,
          "undefined",
          (nm = useInteractive && !nm ? n()[ga](WINDOW.dr(true)) : nm)
        ) &&
        seratimNull(
          variables,
          "undefined",
          (STATE = useInteractive ? contexts[n()[ga](WINDOW.dr())] : STATE)
        ) &&
        //getInteractiveScript Look for a data-main script attribute, which could also adjust the baseUrl. baseUrl from script tag with require.js in it.

        (!STATE ? defineables.push([nm, rem, c]) : true) &&
        STATE.defQueue.push([nm, rem, c]) &&
        (STATE.defQueueMap[nm] = true) && { amd: { jQuery: true } },
      createElement = (ns) =>
        document[`createElementNS${ns ? "NS" : ""}`](
          ns ? ("http://www.w3.org/1999/xhtml", "html:script") : "script"
        ),
      version = "2.3.6.carducci",
      iifeapp = class iifeapp {
        constructor() {
          const z = arguments[0]; //allows mutable context, 'new' instantiatable 'iifeapp' for the "enclosing 'this'," else App() function
          return function () {
            var construction = arguments[0],
              keys = arguments[1];
            const buff = construction.constructor === Array ? 0 : 1;
            (construction =
              construction.constructor === Array ? () => {} : construction) &&
              (keys = keys.constructor === Array ? keys : construction) &&
              seratimNull(
                variables,
                "undefined",
                construction.constructor === Function && construction()
              ) &&
              seratimNull(variables, "undefined", keys.constructor === Array) &&
              keys.forEach((x, i) =>
                x.includes(".")
                  ? (z[x.split(".")[0]][x.split(".")[1]] = arguments[i + buff])
                  : (z[x] = arguments[i + buff])
              );
          };
        }
      }, //this(and arguments) should relate to wherever function runs (fat has no 'this', iife can to append this[key])
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
      ga = "getAttribute",
      interscrpt,
      scriptPends,
      defineables = [],
      useInteractive = false,
      contexts = {},
      /**
      STATE.require.undef(id);
      STATE.makeRequire(null, { skipMap: true })([id]);
      STATE = STATE ? STATE : (contexts[NAME] = new BUILD.start.newRequireable(NAME)); //dependency
      cfg && STATE.configure(cfg);
      return STATE.require(REM, cb, eb);
    */
      _ = "_",
      _f = "*",
      _p = "packages",
      _b = "bundles",
      _s = "shim",
      _l = "location",
      _u = "baseUrl",
      _a = "urlArgs",
      _t = "string",
      _xf = "exportsFn",
      _x = "exports",
      _m = "module",
      _oE = "onError",
      _d = "defined",
      _dg = "defining",
      _ed = "enabled",
      _e = "error",
      _em = "emit",
      _ev = "events",
      _i = "init",
      _n = "undefined",
      window = _n,
      navigator = _n,
      isBrowser = T(window !== _n) && T(navigator !== _n) && window.document,
      sign = { version, isBrowser },
      _r = "require",
      Ar = "[object Array]",
      Fn = "[object Function]",
      _K = (o) => (o && o.constructor === Object ? Object.keys(o) : []),
      _S = Object.prototype.toString,
      _H = "hasOwnProperty",
      _P = "prototype",
      _SA = "setAttribute",
      _AE = "attachEvent",
      _AEL = "addEventListener",
      ctxReqProps = ["toUrl", "undef", "defined", "specified"],
      WINDOW = {
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
        dr: (m) => `data-require${m ? _m : "context"}`,
        concat: (
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
        ) => (cb.length === 1 ? [_r] : [_r, _x, _m]).concat(rem), //Potential-CommonJS use-case of exports and this, without 'require.';
        rmvScrpt: (name, NAME) => {
          const ga = "getAttribute",
            e = (m) => (m ? name : NAME); //scriptNode
          return (
            isBrowser &&
            seratimNull(
              variables,
              "undefined",
              e_()
                .tag()
                .forEach(
                  (sN) =>
                    sN[ga](WINDOW.dr(true)) === e(true) &&
                    sN[ga](WINDOW.dr()) === e() &&
                    sN.parentNode.removeChild(sN)
                )
            )
          );
        },
        hasPathFallback: (id, cP) => {
          var pC = e_(cP).yes(id) && cP[id]; //pathConfig,configPaths
          if (pC && e_(pC).string() === Ar && pC.length > 1) {
            pC.shift(); //config is live? but 'id' is variable as args.. [for the?] next try
            STATE.require.undef(id);
            STATE.makeRequire(null, { skipMap: true })([id]);
            return true;
          }
        },
        //'applyMap' for dependency ID, 'baseName' relative to 'name,' the most relative
        normalize: (nm, bn, applyMap, conId, system, configPkgs) => {
          const tool = () => {
              return {
                parseName: (nm, roots, suffjs) =>
                  nm &&
                  ((
                    { nm, nml = (nm) => /\.js$/.test(nm[nm.length - 1]) } = (
                      o
                    ) => {
                      return {
                        nm:
                          o.nm[0].charAt(0) === "." && roots
                            ? roots.slice(0, roots.length - 1).concat(o.nm)
                            : o.nm,
                        nml: suffjs ? o.nml.replace(/\.js$/, "") : o.nml
                      };
                    }
                  ) => {
                    //Adjust any relative paths. node allows either .js or non .js, yet not in nameToUrl;baseName.push(nm), but new instead of length report
                    for (let i = 0; i < nm.length; i++) {
                      const solid = nm[i] === "." && nm.splice(i, 1);
                      if (solid) continue;
                      i = solid ? i - 1 : i;
                      const more =
                        i === 0 ||
                        (i === 1 && nm[2] === "..") ||
                        nm[i - 1] === "..";
                      if (!more && i > 0 && nm.splice(i - 1, 2)) i -= 2;
                    }
                    return nm.join("/");
                  })((nm = nm.split("/"))), //just enabled, but unactivated, modules
                convertName: function (
                  nm = arguments[0],
                  mp = arguments[1],
                  applyMap = arguments[2],
                  ph = arguments[3]
                ) {
                  if (!applyMap || !mp || (!ph && !mp[_f])) return nm;
                  var n,
                    i,
                    folder,
                    nms = nm.split("/"),
                    configMap = mp && mp[_f]; //continue search ___ map STATE.CONFIG, bigloop:

                  for (let g = nms.length; g > 0; g -= 1) {
                    const name = nms.slice(0, g).join("/"), //favor a "star map" unless shorter matching STATE.CONFIG
                      mV = (fP = (f) => ph.slice(0, f).join("/")) =>
                        e_(mp).yes(fP) && mp[fP],
                      loop = (z, sum = 0) => {
                        let add = (sum = z.ph.length);
                        var maybe = z.mV && e_(z.mV).yes(name) && z.mV[name],
                          set = () => (i = g),
                          more = mV && e_(mV).yes(name) && mV[name],
                          loo = (add, sum) => (sum = add);
                        /*for (f = z.ph.length; f > 0; f--) {
                          var bre = null;
                          if (s) bre = true;
                          if (z.mV && e_(z.mV).yes(name) && z.mV[name]) set();
                          if (bre) break;
                        }*/

                        return (
                          maybe && set() && (more ? loo(add--, sum) : null)
                        );
                      };
                    seratimNull(
                      variables,
                      "undefined",
                      mp &&
                        mp[_f] &&
                        e_(mp[_f]).yes(name) &&
                        ((i = this).folder = i.configMap[name]) &&
                        ph &&
                        loop(this) &&
                        //prettier-ignore
                        !folder &&
                        configMap &&
                        e_(configMap).yes(name) &&
                        ((z) => {
                          z.folder = z.configMap[name];
                          n = g;
                        })(this)
                    ) &&
                      ph &&
                      loop(this);
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
        }
      },
      //uses 'this' as 'z', but when called () the function is returned,
      BUILD = (variables.REQUIREJS = function () {
        var REM = arguments[0], //String(require|export|module)
          cb = arguments[1],
          eb = arguments[2],
          optional = arguments[3],
          STATE,
          cfg,
          NAME = _; //Caja compliant BUILD for minified-scope name of dependency, cb for arr completion Find the right STATE, use default
        if (!e_(REM).string() === Ar && T(REM !== _t)) {
          cfg = REM;
          return !e_(cb).a()
            ? (REM = [])
            : iifeapp(this)(["REM", "cb", "eb"], cb, eb, optional);
        } // Determine if have STATE.CONFIG object in the call. REM is a STATE.CONFIG object Adjust args if there are STATE.dependencies
        (NAME = cfg && cfg.context ? cfg.context : NAME) &&
          seratimNull(
            variables,
            "undefined",
            (STATE = e_(contexts).yes(NAME) && contexts[NAME])
          );
        console.log(STATE, STATE && STATE.require);
        STATE = STATE
          ? STATE
          : (contexts[NAME] = class newRequireable {
              constructor() {
                const NAME = arguments[0],
                  state = {
                    NAME,
                    defQueue,
                    defQueueMap: {},
                    makeModuleMap,
                    nextTick: BUILD.nextTick,
                    Module,
                    load: (id, url) => BUILD.load(STATE, id, url),
                    execCb: (name, cb, args, exports) =>
                      cb.apply(exports, args),
                    onError,
                    CONFIG: STATE.CONFIG,
                    unDe: STATE.unDE ? STATE.unDE : {},
                    enRgtry: STATE.enRgtry ? STATE.enRgtry : {},
                    urlFchd: STATE.urlFchd ? STATE.urlFchd : {}, //this able's
                    defined: STATE.defined ? STATE.defined : {},
                    dependencies: STATE.dependencies ? STATE.dependencies : {},
                    configure,
                    makeShimExports: (value) =>
                      function () {
                        return (
                          (value[_i] &&
                            value[_i].apply(dependency, arguments)) ||
                          (value[_x] && getGlobal(value[_x]))
                        );
                      }, //Shadowing of global property 'arguments'. (no-shadow-restricted-names)eslint
                    /* makeShimExports: (value) =>
                    function () {
                      return (
                        (value[_i] && value[_i].apply(dependency, arguments)) ||
                        (value[_x] && getGlobal(value[_x]))
                      );
                    }, //Shadowing of global property 'arguments'. (no-shadow-restricted-names)eslint*/
                    makeRequire: (modMap, options) =>
                      makeRequire(modMap, options, NAME),
                    enable: (depMap) =>
                      e_(STATE.dependencies).yes(depMap.id) &&
                      STATE.dependencies[depMap.id] &&
                      getModule(depMap).enable(),
                    //if "m" this is in STATE.dependencies, parent's STATE when overridden in "optimizer" (Not shown).
                    completeLoad: (tkn) => {
                      var found, args; //method used "internally" by environment adapters script-load or a synchronous load call.
                      for (tkeGblQue(); defQueue.length; ) {
                        defQueue.shift();
                        if (found) break;
                        (found = true) && //anonymous this bound to name already  this is another anon this waiting for its completeLoad to fire.
                          (args = args[0] =
                            args[0] === null
                              ? tkn
                              : args[0] === tkn
                              ? (found = true)
                              : null) &&
                          callGetModule(args);
                      } //matched a define call in this script
                      STATE.defQueueMap = {};
                      var m =
                        e_(STATE.dependencies).yes(tkn) &&
                        STATE.dependencies[tkn]; // in case-/init-calls change the STATE.dependencies
                      if (
                        !found &&
                        !e_(STATE.defined).yes(tkn) &&
                        m &&
                        !m.inited
                      ) {
                        var shim = e_(STATE.CONFIG.shim).yes(tkn)
                          ? STATE.CONFIG.shim[tkn]
                          : {};
                        if (
                          STATE.CONFIG.enforceDefine &&
                          (!shim[_x] || !getGlobal(shim[_x]))
                        )
                          return (
                            !WINDOW.hasPathFallback(tkn, STATE.CONFIG.paths) &&
                            onError(
                              WINDOW.mk([
                                "nodefine",
                                "No define call for " + tkn,
                                null,
                                [tkn]
                              ])
                            )
                          ); //type, msg, err, requireModules
                        callGetModule([tkn, shim.REM || [], shim.exportsFn]); //does not call define(), but simulated
                      }
                      return (
                        checkLoaded() && true //tkn = moduleName
                      );
                    }
                  };
                return (
                  //abnormalCount - normalize() will run faster if there is no default //BR "bindingsRequire"
                  checkLoaded() && //this param?
                  seratimNull(
                    variables,
                    "undefined",
                    _K(state).forEach((key) => (STATE[key] = state[key]))
                  ) &&
                  seratimNull(
                    variables,
                    "undefined",
                    [
                      "dependencies",
                      "enRgtry",
                      "unDE",
                      "defined",
                      "urlFchd",
                      "bdlMap"
                    ].forEach((k) => (STATE[k] = {}))
                  ) &&
                  (STATE.require = STATE.makeRequire()) &&
                  STATE
                );
              }
            }); //dependency
        console.log(STATE, STATE && STATE.require);
        return (
          seratimNull(variables, "undefined", cfg && STATE.configure(cfg)) &&
          STATE.require(REM, cb, eb)
        );
      }),
      e_ = (obj /*,string*/) => {
        // !obj && console.log(obj + " error obj in ", this);
        const n = (NS) =>
          NS.constructor === "String" && NS.toUpperCase() === "NS";
        const yes = (name) => obj[_H](name) /*[_P]*/,
          string = () => _S(obj),
          tag = (ind) =>
            document.getElementsByTagName(obj ? obj : "script")[ind];
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
                ) =>
                  (obj[1][prop] = !go ? v : obj[1][prop] ? obj[1][prop] : {}) &&
                  WINDOW.mixin(obj[1][prop], v, obj[2], obj[3]) &&
                  obj[1])(obj[0][prop]), //s,tgt,frc,dSM
          create: (ns = n) => createElement(ns),
          string,
          a: (x) => x.string() === Ar,
          tag,
          interA: (x) => x.readyState === "interactive"
        };
      }; //obj.prototype["hasOwnProperty"][name]; const method =string?"toString":"hasOwnProperty"
    console.log("In Require: ", "BUILD", BUILD);
    var clrsec, watch;
    function checkLoaded(parentThis = arguments[0]) {
      var err,
        fb,
        hs = [],
        reqCalls = [],
        wait = false,
        another = true,
        sec = STATE.CONFIG.waitSeconds * 1000,
        halt = sec && STATE.startTime + sec < new Date().getTime(); //It is possible to disable the wait interval by using waitSeconds of 0.

      // waitInterval - Do not bother if this call was a result of a cycle break.  hoist-"mixin" functional obj[prop]  traced,processed
      if (watch) return true;
      const prog = (m, ss, tt, p) =>
          new Promise(
            (resolve) =>
              ss.forEach(
                (
                  { i, dep } = (d) => {
                    return {
                      i: d.id,
                      dep:
                        e_(STATE.dependencies).yes(i) && STATE.dependencies[i]
                    };
                  },
                  ix
                ) =>
                  !m.depMatched[ix] &&
                  !p[i] && // depMap force undefined (registered yet not matched in this)
                  (!e_(tt).yes(i) || !tt[i]
                    ? progress(dep, tt, p)
                    : ["defineDep", "check"].forEach(
                        (cd, n) => n === 0 && m[cd](ix, STATE.defined[i])
                      )) //pass false?
              ) && resolve("")
          ),
        mx = (m) => ({ m, s: m.depMaps, i: m.map.id }),
        progress = ({ m, ss, i } = mx, tt = { [mx.i]: true }, p = {}) =>
          prog(m, ss, tt, p).then(() => (p[i] = true)),
        brwr = isBrowser || isWebWorker;
      watch = true;
      const er = _e; //no keys, -fails
      console.log("In Checkloaded", "STATE", STATE);
      _K(STATE.enRgtry).forEach(
        (
          { id, noCyc } = (mod = (x) => STATE.enRgtry[x]) =>
            ((
              { yesdef, fetched, prefix, error, enabled, inited } = (map) => map
            ) => {
              if (enabled && !yesdef) reqCalls.push(mod);
              mod.noCyc = fetched && yesdef && !prefix;
              return !inited && enabled && !error ? mod : {};
            })(mod.map),
          i
        ) =>
          id && halt && !WINDOW.hasPathFallback(id, STATE.CONFIG.paths)
            ? WINDOW.rmvScrpt(id, STATE.NAME) && hs.push(id)
            : id &&
              iifeapp(parentThis)(
                ["fb", "wait", "another"],
                halt && true,
                true,
                !halt && noCyc ? false : another
              )
      ); //non-plugin-resource; Figure out the state of all the modules.//disabled or in error
      if (halt && hs.length) {
        // prettier-ignore
        err = WINDOW.mk(["setTimeout", "Load setTimeout for modules: " + hs, null, hs]); //type, msg, err, requireModules
        err.NAME = STATE.NAME;
        return onError(err); //If wait time expired, throw error of unloaded modules.
      }
      return iifeapp(parentThis)(
        () =>
          another &&
          reqCalls.forEach((m) =>
            parentThis[m][er]
              ? parentThis[m][_em](er, parentThis[m][er])
              : progress(parentThis[m])
          ), //construction
        ["watch", "clrsec"], //keys,...values
        false,
        (!halt || fb) &&
          wait &&
          brwr &&
          !clrsec &&
          setTimeout(() => checkLoaded() && null, 50) /*plugin-resource*/
      ); //args'-mutable iife=>"app"
    }
    //[], () => d, null,{enabled: true,ignore: true} if multiple define calls for the same this
    const seratimNull = (z, _, value) => {
        z[_] = value;
        return true;
      }, //z is a this binding ...as args
      tryCatch = (z, key, value) => {
        var er = null;
        try {
          z[key] = value;
        } catch (e) {
          er = e;
        }
        return er;
      };
    class Module {
      constructor(
        map = arguments[0],
        unDE = arguments[1],
        configShim = arguments[2]
      ) {
        var id = () => map.id,
          v = {},
          check = () =>
            this[_ed] && !this.enabling && !this.INITED
              ? !e_(STATE.defQueueMap).yes(id) && this.fetch()
              : this[_dg] //new Promise(r=>r(""))
              ? this[_e] && emit(_e, this[_e]) // !defQueue.includes(this) this is ready to, and does, define itself
              : (this[_dg] = true) && //no redundant require-define
                (depCount > 0 || STATE.defined
                  ? () => {}
                  : () => {
                      (v.isDefine = map.yesdef) &&
                        (this[_x] =
                          e_(this.factory).string() !== Fn
                            ? () => this.factory
                            : () => {
                                var depExpo = depExports, //for define()'d  modules, use error listener, require errbacks should not be called (#699). Yet, if dependency-'onError,' use that.
                                  cjs =
                                    v.isDefine &&
                                    this[_x] === undefined &&
                                    this[_m]; // Favor return value over exports. If node/cjs in play, then will not have a return value anyway. Favor

                                const er = tryCatch(
                                  this,
                                  _x,
                                  STATE.execCb(
                                    id,
                                    this.factory,
                                    depExpo,
                                    this[_x]
                                  )
                                );
                                if (er) {
                                  ((events[_e] && v.isDefine) ||
                                    BUILD[_oE] !== ((err) => err)) &&
                                    er &&
                                    // new iifeapp(this)(
                                    ((z, obj) => {
                                      _K(obj).forEach(
                                        (key) => (z.err[key] = obj[key])
                                      );
                                      return onError((z[_e] = er)); //good example how 'err' prop read, no write, without iifeapp
                                    })(this, {
                                      requireMap: map,
                                      requireModules: v.isDefine
                                        ? [map.id]
                                        : null,
                                      requireType: v.isDefine ? "define" : _r
                                    }); //if there were more solutions to be made, so is redundant here, actually
                                } //factory.apply(exports, depExports),
                                // this.exports assignment over exports object. exports already set the STATE.defined value.

                                return !cjs
                                  ? this[_x]
                                  : cjs
                                  ? cjs[_x]
                                  : this.usingExports
                                  ? this[_x]
                                  : null;
                                //);
                              });
                    }) &&
                (v.isDefine && !this.ignore
                  ? new Promise(
                      (resolve) => (STATE.defined[id] = this[_x] && resolve(""))
                    ).then(
                      () =>
                        BUILD.onResourceLoad &&
                        BUILD.onResourceLoad(
                          STATE,
                          map,
                          depMaps.map(
                            (depMap) => depMap.normalizedMap || depMap
                          )
                        )
                    )
                  : null) &&
                clrRegstr(id) &&
                (this[_d] = true) &&
                seratimNull(this, _dg) && //Finished definition, so allow call-check again for 'define' notifications, by cycle.
                this[_d] &&
                !this.defineEmitted &&
                emit(_d, this[_x]) &&
                ["defineEmitted", "defineEmitComplete"].forEach(
                  (de) => (this[de] = true)
                ),
          on = ({ m, dm } = depMap, name, f) => {
            if (!e_(STATE.defined).yes(dm.id) || (m && !m.defineEmitComplete))
              return name === _d && f(STATE.defined[dm.id]);
            const s = (m = (dm) => getModule(dm)) =>
              m[_e] && name === _e ? f(m[_e]) : m.on(name, f);
            return s(dm);
          },
          depMatched = [],
          depMaps = [],
          pluginMaps = {},
          depExports = [],
          events = (e_(unDE).yes(map.id) && unDE[map.id]) || {},
          depCount = 0,
          enable = () =>
            (STATE.enRgtry[map.id] = this) &&
            (this[_ed] = true) && //no inadvertent load and 0 depCount by
            (this.enabling = true) &&
            //immediate calls to the STATE.defined callbacks for STATE.dependencies. Enable mapFunction 1,dependency
            seratimNull(
              variables,
              "undefined",
              depMaps.forEach((depMap, i) => {
                if (T(depMap === _t)) {
                  const mp = map.yesdef ? map : map.parentMap;
                  (depMap = makeModuleMap(depMap, mp, false, !this.skipMap)) &&
                    (depMaps[i] = depMap); //Dependency needs to be converted to a depMap //and wired up to this this.
                  var handler =
                    e_(handlers).yes(depMap.id) && handlers[depMap.id];
                  if (handler) return (depExports[i] = handler(this));
                  const go = () =>
                    seratimNull(variables, "undefined", (depCount += 1)) &&
                    on(depMap, _d, (depExports) => {
                      if (this.undefed) return null;
                      seratimNull(
                        variables,
                        "undefined",
                        this.defineDep(i, depExports)
                      ) && check();
                    }) &&
                    (this.eb
                      ? on(depMap, _e, this.eb) // propagate the error correctly - something else is listening for errors
                      : events[_e]
                      ? on(depMap, _e, (err) => emit(_e, err))
                      : null);
                  go();
                } // (No direct eb on this this)
                var id = depMap.id,
                  m = STATE.dependencies[id]; //Skip special modules like 'require', 'exports', 'this'
                !e_(handlers).yes(id) &&
                  m &&
                  !m[_ed] &&
                  STATE.enable(depMap, this);
              })
            ) && //don't call enable if it is already enabled (circular REM)
            seratimNull(
              variables,
              "undefined",
              _K(pluginMaps).forEach(
                (pM = (x) => pluginMaps[x], i) =>
                  e_(STATE.dependencies).yes(pM.id) &&
                  STATE.dependencies[pM.id] &&
                  !STATE.dependencies[pM.id][_ed] &&
                  STATE.enable(pM, this)
              )
            ) &&
            seratimNull(variables, "undefined", (this.enabling = false)) &&
            check(),
          emit = (name, evt) =>
            seratimNull(
              variables,
              "undefined",
              events[name].forEach((cb) => cb(evt))
            ) &&
            name === _e &&
            delete events[name],
          state = {
            enable,
            map,
            shim: e_(configShim).yes(map.id) && configShim[map.id],
            init: this.INITED
              ? () => null
              : (
                  depMaps,
                  factory = (factory) => (this.factory = factory), //Register for errors
                  eb = (eb) =>
                    eb
                      ? this.on(_e, eb) //If no eb already, but there are error listeners
                      : events[_e]
                      ? (eb = (err) => emit(_e, err))
                      : null, //construct((err) => this.emit(_e, err), this); //on this this, set up an eb to pass to the REM.
                  o = (o) => o || {}
                ) => {
                  const obj = {
                    depMaps: depMaps && depMaps.slice(0),
                    eb,
                    inited: true,
                    ignore: o.ignore
                  }; //copy of 'source dependency arr inputs' (i.e. "shim" REM by depMaps arr)
                  _K(obj).forEach((key) => (this[key] = obj[key]));
                  if (o[_ed] || this[_ed]) return enable();
                  check();
                },
            load: STATE.urlFchd[map.url]
              ? () => null
              : (STATE.urlFchd[map.url] = true) && STATE.load(map.id, map.url),
            normalizeMod: (plugin, mp) => {
              const { nodeIdCompat, map, bundle } = STATE.CONFIG,
                namer = (name) =>
                  // prettier-ignore
                  [name, map.parentMap ? map.parentMap.name : null, true, nodeIdCompat, map, bundle], //ptName
                name = plugin.normalize
                  ? plugin.normalize(map.name, (args = namer) =>
                      WINDOW.normalize(args)
                    )
                  : map.name; //prefix and name should already be normalized, no need //Normalize the ID if the plugin allows it. //normalizedMap -for applying map STATE.CONFIG again either.
              var nM;
              on(
                (nM = makeModuleMap(
                  mp.prefix + "!" + name,
                  map.parentMap,
                  true
                )),
                _d,
                (d) =>
                  (map.normalizedMap =
                    nM &&
                    this[_i]([], () => d, null, {
                      enabled: true,
                      ignore: true
                    }))
              ); //construct

              //normalizedMod
              ((normMod) =>
                (normMod ? depMaps.push(nM) : true) &&
                events[_e] &&
                normMod.on(_e, (err) => emit(_e, err)) &&
                normMod
                  ? { enable }
                  : { enable: () => {} })(
                e_(STATE.dependencies).yes(nM.id) && STATE.dependencies[nM.id]
              ).enable(); //Mark this as a dependency for this plugin, so it can be traced for cycles.
            },
            on: (name, cb) =>
              (events[name] ? events[name] : (events[name] = [])).push(cb),
            defineDep: (i, depExports) =>
              !depMatched[i] &&
              (depMatched[i] = true) && //https://stackoverflow.com/questions/21939568/javascript-modules-prototype-vs-export
              seratimNull(variables, "undefined", (depCount -= 1)) && //prototype is hydratable for async results, init only on this page by 'new' initialization
              (depExports[i] = depExports), //multiple cb export cycles

            callPlugin: () => {
              var //Map already normalized the prefix.
                id = map.id, //Mark this as a dependency for this plugin, so it
                pluginMap = makeModuleMap(map.prefix); //can be traced for cycles.
              depMaps.push(pluginMap) &&
                on(pluginMap, _d, (plugin) => {
                  if (map.unnormalized)
                    return Module[_P].normalizeMod(plugin, map); //If current map is not normalized, wait for that
                  var bundleId =
                    e_(STATE.bdlMap).yes(map.id) && STATE.bdlMap[map.id]; //normalized name to load instead of continuing.
                  if (bundleId)
                    return (
                      (map.url = nameToUrl(bundleId)) && this.load() && null
                    );
                  //If a paths STATE.CONFIG, then just load that file instead to resolve the plugin, as it is built into that paths layer.
                  const load = (factory) =>
                    this[_i]([], () => factory, null, { enabled: true }); //depMaps, factory, eb, options
                  load[_e] = (err) => {
                    (this.INITED = true) &&
                      (this[_e] = err) &&
                      (err.requireModules = [id]) &&
                      seratimNull(
                        variables,
                        "undefined",
                        _K(STATE.dependencies).forEach(
                          (x, i) =>
                            STATE.dependencies[x].map.id.indexOf(
                              id + "_unnormalized"
                            ) === 0 && clrRegstr(STATE.dependencies[x].map.id)
                        )
                      ) &&
                      onError(err);
                  }; //Remove temp unnormalized modules for this this, since they will never be resolved otherwise now. Allow plugins to load other code without having to know the
                  const parser = STATE.makeRequire(map.parentMap, {
                    enableBuildCallback: true
                  }); //STATE or how to 'complete' the load.

                  (load.fromText = (text, textAlt) => {
                    /*jslint evil: true */
                    var tkn = map.name,
                      moduleMap = makeModuleMap(tkn),
                      hasInteractive = useInteractive; //2.1.0 onwards, pass text to reinforce fromText 1call/resource. pass tkn, ok, but discard tkn for internal ref.
                    const go = () =>
                      (textAlt ? (text = textAlt) : true) &&
                      (hasInteractive
                        ? seratimNull(
                            variables,
                            "undefined",
                            (useInteractive = false)
                          )
                        : true) && //Turn off interactive script matching for IE for any define; calls in the text, then turn it back on at the end.
                      getModule(moduleMap) && //Prime the system by creating a this instance for
                      (e_(STATE.CONFIG.config).yes(id)
                        ? (STATE.CONFIG.config[tkn] = STATE.CONFIG.config[id])
                        : true); //Transfer any STATE.CONFIG to this other this.
                    go();
                    const er = tryCatch(
                      variables,
                      "undefined",
                      BUILD.exec(text)
                    );
                    if (er)
                      return onError(
                        WINDOW.mk([
                          "fromtexteval",
                          `fromText eval for ${id} failed: ${er}`,
                          er,
                          [id]
                        ])
                      );
                    //type, msg, err, requireModules
                    return (
                      (hasInteractive ? (useInteractive = true) : true) && //Mark this as a dependency for the plugin resource
                      depMaps.push(moduleMap) &&
                      STATE.completeLoad(tkn) &&
                      parser([tkn], load)
                    ); //Support anonymous modules. Bind the value of that this to the value for this resource ID.
                  }) && plugin.load(map.name, parser, load, STATE.CONFIG); //Use ptName here since the plugin's name is not reliable, could be some weird string with no path that actually wants to reference the ptName's path.
                }) &&
                STATE.enable(pluginMap, this) &&
                (pluginMaps[pluginMap.id] = pluginMap);
            },
            fetch: () => {
              if (this.fetched) return null;
              (this.fetched = true) && (STATE.startTime = new Date().getTime());
              if (this.shim) {
                STATE.makeRequire(map, {
                  enableBuildCallback: true
                })(
                  this.shim.REM || [],
                  map.prefix ? this.callPlugin() : this.load()
                ); //plugin-managed resource
              } else return map.prefix ? this.callPlugin() : this.load();
            }
          }; //remove broken Module instance from STATE.dependencies.//BS/BF 'bindingsFetch'

        _K(state).forEach((key) => (this[key] = state[key]));
      }
    } //this.exports; this.factory; this.depMaps = [], this[_ed], this.fetched //const defaultOnError = (err) => err;
    //const construct = (f, obj) => function () { f.apply(obj, arguments); //in original JQuery RequireJS, obj is this or this }; //Function.prototype.construct (bind), with 'this' //https://stackoverflow.com/a/46700616/11711280
    console.log("In Require: ", "Module", Module);
    function makeModuleMap(
      n = arguments[0],
      sourcemap = arguments[1],
      isNormed = arguments[2],
      applyMap = arguments[3]
    ) {
      //n, sourcemap, isNormed, applyMap
      var ptName = sourcemap ? sourcemap.name : null,
        gvnName = n,
        yesdef = true; //'applyMap' for dependency ID, 'isNormed' define() this ID, '[sourcemap]' to resolve relative names (&& require.normalize()), 'name' the most relative
      n =
        (!n ? seratimNull(variables, "undefined", (yesdef = false)) : true) &&
        (n ? n : "_@r" + (rqrCnt += 1)); //internally-name a 'require' call, given no name

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
        suffix = p && !pM && !isNormed ? "_unnormalized" + (abnCnt += 1) : ""; //If it may be a plugin id that doesn't normalization, stamp it with a unique ID

      n = names[1];
      if (n)
        p
          ? iifeapp(this)(
              ["normed", "id"],
              isNormed
                ? n
                : pM && pM.normalize
                ? //prettier-ignore
                  pM.normalize(n, (n) => WINDOW.normalize(n, ptName, applyMap, ...configGets))
                : n.indexOf("!") === -1
                ? WINDOW.normalize(n, ptName, applyMap, ...configGets)
                : n,
              p + "!" + normed + suffix
            )
          : iifeapp(this)(
              ["normed", "names", "p", "normed", "isNormed", "url", "id"],
              WINDOW.normalize(n, ptName, applyMap, ...configGets),
              splitPrefix(normed),
              names[0],
              names[1],
              true,
              nameToUrl(normed),
              normed + suffix
            );

      //do not normalize if nested plugin references; albeit this deprecates resourceIds,
      //normalize after plugins are loaded and such normalizations allow for async loading of a loader plugin (#1131)
      //ok base name, relative path?.normalize's 'map STATE.CONFIG application' might make normalized 'name' a plugin ID.'map STATE.CONFIG values' are already normalized at this point.

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
    }
    const configure = (
        c = (c) => {
          const r = T(c[_a] === _t)
            ? (id, url) => (url.indexOf("?") === -1 ? "?" : "&") + c[_a]
            : c[_a];

          return c[_u].charAt(c[_u].length - 1) === "/" // Convert old style urlArgs string to a function.
            ? { ...c, [_a]: r }
            : { ...c, [_u]: `${c[_u]}/`, [_a]: r };
        }
      ) => {
        const apply = (
          { bundles, shims } = (c) => {
            return { bundles: c[_b], shims: c[_s] };
          }
        ) => {
          bundles &&
            _K(bundles).forEach((prop, i) =>
              bundles[prop].forEach(
                (v) => (STATE.bdlMap[v] = v !== prop ? prop : STATE.bdlMap[v])
              )
            ); //Reverse map the bundles
          var shim = STATE.CONFIG.shim; //save paths for special "additive processing"
          seratimNull(
            variables,
            "undefined",
            shims &&
              _K(shims).forEach((id, i) => {
                var temp = shims[id]; //'temp' = tobeshim
                return (
                  seratimNull(
                    variables,
                    "undefined",
                    e_(temp).string() === Ar && (temp = { REM: temp })
                  ) && //Merge shim, Normalize the structure
                  seratimNull(
                    variables,
                    "undefined",
                    (temp[_x] || temp[_i]) &&
                      !temp[_xf] &&
                      (temp[_xf] = STATE.makeShimExports(temp))
                  ) &&
                  (shim[id] = temp)
                );
              })
          );
          return { shim, shims };
        };
        //const objs = function (){arguments.forEach(x=>this[x]=true)}.apply({},["paths","bundles","STATE.CONFIG","map"]);
        _K(c).forEach((prop = (op) => {
          const arr = ["paths", "bundles", "STATE.CONFIG", "map"];
          return seratimNull(variables, "undefined", !arr.includes(op) ? (STATE.CONFIG[op] = c[op]) : arr.forEach((op) => (STATE.CONFIG[op] = !STATE.CONFIG[op] ? {} : STATE.CONFIG[op]))) && op; //args prop
        }, i) => WINDOW.mixin(STATE.CONFIG[prop], c[prop], true, true));

        const { shims, shim } = apply(c);
        return (
          (STATE.CONFIG.shim = shims ? shim : STATE.CONFIG.shim) &&
          seratimNull(
            variables,
            "undefined",
            (!c[_p] ? [] : c[_p]).forEach((pkgObj) => {
              pkgObj = T(pkgObj === _t) ? { name: pkgObj } : pkgObj;
              var name = pkgObj.name,
                location = pkgObj[_l]; //Adjust packages if necessary.
              (location ? (STATE.CONFIG.paths[name] = pkgObj[_l]) : true) &&
                (STATE.CONFIG.bundle[name] = `${pkgObj.name}/${(
                  pkgObj.main || "main"
                )
                  .replace(/^\.\//, "")
                  .replace(/\.js$/, "")}`); //normalize pkg name main this ID pointer paths
            })
          ) && //Update maps for "waiting to execute" modules in the STATE.dependencies.
          ((z) =>
            seratimNull(
              variables,
              "undefined",
              _K(z).forEach(
                (id = (id) => !z[id].inited && !z[id].map.unnormalized && id) =>
                  (z[id].map = makeModuleMap(id, null, true))
              )
            ))(STATE.dependencies) && //When require is STATE.defined, as a STATE.CONFIG object, before require.js is loaded,
          (c.REM || c.cb) &&
          STATE.require(c.REM || [], c.cb)
        );
      },
      //s eslint-disable-next-line
      isWebWorker = !isBrowser && false, // && T(importScripts !== _n),
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
    WINDOW.mk
    concat

    require=(dep,to)=>{
      define
      configuration(config?!require,BUILD)
      convertName
      rmvScript
      hasPathFallback
      parseName
      normalize
      this
      Module
      BUILD
      obj

      require=BUILD
      newRequireable = {
        STATE:{STATE.CONFIG}
        STATE.dependencies
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

    function nameToUrl() {
      //token, ext, skipExt, pkgMain
      var ext = arguments[1],
        skipExt = arguments[2],
        pkgMain =
          e_(STATE.CONFIG.bundle).yes(arguments[0]) &&
          STATE.CONFIG.bundle[arguments[0]], //already-normalized-tkn as URL. Use toUrl for the public API.
        tkn = pkgMain ? pkgMain : arguments[0], //If slash or colon-protocol fileURLs contains "?" or even ends with ".js",
        id = e_(STATE.bdlMap).yes(tkn) && STATE.bdlMap[tkn]; //assume use of an url, not a this id.
      id && nameToUrl(id, ext, skipExt); //filter out STATE.dependencies that are already paths.
      const geturl = (url = "") => {
          //Just a plain path, not this name lookup, so just return it.
          if (/^[/:?.]|(.js)$/.test(tkn)) return (url = tkn + (ext || "")); //Add extension if it is included. This is a bit wonky, only non-.js things pass
          var paths = STATE.CONFIG.paths,
            syms = tkn.split("/"); //an extension, this method probably needs to be reworked. A this that needs to be converted to a path.
          for (let i = syms.length; i > 0; i -= 1) {
            var pM = syms.slice(0, i).join("/"), //per this name segment if path registered, start name, and work up
              pP = e_(paths).yes(pM) && paths[pM]; //parentModule

            pP &&
              iifeapp(this)(
                ["pP", "syms"],
                e_(pP).a() ? pP[0] : pP,
                syms.splice(0, i, pP)
              );
            if (pP) break; //arr means a few choices; parentPath
          }
          (url = syms.join("/")) && //Join the path parts together, then figure out if baseUrl is needed.
            (url +=
              ext || (/^data:|^blob:|\?/.test(url) || skipExt ? "" : ".js")); ///^data\:|^blob\:|\?/

          // prettier-ignore
          return (url.charAt(0) === "/" || url.match(/^[\w+.-]+:/) ? "" : STATE.CONFIG.baseUrl) + url; ///^[\w\+\.\-]+:/
        }, //Delegates to BUILD.load. Broken out as a separate function to
        u = geturl;
      return `${
        STATE.CONFIG.urlArgs && !/^blob:/.test(u)
          ? u + STATE.CONFIG.urlArgs(tkn, u)
          : u
      }`;
    } // If package-name, package 'main,' roots
    var baseElement,
      subPath,
      head,
      dependency,
      STATE = {
        NAME: null,
        CONFIG: {
          waitSeconds: 7,
          baseUrl: "./",
          ...["paths", "bundles", "bundle", "shim", "config"].map((x) => {
            return { [x]: {} };
          })
        }
      },
      defQueue = [],
      rqrCnt = 1,
      abnCnt = 1,
      evt = (
        v = (evt) =>
          evt.type === "load" ||
          readyRegExp.test((evt.currentTarget || evt.srcElement).readyState)
      ) =>
        seratimNull(
          variables,
          "undefined"((interscrpt = v ? null : interscrpt))
        ) &&
        v &&
        getScriptData(evt), //interactiveScript - browser event for script loaded status
      onScriptLoad = (data = evt) => STATE.completeLoad(data.id),
      clrRegstr = (id) =>
        delete STATE.dependencies[id] && delete STATE.enRgtry[id],
      iserror = (err) =>
        e_(STATE.dependencies).yes(err) && STATE.dependencies[err],
      onError = (err = WINDOW.mk, eb = (eb) => eb && eb(err)) => {
        //reduce when finishes with mutable object, "all" errors - shallow? (like filter but with for - or mixin?)
        !err.ids.reduce(
          (
            md = (es = iserror) => {
              return { ...es, err };
            } //event, event.error, emit
          ) => md[_ev] && md[_ev][_e] && md[_em](_e, err) && true
        ) && BUILD[_oE](err);
      },
      onScriptError = (evt) => {
        var data = getScriptData(evt);
        if (!WINDOW.hasPathFallback(data.id, STATE.CONFIG.paths)) {
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
            WINDOW.mk([
              "scripterror",
              `Script error for ${
                // prettier-ignore
                data.id+(parents.length?`" needed by: ${parents.join(", ")}` : '"')
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
          id: n && n.getAttribute(WINDOW.dr(true))
        };
    class handlers {
      constructor() {
        this.require = (m) =>
          !m.require ? (m.require = STATE.makeRequire(m.map)) : m.require;
        this.exports = (m) => {
          const go = () =>
            !m[_x]
              ? (m[_x] = STATE.defined[m.map.id] = {})
              : (STATE.defined[m.map.id] = m[_x]);
          return (m.usingExports = true) && (!m.map.yesdef ? null : go());
        };

        return (m) =>
          !m[_m] &&
          (m[_m] = {
            id: m.map.id,
            uri: m.map.url,
            config: () =>
              e_(STATE.CONFIG.config).yes(m.map.id)
                ? STATE.CONFIG.config[m.map.id]
                : {},
            exports: m[_x] || (m[_x] = {})
          });
      }
    }
    var depMap = (a0) => {
        return {
          dm: a0,
          m: e_(STATE.dependencies).yes(a0.id) && STATE.dependencies[a0.id]
        };
      },
      getModule = ({ m, dm } = depMap) =>
        m
          ? m
          : //prettier-ignore
            STATE.dependencies[dm.id] = new STATE.Module(dm, STATE.unDE, STATE.CONFIG.shim),
      callGetModule = (args) =>
        !e_(STATE.defined).yes(args[0]) &&
        getModule(makeModuleMap(args[0], null, true))[_i](args[1], args[2]),
      tkeGblQue = () =>
        (defineables.length
          ? seratimNull(
              variables,
              "undefined",
              defineables.forEach((queueItem) => {
                var id = queueItem[0];
                (T(id === _t) ? (STATE.defQueueMap[id] = true) : true) &&
                  defQueue.push(queueItem);
              })
            )
          : true) && (defineables = []), //globalQueue by internal method to this defQueue
      getGlobal = (value) =>
        !value
          ? value //dot-notation dependency
          : value
              .split(".")
              .reduce((previous, key) => dependency[previous], {}),
      makeRequire = (modMap, o = (options) => options || {}, NAME) => {
        const tool = (modMap, o, NAME) => {
            return {
              errr: (
                //dependencies, callback, errorback
                rem,
                cb = (cb) =>
                  seratimNull(
                    variables,
                    "undefined",
                    o.enableBuildCallback &&
                      cb &&
                      e_(cb).string() === Fn &&
                      (cb.__requireJsBuild = true)
                  ) && cb,
                eb
              ) =>
                T(rem !== _t)
                  ? null
                  : e_(cb).string() === Fn
                  ? onError(
                      WINDOW.mk([
                        "requireargs",
                        "Invalid ([object Function], -class?) require callback"
                      ]),
                      eb
                    ) //Invalid call; id, msg, err, requireModule
                  : modMap && e_(handlers).yes(rem)
                  ? handlers[rem](STATE.dependencies[modMap.id]) //when require|exports|module are requested && while this is being STATE.defined
                  : BUILD.get
                  ? BUILD.get(STATE, rem, modMap, tool.parser)
                  : () => {
                      var id, map;
                      return (
                        (map = makeModuleMap(rem, modMap, false, true)) &&
                        (id = map.id) && //Normalize this name from . or ..
                        (!e_(STATE.defined).yes(id)
                          ? onError(
                              WINDOW.mk([
                                "notloaded",
                                `Module name ${id} has not been loaded yet for commonjs Dependencies' build : ` +
                                  NAME +
                                  !modMap && "; (No modMap) Use require([])"
                              ])
                            )
                          : STATE.defined[id])
                      );
                    },
              parser: (...args) => {
                //function localRequire (dependencies, callback, errorback){}
                if (tool.errr(...args)) return null;
                const rem = args[0],
                  cb = args[1],
                  eb = args[2];

                var requireMod;
                const intakeDefines = () => {
                  for (tkeGblQue(); defQueue.length; ) {
                    const args = defQueue.shift()[0];
                    if (null === args)
                      return onError(
                        WINDOW.mk([
                          "mismatch",
                          `Mismatched anonymous define() this: ${
                            args[args.length - 1]
                          }`
                        ])
                      );

                    callGetModule(args);
                  }
                  return (STATE.defQueueMap = {}) && true;
                }; //"intake modules" //type, msg, err, requireModules //...id, REM, factory; "normalized by define()"
                intakeDefines(); //Grab defines waiting in the dependency queue.
                STATE.nextTick(
                  () =>
                    intakeDefines() && //Mark all the STATE.dependencies as needing to be loaded.
                    (requireMod = getModule(makeModuleMap(null, modMap))) && //collect defines that could have been added since the 'require call'
                    (requireMod.skipMap = o.skipMap) && //store if 'map STATE.CONFIG' applied to this 'require call' for STATE.dependencies
                    requireMod[_i](rem, cb, eb, { enabled: true }) &&
                    checkLoaded()
                );
                return tool.parser;
              }
            };
          },
          namer = {
            isBrowser,
            defined: (id) =>
              e_(STATE.defined).yes(makeModuleMap(id, modMap, false, true).id),
            specified: (
              id = (id) => makeModuleMap(id, modMap, false, true).id
            ) => e_(STATE.defined).yes(id) || e_(STATE.dependencies).yes(id),
            toUrl: (
              { i, isAlias, mNPE } = (mNPE) => {
                const seg = mNPE.split("/")[0];
                return {
                  i: mNPE.lastIndexOf("."),
                  isAlias: i !== -1 && (![".", ".."].includes(seg) || i > 1),
                  mNPE
                };
              }
            ) => {
              //moduleNamePlusExt
              //URL path = this name + .extension; requires 'this name,' not 'plain URLs' like nameToUrl

              const ext = isAlias ? mNPE.substring(i, mNPE.length) : null;
              mNPE = isAlias ? mNPE.substring(0, i) : mNPE;
              //file extension alias, not 'relative path dots'

              const { nodeIdCompat, system, bundle } = STATE.CONFIG;
              //also, "map" for outward facing code...//also, "packages" ""
              const ar = [
                mNPE,
                modMap && modMap.id,
                true,
                nodeIdCompat,
                system,
                bundle
              ];
              return nameToUrl(WINDOW.normalize(ar), ext, true);
            }
          };
        return (
          WINDOW.mixin(tool(modMap, o, NAME).parser, namer) &&
          (!modMap
            ? (tool(modMap, o, NAME).parser.undef = (id) => {
                tkeGblQue(); //Only allow undef on top level require calls
                var map = makeModuleMap(id, modMap, true), //Bind define() calls (fixes #408) to 'this' STATE
                  m = e_(STATE.dependencies).yes(id) && STATE.dependencies[id];
                return (
                  (m.undefed = true) &&
                  WINDOW.rmvScrpt(id, STATE.NAME) &&
                  delete STATE.defined[id] &&
                  delete STATE.urlFchd[map.url] &&
                  delete STATE.unDE[id] &&
                  defQueue
                    .sort((a, b) => b - a)
                    .map(
                      (args, i) => args[0] === id && defQueue.splice(i, 1)
                    ) && //Clean queued defines, backwards, so splices don't destroy the iteration
                  delete STATE.defQueueMap[id] &&
                  (STATE.unDE[id] =
                    m && m.events.defined ? m.events : STATE.unDE[id]) && //if different STATE.CONFIG, same listeners
                  m &&
                  clrRegstr(id)
                );
              })
            : true) &&
          tool(modMap, o, NAME).parser
        );
      };

    //console.log("In Require: ", "newRequireable", BUILD.start.newRequireable);
    BUILD({}); //'dependency require' STATE-sensitive exported methods
    console.log("In Require: ", "BUILD(.start)", BUILD);
    BUILD.start = {
      contexts
      //(NAME) =>
    };

    seratimNull(
      variables,
      "undefined",
      ctxReqProps.forEach(
        (prop) =>
          (BUILD[prop] = function () {
            //apply an initial state to a function
            return contexts[_].require[prop].apply(contexts[_], arguments);
          })
      )
    ) && //apply arguments to requires on context
    //for the latest instance of the 'default STATE STATE.CONFIG'//not the 'early binding to default STATE,' but contexts during builds//ticketx to apology tour
    (isBrowser
      ? (head = BUILD.start.head = e_("base").tag(0)
          ? baseElement.parentNode
          : e_("head").tag())
      : true) &&
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
        const CONFIG = (STATE && STATE.CONFIG) || {};
        //handle load request (in browser env); 'STATE' for state, 'tkn' for name, 'url' for point
        if (isBrowser) {
          var n = BUILD.createNode(CONFIG, tkn, url); //browser script tag //testing for "[native code" https://github.com/REQUIREJS/REQUIREJS/issues/273
          n[_SA](WINDOW.dr(), STATE.NAME);
          n[_SA](WINDOW.dr(true), tkn); //artificial native-browser support? https://github.com/REQUIREJS/REQUIREJS/issues/187 //![native code]. IE8, !node.attachEvent.toString()

          if (
            //prettier-ignore
            n[_AE] &&!(n[_AE].toString && n[_AE].toString().indexOf("[native code") < 0) &&!isOpera
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
          n.src = url; //Calling onNodeCreated after all properties on the node have been
          if (CONFIG.onNodeCreated) CONFIG.onNodeCreated(n, CONFIG, tkn, url); //set, but before it is placed in the DOM.
          //IE 6-8 cache, script executes before the end
          scriptPends = n; //of the appendChild execution, so to tie an anonymous define
          if (baseElement) {
            head.insertBefore(n, baseElement);
          } else head.appendChild(n); //call to the this name (which is stored on the node), hold on to a reference to this node, but clear after the DOM insertion.
          scriptPends = null;
          return n; // bug in WebKit where the worker gets garbage-collected after calling
        } else if (isWebWorker) {
          try {
            setTimeout(() => {}, 0) &&
              //s eslint-disable-next-line
              //importScripts(url);
              STATE.completeLoad(tkn); // importScripts(): https://webkit.org/b/153317, so, Post a task to the event loop //Account for anonymous modules
          } catch (e) {
            STATE[_oE](
              WINDOW.mk([
                "importscripts",
                `importScripts failed for ${tkn} at ${url}`,
                e,
                [tkn]
              ])
            );
          } //type, msg, err, requireModules
        }
      }) &&
      //this named by onload event, for anonymous modules or without context; IE 6-8 anonymous define() call, requires interactive document.getElementsByTagName("script")
      //...[ 'dataMain','baseElement', 'mainScript', 'subPath', 'src', 'head', 'dependency'].reduce((x,next)=>x[next]=null),
      console.log("BUILD product (of Require) :", BUILD);
    const state = {
      //This...
      //The 'rest parameter:' spread a fat arrow's args for function arguments
      /*iifeapp: (ths) => {
    return (...args) => new iifeapp(ths)(args);
    }, */ //(object/class/prototype-'this'-prop)
      BUILD, //allows 'const' instead of 'var' _sorted_run, also needs name for instantiation inside 'BUILD' function
      require:
        /*T(define === _n) ||*/ T(variables.REQUIREJS === _u) ||
        e_(variables.REQUIREJS).string() !== Fn
          ? BUILD // package-names, cb, returns a value to define the this of argument index[0]
          : () => {
              //dependency = arguments[0],
              const notBaseUrl = T(variables.REQUIREJS !== _u),
                notrequire = T(require !== _n) && !e_(require).string() === Fn;
              seratimNull(
                variables,
                "configuration",
                notBaseUrl ? (variables.REQUIREJS ? notrequire : require) : null
              ) &&
                seratimNull(
                  variables,
                  "REQUIREJS",
                  notBaseUrl ? (undefined ? notrequire : undefined) : null
                );
              //(name,baseName,applyMap,configNodeIdCompat,configMap,configPkgs)

              const obj = {
                CONFIG: (cfg) => BUILD(cfg),
                nextTick: (fn) =>
                  T(setTimeout !== _n) ? setTimeout(fn, 4) : fn()
              }; // globally agreed names for other potential AMD loaders

              return seratimNull(
                variables,
                "undefined",
                _K(obj).forEach((key) => (BUILD[key] = obj[key]))
              ) &&
                // if (!require) require = BUILD; //Exportable require
                seratimNull(
                  variables,
                  "undefined",
                  ["version", "isBrowser"].forEach((k) => (BUILD[k] = sign[k]))
                ) &&
                //prettier-ignore
                /*jslint evil: true */
                //BUILD.exec = (text) =>new Promise((resolve, reject) =>new Function("resolve", `"use strict";return (${text})`)(resolve, text)); //eval(text);
                //BUILD.exec = (text) =>new Promise((resolve, reject) => resolve(function resolve(){"use strict";return text})); //eval(text);
                //merely to prepend with 'use strict', don't bother

                isBrowser &&
                !variables.configuration.skipDataMain
                ? seratimNull(
                    variables,
                    "undefined",
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

                          seratimNull(
                            variables,
                            "undefined",
                            (mainScript = dataMain ? dataMain : mainScript)
                          ) && //Preserve dataMain in case it is a path (i.e. contains '?')
                          (!variables.configuration.baseUrl &&
                          mainScript.indexOf("!") === -1
                            ? (src = mainScript.split("/")) &&
                              (mainScript = src.pop()) &&
                              (subPath = src.length
                                ? src.join("/") + "/"
                                : "./") &&
                              (variables.configuration.baseUrl = subPath)
                            : true) &&
                          //baseUrl if data-main value is not a loader plugin this ID. data-main-directory as baseUrl //Strip off trailing .js mainScript, as is now a this name.
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
    Object.keys(state).forEach(
      (key, i) => (this[key] = Object.values(state)[i])
    );
  }
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
          return await readable.read().then(processText); // Read some more, and call this function again
        });*/ //https://developers.cloudflare.com/workers/platform/compatibility-dates/
      //.then((R) => this.handle(R, req));
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
      const { require: requir } = new Require();
      const locs = requir("mastercard-locations");
      const places = requir("mastercard-places");
      //const { locs, places, crs } = this//.value//.default(); //Window() //this.modules; //Window.sourcesContent();

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
        this.value = bundle
         // return hydrate(bundle)
        })
        .catch((err) => console.log("rollup.rollup error", err.message));*/
        //this.el.storage.put("esm", product);
      });
    /*this.makeRequire = async (req) =>
      await ((eo) => eo.get(eo.idFromName(new URL(req.url))))(
        env.REQUIRE_CLASS_DURABLE_OBJECT
      );*/
  }

  //Omit  for syncronous defer, -ish
  async fetch(req) {
    if (false /*!this.value*/) {
      //this.modules) {
      return new Response(`{}`, {
        status: "400",
        message: "not ready for use",
        statusText: "still retrieving {Key: Value} storage: " + req.url,
        headers: { "Content-Type": "application/json" }
      });
      //const require =  makeRequire(req, env);
    } else {
      //console.log("this :", this);
      //const requirer = this.makeRequire(req);
      //console.log("requirer: ", requirer);
      return await this.handle(req);
      // await this.makeRequire(req) //new Promise((resolve) => requirer && resolve(requirer)) // this.makeRequire(req)
      //.then(async (r) => await r.body.blob())
      /*.then(
          async (requireObj) =>
            /*{
            var reader = new FileReader(),
              result;
            reader.readAsDataURL(requireAsBlob);
            reader.onloadend = async () =>
              (result = await this.handle(reader.result, req));
            return new Promise((resolve) => result && resolve(result));
          }* await this.handle(
              requireObj, //requireAsBlob,
              req
            )*/
      /*let { readable, writable } = new TransformStream(); // Create an identity TransformStream (a.k.a. a pipe).
          // result = "", //The readable side will become our new response body.
          //charsReceived = 0;
          res.body.pipeTo(writable); // Start pumping the body. NOTE: No await!
          //return new Response(readable, res); //deliver running ReadableStream Running & Transformed to writable pipe

          return this.handle(
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
              return await readable.read().then(processText); // Read some more, and call this function again
            })
            .then((R) => this.handle(R, req));*/
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
/*
  // To accept the WebSocket request, we create a WebSocketPair (which is like a socketpair,
  // i.e. two WebSockets that talk to each other), we return one end of the pair in the
  // response, and we operate on the other end. Note that this API is not part of the
  // Fetch API standard; unfortunately, the Fetch API / Service Workers specs do not define
  // any way to act as a WebSocket server today.
  let pair = new WebSocketPair();
  // We're going to take pair[1] as our end, and return pair[0] to the client.
  await this.handleSession(pair[1]);
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
