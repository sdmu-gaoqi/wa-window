const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    index: path.join(__dirname, "../src/views/index.tsx"),
    translate: path.join(__dirname, "../src/views/translate/index.tsx"),
    aes: path.join(__dirname, "../src/views/aes/index.tsx"),
  }, // 入口文件
  output: {
    filename: "static/js/[name].js",
    // path: path.join(__dirname, "./dist"),
    path: path.join(__dirname, "../dist"),
    clean: true,
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /.(ts|tsx)$/, // 匹配.ts, tsx文件
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react", "@babel/preset-typescript"],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".tsx", ".ts"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Index Page",
      chunks: ["index"],
      filename: "index.html",
      template: path.resolve(__dirname, "../src/views/index.html"),
    }),
    new HtmlWebpackPlugin({
      title: "My Album Page",
      text: "一个标题",
      filename: "translate.html",
      template: path.resolve(__dirname, "../src/views/index.html"),
      chunks: ["translate"],
    }),
    new HtmlWebpackPlugin({
      title: "My Album Page",
      text: "一个标题",
      filename: "aes.html",
      template: path.resolve(__dirname, "../src/views/index.html"),
      chunks: ["aes"],
    }),
  ],
  optimization: {
    realContentHash: true,
  },
};
