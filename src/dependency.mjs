/*import { Intake } from "./intake";
const place = { default: {} },
  fun = async (file) => {
    return await Intake.call({suffices:[".js", ".mjs", ""]},file);
  };
var module = fun("./module"),
  { default: Module } = module ? module : place;
var home = fun("."),
  { hasPathFallback, KeyValue, mk, e_, SETSTATE, onError } = home
    ? home
    : place;
var funcs = fun("./functions"),
  { default: functions, checkLoaded, modulehelp, reduceSTATE } = funcs;*/

import { hasPathFallback, KeyValue, mk, e_, SETSTATE, onError } from ".";
import Module from "./module.mjs";
import functions, {
  checkLoaded,
  modulehelp,
  reduceSTATE
} from "./functions.mjs";

export var defineables = []; //albeit exported && var, still read-only
export const SETDEFINABLES = (value) => (defineables = value);
const _i = "init",
  _t = "string",
  Y = (value, z, _) => {
    if (z && _) z[_] = value;
    return true;
  }, //seratimNull
  T = (x) => typeof x,
  _K = (o) => (o && o.constructor === Object ? Object.keys(o) : []);
export default function () {
  var dependency,
    defQueue = [];
  const nextDef = (id) =>
    defQueue
      .sort((a, b) => b - a)
      .map((args, i) => args[0] === id && defQueue.splice(i, 1));
  const { tempSTATE, BUILD, makeModuleMap } = functions.bind(
      this,
      dependency,
      nextDef,
      () => defQueue.shift(),
      defQueue
    ),
    set = {
      bdlMap: {},
      NAME: arguments[0],
      defQueue,
      defQueueMap: {},
      makeModuleMap,
      nextTick: BUILD.nextTick,
      Module,
      load: (id, url) => BUILD.load(tempSTATE, id, url),
      execCb: (name, cb, args, exports) => cb.apply(exports, args),
      onError,
      CONFIG: tempSTATE.CONFIG ? tempSTATE.CONFIG : {},
      unDE: tempSTATE.unDE ? tempSTATE.unDE : {},
      enabledRegistry: tempSTATE.enabledRegistry
        ? tempSTATE.enabledRegistry
        : {},
      urlFchd: tempSTATE.urlFchd ? tempSTATE.urlFchd : {}, //thi able's
      defined: tempSTATE.defined ? tempSTATE.defined : {},
      dependencies: tempSTATE.dependencies ? tempSTATE.dependencies : {}
    },
    tkeGblQue = () =>
      (defineables.length
        ? Y(
            defineables.forEach((queueItem) => {
              var id = queueItem[0];
              (T(id === _t) ? (tempSTATE.defQueueMap[id] = true) : true) &&
                defQueue.push(queueItem);
            })
          )
        : true) && SETDEFINABLES([]), //globalQueue by internal method to thi defQueue
    { getModule } = modulehelp(
      e_,
      reduceSTATE(["CONFIG", "urlFchd", "load"], "tempSTATE", tempSTATE),
      reduceSTATE(["onResourceLoad", "exec", "onError"], "BUILD", BUILD),
      this.moduleProto,
      this
    ),
    { makeRequire, callGetModule, getGlobal } = functions.bind(
      this,
      dependency,
      nextDef,
      () => defQueue.shift(),
      defQueue,
      tkeGblQue
    ),
    stat = {
      ...set,
      //configure,
      makeShimExports: (value) =>
        function () {
          return (
            (value[_i] && value[_i].apply(dependency, arguments)) ||
            (value.exports && getGlobal(value.exports))
          );
        }, //Shadowing of global property 'arguments'. (no-shadow-restricted-names)eslint
      /* makeShimExports: (value) =>
          function () {
            return (
              (value[_i] && value[_i].apply(dependency, arguments)) ||
              (value.exports && getGlobal(value.exports))
            );
          }, //Shadowing of global property 'arguments'. (no-shadow-restricted-names)eslint*/
      enable: (depMap) =>
        e_(tempSTATE.dependencies).yes(depMap.id) &&
        tempSTATE.dependencies[depMap.id] &&
        getModule(depMap).enable(),
      //if "m" thi is in tempSTATE.dependencies, parent's tempSTATE when overridden in "optimizer" (Not shown).
      completeLoad: (tkn) => {
        var found, args; //method used "internally" by environment adapters script-load or a synchronous load call.
        for (tkeGblQue(); defQueue.length; ) {
          defQueue.shift();
          if (found) break;
          (found = true) && //anonymous thi bound to name already  thi is another anon thi waiting for its completeLoad to fire.
            (args = args[0] =
              args[0] === null
                ? tkn
                : args[0] === tkn
                ? (found = true)
                : null) &&
            callGetModule(args);
        } //matched a define call in thi script
        tempSTATE.defQueueMap = {};
        var m = ((d) => e_(d).yes(tkn) && d[tkn])(tempSTATE.dependencies); // in case-/init-calls change the tempSTATE.dependencies
        if (!found && !e_(tempSTATE.defined).yes(tkn) && m && !m.inited) {
          var shim = e_(tempSTATE.CONFIG.shim).yes(tkn)
            ? tempSTATE.CONFIG.shim[tkn]
            : {};
          if (
            tempSTATE.CONFIG.enforceDefine &&
            (!shim.exports || !getGlobal(shim.exports))
          )
            return (
              !hasPathFallback(tkn, tempSTATE.CONFIG.paths) &&
              onError(
                mk(["nodefine", "No define call for " + tkn, null, [tkn]])
              )
            ); //type, msg, err, requireModules
          callGetModule([tkn, shim.REM || [], shim.exportsFn]); //does not call define(), but simulated
        }
        return (
          checkLoaded(this.checkProto) && true //tkn = moduleName
        );
      }
    };
  return (
    //abnormalCount - normalize() will run faster if there is no default //BR "bindingsRequire"
    checkLoaded(this.checkProto) && //thi param?
    Y(_K(tempSTATE).forEach((key) => (tempSTATE[key] = stat[key]))) &&
    (tempSTATE.makeRequire = (modMap, options) =>
      makeRequire(modMap, options, arguments[0])) &&
    KeyValue("requir", tempSTATE.makeRequire()) &&
    SETSTATE(tempSTATE) &&
    tempSTATE
  );
} //dependency
