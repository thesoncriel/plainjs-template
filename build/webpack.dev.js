process.env.NODE_ENV = 'development';

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const config = require('../config');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
  },
  devServer: {
    contentBase: 'dev-server-dist',
    hot: true,
    compress: true,
    port: config.port,
    // open: 'http://localhost:8080',
    // watchContentBase: true,
    allowedHosts: []
  },
  plugins: [
    new CleanWebpackPlugin(['dev-server-dist'], { beforeEmit: true }),
    new MiniCssExtractPlugin({
      filename: 'app.[hash].css',
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      inject: true,
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: 'static',
        ignore: ['^.*']
      }
    ]),
    new webpack.HotModuleReplacementPlugin(),
  ]
});
