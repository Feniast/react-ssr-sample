import express from 'express';
import Loadable from 'react-loadable';

const app = express();

const port = process.env.NODE_PORT || 3000;

/* eslint-disable no-console */
Loadable.preloadAll().then(() => {
  app.listen(port, err => {
    if (err) {
      console.error(err);
      process.exit(1);
    } else {
      console.info(
        `Server running on port ${port}`
      );
    }
  })
})
