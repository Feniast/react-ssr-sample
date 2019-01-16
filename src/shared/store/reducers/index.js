import { combineReducers } from 'redux';

import count from './count';
import profile from './profile';

export default combineReducers({
  count,
  profile
});
