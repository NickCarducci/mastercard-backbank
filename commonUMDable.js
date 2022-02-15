/*const ast = require("abstract-syntax-tree");

module.exports = {
  ast
}*/
import ast from "abstract-syntax-tree";

export default function Window(){
  const {parse, generate} = ast
  return {parse, generate}
}

