const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const paths = require('./paths');
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
    oneOf: [babelLoader, cssModuleLoader, cssLoader, imgLoader, fontLoader]
  }
];

const babelLoaderServer = {
  test: /\.(js|jsx)$/,
  include: [paths.src],
  use: [
    {
      loader: 'babel-loader',
      options: {
        presets: [
          [
            '@babel/preset-env',
          ],
          '@babel/preset-react'
        ],
        plugins: [
          'react-loadable/babel',
          '@babel/plugin-proposal-class-properties',
          '@babel/plugin-proposal-object-rest-spread',
          'dynamic-import-node'
        ]
      }
    }
  ]
};

const cssLoaderServer = {
  test: /\.(css|sass|scss)$/,
  exclude: cssModuleRegex,
  use: 'null-loader'
};

const cssModuleLoaderServer = {
  test: cssModuleRegex,
  use: [
    {
      loader: 'css-loader',
      options: {
        importLoaders: 1,
        camelCase: true,
        modules: true,
        localIdentName: '[name]__[local]--[hash:base64:5]',
        exportOnlyLocals: true // used in server-side, support by css-loader v2
      }
    },
    {
      loader: 'sass-loader',
      options: {
        includePaths: ['./node_modules']
      }
    }
  ]
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
      babelLoaderServer,
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
