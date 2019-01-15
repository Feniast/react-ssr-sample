const express = require('express');
const Loadable = require('react-loadable');
const renderApp = require('./renderApp').default;

require('dotenv').config();

const isDev = process.env.NODE_ENV === 'development';

const app = express();

if (isDev) {
  require('./dev')(app);
}

app.use(renderApp);

const port = process.env.PORT || 3000;

/* eslint-disable no-console */
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
