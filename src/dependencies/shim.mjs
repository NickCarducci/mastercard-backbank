import Window from '.'
//https://github.com/nodejs/node/blob/08be585712774904bccbf4a43e481895a641464f/doc/api/modules.md#exports-shortcut
export default function require(/* ... */) {
  const module = { exports: {} };//const is shallow?
  ((module, exports) => {
    //function app() {}
    exports = app;//exports != module.exports && export an empty default object (const, page)
    module.exports = app;//export app != default object (const, page)
  })(module, module.exports);
  return module.exports;
}
//https://stackoverflow.com/a/52351150/11711280
