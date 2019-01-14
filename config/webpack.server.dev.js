const webpack = require('webpack');
const baseConfig = require('./webpack.server.base');
const merge = require('webpack-merge');

const config = merge({}, baseConfig, {
  mode: 'development',
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
});

module.exports = config;