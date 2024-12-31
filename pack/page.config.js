const path = require("path");

module.exports = [
  {
    key: "index",
    title: "Index Page",
    chunks: ["index"],
    filename: "index.html",
    template: path.resolve(__dirname, "../src/views/index.html"),
    entry: path.resolve(__dirname, "../src/views/index.tsx"),
  },
  {
    key: "translate",
    title: "translate Page",
    chunks: ["translate"],
    filename: "translate.html",
    template: path.resolve(__dirname, "../src/views/index.html"),
    entry: path.join(__dirname, "../src/views/translate/index.tsx"),
  },
  {
    key: "aes",
    title: "aes Page",
    chunks: ["aes"],
    filename: "aes.html",
    template: path.resolve(__dirname, "../src/views/index.html"),
    entry: path.join(__dirname, "../src/views/aes/index.tsx"),
  },
  {
    key: "json2ts",
    title: "json to ts",
    chunks: ["json2ts"],
    filename: "json2ts.html",
    template: path.resolve(__dirname, "../src/views/index.html"),
    entry: path.join(__dirname, "../src/views/json2ts/index.tsx"),
  },
];
