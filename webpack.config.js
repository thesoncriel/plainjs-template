const path = require('path');

const MAP_NODE_ENV = {
  prod: 'production',
  test: 'production',
  dev: 'development'
};

module.exports = {
  mode: MAP_NODE_ENV[process.env.NODE_ENV],
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['babel-preset-env'],
            cacheDirectory: true,
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
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
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 8080,
    // watchContentBase: true,
    allowedHosts: [
      'purejs.skbt.co.kr'
    ]
  }
};