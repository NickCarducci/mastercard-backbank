
const browserify = require("browserify");
const work = require('webworkify');
   var fs = require('fs');
browserify(/*{
    standalone:"window"
  }*/)
    .add("./index.mjs")
    .bundle(function (err) {
      if (err) throw err;
    })
    .pipe(fs.createWriteStream("./indexi.js"));
var w = work(require('./indexi.js'));
