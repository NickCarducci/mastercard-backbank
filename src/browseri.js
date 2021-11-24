import locs from "mastercard-locations";
import places from "mastercard-places";
import crs from "cors";

module.exports = function Browseri() {
    return {
      locs,
      places,
      crs
    }
}
