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
  devServer: {
    contentBase: path.join(__dirname, "src"),
    compress: true,
    port: 9000
  },
  plugins: [ 
    new HtmlWebpackPlugin({
        template: 'src/index.html',
        inject: 'body'
    }),
    new webpack.DefinePlugin({
      SERVER: "'ws://localhost:30000'",
    })
  ],
  mode: 'development'
};
