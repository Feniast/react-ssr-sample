/* eslint-disable no-console */
const webpack = require('webpack');
const nodemon = require('nodemon');
const rimraf = require('rimraf');
const { log, commonWebpackHandler } = require('./utils');
const paths = require('../config/paths');
const serverConfig = require('../config/webpack.server.dev');

const startServer = () => {
  const serverNodemon = nodemon({
    watch: paths.serverBuild,
    script: `${paths.serverBuild}/server.js`
  });

  serverNodemon.on('restart', () => {
    log.warn('Server side app has been restarted.');
  });

  serverNodemon.on('quit', () => {
    log('Process ended');
    process.exit();
  });

  serverNodemon.on('error', () => {
    log.error('An error occured. Exiting');
    process.exit(1);
  });

  return serverNodemon;
}

const start = async () => {
  rimraf.sync(paths.build);

  const serverCompiler = webpack(serverConfig);

  let serverBuildHash = '';
  let serverProcess = null;
  const serverWatching = serverCompiler.watch(
    {
      ignored: /node_modules/
    },
    (err, stats) => {
      if (serverBuildHash === stats.hash) {
        return;
      }
      serverBuildHash = stats.hash;
      const serverBuildResult = commonWebpackHandler(err, stats);
      if (!serverBuildResult) return;
      if (serverProcess != null) return;
      serverProcess = startServer();
    }
  );

  ['SIGINT', 'SIGTERM'].forEach(function(sig) {
    process.on(sig, function() {
      serverWatching.close();
      process.exit();
    });
  });
};

start();
