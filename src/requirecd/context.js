import { e_, KeyValue, mixin, buildable } from ".";
import Dependency /*, { defineables, SETDEFINABLES }*/ from "./dependency";
import { reduce } from "./dependency/module/functions";
import makeModuleMap from "./makemap";

var _ = "_",
  _u = "baseUrl";
export const binds = (prop) =>
  function () {
    //apply a meaningless initial this._ state to a requir function
    return contexts[_].requir[prop].apply(contexts[_], arguments);
  };
export var contexts = {};
var _t = "string",
  useInteractive = false,
  T = (x) => typeof x,
  Y = (value, z, _) => {
    if (z && _) z[_] = value;
    return value ? value : true;
  }; //seratimNull

const _p = "packages",
  _b = "bundles",
  _s = "exportable",
  _l = "location",
  _a = "urlArgs",
  _xf = "exportsFn",
  _i = "init",
  _e = "error",
  Ar = "[object Array]";

export default function Context(
  REM = arguments[0], //String(requir|export|module)
  cb = arguments[1],
  eb = arguments[2],
  optional = arguments[3]
) {
  /*String(requir|export|module)
            Caja compliant buildable for minified-scope name of dependency, cb for arr completion Find the right buildable, use default*/
  var NAME = _,
    Build,
    config;
  if (!e_(REM).string() === Ar && T(REM !== _t)) {
    config = REM;
    return !e_(cb).a()
      ? (REM = [])
      : (REM = cb) && (cb = eb) && (eb = optional);
  } /* Determine if have Build.CONFIG object in the call. REM is a Build.CONFIG object
            Adjust args if there are Build.dependencies console.log("Build, requir", buildable, Build && Build.requir);*/
  (NAME = config && config.context ? config.context : NAME) &&
    Y((Build = e_(contexts).yes(NAME) && contexts[NAME]));
  //https://github.com/NickCarducci/mastercard-backbank/blob/main/src/notes/require.js#L231 231
  if (!Build) {
    const checkProto = reduce.call(
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
      config = {
        Build,
        buildable,
        makeModuleMap,
        KeyValue,
        Y,
        checkProto,
        moduleProto: { makeModuleMap, useInteractive, _e }
      };
    contexts[NAME] = Build = Dependency.bind(config);
    /*context, newContext, bundlesMap; call is like prototype*/
  }
  const cg = (
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
    /*args prop; save paths for special "additive processing;" Reverse map the bundles; 'exportable' = tobeshim*/
    const mend = (bundles, exportables) => {
        var exportable = Building.CONFIG.exportable;
        bundles &&
          Object.keys(bundles).forEach((prop, i) =>
            bundles[prop].forEach((v) =>
              KeyValue(`bdlMap.${v}`, v !== prop ? prop : Building.bdlMap[v])
            )
          );
        Y(
          exportables &&
            Object.keys(exportables).forEach((id, i) => {
              var exportable = exportables[id];
              return (
                Y(
                  e_(exportable).string() === Ar &&
                    (exportable = { REM: exportable })
                ) && //Merge exportable, Normalize the structure
                Y(
                  (exportable.exports || exportable[_i]) &&
                    !exportable[_xf] &&
                    (exportable[_xf] = Building.makeShimExports(exportable))
                ) &&
                (exportable[id] = exportable)
              );
            })
        );
        return { exportable, exportables };
      },
      { exportables, exportable } = mend(c[_b], c[_s]);
    return (
      Y(
        KeyValue(
          `CONFIG.${exportable}`,
          exportables ? exportable : Building.CONFIG.exportable
        )
      ) &&
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
  console.log("configure defined ", cg);

  this.contexts = contexts;
  return (
    Y(
      config &&
        cg(
          config,
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
