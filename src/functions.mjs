import {
  KeyValue,
  mk,
  e_,
  dr,
  tryCatch,
  handlers,
  normalize,
  onError,
  isBrowser
} from ".";
import { checkLoaded } from "./dependency";
export const rmvScrpt = (name, NAME) => {
  const ga = "getAttribute",
    e = (m) => (m ? name : NAME);
  return (
    isBrowser &&
    Y(
      e_()
        .tag()
        .forEach(
          (scriptNode) =>
            scriptNode[ga](dr(true)) === e(true) &&
            scriptNode[ga](dr()) === e() &&
            scriptNode.parentNode.removeChild(scriptNode)
        )
    )
  );
};
export function reduceSTATE(arr, where, tempSTATE) {
  //console.log("reduceSTATE", arr, where, tempSTATE);
  try {
    var newobject = {};
    Object.keys(tempSTATE).forEach(
      (key) => arr.includes(key) && (newobject[key] = tempSTATE[key])
    );
    return newobject;
  } catch (e) {
    return console.log(this, e);
  }
}
export function nameToUrl() {
  const { CONFIG, bdlMap } = this;

  var ext = arguments[1],
    skipExt = arguments[2],
    pkgMain =
      e_(CONFIG.bundle).yes(arguments[0]) && CONFIG.bundle[arguments[0]],
    tkn = pkgMain
      ? pkgMain
      : arguments[0] /* token, ext, skipExt, pkgMain
      already-normalized-tkn as URL. Use toUrl for the public API.
    If slash or colon-protocol fileURLs contains "?" or even ends with ".js",
    assume use of an url, not a thi id. 
    filter out tempSTATE.dependencies that are already paths.*/,
    id = e_(bdlMap).yes(tkn) && bdlMap[tkn];
  id && nameToUrl(id, ext, skipExt);
  const geturl = (url = "") => {
      /*Just a plain path, not thi name lookup, so just return it.
      Add extension if it is included. This is a bit wonky, only non-.js things pass
      an extension, thi method probably needs to be reworked. A thi that needs to be converted to a path.
      per thi name segment if path registered, start name, and work up*/
      if (/^[/:?.]|(.js)$/.test(tkn)) return (url = tkn + (ext || ""));
      var paths = CONFIG.paths,
        syms = tkn.split("/");
      for (let i = syms.length; i > 0; i -= 1) {
        var pM = syms.slice(0, i).join("/"),
          pP = e_(paths).yes(pM) && paths[pM]; //parentModule
        pP && (pP = e_(pP).a() ? pP[0] : pP) && syms.splice(0, i, pP);
        if (pP) break;
      }
      (url = syms.join(
        "/"
      )) /*arr means a few choices; parentPath; Join the path parts together, then figure out if baseUrl is needed.*/ &&
        (url += ext || (/^data:|^blob:|\?/.test(url) || skipExt ? "" : ".js")); ///^data\:|^blob\:|\?/

      return (
        (url.charAt(0) === "/" || url.match(/^[\w+.-]+:/)
          ? ""
          : CONFIG.baseUrl) + url
      ); /*/^[\w\+\.\-]+:/
      Delegates to BUILD.load. Broken out as a separate function to
      If package-name, package 'main,' roots
      */
    },
    u = geturl;
  return `${
    CONFIG.urlArgs && !/^blob:/.test(u) ? u + CONFIG.urlArgs(tkn, u) : u
  }`;
}

