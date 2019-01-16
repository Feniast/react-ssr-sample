const webpack = require('webpack');
const baseConfig = require('./webpack.client.base');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP === 'true';

const config = merge({}, baseConfig, {
  mode: 'production',
  devtool: shouldUseSourceMap ? 'source-map' : false,
  output: {
    filename: '[name].[chunkhash:8].js',
    chunkFilename: '[name].[chunkhash:8].chunk.js'
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css',
      chunkFilename: '[name].[contenthash:8].chunk.css',
    }),
    new webpack.HashedModuleIdsPlugin()
  ]
});

module.exports = config;
