import { KeyValue, onError } from "../..";
import { mk, normalize, reduce, tryCatch } from "../functions";
import { nameToUrl } from "./nametourl";

export function handlers(
  config = arguments[0],
  makeRequire = arguments[1],
  defined = arguments[2]
) {
  //module BUILD.CONFIG.config
  const os = (o) => (o.constructor === Object ? o : {});
  this.requir = (module) => (module.requir = makeRequire(module.map));
  this.exports = (module) =>
    (this.usingExports = true) &&
    this.map.yesdef &&
    (defined[module.map.id] = os(module.exports));

  this.module = {
    id: this.map.id,
    uri: this.map.url,
    config: os(config[this.map.id]),
    exports: os(this.exports)
  };
}

export function modulehelp(
  e_ = arguments[0],
  dependency = arguments[1],
  BUILD = arguments[2],
  s
) {
  const { moduleProto } = this,
    {
      Module,
      CONFIG: config = (CONFIG) => CONFIG.config,
      urlFchd,
      load
    } = dependency,
    clrRegstr = (id) =>
      KeyValue(`dependencies.${id}`, null, "delete") &&
      KeyValue(`enabledRegistry.${id}`, null, "delete"),
    depMap = (dm) => {
      return {
        dm,
        m:
          e_(dependency.dependencies).yes(dm.id) &&
          dependency.dependencies[dm.id]
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
                    dependency,
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
                `redundant dependency.load(${dm.id}, ${dm.url}) call (?), dependency.urlFchd[${dm.url}] === true`
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
      const Dependency = this;
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
                dependency,
                BUILD,
                moduleProto,
                Dependency
              ).getModule,
              onError,
              ...reduce.call(this, matches, "dependency", dependency),
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
