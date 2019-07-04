const path = require('path');
const loaders = require('./loaders');
const plugins = require('./plugins');

module.exports = {
  entry: ["./src/js/app.js"],
  module: {
    rules: [
      loaders.CSSLoader,
      loaders.JSLoader,
      loaders.ESLintLoader
    ]
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].bundle.js"
  },
  plugins: [
    plugins.MiniCssExtractPlugin,
  ],
};