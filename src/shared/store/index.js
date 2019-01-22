import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';
import { createMemoryHistory, createBrowserHistory } from 'history';
import createRootReducer from './reducers';
import { isServer } from '../common/util';

const configureStore = ({
  initialState,
  middlewares = [],
  url = '/'
} = {}) => {
  const devtool = !isServer && process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  const composeEnhancers = devtool || compose;

  const history = isServer ? createMemoryHistory({
    initialEntries: [url]
  }) : createBrowserHistory();

  const customMiddlewares = [thunk, routerMiddleware(history), ...middlewares];

  const rootReducer = createRootReducer(history);

  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...customMiddlewares))
  );

  return {
    store,
    history
  };
};

export default configureStore;
