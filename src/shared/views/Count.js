import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { countSelector, doubleCountSelector } from '../store/selectors/count';
import { increment, decrement, set } from '../store/actions/count';
import styles from '../styles/common.module.scss';

export class Count extends React.Component {
  static fetchData = (store) => {
    store.dispatch(set(~~(Math.random() * 100)));
  }

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
        <Helmet title="Count"></Helmet>
        <h1 className={styles.title}>Count</h1>
        <div>
          <p className="count">Count: {count}</p>
          <p>Double Count: {doubleCount}</p>
        </div>
        <button className="btn-plus" onClick={increment}>+</button>
        <button className="btn-minus" onClick={decrement}>-</button>
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
