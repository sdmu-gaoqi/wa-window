const path = require("path");
const pageConfig = require("./page.config");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const entry = Object.fromEntries(pageConfig.map((i) => [i?.key, i?.entry]));
const htmls = pageConfig?.map(
  (i) =>
    new HtmlWebpackPlugin({
      title: i?.title,
      chunks: i?.chunks,
      filename: i?.filename,
      template:
        i?.template || path.resolve(__dirname, "../src/views/index.html"),
    })
);

module.exports = {
  entry, // 入口文件
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
  plugins: [...htmls],
  optimization: {
    realContentHash: true,
  },
};
