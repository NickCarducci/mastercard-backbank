const locs = require("mastercard-locations");
const places = require("mastercard-places");
const crs = require("cors");

export default function Browseri() {
    return {
      locs,
      places,
      crs
    }
  }

