const baseConfig = require('./webpack.server.base');
const merge = require('webpack-merge');

const config = merge({}, baseConfig, {
  mode: 'production'
});

module.exports = config;
