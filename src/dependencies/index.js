/*const ast = require("abstract-syntax-tree");

module.exports = {
  ast
}
commonUMDable.js
*/
const ast = require("abstract-syntax-tree");

export default function Window(){
  const {parse, generate} = ast
  return {parse, generate}
}

