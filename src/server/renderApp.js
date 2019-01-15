import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import Loadable from 'react-loadable';
import { matchRoutes } from 'react-router-config';
import Helmet from 'react-helmet';
import { getBundles } from 'react-loadable/webpack';

import App from '../shared/App';
import routes from '../shared/routes';
import configureStore from '../shared/store';
import renderHTML from './renderHtml';

const { fileContentWatcher } = require('./utils'); 

const reactLoadableStatsPath =
  process.env.LOADABLE_STATS ||
  `${require('path').resolve(process.cwd(), './build/react-loadable.json')}`;

const getStats = fileContentWatcher(reactLoadableStatsPath, JSON.parse, { 
  once: process.env.NODE_ENV !== 'development'
});

const fetchData = (store, pathname) => {
  const branch = matchRoutes(routes, pathname);

  const promises = branch.map(({ route, match }) => {
    const fetchData = route.component.fetchData;
    return fetchData ? fetchData(store, match) : Promise.resolve(null);
  });

  return Promise.all(promises);
};

const handleRequest = (req, res, store) => {
  const context = {};
  const modules = [];

  const markup = ReactDOMServer.renderToString(
    <Loadable.Capture report={moduleName => modules.push(moduleName)}>
      <Provider store={store}>
        <StaticRouter location={req.url} context={context}>
          <App />
        </StaticRouter>
      </Provider>
    </Loadable.Capture>
  );

  if (context.status) {
    res.status(context.status);
  } else {
    res.status(200);
  }

  if (context.url) {
    res.redirect(context.url);
  } else {
    const helmetData = Helmet.renderStatic();
    const bundles = getBundles(getStats(), modules);
    const html = renderHTML({
      state: store.getState(),
      markup,
      helmet: helmetData,
      bundles
    });
    res.send(html);
  }
};

const renderApp = (req, res) => {
  const store = configureStore();

  Loadable.preloadAll()
    .then(() => fetchData(store, req.url))
    .then(() => handleRequest(req, res, store));
};

export default renderApp;
