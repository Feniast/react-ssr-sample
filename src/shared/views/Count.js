import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { countSelector, doubleCountSelector } from '../store/selectors/count';
import { increment, decrement } from '../store/actions/count';

class Count extends React.Component {
  static propTypes = {
    count: PropTypes.number.isRequired,
    doubleCount: PropTypes.number.isRequired,
    increment: PropTypes.func.isRequired,
    decrement: PropTypes.func.isRequired
  };

  render() {
    const { count, doubleCount, increment, decrement } = this.props;
    return (
      <div>
        <div>
          <p>Count: {count}</p>
          <p>Count: {doubleCount}</p>
        </div>
        <button onClick={increment}>+</button>
        <button onClick={decrement}>-</button>
      </div>
    );
  }
}

export default connect(
  state => ({
    count: countSelector(state),
    doubleCount: doubleCountSelector(state)
  }),
  dispatch => ({
    increment: () => dispatch(increment()),
    decrement: () => dispatch(decrement())
  })
)(Count);
