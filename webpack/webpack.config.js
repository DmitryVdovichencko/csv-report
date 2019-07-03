const path = require('path');
const loaders = require('./loaders');

module.exports = {
  entry: ["./src/js/app.js"],
  module: {
    rules: [
      loaders.JSLoader,
      loaders.ESLintLoader
    ]
  },
  output: {
    path: path.resolve(__dirname, "../build"),
    filename: "js/[name].bundle.js"
  },
};