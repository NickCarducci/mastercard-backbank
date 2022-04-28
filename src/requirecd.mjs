import { applyREQUIREJS, buildable, contexts, e_ } from "./builder";

/*console.log("In Require: ", "Dependency", buildable.start.Dependency);
  'dependency requir' buildable-sensitive exported methods*/

var sign = { version: "2.3.6.carducci", isBrowser: false },
  REQUIREJS = (buildable = applyREQUIREJS.bind(sign)),
  T = (x) => typeof x,
  Y = (value, z, _) => {
    if (z && _) z[_] = value;
    return true;
  },
  _ = "_",
  _u = "baseUrl",
  _n = "undefined",
  Fn = "[object Function]"; //seratimNull
buildable.NAME = null;
buildable.CONFIG = {
  waitSeconds: 7,
  baseUrl: "./", //bundle used to be packages
  ...["paths", "bundles", "bundle", "exportable", "config"].map((x) => {
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
    var configuration = {},
      noSetTimeout,
      setTimeout = T(noSetTimeout === "undefined") ? undefined : noSetTimeout,
      mainScript,
      src;

    //dependency = arguments[0], //T(requir === _n) || e_(requir).string() === Fn;
    const notrequire = true,
      notBaseUrl = T(REQUIREJS !== _u),
      c = notBaseUrl ? (REQUIREJS ? notrequire : requir) : null,
      r = notBaseUrl ? (undefined ? notrequire : undefined) : null;
    Y((configuration = c)) && Y((REQUIREJS = r));
    //(name,baseName,applyMap,configNodeIdCompat,configMap,configPkgs)

    buildable.CONFIG = (config) => buildable(config);
    buildable.nextTick = (fn) =>
      T(setTimeout !== _n) ? setTimeout(fn, 4) : fn();
    // globally agreed names for other potential AMD loaders

    // if (!requir) requir = buildable; //Exportable requir
    return Y(
      ["version", "isBrowser"].forEach((k) => (buildable[k] = sign[k]))
    ) &&
      /*prettier-ignore
            jslint evil: true 
            buildable.exec = (text) =>new Promise((resolve, reject) =>new Function("resolve", `"use strict";return (${text})`)(resolve, text)); //eval(text);
            buildable.exec = (text) =>new Promise((resolve, reject) => resolve(function resolve(){"use strict";return text})); //eval(text);
            merely to prepend with 'use strict', don't bother*/

      sign.isBrowser &&
      !configuration.skipDataMain
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
              ) => {
                var subPath;
                return (
                  dataMain &&
                  /*Set 'head' and append children to script's parent attribute 'data-main' script to load baseUrl, if it is not already set.
                    Preserve dataMain in case it is a path (i.e. contains '?')*/
                  Y((mainScript = dataMain ? dataMain : mainScript)) &&
                  (!configuration.baseUrl && mainScript.indexOf("!") === -1
                    ? (src = mainScript.split("/")) &&
                      (mainScript = src.pop()) &&
                      (subPath = src.length ? src.join("/") + "/" : "./") &&
                      (configuration.baseUrl = subPath)
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
                  (configuration.REM = configuration.REM
                    ? configuration.REM.concat(mainScript)
                    : [mainScript])
                );
              }
            )
        )
      : /*Set up with buildable.CONFIG info.*/
        buildable(configuration);
  };
export { requir };
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
