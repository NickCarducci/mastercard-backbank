//import Window from '.'
export { Window } from "./index.mjs";

export default {
  async fetch(request, env/*, ctx*/) {
    //Response class must be a promise
    try {
      const module = { exports: {} };//const is shallow?
      ((module, exports, app) => {
        /*function app() {
          locs,places,crs
        }*/
        const app = {...Window//locs,places,crs}
        exports = app; //exports != module.exports && export an empty default object (const, page)
        module.exports = app; //export app != default object (const, page)
      })(module, module.exports, app);
      return module.exports;
    } catch (e) {
      console.log(e.message);
      return new Response(e.message);
    }
  }
};
/*import * as locs from "mastercard-locations";
import * as places from "mastercard-places";
import * as crs from "cors";*/
//https://github.com/nodejs/node/blob/08be585712774904bccbf4a43e481895a641464f/doc/api/modules.md#exports-shortcut
//https://stackoverflow.com/a/52351150/11711280
