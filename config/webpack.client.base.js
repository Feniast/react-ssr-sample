const webpack = require('webpack');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ReactLoadableSSRAddon = require('react-loadable-ssr-addon');
const ManifestPlugin = require('webpack-manifest-plugin');
const paths = require('./paths');
const { stringified } = require('./env')();
const loaders = require('./loaders').clientLoaders;

const isEnvProduction = process.env.NODE_ENV === 'production';

const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP === 'true';

const ensureSlash = (inputPath, needsSlash) => {
  const hasSlash = inputPath.endsWith('/');
  if (hasSlash && !needsSlash) {
    return inputPath.substr(0, inputPath.length - 1);
  } else if (!hasSlash && needsSlash) {
    return `${inputPath}/`;
  } else {
    return inputPath;
  }
};

// fix "Cannot read property 'integrity' of undefined" after chunk change 
(function patchReactLoadableSSRAddon() {
  const _getAssets = ReactLoadableSSRAddon.prototype.getAssets;
  ReactLoadableSSRAddon.prototype.getAssets = function(...args) {
    this.assetsByName.clear();
    _getAssets.apply(this, args);
  }
})();

module.exports = {
  name: 'client',
  target: 'web',
  entry: {
    main: [`${paths.srcClient}/index.js`]
  },
  output: {
    path: paths.clientBuild,
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js',
    publicPath: ensureSlash(paths.publicPath, true)
  },
  module: {
    rules: loaders
  },
  plugins: [
    new webpack.DefinePlugin(stringified),
    new webpack.DefinePlugin({
      __SERVER__: 'false',
      __CLIENT__: 'true'
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new ReactLoadableSSRAddon({
      filename: `${paths.build}/react-loadable-ssr-addon.json`,
    }),
    new ManifestPlugin({
      fileName: `${paths.build}/asset-manifest.json`,
      writeToFileEmit: true
    })
  ],
  optimization: {
    minimize: isEnvProduction,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          parse: {
            ecma: 8
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2
          },
          mangle: {
            safari10: true
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true
          }
        },
        parallel: true,
        cache: true,
        sourceMap: shouldUseSourceMap
      }),
      new OptimizeCSSAssetsPlugin()
    ],
    splitChunks: {
      chunks: 'all',
      name: false
    },
    runtimeChunk: true
  },
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
};
