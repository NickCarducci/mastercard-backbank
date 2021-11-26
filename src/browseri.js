const locs = require("mastercard-locations");
const places = require("mastercard-places");
const crs = require("cors");

module.exports = function Window() {
    return {
      locs,
      places,
      crs
    }
}
