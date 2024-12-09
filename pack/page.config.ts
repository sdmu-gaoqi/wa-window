import path from "path";

export const pageConfig = [
  {
    title: "Index Page",
    chunks: ["index"],
    filename: "index.html",
    template: path.resolve(__dirname, "../src/views/index.html"),
    entry: path.resolve(__dirname, "../src/views/index.tsx"),
  },
  {
    title: "translate Page",
    chunks: ["translate"],
    filename: "translate.html",
    template: path.resolve(__dirname, "../src/views/index.html"),
    entry: path.join(__dirname, "../src/views/translate/index.tsx"),
  },
  {
    title: "aes Page",
    chunks: ["aes"],
    filename: "aes.html",
    template: path.resolve(__dirname, "../src/views/index.html"),
  },
];
