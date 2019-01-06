const NODE_ENV = process.env.NODE_ENV;
let config = null;

if (NODE_ENV === 'production') {
  config = require('./config.prod');
} else if (NODE_ENV === 'test-production') {
  config = require('./config.test');
} else {
  config = require('./config.dev');
}

module.exports = config;
