const isDev = process.env.NODE_ENV === 'development';

module.exports = isDev
  ? require('./config.dev')
  : require('./config.prod');