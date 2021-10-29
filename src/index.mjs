/*import { createRequire } from 'module'
const require = createRequire(import.meta.url);
const Browseri = require("./browserii.js");
*/

/*export class Stripe {
    checkout: typeof checkout
    constructor(
        stripe_secret: string,
        params?: {
            apiVersion?: string
            fetch?: Function
            userAgent?: string
        },
    ) {
        let client = new HTTPClient(
            stripe_secret,
            params?.apiVersion,
            params?.userAgent,
            params?.fetch,
        )
        this.checkout = checkout
        this.checkout.client = client.request
    }
}*/

/**
 * addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with hello worker text
 * @ param {Request} request
 *
async function handleRequest(request) {
  return new Response('Hello worker!', {
    headers: { 'content-type': 'text/plain' },
  })
}

 */

export class DurableObjectExample {
  constructor(el, env) {
    console.log(el.textContent, "- From the example module");
    this.el = el;
    this.el.blockConcurrencyWhile(async () => {
      let stored = await this.el.storage.get("value");
      // After initialization, future reads do not need to access storage.
      this.value = stored || 0;
    });
  }

  async fetch(req, env) {
    const dataHead = {
      "Content-Type": "application/json"
    };

    require.config({
      baseUrl:
        "src" /*,
      paths: {
          "src": "src/index.js"
      },
      waitSeconds: 15*/
    });
    require(["browserii.js"], async (m) => {
      //This function will be called when all the dependencies
      //listed above are loaded. Note that this function could
      //be called before the page is loaded.
      //This callback is optional.
      const { locs, places, crs } = m.Browseri();
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
    });
  }
}
/*addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})*/
