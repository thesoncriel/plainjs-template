const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    hot: true,
    compress: true,
    port: 8080,
    // watchContentBase: true,
    allowedHosts: [
      'purejs.skbt.co.kr'
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], { beforeEmit: true }),
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
