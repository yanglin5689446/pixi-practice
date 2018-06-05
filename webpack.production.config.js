var webpack = require('webpack');
var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  entry: {
    main: ["./src/main.js"]
  },
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
    filename: "main.js"
  },
  plugins: [ 
    new HtmlWebpackPlugin({
        template: 'src/index.html',
        inject: 'body'
    }),
    new webpack.DefinePlugin({
      SERVER: "'ws://140.113.67.102:30000'",
    })
  ],
  mode: 'production'
};
