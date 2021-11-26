const browserify = require("browserify");
const fs = require('fs');

browserify({
    standalone:"window"
  })
    .add("./browseri.js")
    .bundle(function (err) {
      if (err) throw err;
    })
    .pipe(fs.createWriteStream("./browserii.js"));
