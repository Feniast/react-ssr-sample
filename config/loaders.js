const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const generateSourceMap = process.env.GENERATE_SOURCEMAP === 'true';
const isDev = process.env.NODE_ENV === 'development';

const cssModuleRegex = /\.module.(css|sass|scss)$/;

const babelLoader = {
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  use: 'babel-loader'
};

const cssModuleLoader = {
  test: cssModuleRegex,
  use: [
    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: {
        importLoaders: 3,
        camelCase: true,
        modules: true,
        sourceMap: generateSourceMap,
        localIdentName: '[name]__[local]--[hash:base64:5]'
      }
    },
    {
      loader: 'postcss-loader',
      options: {
        sourceMap: generateSourceMap
      }
    },
    'resolve-url-loader',
    {
      loader: 'sass-loader',
      options: {
        includePaths: ['./node_modules'],
        sourceMap: generateSourceMap
      }
    }
  ]
};

const cssLoader = {
  test: /\.(css|sass|scss)$/,
  exclude: cssModuleRegex,
  use: [
    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: {
        importLoaders: 3,
        sourceMap: generateSourceMap
      }
    },
    {
      loader: 'postcss-loader',
      options: {
        sourceMap: generateSourceMap
      }
    },
    'resolve-url-loader',
    {
      loader: 'sass-loader',
      options: {
        includePaths: ['./node_modules'],
        sourceMap: generateSourceMap
      }
    }
  ]
};

const imgLoader = {
  test: /\.(png|jpe?g|gif|bmp|svg)$/,
  use: [
    {
      loader: 'url-loader',
      options: {
        limit: 8192
      }
    }
  ]
};

const fontLoader = {
  test: /\.(woff2?|ttf|otf|eot)/,
  use: [
    {
      loader: 'url-loader',
      options: {
        limit: 8192
      }
    }
  ]
};

const clientLoaders = [
  {
    oneOf: [
      babelLoader,
      cssModuleLoader,
      cssLoader,
      imgLoader,
      fontLoader
    ]
  }
];

const cssLoaderServer = {
  ...cssLoader,
  use: 'css-loader/locals' // use client build
};

const cssModuleLoaderServer = {
  ...cssModuleLoader,
  use: 'css-loader/locals' // use client build
};

const imgLoaderServer = {
  test: /\.(png|jpe?g|gif|bmp|svg)$/,
  use: [
    {
      loader: 'url-loader',
      options: {
        limit: 8192,
        emitFile: false // use client build
      }
    }
  ]
};

const fontLoaderServer = {
  test: /\.(woff2?|ttf|otf|eot)/,
  use: [
    {
      loader: 'url-loader',
      options: {
        limit: 8192,
        emitFile: false // use client build
      }
    }
  ]
};

const serverLoaders = [
  {
    oneOf: [
      babelLoader,
      cssModuleLoaderServer,
      cssLoaderServer,
      imgLoaderServer,
      fontLoaderServer
    ]
  }
];

module.exports = {
  clientLoaders,
  serverLoaders
};
