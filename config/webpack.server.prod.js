const baseConfig = require('./webpack.server.base');
const merge = require('webpack-merge');

const config = merge({}, baseConfig, {
  mode: 'production',
  optimization: {
    minimize: false
  }
});

module.exports = config;
