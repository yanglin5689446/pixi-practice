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
      SERVER: "'wss://js-final-2018-backend.herokuapp.com'",
    })
  ],
  mode: 'production'
};
