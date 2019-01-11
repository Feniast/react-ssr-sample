import { INCREMENT, DECREMENT } from '../actions/count';
import { handleActions } from 'redux-actions';

const initialState = {
  count: 0
};

const handlers = {
  [INCREMENT]: (state, action) => {
    const inc = action.payload || 1;
    return {
      ...state,
      count: state.count + inc
    };
  },
  [DECREMENT]: (state, action) => {
    const dec = action.payload || 1;
    return {
      ...state,
      count: state.count - dec
    }
  }
};

export default handleActions(handlers, initialState);
