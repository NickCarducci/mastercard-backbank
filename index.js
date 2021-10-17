import locs from "mastercard-locations";
import places from "mastercard-places";

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

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
    } = req.query;
    rs = await locs.ATMLocations.query(
      {
        PageLength,
        PostalCode,
        PageOffset
      },
      cb
    );
  } else if (func === "getMerchants") {
    const { countryCode, latitude, longitude, distance } = req.query;
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

const handleRequest = async (event, context, callback) => {
  var event = JSON.parse(event);
  const dataHead = {
    "Content-Type": "application/json"
  };
  if (event.pathParameters === "/deposit") {
    rs = await mastercardRoute(req, "getAtms");
  } else if (event.pathParameters === "/merchant_names") {
    rs = await mastercardRoute(req, "getNames");
  } else if (event.pathParameters === "/merchant_types") {
    rs = await mastercardRoute(req, "getTypes");
  } else if (event.pathParameters === "/merchants") {
    rs = await mastercardRoute(req, "getMerchants");
  }
  if (rs) {
    var response = {
      //isBase64Encoded: false,
      //statusCode: '200',
      headers: dataHead,
      //body: content
    };

    return new Response({
      status: "200",
      message: "success: " + event.pathParameters,
      data: rs
    }, response)
  } else {
    return new Response({
      status: "500",
      message: "no success doof: " + event.pathParameters
    })
  }
}
