/* eslint-disable no-console */
const isDev = process.env.NODE_ENV === 'development';
if (isDev) {
  require('./dev/babel-transform');
  require('./dev/purge-cache');
}

const express = require('express');
const Loadable = require('react-loadable');

require('dotenv').config();

const app = express();

if (isDev) {
  require('./dev/configure-app')(app);
}

app.get('*', function (req, res) {
  // must require here to not use cache when in development
  require('./renderApp').default(req, res);
});

const port = process.env.PORT || 3000;

Loadable.preloadAll().then(() => {
  app.listen(port, err => {
    if (err) {
      console.error(err);
      process.exit(1);
      return;
    }
    console.info(`Server running on port ${port}`);
  });
});
