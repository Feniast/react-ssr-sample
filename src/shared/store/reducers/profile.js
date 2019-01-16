import { SET_PROFILE_NAME } from '../actions/profile';
import { handleActions } from 'redux-actions';

const initialState = {
  name: ''
};

const handlers = {
  [SET_PROFILE_NAME]: (state, action) => {
    return {
      ...state,
      name: action.payload
    };
  }
};

export default handleActions(handlers, initialState);
