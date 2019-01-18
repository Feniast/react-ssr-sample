const webpack = require('webpack');
const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const paths = require('../../../config/paths');
const clientWebpackConfig = require('../../../config/webpack.client.dev');

// some dirty work here
// of course, this kind of things should not be used in production env
const configureApp = (app) => {
  if (app == null) return;
  const compiler = webpack(clientWebpackConfig);
  const publicPath = clientWebpackConfig.output.publicPath;
  app.use(
    webpackDevMiddleware(compiler, {
      hot: true,
      publicPath,
      progress: true,
      stats: {
        colors: true,
        assets: true,
        chunks: false,
        modules: false,
        hash: false
      }
    })
  );

  app.use(
    webpackHotMiddleware(compiler, {
      path: '/__webpack_hmr',
      heartbeat: 4000
    })
  );

  app.use(publicPath, express.static(paths.clientBuild));
};

module.exports = configureApp;
