const webpack = require('webpack');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { ReactLoadablePlugin } = require('react-loadable/webpack');
const ManifestPlugin = require('webpack-manifest-plugin');
const paths = require('./paths');
const { raw, stringified } = require('./env')();
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
    publicPath: ensureSlash(raw.PUBLIC_URL, true)
  },
  module: {
    rules: loaders
  },
  plugins: [
    new webpack.DefinePlugin(stringified),
    new webpack.DefinePlugin({
      '__SERVER__': 'false',
      '__CLIENT__': 'true'
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new ReactLoadablePlugin({
      filename: `build/react-loadable.json` // could not resursive mkdir because of the plugin code
    }),
    new ManifestPlugin({ fileName: `${paths.build}/asset-manifest.json` })
  ],
  optimization: {
    minimize: isEnvProduction,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          parse: {
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2,
          },
          mangle: {
            safari10: true,
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true,
          },
        },
        parallel: true,
        cache: true,
        sourceMap: shouldUseSourceMap,
      }),
      new OptimizeCSSAssetsPlugin(),
    ],
    splitChunks: {
      chunks: 'all',
      name: false,
    },
    runtimeChunk: true,
  },
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  }
}
