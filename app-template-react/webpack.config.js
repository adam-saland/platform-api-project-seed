const OpenFinAdapter = require("hadouken-js-adapter");

module.exports = {
  entry: "./src",
  output: {
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader"
      }
    ]
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"]
  },
  devServer: {
    contentBase: "./public",
    historyApiFallback: true,
    after: function (app, server) {
      let manifest = `http://localhost:${server.options.port}/app.json`;
      console.log("Launching OpenFin App: ", manifest);
      OpenFinAdapter.launch({ manifestUrl: manifest });
    }
  }
};