const Y = (value, z, _) => {
  if (z && _) z[_] = value;
  return true;
}; /*seratimNull*/
export function modulehelp(a = arguments) {
  const e_ = a[0],
    tempSTATE = a[1],
    BUILD = a[2],
    moduleProto = a[3],
    Dependency = a[4],
    {
      Module,
      CONFIG: config = (CONFIG) => CONFIG.config,
      urlFchd,
      load
    } = tempSTATE,
    clrRegstr = (id) =>
      KeyValue(`dependencies.${id}`, null, "delete") &&
      KeyValue(`enabledRegistry.${id}`, null, "delete"),
    depMap = (a0) => {
      return {
        dm: a0,
        m:
          e_(tempSTATE.dependencies).yes(a0.id) && tempSTATE.dependencies[a0.id]
      };
    };
  return {
    getModule: ({ m, dm } = depMap) => {
      const manage = (map, ignore, id, depMaps) =>
          map.yesdef && !ignore
            ? new Promise((resolve) =>
                KeyValue(`defined.${id}`, module.exports && resolve(""))
              ).then(
                () =>
                  BUILD.onResourceLoad &&
                  BUILD.onResourceLoad(
                    tempSTATE,
                    map,
                    depMaps.map((depMap) => depMap.normalizedMap || depMap)
                  )
              )
            : true,
        mold = (id, tkn) =>
          e_(config).yes(id)
            ? KeyValue(`CONFIG.config.${tkn}`, config[id])
            : true,
        loadd = () =>
          !urlFchd[dm.url]
            ? KeyValue(`urlFchd.${dm.url}`, true) && load(dm.id, dm.url)
            : console.log(
                `redundant tempSTATE.load(${dm.id}, ${dm.url}) call (?), tempSTATE.urlFchd[${dm.url}] === true`
              ),
        execute = (text, id) => {
          const erro = tryCatch(BUILD.exec, [text]);
          if (erro)
            return onError(
              mk([
                "fromtexteval",
                `fromText eval for ${id} failed: ${erro}`,
                erro,
                [id]
              ])
            );
        },
        matches = [
          "unDE",
          "CONFIG",
          "dependencies",
          "makeRequire",
          "bdlMap",
          "completeLoad",
          "enable",
          "execCb",
          "defined",
          "defQueueMap"
        ],
        { makeModuleMap, useInteractive, _e } = moduleProto;
      return m
        ? m
        : KeyValue(
            `dependencies.${dm.id}`,
            new Module(
              dm,
              makeModuleMap,
              useInteractive,
              _e,
              clrRegstr,
              nameToUrl,
              modulehelp(
                e_,
                tempSTATE,
                BUILD,
                moduleProto,
                Dependency
              ).getModule,
              onError,
              ...reduceSTATE.call(this, matches, "tempSTATE", tempSTATE),
              manage,
              mold,
              loadd,
              KeyValue(`startTime`, new Date().getTime()),
              KeyValue(`enabledRegistry.${dm.id}`, Dependency),
              normalize,
              BUILD.onError !== ((err) => err),
              execute,
              depMap
            )
          );
    }
  };
}

var mixin = (tgt, s, frc, dSM) =>
  Object.keys(s).reduce(e_([s, tgt, frc, dSM]).reducer(), tgt);
const _p = "packages",
  _b = "bundles",
  _s = "shim",
  _l = "location",
  _u = "baseUrl",
  _a = "urlArgs",
  _xf = "exportsFn",
  Ar = "[object Array]";
