import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import count from './count';
import profile from './profile';

export default (history) => combineReducers({
  router: connectRouter(history),
  count,
  profile
});
