/*const ast = require("abstract-syntax-tree");

module.exports = {
  ast
}*/
import {parse, generate} from "abstract-syntax-tree";

export default function Window(){
  return {parse, generate}
}

