/**UNLICENSED BUT FOR PARTS OF OTHERS */

/** vim: et:ts=4:sw=4:sts=4
 * @license RequireJS 2.3.6.carducci Copyright jQuery Foundation and other contributors.
 * Released under MIT license, https://github.com/REQUIREJS/REQUIREJS/blob/master/LICENSE
 */
//Not using strict: uneven strict support in browsers, #392, and causes
//problems with REQUIREJS.exec()/transpiler plugins that may not be strict.
/*jslint regexp: true, nomen: true, sloppy: true */
/*dependency window, navigator, document, importScripts, setTimeout, opera */

//cannot this never get to the string regex?

export class Require {
  constructor(el, env) {
    console.log(
      JSON.stringify(el.textContent),
      "- From the example (Require) module"
    );
    this.el = el;
    this.env = env;
    this.el.blockConcurrencyWhile(async () => {
      let stored = await this.el.storage.get("require"); //Read requests	100,000 / day, ($free)
      this.state = stored || 0;
      var b = () => {};
      b();
    });
    // this.fetch = async (req, env) => new Promise((resolve) => resolve(this)); //await ((z)=>z)(this));
  }

  fetch(req, env) {
    var setTimeout,
      T = (x) => typeof x;
    //s eslint-disable-next-line
    setTimeout = T(setTimeout === "undefined") ? undefined : setTimeout;
    var mainScript,
      src,
      define = (
        { nm, ds, c, n } = (...copy) => {
          const notString = T(copy.nm !== _t),
            notDeps = e_(copy.ds).string() !== Ar;
          return {
            nm: notString ? null : copy.nm, //copy = { nm, ds, c }; Allow for anonymous modules
            ds: notString ? copy.nm : notDeps ? null : copy.ds,
            c: notString ? copy.ds : notDeps ? copy.ds : copy.c,
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
      ) => {
        ds =
          !ds && e_(c).string() === Fn && c.length ? WINDOW.concat(ds, c) : ds;
        // no deps nor name + cb is func => then CommonJS, iifeapp(["interscrpt"], "value");
        nm = useInteractive && !nm ? n()[ga](WINDOW.dr(true)) : nm;
        ctx = useInteractive ? ctxs[n()[ga](WINDOW.dr())] : ctx;

        //getInteractiveScript Look for a data-main script attribute, which could also adjust the baseUrl. baseUrl from script tag with require.js in it.

        if (!ctx) return defineables.push([nm, ds, c]);
        ctx.defQueue.push([nm, ds, c]);
        ctx.defQueueMap[nm] = true;
        return { amd: { jQuery: true } };
      },
      ctxs = {},
      REQUIREJS,
      us = "_",
      createElement = (ns) =>
        document[`createElementNS${ns ? "NS" : ""}`](
          ns ? ("http://www.w3.org/1999/xhtml", "html:script") : "script"
        ),
      version = "2.3.6.carducci",
      iifeapp = class iifeapp {
        constructor() {
          const z = arguments[0]; //allows mutable context, 'new' instantiatable 'iifeapp' for the "enclosing 'this'," else App() function
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
      configuration = {},
      useInteractive = false,
      ctx,
      /**
      ctx.require.undef(id);
      ctx.makeRequire(null, { skipMap: true })([id]);
      ctx = ctx ? ctx : (ctxs[NAME] = new build.start.newRequireable(NAME)); //dependency
      cfg && ctx.configure(cfg);
      return ctx.require(ds, cb, eb);
    */
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
      _o = "onError",
      _dd = "defined",
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
      _K = Object.keys,
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
        ) => (cb.length === 1 ? [_r] : [_r, _x, _m]).concat(ds), //Potential-CommonJS use-case of exports and this, without 'require.';
        rmvScrpt: (name, NAME) => {
          const ga = "getAttribute",
            e = (m) => (m ? name : NAME); //scriptNode
          return (
            isBrowser &&
            e_()
              .tag()
              .forEach(
                (sN) =>
                  sN[ga](WINDOW.dr(true)) === e(true) &&
                  sN[ga](WINDOW.dr()) === e() &&
                  sN.parentNode.removeChild(sN)
              )
          );
        },
        hasPathFallback: (id, cP) => {
          var pC = e_(cP).yes(id) && cP[id]; //pathConfig,configPaths
          if (pC && e_(pC).string() === Ar && pC.length > 1) {
            pC.shift(); //config is live? but 'id' is variable as args.. [for the?] next try
            ctx.require.undef(id);
            ctx.makeRequire(null, { skipMap: true })([id]);
            return true;
          }
        },
        //'applyMap' for dependency ID, 'baseName' relative to 'name,' the most relative
        normalize: (nm, bn, applyMap, conId, map, configPkgs) => {
          const tool = () => {
              return {
                parseName: (nm, roots, conId) =>
                  nm &&
                  ((nm) => {
                    //prettier-ignore
                    const l = nm.length - 1,isjs = /\.js$/,suffjs = conId && isjs.test(nm[l]);
                    nm[l] = suffjs ? nm[l].replace(isjs, "") : nm[l];

                    nm =
                      nm[0].charAt(0) === "." && roots
                        ? roots.slice(0, roots.length - 1).concat(nm)
                        : nm; //Adjust any relative paths. node allows either .js or non .js, yet not in nameToUrl;baseName.push(nm), but new instead of length report
                    for (let i = 0; i < nm.length; i++) {
                      const solid = nm[i] === "." && nm.splice(i, 1); //:part === "..":null
                      i = solid ? i - 1 : i;
                      if (solid) continue;
                      const more =
                        i === 0 ||
                        (i === 1 && nm[2] === "..") ||
                        nm[i - 1] === "..";
                      if (!more && i > 0 && nm.splice(i - 1, 2)) i -= 2;
                    }
                    return nm.join("/");
                  })((nm = nm.split("/"))), //just enabled, but unactivated, modules
                convertName: (nm, mp, applyMap, ph) => {
                  if (!applyMap || !mp || (!ph && !mp["*"])) return nm;
                  var n,
                    i,
                    map,
                    starMap,
                    nms = nm.split("/"),
                    mpcf = mp && mp["*"]; //continue search ___ map STATE.CONFIG, bigloop:
                  for (let g = nms.length; g > 0; g -= 1) {
                    var name = nms.slice(0, g).join("/"); //favor a "star map" unless shorter matching STATE.CONFIG
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
                }
              };
            },
            rs = bn && bn.split("/");
          nm = tool().parseName(nm, rs, conId);
          nm = tool().convertName(nm, map, applyMap, rs);
          return e_(configPkgs).yes(nm) ? configPkgs[nm] : nm;
        }
      },
      //uses 'this' as 'z', but when called () the function is returned,
      build = (REQUIREJS = function () {
        var ds = arguments[0],
          cb = arguments[1],
          eb = arguments[2],
          optional = arguments[3],
          ctx,
          cfg,
          NAME = us; //Caja compliant build for minified-scope name of dependency, cb for arr completion Find the right STATE, use default
        if (!e_(ds).string() === Ar && T(ds !== _t)) {
          cfg = ds;
          return !e_(cb).a()
            ? (ds = [])
            : iifeapp(this)(["ds", "cb", "eb"], cb, eb, optional);
        } // Determine if have STATE.CONFIG object in the call. ds is a STATE.CONFIG object Adjust args if there are STATE.dependencies
        NAME = cfg && cfg.context ? cfg.context : NAME;
        ctx = e_(ctxs).yes(NAME) && ctxs[NAME];
        ctx = ctx ? ctx : (ctxs[NAME] = new build.start.newRequireable(NAME)); //dependency
        cfg && ctx.configure(cfg);
        return ctx.require(ds, cb, eb);
      }),
      e_ = (obj /*,string*/) => {
        const n = (NS) =>
          NS.constructor === "String" && NS.toUpperCase() === "NS";
        const yes = (name) => obj[_P][_H](name),
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
                ) => {
                  obj[1][prop] = !go ? v : obj[1][prop] ? obj[1][prop] : {};
                  WINDOW.mixin(obj[1][prop], v, obj[2], obj[3]);
                  return obj[1];
                })(obj[0][prop]), //s,tgt,frc,dSM
          create: (ns = n) => createElement(ns),
          string,
          a: (x) => x.string() === Ar,
          tag,
          interA: (x) => x.readyState === "interactive"
        };
      }; //obj.prototype["hasOwnProperty"][name]; const method =string?"toString":"hasOwnProperty"

    var clrsec, watch;
    const checkLoaded = (z) => {
      var err,
        fb,
        hs = [],
        reqCalls = [],
        wait = false,
        another = true,
        sec = STATE.CONFIG.waitSeconds * 1000,
        halt = sec && STATE.startTime + sec < new Date().getTime(); //It is possible to disable the wait interval by using waitSeconds of 0.

      // waitInterval - Do not bother if this call was a result of a cycle break.  hoist-"mixin" functional obj[prop]  traced,processed
      if (watch) return null;
      const mx = (m) => ({ m, s: m.depMaps, i: m.map.id }),
        progress = ({ m, ss, i } = mx, tt = {}, p = {}) => {
          tt[i] = true;
          ss.forEach((i = (d) => d.id, ix) => {
            var dep = e_(STATE.dependencies).yes(i) && STATE.dependencies[i]; // depMap force undefined (registered yet not matched in this)
            const c = dep && !m.depMatched[ix] && !p[i];
            // prettier-ignore
            if (c && (!e_(tt).yes(i) || !tt[i]))
        return progress(dep, tt, p);
            // prettier-ignore
            c && m.defineDep(ix, STATE.defined[i]);
            c && m.check(); //pass false?
          });
          p[i] = true;
        },
        brwr = isBrowser || isWebWorker;
      watch = true;
      const er = _e,
        mxx = (mod = (x) => STATE.enRgtry[x]) => {
          const { yesdef, fetched, prefix, error, enabled, inited } = mod.map;
          if (enabled && !yesdef) reqCalls.push(mod);
          mod.noCyc = fetched && yesdef && !prefix;
          return !inited && enabled && !error ? mod : {};
        }; //no keys, -fails
      _K(STATE.enRgtry).forEach(({ id, noCyc } = mxx, i) =>
        id && halt && !WINDOW.hasPathFallback(id, STATE.CONFIG.paths)
          ? WINDOW.rmvScrpt(id, STATE.NAME) && hs.push(id)
          : id &&
            iifeapp(z)(
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
      } else
        return iifeapp(z)(
          () =>
            another &&
            reqCalls.forEach((m) =>
              z[m][er] ? z[m][_em](er, z[m][er]) : progress(z[m])
            ), //construction
          ["watch", "clrsec"], //keys,...values
          false,
          (!halt || fb) &&
            wait &&
            brwr &&
            !clrsec &&
            setTimeout(() => checkLoaded() && null, 50) /*plugin-resource*/
        ); //args'-mutable iife=>"app"
    };
    //[], () => d, null,{enabled: true,ignore: true} if multiple define calls for the same this

    class Module {
      constructor(
        map = arguments[0],
        unDE = arguments[1],
        configShim = arguments[2]
      ) {
        const on = ({ m, dm } = depMap, name, f) => {
            if (!e_(STATE.defined).yes(dm.id) || (m && !m.defineEmitComplete))
              return name === _dd && f(STATE.defined[dm.id]);
            m = getModule(dm);
            if (m[_e] && name === _e) return f(m[_e]);
            m.on(name, f);
          },
          state = {
            events: (e_(unDE).yes(map.id) && unDE[map.id]) || {},
            map,
            shim: e_(configShim).yes(map.id) && configShim[map.id],
            depExports: [],
            depMaps: [],
            depMatched: [],
            pluginMaps: {},
            depCount: 0,
            init: (depMaps, factory, eb, o = (o) => o || {}) => {
              if (this.INITED) return null;
              this["factory"] = factory; //Register for errors
              if (eb) {
                this.on(_e, eb); //If no eb already, but there are error listeners
              } else if (this.events[_e]) eb = (err) => this.emit(_e, err); //construct((err) => this.emit(_e, err), this); //on this this, set up an eb to pass to the ds.
              const obj = {
                depMaps: depMaps && depMaps.slice(0),
                eb,
                inited: true,
                ignore: o.ignore
              }; //copy of 'source dependency arr inputs' (i.e. "shim" ds by depMaps arr)
              _K(obj).forEach((key) => (this[key] = obj[key]));
              if (o[_ed] || this[_ed]) return this.enable();
              this.check();
            },
            load: () => {
              if (!this.urlFchd[this.map.url]) {
                this.urlFchd[this.map.url] = true;
                STATE.load(this.map.id, this.map.url);
              }
            },
            check: () => {
              if (!this[_ed] || this.enabling) return null;
              var id = this.map.id;
              if (!this.INITED)
                return !e_(STATE.defQueueMap).yes(id) && this.fetch();
              if (this[_dg]) return this[_e] && this.emit(_e, this[_e]); // !defQueue.includes(this) this is ready to, and does, define itself
              var expts = this[_x],
                factory = this.factory;
              this[_dg] = true; //no redundant require-define
              if (this.depCount < 1 && !STATE.defined) {
                const isDefine = this.map.yesdef;
                if (e_(factory).string() === Fn) {
                  var err,
                    cjs,
                    depExpo = this.depExports; //for define()'d  modules, use error listener, require errbacks should not be called (#699). Yet, if dependency-'onError,' use that.

                  if (
                    (this.events[_e] && isDefine) ||
                    build[_o] !== ((err) => err)
                  ) {
                    // prettier-ignore
                    try { expts = STATE.execCb(id, factory, depExpo, expts); } catch (e) { err = e; } //factory.apply(exports, depExports),
                  } else expts = STATE.execCb(id, factory, depExpo, expts);
                  if (isDefine && expts === undefined) {
                    cjs = this[_m]; // Favor return value over exports. If node/cjs in play, then will not have a return value anyway. Favor
                    if (cjs) {
                      expts = cjs[_x];
                    } else if (this.usingExports) expts = this[_x];
                  } // this.exports assignment over exports object. exports already set the STATE.defined value.

                  err &&
                    // new iifeapp(this)(
                    ((
                      z,
                      obj = {
                        requireMap: z.map,
                        requireModules: isDefine ? [this.map.id] : null,
                        requireType: isDefine ? "define" : _r
                      }
                    ) => {
                      _K(obj).forEach((key) => (z.err[key] = obj[key]));
                      return onError((z[_e] = err)); //good example how 'err' prop read, no write, without iifeapp
                    })(this); //if there were more solutions to be made, so is redundant here, actually

                  //);
                } else expts = factory;

                this[_x] = expts;
                if (isDefine && !this.ignore) {
                  STATE.defined[id] = expts;
                  if (build.onResourceLoad)
                    build.onResourceLoad(
                      STATE,
                      this.map,
                      this.depMaps.map(
                        (depMap) => depMap.normalizedMap || depMap
                      )
                    );
                }
                clrRegstr(id);
                this[_dd] = true;
              }
              this[_dg] = false; //Finished definition, so allow call-check again for 'define' notifications, by cycle.
              if (this[_dd] && !this.defineEmitted) {
                this["defineEmitted"] = true;
                this.emit(_dd, this[_x]);
                this["defineEmitComplete"] = true;
              }
            },
            normalizeMod: (plugin, mp) => {
              var { name, parentMap: pM } = this.map; //Normalize the ID if the plugin allows it.
              const { nodeIdCompat, map, pkgs } = STATE.CONFIG;
              // prettier-ignore
              const namer = (name) => [name, pM ? pM.name : null, true, nodeIdCompat, map, pkgs]; //ptName
              if (plugin.normalize)
                name =
                  plugin.normalize(name, (args = namer) =>
                    WINDOW.normalize(args)
                  ) || ""; //prefix and name should already be normalized, no need
              var nM = makeModuleMap(mp.prefix + "!" + name, pM, true); //normalizedMap -for applying map STATE.CONFIG again either.
              on(nM, _dd, (d) => {
                this.map.normalizedMap = nM;
                this[_i]([], () => d, null, {
                  enabled: true,
                  ignore: true
                });
              }); //construct
              var normMod =
                e_(STATE.dependencies).yes(nM.id) && STATE.dependencies[nM.id]; //normalizedMod
              if (normMod) {
                this.depMaps.push(nM);
                if (this.events[_e])
                  normMod.on(_e, (err) => this.emit(_e, err)); //Mark this as a dependency for this plugin, so it can be traced for cycles.
                normMod.enable();
              }
            },
            enable: () => {
              STATE.enRgtry[this.map.id] = this;
              this[_ed] = true;
              this.enabling = true; //no inadvertent load and 0 depCount by

              //immediate calls to the STATE.defined callbacks for STATE.dependencies. Enable mapFunction 1,dependency
              this.depMaps.forEach((depMap, i) => {
                if (T(depMap === _t)) {
                  const mp = this.map.yesdef ? this.map : this.map.parentMap;
                  depMap = makeModuleMap(depMap, mp, false, !this.skipMap); //Dependency needs to be converted to a depMap
                  this.depMaps[i] = depMap; //and wired up to this this.
                  var handler =
                    e_(handlers).yes(depMap.id) && handlers[depMap.id];
                  if (handler) return (this.depExports[i] = handler(this));
                  this["depCount"] += 1;
                  on(depMap, _dd, (depExports) => {
                    if (this.undefed) return null;
                    this.defineDep(i, depExports);
                    this.check();
                  });
                  if (this.eb) {
                    on(depMap, _e, this.eb); // propagate the error correctly - something else is listening for errors
                  } else if (this.events[_e])
                    on(depMap, _e, (err) => this.emit(_e, err));
                } // (No direct eb on this this)
                var id = depMap.id,
                  m = STATE.dependencies[id]; //Skip special modules like 'require', 'exports', 'this'
                if (!e_(handlers).yes(id) && m && !m[_ed])
                  STATE.enable(depMap, this);
              }); //don't call enable if it is already enabled (circular ds)

              _K(this.pluginMaps).forEach(
                (pM = (x) => this.pluginMaps[x], i) =>
                  e_(STATE.dependencies).yes(pM.id) &&
                  STATE.dependencies[pM.id] &&
                  !STATE.dependencies[pM.id][_ed] &&
                  STATE.enable(pM, this)
              );
              this.enabling = false;
              this.check();
            },
            on: (name, cb) =>
              (this.events[name]
                ? this.events[name]
                : (this.events[name] = [])
              ).push(cb),
            emit: (name, evt) => {
              this.events[name].forEach((cb) => cb(evt));
              if (name === _e) delete this.events[name];
            },
            defineDep: (i, depExports) => {
              if (!this.depMatched[i]) {
                this.depMatched[i] = true; //https://stackoverflow.com/questions/21939568/javascript-modules-prototype-vs-export
                this.depCount -= 1; //prototype is hydratable for async results, init only on this page by 'new' initialization
                this.depExports[i] = depExports; //multiple cb export cycles
              }
            },
            callPlugin: () => {
              var map = this.map; //Map already normalized the prefix.
              var id = map.id; //Mark this as a dependency for this plugin, so it
              var pluginMap = makeModuleMap(map.prefix); //can be traced for cycles.
              this.depMaps.push(pluginMap);
              on(pluginMap, _dd, (plugin) => {
                if (this.map.unnormalized)
                  return Module[_P].normalizeMod(plugin, map); //If current map is not normalized, wait for that
                var bundleId =
                  e_(STATE.bdlMap).yes(this.map.id) &&
                  STATE.bdlMap[this.map.id]; //normalized name to load instead of continuing.
                if (bundleId) {
                  this.map.url = nameToUrl(bundleId);
                  this.load();
                  return null;
                } //If a paths STATE.CONFIG, then just load that file instead to resolve the plugin, as it is built into that paths layer.
                const load = (factory) =>
                  this[_i]([], () => factory, null, { enabled: true }); //depMaps, factory, eb, options
                load[_e] = (err) => {
                  this.INITED = true;
                  this[_e] = err;
                  err.requireModules = [id];
                  _K(STATE.dependencies).forEach(
                    (x, i) =>
                      STATE.dependencies[x].map.id.indexOf(
                        id + "_unnormalized"
                      ) === 0 && clrRegstr(STATE.dependencies[x].map.id)
                  );
                  onError(err);
                }; //Remove temp unnormalized modules for this this, since they will never be resolved otherwise now. Allow plugins to load other code without having to know the
                const parser = STATE.makeRequire(map.parentMap, {
                  enableBuildCallback: true
                }); //STATE or how to 'complete' the load.

                load.fromText = (text, textAlt) => {
                  /*jslint evil: true */
                  var tkn = map.name,
                    moduleMap = makeModuleMap(tkn),
                    hasInteractive = useInteractive; //2.1.0 onwards, pass text to reinforce fromText 1call/resource. pass tkn, ok, but discard tkn for internal ref.
                  if (textAlt) text = textAlt;
                  if (hasInteractive) useInteractive = false; //Turn off interactive script matching for IE for any define; calls in the text, then turn it back on at the end.
                  getModule(moduleMap); //Prime the system by creating a this instance for
                  if (e_(STATE.CONFIG.config).yes(id))
                    STATE.CONFIG.config[tkn] = STATE.CONFIG.config[id]; //Transfer any STATE.CONFIG to this other this.
                  try {
                    build.exec(text);
                  } catch (e) {
                    return onError(
                      WINDOW.mk([
                        "fromtexteval",
                        `fromText eval for ${id} failed: ${e}`,
                        e,
                        [id]
                      ])
                    );
                  } //type, msg, err, requireModules
                  if (hasInteractive) useInteractive = true; //Mark this as a dependency for the plugin resource
                  this.depMaps.push(moduleMap);
                  STATE.completeLoad(tkn);
                  parser([tkn], load); //Support anonymous modules. Bind the value of that this to the value for this resource ID.
                };
                plugin.load(map.name, parser, load, STATE.CONFIG); //Use ptName here since the plugin's name is not reliable, could be some weird string with no path that actually wants to reference the ptName's path.
              });
              STATE.enable(pluginMap, this);
              this.pluginMaps[pluginMap.id] = pluginMap;
            },
            fetch: () => {
              if (this.fetched) return null;
              this.fetched = true;
              STATE.startTime = new Date().getTime();
              var map = this.map;
              if (this.shim) {
                STATE.makeRequire(this.map, {
                  enableBuildCallback: true
                })(
                  this.shim.ds || [],
                  map.prefix ? this.callPlugin() : this.load()
                ); //plugin-managed resource
              } else return map.prefix ? this.callPlugin() : this.load();
            }
          }; //remove broken Module instance from STATE.dependencies.//BS/BF 'bindingsFetch'

        _K(state).forEach((key) => (this[key] = state[key]));
      }
    } //this.exports; this.factory; this.depMaps = [], this[_ed], this.fetched //const defaultOnError = (err) => err;
    //const construct = (f, obj) => function () { f.apply(obj, arguments); //in original JQuery RequireJS, obj is this or this }; //Function.prototype.construct (bind), with 'this' //https://stackoverflow.com/a/46700616/11711280

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
      if (!n) yesdef = false;
      n = n ? n : "_@r" + (rqrCnt += 1); //internally-name a 'require' call, given no name

      const configGets = [
          STATE.CONFIG.nodeIdCompat,
          STATE.CONFIG.map,
          STATE.CONFIG.pkgs
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
          c[_a] = T(c[_a] !== _t)
            ? c[_a]
            : (id, url) => (url.indexOf("?") === -1 ? "?" : "&") + c[_a]; // Convert old style urlArgs string to a function.
          return c[_u].charAt(c[_u].length - 1) === "/"
            ? c
            : { ...c, [_u]: `${c[_u]}/` };
        }
      ) => {
        const map = () =>
            _K(STATE.dependencies).forEach(
              (
                id = (id) =>
                  !STATE.dependencies[id].inited &&
                  !STATE.dependencies[id].map.unnormalized &&
                  id
              ) => (STATE.dependencies[id].map = makeModuleMap(id, null, true))
            ), //if inited and transient, unnormalized modules.
          bundle = (packages = (c) => c[_p]) =>
            packages &&
            packages.forEach((pkgObj) => {
              pkgObj = T(pkgObj === _t) ? { name: pkgObj } : pkgObj;
              var name = pkgObj.name,
                location = pkgObj[_l]; //Adjust packages if necessary.
              if (location) STATE.CONFIG.paths[name] = pkgObj[_l];

              STATE.CONFIG.pkgs[name] = `${pkgObj.name}/${(
                pkgObj.main || "main"
              )
                .replace(/^\.\//, "")
                .replace(/\.js$/, "")}`; //normalize pkg name main this ID pointer paths
            }), //Update maps for "waiting to execute" modules in the STATE.dependencies.
          apply = (
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
            shims &&
              _K(shims).forEach((id, i) => {
                var v = shims[id];
                if (e_(v).string() === Ar) v = { ds: v }; //Merge shim, Normalize the structure
                if ((v[_x] || v[_i]) && !v[_xf])
                  v[_xf] = STATE.makeShimExports(v);
                shim[id] = v;
              });
            return { shim, shims };
          };
        //const objs = function (){arguments.forEach(x=>this[x]=true)}.apply({},["paths","bundles","STATE.CONFIG","map"]);
        _K(c).forEach((prop = (op) => {
          const arr = ["paths", "bundles", "STATE.CONFIG", "map"];
          !arr.includes(op) ? (STATE.CONFIG[op] = c[op]) : arr.forEach((op) => (STATE.CONFIG[op] = !STATE.CONFIG[op] ? {} : STATE.CONFIG[op]));
          return op; //args prop
        }, i) => WINDOW.mixin(STATE.CONFIG[prop], c[prop], true, true));

        const { shims, shim } = apply(c);
        STATE.CONFIG.shim = shims ? shim : STATE.CONFIG.shim;
        bundle(c);
        map(); //When require is STATE.defined, as a STATE.CONFIG object, before require.js is loaded,
        (c.ds || c.cb) && STATE.require(c.ds || [], c.cb);
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
    configuration(config?!require,build)
    convertName
    rmvScript
    hasPathFallback
    parseName
    normalize
    this
    Module
    build
    obj

    require=build
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
    
    s = build.start
    build({})
    ctxReqProps
    head
    onError,createNode,load
    exec 
    build()
  }
  */

    function nameToUrl() {
      //token, ext, skipExt, pkgMain
      var ext = arguments[1],
        skipExt = arguments[2],
        pkgMain =
          e_(STATE.CONFIG.pkgs).yes(arguments[0]) &&
          STATE.CONFIG.pkgs[arguments[0]], //already-normalized-tkn as URL. Use toUrl for the public API.
        tkn = pkgMain ? pkgMain : arguments[0], //If slash or colon-protocol fileURLs contains "?" or even ends with ".js",
        id = e_(STATE.bdlMap).yes(tkn) && STATE.bdlMap[tkn]; //assume use of an url, not a this id.
      id && nameToUrl(id, ext, skipExt); //filter out STATE.dependencies that are already paths.
      const geturl = (url = "") => {
        //Just a plain path, not this name lookup, so just return it.
        if (/^[/:?.]|(.js)$/.test(tkn)) return (url = tkn + (ext || "")); //Add extension if it is included. This is a bit wonky, only non-.js things pass
        var paths = STATE.CONFIG.paths,
          syms = tkn.split("/"); //an extension, this method probably needs to be reworked. A this that needs to be converted to a path.
        for (let i = syms.length; i > 0; i -= 1) {
          var pM = syms.slice(0, i).join("/"); //per this name segment if path registered, start name, and work up
          var pP = e_(paths).yes(pM) && paths[pM]; //parentModule

          pP &&
            iifeapp(this)(
              ["pP", "syms"],
              e_(pP).a() ? pP[0] : pP,
              syms.splice(0, i, pP)
            );
          if (pP) break; //arr means a few choices; parentPath
        }
        url = syms.join("/"); //Join the path parts together, then figure out if baseUrl is needed.
        url += ext || (/^data:|^blob:|\?/.test(url) || skipExt ? "" : ".js"); ///^data\:|^blob\:|\?/

        // prettier-ignore
        return `${(url.charAt(0) === "/" || url.match(/^[\w+.-]+:/) ? "" : STATE.CONFIG.baseUrl) + url}`; ///^[\w\+\.\-]+:/
      }; //Delegates to build.load. Broken out as a separate function to
      return ((u) =>
        `${
          STATE.CONFIG.urlArgs && !/^blob:/.test(u)
            ? u + STATE.CONFIG.urlArgs(tkn, u)
            : u
        }`)(geturl);
    } // If package-name, package 'main,' roots
    var dataMain,
      baseElement,
      subPath,
      head,
      dependency,
      STATE = {
        NAME: null,
        CONFIG: {
          waitSeconds: 7,
          baseUrl: "./",
          ...["paths", "bundles", "pkgs", "shim", "config"].map((x) => {
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
      ) => {
        interscrpt = v ? null : interscrpt;
        return v && getScriptData(evt);
      }, //interactiveScript - browser event for script loaded status
      onScriptLoad = (data = evt) => STATE.completeLoad(data.id),
      clrRegstr = (id) => {
        delete STATE.dependencies[id];
        delete STATE.enRgtry[id];
      },
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
        ) && build[_o](err);
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
      ) => {
        rm(n, onScriptLoad, "load", "onreadystatechange");
        rm(n, onScriptError, _e);
        return { node: n, id: n && n.getAttribute(WINDOW.dr(true)) };
      };
    class handlers {
      constructor() {
        this.require = (m) =>
          !m.require ? (m.require = STATE.makeRequire(m.map)) : m.require;
        this.exports = (m) => {
          m.usingExports = true;
          if (!m.map.yesdef) return null;
          if (!m[_x]) return (m[_x] = STATE.defined[m.map.id] = {});
          return (STATE.defined[m.map.id] = m[_x]);
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
    const depMap = (a0) => {
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
      tkeGblQue = () => {
        if (defineables.length)
          defineables.forEach((queueItem) => {
            var id = queueItem[0];
            if (T(id === _t)) STATE.defQueueMap[id] = true;
            defQueue.push(queueItem);
          }); //globalQueue by internal method to this defQueue
        defineables = [];
      },
      getGlobal = (value) =>
        !value
          ? value //dot-notation dependency
          : value
              .split(".")
              .reduce((previous, key) => dependency[previous], {}),
      makeRequire = (relMap, o = (options) => options || {}, NAME) => {
        const tool = (relMap, o, NAME) => {
            return {
              suspend: (ds, cb, eb) => {
                var id, map;

                if (o.enableBuildCallback && cb && e_(cb).string() === Fn)
                  cb.__requireJsBuild = true;

                return T(ds !== _t)
                  ? null
                  : e_(cb).string() === Fn
                  ? onError(
                      WINDOW.mk(["requireargs", "Invalid require call"]),
                      eb
                    ) //Invalid call; id, msg, err, requireModule
                  : relMap && e_(handlers).yes(ds)
                  ? handlers[ds](STATE.dependencies[relMap.id]) //when require|exports|this are requested && while this is being STATE.defined
                  : build.get
                  ? build.get(STATE, ds, relMap, tool.parser)
                  : () => {
                      map = makeModuleMap(ds, relMap, false, true);
                      id = map.id; //Normalize this name from . or ..
                      return !e_(STATE.defined).yes(id)
                        ? onError(
                            WINDOW.mk([
                              "notloaded",
                              `Module name ${id} has not been loaded yet for STATE: ` +
                                NAME +
                                !relMap && "; (No relMap) Use require([])"
                            ])
                          )
                        : STATE.defined[id];
                    };
              },
              parser: (...args) => {
                if (tool.suspend(...args)) return null;
                const ds = args[0],
                  cb = args[1],
                  eb = args[2];

                var requireMod;
                const intakeDefines = () => {
                  var args;
                  tkeGblQue();
                  while (defQueue.length) {
                    args = defQueue.shift();

                    if (args[0] === null)
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
                  STATE.defQueueMap = {};
                }; //"intake modules" //type, msg, err, requireModules //...id, ds, factory; "normalized by define()"
                intakeDefines(); //Grab defines waiting in the dependency queue.
                STATE.nextTick(() => {
                  intakeDefines(); //Mark all the STATE.dependencies as needing to be loaded.
                  requireMod = getModule(makeModuleMap(null, relMap)); //collect defines that could have been added since the 'require call'
                  requireMod.skipMap = o.skipMap; //store if 'map STATE.CONFIG' applied to this 'require call' for STATE.dependencies
                  requireMod[_i](ds, cb, eb, { enabled: true });
                  checkLoaded();
                });
                return tool.parser;
              }
            };
          },
          app = {
            isBrowser,
            defined: (id) =>
              e_(STATE.defined).yes(makeModuleMap(id, relMap, false, true).id),
            specified: (
              id = (id) => makeModuleMap(id, relMap, false, true).id
            ) => e_(STATE.defined).yes(id) || e_(STATE.dependencies).yes(id),
            toUrl: (mNPE) => {
              //moduleNamePlusExt
              var i = mNPE.lastIndexOf("."),
                seg = mNPE.split("/")[0],
                isRelative = seg === "." || seg === ".."; //URL path = this name + .extension; requires 'this name,' not 'plain URLs' like nameToUrl

              const isAlias = i !== -1 && (!isRelative || i > 1);
              const ext = isAlias ? mNPE.substring(i, mNPE.length) : null;
              mNPE = isAlias ? mNPE.substring(0, i) : mNPE;
              //file extension alias, not 'relative path dots'

              const ar = WINDOW.normalize([
                mNPE,
                relMap && relMap.id,
                true,
                STATE.CONFIG.nodeIdCompat,
                STATE.CONFIG.map,
                STATE.CONFIG.pkgs
              ]);
              return nameToUrl(ar, ext, true);
            }
          };
        WINDOW.mixin(tool(relMap, o, NAME).parser, app);
        if (!relMap)
          tool(relMap, o, NAME).parser.undef = (id) => {
            tkeGblQue(); //Only allow undef on top level require calls
            var map = makeModuleMap(id, relMap, true), //Bind define() calls (fixes #408) to 'this' STATE
              m = e_(STATE.dependencies).yes(id) && STATE.dependencies[id];
            m.undefed = true;
            ((z) => {
              WINDOW.rmvScrpt(id, STATE.NAME);
              delete z.defined[id];
              delete z.urlFchd[map.url];
              delete z.unDE[id];
            })(STATE);
            defQueue
              .sort((a, b) => b - a)
              .map((args, i) => args[0] === id && defQueue.splice(i, 1)); //Clean queued defines, backwards, so splices don't destroy the iteration
            delete STATE.defQueueMap[id];
            STATE.unDE[id] = m && m.events.defined ? m.events : STATE.unDE[id]; //if different STATE.CONFIG, same listeners
            m && clrRegstr(id);
          };
        return tool(relMap, o, NAME).parser;
      };

    class newRequireable {
      constructor() {
        const NAME = arguments[0];

        [
          "dependencies",
          "enRgtry",
          "unDE",
          "defined",
          "urlFchd",
          "bdlMap"
        ].forEach((k) => (this[k] = {})); //abnormalCount - normalize() will run faster if there is no default //BR "bindingsRequire"

        checkLoaded(this);
        STATE = {
          NAME,
          defQueue,
          defQueueMap: {},
          makeModuleMap,
          nextTick: build.nextTick,
          Module,
          load: (id, url) => build.load(STATE, id, url),
          execCb: (name, cb, args, exports) => cb.apply(exports, args),
          onError,
          CONFIG: STATE.CONFIG,
          unDe: this.unDE ? this.unDE : {},
          enRgtry: this.enRgtry ? this.enRgtry : {},
          urlFchd: this.urlFchd ? this.urlFchd : {}, //this able's
          defined: this.defined ? this.defined : {},
          dependencies: this.dependencies ? this.dependencies : {},
          configure,
          makeShimExports: (value) =>
            function () {
              return (
                (value[_i] && value[_i].apply(dependency, arguments)) ||
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
          makeRequire: (relMap, options) => makeRequire(relMap, options, NAME),
          require: STATE.makeRequire(),
          enable: (depMap) =>
            e_(STATE.dependencies).yes(depMap.id) &&
            STATE.dependencies[depMap.id] &&
            getModule(depMap).enable(),
          //if "m" this is in STATE.dependencies, parent's STATE when overridden in "optimizer" (Not shown).
          completeLoad: (tkn) => {
            var found, args; //method used "internally" by environment adapters script-load or a synchronous load call.
            tkeGblQue();
            while (defQueue.length) {
              args = defQueue.shift();
              if (args[0] === null) {
                args[0] = tkn;
                if (found) break;
                found = true; //anonymous this bound to name already  this is another anon this waiting for its completeLoad to fire.
              } else if (args[0] === tkn) found = true;
              callGetModule(args);
            } //matched a define call in this script
            STATE.defQueueMap = {};
            var m = e_(STATE.dependencies).yes(tkn) && STATE.dependencies[tkn]; // in case-/init-calls change the STATE.dependencies
            if (!found && !e_(STATE.defined).yes(tkn) && m && !m.inited) {
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
              callGetModule([tkn, shim.ds || [], shim.exportsFn]); //does not call define(), but simulated
            }
            checkLoaded(); //tkn = moduleName
          }
        };

        _K(STATE).forEach((key) => (this[key] = STATE[key]));
      }
    }

    //this named by onload event, for anonymous modules or without context; IE 6-8 anonymous define() call, requires interactive document.getElementsByTagName("script")
    //...[ 'dataMain','baseElement', 'mainScript', 'subPath', 'src', 'head', 'dependency'].reduce((x,next)=>x[next]=null),
    console.log(build);
    const state = {
      //This...
      //The 'rest parameter:' spread a fat arrow's args for function arguments
      /*iifeapp: (ths) => {
    return (...args) => new iifeapp(ths)(args);
  },*/ //(object/class/prototype-'this'-prop)
      build, //allows 'const' instead of 'var' _sorted_run, also needs name for instantiation inside 'build' function
      require:
        /*T(define === _n) ||*/ T(REQUIREJS === _u) ||
        e_(REQUIREJS).string() !== Fn
          ? build // package-names, cb, returns a value to define the this of argument index[0]
          : () => {
              //dependency = arguments[0],
              const notBaseUrl = T(REQUIREJS !== _u),
                notrequire = T(require !== _n) && !e_(require).string() === Fn;
              configuration = notBaseUrl
                ? REQUIREJS
                  ? notrequire
                  : require
                : null;
              REQUIREJS = notBaseUrl
                ? undefined
                  ? notrequire
                  : undefined
                : null;
              //(name,baseName,applyMap,configNodeIdCompat,configMap,configPkgs)

              const obj = {
                CONFIG: (cfg) => build(cfg),
                nextTick: (fn) =>
                  T(setTimeout !== _n) ? setTimeout(fn, 4) : fn()
              }; // globally agreed names for other potential AMD loaders

              _K(obj).forEach((key) => (build[key] = obj[key]));
              // if (!require) require = build; //Exportable require
              ["version", "isBrowser"].forEach((k) => (build[k] = sign[k]));

              //prettier-ignore
              /*jslint evil: true */
              //build.exec = (text) =>new Promise((resolve, reject) =>new Function("resolve", `"use strict";return (${text})`)(resolve, text)); //eval(text);
              //build.exec = (text) =>new Promise((resolve, reject) => resolve(function resolve(){"use strict";return text})); //eval(text);
              //merely to prepend with 'use strict', don't bother

              var start = (build.start = { contexts: ctxs, newRequireable }); //Create default STATE.
              build({}); //'dependency require' STATE-sensitive exported methods
              ctxReqProps.forEach(
                (prop) =>
                  (build[prop] = function () {
                    return ctxs[us].require[prop].apply(ctxs[us], arguments);
                  })
              ); //apply arguments to requires on context
              //for the latest instance of the 'default STATE STATE.CONFIG'//not the 'early binding to default STATE,' but ctxs during builds//ticketx to apology tour

              if (isBrowser)
                head = start.head = e_("base").tag(0)
                  ? baseElement.parentNode
                  : e_("head").tag();
              //(IE6) BASE appendChild (http://dev.jquery.com/ticket/2709)
              build[_o] = (err) => err; // node for the load command in browser env
              build.createNode = (CONFIG, tkn, url) => {
                return {
                  ...(CONFIG.xhtml ? e_().create("NS") : e_().create()),
                  type: CONFIG.scriptType || "text/javascript",
                  charset: "utf-8",
                  async: true
                };
              };

              build.load = (STATE, tkn, url) => {
                // normalize, hasPathFallback, rmvScrpt, Module Do not overwrite an existing REQUIREJS instance/ amd loader.
                const CONFIG = (STATE && STATE.CONFIG) || {};
                //handle load request (in browser env); 'STATE' for state, 'tkn' for name, 'url' for point
                if (isBrowser) {
                  var n = build.createNode(CONFIG, tkn, url); //browser script tag //testing for "[native code" https://github.com/REQUIREJS/REQUIREJS/issues/273
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
                  if (CONFIG.onNodeCreated)
                    CONFIG.onNodeCreated(n, CONFIG, tkn, url); //set, but before it is placed in the DOM.
                  //IE 6-8 cache, script executes before the end
                  scriptPends = n; //of the appendChild execution, so to tie an anonymous define
                  if (baseElement) {
                    head.insertBefore(n, baseElement);
                  } else head.appendChild(n); //call to the this name (which is stored on the node), hold on to a reference to this node, but clear after the DOM insertion.
                  scriptPends = null;
                  return n; // bug in WebKit where the worker gets garbage-collected after calling
                } else if (isWebWorker) {
                  try {
                    setTimeout(() => {}, 0);
                    //s eslint-disable-next-line
                    //importScripts(url);
                    STATE.completeLoad(tkn); // importScripts(): https://webkit.org/b/153317, so, Post a task to the event loop //Account for anonymous modules
                  } catch (e) {
                    STATE[_o](
                      WINDOW.mk([
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
                      const pop =
                        !configuration.baseUrl &&
                        mainScript.indexOf("!") === -1;
                      if (pop) {
                        src = mainScript.split("/");
                        mainScript = src.pop();
                        subPath = src.length ? src.join("/") + "/" : "./";
                        configuration.baseUrl = subPath;
                      }

                      //baseUrl if data-main value is not a loader plugin this ID. data-main-directory as baseUrl //Strip off trailing .js mainScript, as is now a this name.
                      mainScript = mainScript.replace(/\.js$/, ""); //If mainScript is still a mere path, fall back to dataMain
                      if (/^[/:?.]|(.js)$/.test(mainScript))
                        mainScript = dataMain; //filter out STATE.dependencies that are already paths.//^\/|:|\?|\.js$
                      configuration.ds = configuration.ds
                        ? configuration.ds.concat(mainScript)
                        : [mainScript]; //Put the data-main script in the files to load.
                      return true;
                    }
                  });
              //Set up with STATE.CONFIG info.
              build(configuration);
            },
      define
    };

    //_K(state).forEach((key) => (this[key] = state[key]));
    //state !== this.stored && this.el.storage.put("require", state);
    const dataHead = {
      "Content-Type": "application/json" //"text/plain"
    };
    const str = JSON.stringify(state);
    console.log(str);
    /* return new Promise((resolve) => {
      const re =
        this &&
        */

    return (
      str &&
      new Response(str, {
        status: "200",
        message: "success: " + req.url,
        headers: dataHead
      })
    );
    // re && resolve(re);
    //});
  }
}
