var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  entry: {
    app: ["./src/app.js"]
  },
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
    filename: "app.js"
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
    })
  ],
  mode: 'development'
};
