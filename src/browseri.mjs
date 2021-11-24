const locs = require("mastercard-locations");
const places = require("mastercard-places");
const crs = require("cors");

module.exports = function Browseri() {
    return {
      locs,
      places,
      crs
    }
}
