const webpack = require('webpack');
const { ReactLoadablePlugin } = require('react-loadable/webpack');
const nodeExternals = require('webpack-node-externals');
const paths = require('./paths');
const loaders = require('./loaders').serverLoaders;

const { stringified } = require('./env')();

module.exports = {
  name: 'server',
  target: 'node',
  entry: [`${paths.srcServer}/index.js`],
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
    publicPath: paths.publicPath
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
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new ReactLoadablePlugin({
      filename: `build/react-loadable.json` // could not resursive mkdir here because of the plugin code not passing the option, so just use the 'build' dir
    })
  ]
};
