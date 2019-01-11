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
import stats from '../../dist/react-loadable.json';

const fetchData = (store, pathname) => {
  const branch = matchRoutes(routes, pathname);

  const promises = branch.map(({ route, match }) => {
    const fetchData = route.component.fetchData;
    return fetchData ? fetchData(store, match) : Promise.resolve(null);
  });

  return Promise.all(promises);
};

const renderHTML = ({
  state,
  helmet,
  markup,
  bundles
}) => {

}

const render = (req, res, store) => {
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
  }

  if (context.url) {
    res.redirect(context.url);
  } else {
    const helmetData = Helmet.renderStatic();
    const bundles = getBundles(stats, modules);
    const html = renderHTML({
      state: store.getState(),
      markup,
      helmet: helmetData,
      bundles
    });
    res.status(200).send(html);
  }
};

const renderApp = (req, res) => {
  const store = configureStore();

  Loadable.preloadAll()
    .then(() => fetchData(store, req.url))
    .then(() => render(req, res, store));
};

export default renderApp;
