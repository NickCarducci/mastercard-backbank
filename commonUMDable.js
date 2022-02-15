/*const ast = require("abstract-syntax-tree");

module.exports = {
  ast
}*/
const ast = require("abstract-syntax-tree");

export default function Window(){
  const {parse, generate} = ast
  return {parse, generate}
}

