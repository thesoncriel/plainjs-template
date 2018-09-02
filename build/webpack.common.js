const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== 'production';

const contentHash = new Date().getTime() || 7690832509623;

module.exports = {
  entry: {
    app: ['./src/polyfills/index.js', './src/app.js'],
    style: './src/styles/app.scss'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: `[name].bundle.${contentHash}.js`
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: [
              "@babel/preset-env"
            ],
            plugins: [
              "@babel/plugin-transform-runtime"
            ]
          }
        }
      },
      {
        test: /\.(scss|css)$/i,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            }
          }
        ]
      }
    ]
  },
};