const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  // entry: {
  //   app: ['./src/polyfills/index.js'],
  //   // style: './src/styles/app.scss'
  // },
  entry: ['./src/polyfills/index.js', './src/app.js', './src/styles/app.scss'],
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'app.[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|style)/,
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
        test: /\.(scss|css)$/,
        exclude: /(node_modules)/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: devMode,
            }
          }
        ]
      }
    ]
  },
};