//import manifest from "./build/manifest.json";
//https://github.com/craigtaub/our-own-webpack/blob/master/compiler/index.mjs
import fs from "fs";
import crypto from "crypto";
import path from "path";
import Window as ast from ".././commonUMDisModule.js";//"abstract-syntax-tree";
/*import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);*/

const depsArray = [];

const depsGraph = (file) => {
  var fullPath = null;
  if (file.substring(file.length - 3, file.length) === ".js") {
    fullPath = path.resolve("./src/", file);
    console.log("processing: ", fullPath);
  } else {
    fullPath = path.resolve("./node_modules/", file); //`${file}/src/index.js`);
    console.log("processing: ", fullPath);
    var stats = fs.statSync(fullPath);
    if (stats.isDirectory())
      return fs.readdir(fullPath, (err, files) => {
        console.log(files);
      });
  }

  // return early if exists
  if (!!depsArray.find((item) => item.name === fullPath)) return;

  // store path + parsed source as module
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const source = ast.parse(fileContents);
  const module = {
    name: fullPath,
    source
  };

  // Add module to deps array
  depsArray.push(module);

  // process deps
  source.body.forEach((current) => {
    if (current.type === "ImportDeclaration") {
      // process module for each dep.
      depsGraph(current.source.value);
    }
  });

  return depsArray;
};
// Traverse deps graph
const entry = "./browseri.js"; // move to config or cli
const da = depsGraph(entry);
const buildModuleTemplateString = (moduleCode, index) => `
/* index/id ${index} */
(function(module, _ourRequire) {
  "use strict";
  ${moduleCode}
})
`;

const buildRuntimeTemplateString = (allModules) => `
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
 ${allModules}
]); 
`;

const getImport = (item, allDeps) => {
  // get variable we import onto
  console.log(item.specifiers[0]);
  const importFunctionName = item.specifiers[0].local
    ? item.specifiers[0].local.name
    : item.specifiers[0].imported.name;
  // get files full path and find index in deps array.
  const fullFile = path.resolve("./src/", item.source.value);
  const itemId = allDeps.findIndex((item) => item.name === fullFile);

  return {
    type: "VariableDeclaration",
    kind: "const",
    declarations: [
      {
        type: "VariableDeclarator",
        init: {
          type: "CallExpression",
          callee: {
            type: "Identifier",
            name: "_ourRequire"
          },
          arguments: [
            {
              type: "Literal",
              value: itemId
            }
          ]
        },
        id: {
          type: "Identifier",
          name: importFunctionName
        }
      }
    ]
  };
};

const getExport = (item) => {
  // get export functions name
  const moduleName = item.specifiers[0].exported.name;
  return {
    type: "ExpressionStatement",
    expression: {
      type: "AssignmentExpression",
      left: {
        type: "MemberExpression",
        object: { type: "Identifier", name: "module" },
        computed: false,
        property: { type: "Identifier", name: "exports" }
      },
      operator: "=",
      right: { type: "Identifier", name: moduleName }
    }
  };
};

const transform = (depsArray) => {
  const updatedModules = depsArray.reduce((acc, dependency, index) => {
    const updatedAst = dependency.source.body.map((item) => {
      if (item.type === "ImportDeclaration") {
        // replace module imports with ours
        item = getImport(item, depsArray); // Replacing ESM import with our function. `const someImport = _ourRequire("{ID}");`
      }
      if (item.type === "ExportNamedDeclaration") {
        // replaces function name with real exported function
        item = getExport(item); //Replacing ESM export with our function. `module.exports = someFunction;`
      }
      return item;
    });
    dependency.source.body = updatedAst;
    // Turn AST back into string
    const updatedSource = ast.generate(dependency.source);
    // Bind module source to module template
    const updatedTemplate = buildModuleTemplateString(updatedSource, index);
    //Template to be used for each module. module: load exports onto _ourRequire: import system
    acc.push(updatedTemplate);
    return acc;
  }, []);
  // Add all modules to bundle
  const bundleString = buildRuntimeTemplateString(updatedModules.join(",")); // Our main template containing the bundles runtime.
  return bundleString;
};

export class DurableObjectExample {
  constructor(el, env) {
    console.log(el.textContent, "- From the example module");
    this.el = el;
    this.env = env;
    this.el.blockConcurrencyWhile(async () => {
      let stored = await this.el.storage.get("esm");
      // After initialization, future reads do not need to access storage.
      this.value = stored || 0;

      const vendorString = transform(da); // Take depsArray and return bundle string
      const sum = crypto.createHash("md5"); // create hash
      sum.update(vendorString);
      const hash = sum.digest("hex");
      this.el.storage.put("esm", hash); // write hash to manifest //import manifest from "./build/manifest.json";
      /*fs.writeFileSync(
        `${__dirname}/build/common-${hash}.js`,
        vendorString,
        "utf8"
      ); // write contents to bundle
      fs.writeFileSync(
        `${__dirname}/build/manifest.json`,
        `{"default": "common-${hash}.js"}`,
        "utf8"
      );*/ //`${manifest.default}`
      console.log("FINISHED :)");
    });
  }

  async fetch(req, env) {
    const dataHead = {
      "Content-Type": "application/json"
    };
    if (!this.value) {
      //this.modules) {
      return new Response(
        {},
        {
          status: "400",
          message: "not ready for use",
          headers: dataHead
        }
      );
    } else {
      const { locs, places, crs } = this.value.default(); //Window() //this.modules; //Window.sourcesContent();

      var iMCard = null,
        mc = null;
      const initializeMCard = () => {
        if (!iMCard) {
          console.log("initializing mastercard api");
          mc = locs.MasterCardAPI;
          iMCard = true;
          mc.init({
            sandbox: secrets.NODE_ENV !== "production",
            authentication: new mc.OAuth(
              secrets.MASTERCARD_CONSUMER_KEY,
              Buffer.from(secrets.MASTERCARD_P12_BINARY, "base64"),
              "keyalias",
              "keystorepassword"
            )
          });
        }
      };
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
      const cors = crs({
        origin: true,
        allowedHeaders: [
          "Access-Control-Allow-Origin",
          "Access-Control-Allow-Methods",
          "Content-Type",
          "Origin",
          "X-Requested-With",
          "Accept"
        ],
        methods: ["POST", "OPTIONS"],
        credentials: true
      });
      //return async handleRequest(request)async (req) => {
      var origin = req.get("Origin");
      var allowedOrigins = ["https://vau.money", "https://jwi5k.csb.app"];
      if (allowedOrigins.indexOf(origin) > -1) {
        // Origin Allowed!!
        if (req.method === "OPTIONS") {
          // Method accepted for next request
          return new Response(
            {},
            {
              status: "200",
              statusText:
                "successful header check for POST process: " + req.url,
              headers: {
                ...dataHead,
                "Access-Control-Allow-Methods": "POST"
              }
            }
          );
        } else {
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

            return new Response(
              {
                data: rs
              },
              {
                status: "200",
                message: "success: " + req.url,
                headers: dataHead
              }
            );
          } else {
            return new Response(
              {},
              {
                status: "500",
                message: "no success doof: " + req.url,
                headers: dataHead
              }
            );
          }
        }
      } else
        return new Response(
          {},
          {
            status: "400",
            message: "no access for this origin: " + origin,
            headers: dataHead
          }
        );
    }
  }
}
