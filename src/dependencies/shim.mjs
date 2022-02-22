const hydrate = modules =>{
 return `
  (function(modules) {
    // Define runtime.
    const installedModules = {}; // id/index + exports
    function _our_require_(moduleId) {
      // Module in cache?
      if (installedModules[moduleId]) {
          // return function exported in module
         return installedModules[moduleId].exports
      }
      // Build module, store exports against this ref.
      const module = {
         i: moduleId,
         exports: {},
      }
      // Execute module template function. Add exports to ref.
      modules[moduleId](module, _our_require_);
      // cache exports of module
      const exports = module.exports;
      installedModules[moduleId] = exports
      // Return exports of module
      return exports;
    }
    // Load entry module via id + return exports
    return _our_require_(0);
  })
  /* Dep tree */
  ([
   ${modules
     .map((dependency, index) => {
       dependency.source.body = dependency.source.body.map((item) => {
         if (item.type === "ImportDeclaration") {
           // replace module imports with ours
           // Replacing ESM import with our function. `const someImport = _ourRequire("{ID}");`
           item = getImport(item, modules);
         }
         if (item.type === "ExportNamedDeclaration") {
           // replaces function name with real exported function
           //Replacing ESM export with our function. `module.exports = someFunction;`
           item = getExport(item);
         }
         return item;
       });
       // template.source(bind)
       //module Template: _ourRequire: import exports
       //buildModuleTemplateString()
       return `
        /* index/id ${index} */
        (function(module, _ourRequire) {
          "use strict";
          ${ast.generate(dependency.source)}//updatedSource
        })
        `;
     })
     .join(",")}
  ]); 
  `;
}
export {
  hydrate
}
