const webpack = require('webpack');
const nodemon = require('nodemon');
const rimraf = require('rimraf');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const express = require('express');
const paths = require('../config/paths');
// const { logMessage, compilerPromise } = require('./utils');
const clientConfig = require('../config/webpack.client.dev');
const serverConfig = require('../config/webpack.server.dev');

const start = async () => {
  const app = express();
  const port = process.env.DEV_PORT || 4000;

  const webpackCompiler = webpack([clientConfig, serverConfig]);

  const clientCompiler = webpackCompiler.compilers.find((compiler) => compiler.name === 'client');
  const serverCompiler = webpackCompiler.compilers.find((compiler) => compiler.name === 'server');
  
  app.use(webpackDevMiddleware(clientCompiler, {
    hot: true,
    publicPath: clientConfig.output.publicPath,
    progress: true,
    stats: {
      colors: true,
      assets: true,
      chunks: false,
      modules: false,
      hash: false
    }
  }));

  app.use(webpackHotMiddleware(clientCompiler), {
    path: '/__webpack_hmr'
  });

  app.use(paths.publicPath, express.static(paths.clientBuild));

}

start();
