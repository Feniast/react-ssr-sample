const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const paths = require('./paths');
const loaders = require('./loaders').serverLoaders;

const { stringified } = require('./env')();

module.exports = {
  name: 'server',
  target: 'node',
  devtool: 'source-map',
  entry: {
    main: [`${paths.srcServer}/index.js`]
  },
  externals: [
    nodeExternals({
      whitelist: [
        // non-javascript files in node_modules should go to the bundle and be processed by ExtractTextPlugin
        /\.(?!(?:jsx?|json)$).{1,5}$/i
      ]
    })
  ],
  output: {
    path: paths.serverBuild,
    filename: 'server.js',
    publicPath: paths.publicPath,
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: loaders
  },
  plugins: [
    new webpack.DefinePlugin(stringified),
    new webpack.DefinePlugin({
      __SERVER__: 'true',
      __CLIENT__: 'false'
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ]
};
