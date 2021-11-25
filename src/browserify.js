const browserify = require("browserify");

module.exports = function Browseri() {
  return browserify()
    .add("./browseri.js")
    .bundle(function (err) {
      if (err) throw err;
    })
    .pipe(fs.createWriteStream("./browserii.js"));
}
