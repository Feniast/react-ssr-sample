/* eslint-disable no-console */
const webpack = require('webpack');
const rimraf = require('rimraf');
const { commonWebpackHandler } = require('./utils');
const paths = require('../config/paths');
const serverConfig = require('../config/webpack.server.prod');
const clientConfig = require('../config/webpack.client.prod');

const start = async () => {
  rimraf.sync(paths.build);

  const clientCompiler = webpack(clientConfig);
  const serverCompiler = webpack(serverConfig);

  clientCompiler.run((err, stats) => {
    const result = commonWebpackHandler(err, stats);
    if (!result) return;
    serverCompiler.run((err, stats) => {
      commonWebpackHandler(err, stats);
    });
  });
};

start();
