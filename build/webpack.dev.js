const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const config = require('../config');

const virtualBackendApiPrefix = config.VIRTUAL_BACKEND_API_PREFIX;
const proxy = {};
const proxyV2 = {
  target: 'http://localhost:' + config.VIRTUAL_BACKEND_PORT + virtualBackendApiPrefix,
  changeOrigin: true,
  pathRewrite: {
    '^/testapi': '',
  }
};

proxyV2.pathRewrite['^' + virtualBackendApiPrefix] = '';
proxy[config.REAL_BACKEND_API_PREFIX] = proxyV2;

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
  },
  devServer: {
    contentBase: './src',
    watchContentBase: true,
    hot: true,
    compress: true,
    port: config.PORT,
    // open: 'http://localhost:8080',
    // watchContentBase: true,
    
    disableHostCheck: true,
    proxy,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config
    }),
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