export const configure = (
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
  tempSTATE,
  mixin,
  e_
) => {
  //const objs = function (){arguments.forEach(x=>thi[x]=true)}.apply({},["paths","bundles","tempSTATE.CONFIG","map"]);
  Object.keys(c).forEach((prop = (op) => {
    const arr = ["paths", "bundles", "config", "map"];
    return Y(!arr.includes(op) ? KeyValue(`CONFIG.${op}`, c[op]) : arr.forEach(
              (op) =>
                KeyValue(
                  `CONFIG.${op}`,
                  !tempSTATE.CONFIG[op] ? {} : tempSTATE.CONFIG[op]
                )
            )) && op;
  }, i) => mixin(tempSTATE.CONFIG[prop], c[prop], true, true));
  /*args prop; save paths for special "additive processing;" Reverse map the bundles; 'temp' = tobeshim*/
  const mend = (bundles, shims) => {
      var shim = tempSTATE.CONFIG.shim;
      bundles &&
        Object.keys(bundles).forEach((prop, i) =>
          bundles[prop].forEach((v) =>
            KeyValue(`bdlMap.${v}`, v !== prop ? prop : tempSTATE.bdlMap[v])
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
                  (temp[_xf] = tempSTATE.makeShimExports(temp))
              ) &&
              (shim[id] = temp)
            );
          })
      );
      return { shim, shims };
    },
    { shims, shim } = mend(c[_b], c[_s]);
  return (
    Y(KeyValue(`CONFIG.${shim}`, shims ? shim : tempSTATE.CONFIG.shim)) &&
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
          "waiting to execute" modules in the tempSTATE.dependencies.
          When requir is tempSTATE.defined, as a tempSTATE.CONFIG object, before requir.js is loaded,*/
      })
    ) &&
    ((z) =>
      Y(
        Object.keys(z).forEach(
          (id = (id) => !z[id].inited && !z[id].map.unnormalized && id) =>
            (z[id].map = makeModuleMap(id, null, true))
        )
      ))(tempSTATE.dependencies) &&
    (c.REM || c.cb) &&
    tempSTATE.requir(c.REM || [], c.cb)
  );
};

const _i = "init",
  _t = "string",
  Fn = "[object Function]",
  T = (x) => typeof x;
