const webpack = require('webpack');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
const baseConfig = require('./webpack.client.base');
const merge = require('webpack-merge');

const config = merge.smartStrategy(
  {
    entry: 'prepend'
  }
)({}, baseConfig, {
  entry: {
    main: ['webpack-hot-middleware/client?path=/__webpack_hmr&reload=true']
  },
  mode: 'development',
  devtool: 'cheap-module-source-map',
  plugins: [
    new CaseSensitivePathsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new ErrorOverlayPlugin()
  ]
});

module.exports = config;