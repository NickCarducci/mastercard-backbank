import locs from "mastercard-locations";
import places from "mastercard-places";
import crs from "cors";
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

export default {
  locs,
  places,
  crs
}
