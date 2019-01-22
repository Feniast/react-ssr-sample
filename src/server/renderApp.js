import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import Loadable from 'react-loadable';
import { matchRoutes } from 'react-router-config';
import Helmet from 'react-helmet';
import { getBundles } from 'react-loadable-ssr-addon';

import App from '../shared/App';
import routes from '../shared/routes';
import configureStore from '../shared/store';
import renderHTML from './renderHtml';
import stats from '../../build/react-loadable-ssr-addon.json';

const getStats = () => {
  return stats || {};
}

const fetchData = (store, pathname) => {
  const branch = matchRoutes(routes, pathname);

  const promises = branch.map(async ({ route, match }) => {
    let component;
    // handle react-loadable component
    if (route.component.preload) {
      component = (await route.component.preload()).default;
    } else {
      component = route.component;
    }
    if (!component) return Promise.resolve(null);
    const fetchData = component.fetchData;
    return fetchData ? fetchData(store, match) : Promise.resolve(null);
  });

  return Promise.all(promises);
};

const render = (req, res, store) => {
  const context = {};
  const modules = new Set();

  const markup = ReactDOMServer.renderToString(
    <Loadable.Capture report={moduleName => modules.add(moduleName)}>
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
    const stats = getStats();
    // https://github.com/themgoncalves/react-loadable-ssr-addon/issues/6
    const bundles = getBundles(stats, [...Array.from(modules), ...stats.entrypoints]);
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
  const { store } = configureStore({
    url: req.url
  });

  Loadable.preloadAll()
    .then(() => fetchData(store, req.url))
    .then(() => render(req, res, store));
};

export default renderApp;
