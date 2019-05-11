var webpack = require('webpack');
var path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const endpoints = ['', 'squid', 'ambapo',"marsMapMaker"];
const HtmlWebpackPluginList = [];
for (let endpoint of endpoints) {
  const HtmlWebpackPluginEndpoint = new HtmlWebpackPlugin({
    template: './src/index.html',
    filename: `${endpoint}${endpoint.length > 0 ? '/' : ''}index.html`,
    inject: 'body'
  });
  HtmlWebpackPluginList.push(HtmlWebpackPluginEndpoint);
}

module.exports = {
  entry: ['./src/index.js'],
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ },
      {
        test: /\.scss$/,
        include: path.appSrc,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(jpg|png|svg)$/,
        loader: 'file-loader'
      }
    ]
  },
  resolve: {
    alias: {
      components: path.resolve('./src/components'),
      constants: path.resolve('./src/constants'),
      actions: path.resolve('./src/actions'),
      reducers: path.resolve('./src/reducers'),
      styles: path.resolve('./src/styles'),
      img: path.resolve('./src/img')
    }
  },
  devServer: {
    port: 5000
  },
  plugins: [...HtmlWebpackPluginList]
};
