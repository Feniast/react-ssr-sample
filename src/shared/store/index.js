import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const configureStore = (initialState, middlewares = []) => {
  const devtool = window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  const composeEnhancers = devtool || compose;

  const customMiddlewares = [thunk, ...middlewares];

  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...customMiddlewares))
  );

  return store;
};

export default configureStore;
