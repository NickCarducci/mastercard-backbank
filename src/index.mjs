export class DurableObjectExample {
  constructor(el, env) {
    console.log(JSON.stringify(el), "- From the example module"); //el.textContent
    this.el = el;
    this.env = env;
    /*const locs = require("mastercard-locations");
      const places = require("mastercard-places");
      const crs = require("cors"); */
    this.el.blockConcurrencyWhile(async () => {
      let stored = await this.el.storage.get("esm"); //Read requests	100,000 / day, ($free)
      // After initialization, future reads do not need to access storage.
      this.value = stored || 0;
      //this.require = require;

      //fn.apply(this, [locs,places,crs])
      //this.value = {locs,places,crs}//Window;

      /* rollup(manifest)
        .then(async (bundle) => {
          console.log(Object.keys(bundle), " is bundle");
          pages.forEach(async (output) => await bundle.write(output));
        this.value = bundle
         // return hydrate(bundle)
        })
        .catch((err) => console.log("rollup.rollup error", err.message));*/
      //this.el.storage.put("esm", product);
    });
  }

  async fetch(req, env, makeRequire) {
    const dataHead = {
      "Content-Type": "application/json"
    };
    if (!this.value) {
      //this.modules) {
      return new Response(`{}`, {
        status: "400",
        message: "not ready for use",
        statusText: "still retrieving {Key: Value} storage: " + req.url,
        headers: dataHead
      });
    } else {
      const require = await makeRequire(req, env);
      if (require) {
        const locs = require("mastercard-locations");
        const places = require("mastercard-places");
        const crs = require("cors");
        //const { locs, places, crs } = this//.value//.default(); //Window() //this.modules; //Window.sourcesContent();

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
            return new Response(`{}`, {
              status: "200",
              message: "not ready for use",
              statusText:
                "successful header check for POST process: " + req.url,
              headers: {
                ...dataHead,
                "Access-Control-Allow-Methods": "POST"
              }
            });
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
                `{
                  data: ${rs}
                }`,
                {
                  status: "200",
                  message: "success: " + req.url,
                  headers: dataHead
                }
              );
            } else {
              return new Response(`{}`, {
                status: "500",
                message: "no success doof: " + req.url,
                headers: dataHead
              });
            }
          }
        } else
          return new Response(`{}`, {
            status: "400",
            message: "no access for this origin: " + origin,
            headers: dataHead
          });
      } else
        return new Response(`{}`, {
          status: "400",
          message: "not ready for use",
          statusText: "this.require not ready for: " + req.url,
          headers: {
            ...dataHead,
            "Access-Control-Allow-Methods": "POST"
          }
        });
    }
  }
}
