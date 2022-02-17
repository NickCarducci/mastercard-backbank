import * as locs from "mastercard-locations";
import * as places from "mastercard-places";
import * as crs from "cors"; 

export default function Window() {
    return {
      locs,
      places,
      crs
    }
}
