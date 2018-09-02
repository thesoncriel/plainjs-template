const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== 'production';

console.log('devMode', devMode);

const contentHash = new Date().getTime() || 7690832509623;

function recursiveIssuer(m) {
  if (m.issuer) {
    return recursiveIssuer(m.issuer);
  } else if (m.name) {
    return m.name;
  } else {
    return false;
  }
}

module.exports = {
  // entry: {
  //   app: ['./src/polyfills/index.js'],
  //   // style: './src/styles/app.scss'
  // },
  entry: ['./src/polyfills/index.js', './src/app.js', './src/styles/app.scss'],
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'app.[hash].js'
    // filename: `[name].bundle.${contentHash}.js`
  },
  // optimization: {
  //   splitChunks: {
  //     chunks: 'all',
  //     name: true,
  //     cacheGroups: {
  //       appScripts: {
  //         name: 'app',
  //         test: (m,c,entry = 'app') => {
  //           console.log(m.constructor.name, recursiveIssuer(m));

  //           return m.constructor.name === 'NormalModule' && recursiveIssuer(m) === entry
  //         },
  //         // test: /\.js$/,
  //         chunks: 'all',
  //         enforce: true,
  //       },
  //       appStyles: {
  //         name: 'style',
  //         test: (m,c,entry = 'style') => {
  //           // console.log(m.constructor.name, m);
  //           return m.constructor.name === 'CssModule';// && recursiveIssuer(m) === false;
  //         },
  //         // test: /\.(scss|css)$/,
  //         reuseExistingChunk: true,
  //         chunks: 'all',
  //         enforce: true,
  //       }
  //     }
  //   }
  // },
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
        // include: /style/,
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