export default function (
  dependency = arguments[0],
  nextDef = arguments[1],
  shiftDef = arguments[2],
  defQueue = arguments[3],
  tkeGblQue = arguments[4]
) {
  const {
    tempSTATE,
    BUILD,
    makeModuleMap,
    e_,
    checkProto,
    moduleProto,
    Dependency
  } = this; /*mostly makerequire; Called from Dependency*/

  const { getModule, clrRegstr } = modulehelp(
      e_,
      reduceSTATE.call(
        this,
        ["CONFIG", "urlFchd", "load"],
        "tempSTATE",
        tempSTATE
      ),
      reduceSTATE.call(
        this,
        ["onResourceLoad", "exec", "onError"],
        "BUILD",
        BUILD
      ),
      moduleProto,
      Dependency
    ),
    callGetModule = (args) =>
      !e_(tempSTATE.defined).yes(args[0]) &&
      getModule(makeModuleMap(args[0], null, true))[_i](args[1], args[2]);
  return {
    tempSTATE,
    BUILD,
    makeModuleMap,
    callGetModule,
    getGlobal: (value) =>
      !value
        ? value
        : value.split(".").reduce((previous, key) => dependency[previous], {}),
    makeRequire: (modMap, o = (options) => options || {}, NAME) => {
      const tool = (modMap, o, NAME) => {
          return {
            errr: (
              /*dot-notation dependency; dependencies, callback, errorback*/
              rem,
              cb = (cb) =>
                Y(
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
                    mk([
                      "requireargs",
                      "Invalid ([object Function], -class?) requir callback"
                    ]),
                    eb
                  )
                : modMap && e_(handlers).yes(rem)
                ? handlers[rem](
                    tempSTATE.dependencies[modMap.id],
                    tempSTATE.CONFIG.config,
                    tempSTATE.makeRequire,
                    tempSTATE.defined
                  ) /*Invalid call; id, msg, err, requireModule; when requir|exports|module are requested 
                && while thi is being tempSTATE.defined
                Normalize thi name from . or ..*/
                : BUILD.get
                ? BUILD.get(tempSTATE, rem, modMap, tool.parser)
                : () => {
                    var id, map;
                    return (
                      (map = makeModuleMap(rem, modMap, false, true)) &&
                      (id = map.id) &&
                      (!e_(tempSTATE.defined).yes(id)
                        ? onError(
                            mk([
                              "notloaded",
                              `Module name ${id} has not been loaded yet for commonjs Dependencies' build : ` +
                                NAME +
                                !modMap && "; (No modMap) Use requir([])"
                            ])
                          )
                        : tempSTATE.defined[id])
                    );
                  },
            parser: (...args) => {
              /*function localRequire (dependencies, callback, errorback){}*/
              if (tool.errr(...args)) return null;
              const rem = args[0],
                cb = args[1],
                eb = args[2];

              var requireMod;
              const intakeDefines = () => {
                for (tkeGblQue(); defQueue.length; ) {
                  const args = shiftDef[0];
                  if (null === args)
                    return onError(
                      mk([
                        "mismatch",
                        `Mismatched anonymous define() thi: ${
                          args[args.length - 1]
                        }`
                      ])
                    );

                  callGetModule(args);
                }
                return (tempSTATE.defQueueMap = {}) && true;
              };
              intakeDefines(); /*"intake modules"; type, msg, err, requireModules; ...id, REM, factory; "normalized by define()"
                Grab defines waiting in the dependency queue.
                Mark all the tempSTATE.dependencies as needing to be loaded.
                collect defines that could have been added since the 'requir call'
                store if 'map tempSTATE.CONFIG' applied to thi 'requir call' for tempSTATE.dependencies*/
              tempSTATE.nextTick(
                () =>
                  intakeDefines() &&
                  (requireMod = getModule(makeModuleMap(null, modMap))) &&
                  (requireMod.skipMap = o.skipMap) &&
                  requireMod[_i](rem, cb, eb, { enabled: true }) &&
                  checkLoaded.bind(checkProto)
              );
              return tool.parser;
            }
          };
        },
        namer = {
          isBrowser,
          defined: (id) =>
            e_(tempSTATE.defined).yes(
              makeModuleMap(id, modMap, false, true).id
            ),
          specified: (id = (id) => makeModuleMap(id, modMap, false, true).id) =>
            e_(tempSTATE.defined).yes(id) || e_(tempSTATE.dependencies).yes(id),
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
            /*URL path = thi name + .extension; requires 'thi name,' not 'plain URLs' like nameToUrl*/

            const ext = isAlias ? mNPE.substring(i, mNPE.length) : null;
            mNPE = isAlias ? mNPE.substring(0, i) : mNPE;
            //file extension alias, not 'relative path dots'

            var newobject;
            Object.keys(tempSTATE.CONFIG).forEach(
              (key) =>
                ["nodeIdCompat", "system", "bundle"].includes(key) &&
                (newobject[key] = tempSTATE.CONFIG[key])
            );
            //reduceSTATE(["nodeIdCompat", "system", "bundle"],null,tempSTATE.CONFIG)
            //also, "map" for outward facing code...//also, "packages" ""

            const id = modMap && modMap.id;
            return nameToUrl(
              normalize([mNPE, id, true, ...newobject]),
              ext,
              true
            );
          }
        };
      return (
        mixin(tool(modMap, o, NAME).parser, namer) &&
        Y(
          !modMap &&
            (tool(modMap, o, NAME).parser.undef = (id) => {
              tkeGblQue(); //Only allow undef when top level requir calls
              var map = makeModuleMap(id, modMap, true), //Bind define() calls (fixes #408) to 'thi' tempSTATE
                m =
                  e_(tempSTATE.dependencies).yes(id) &&
                  tempSTATE.dependencies[id];

              return (
                (m.undefed = true) &&
                rmvScrpt(id, tempSTATE.NAME) &&
                KeyValue(`defined.${id}`, null, "delete") &&
                KeyValue(`urlFchd.${map.url}`, null, "delete") &&
                KeyValue(`unDE.${id}`, null, "undefined") &&
                nextDef(id) && //Clean queued defines, backwards, so splices don't destroy the iteration
                KeyValue(`defQueueMap.${id}`, null, "delete") &&
                KeyValue(
                  `unDE.${id}`,
                  m && m.events.defined ? m.events : tempSTATE.unDE[id]
                ) && //if different tempSTATE.CONFIG, same listeners
                m &&
                clrRegstr(id)
              );
            })
        ) &&
        tool(modMap, o, NAME).parser
      );
    }
  };
}
