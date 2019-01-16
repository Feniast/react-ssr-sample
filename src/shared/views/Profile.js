import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { setProfileName } from '../store/actions/profile';

import styles from '../styles/common.module.scss';

class Profile extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    matchName: PropTypes.string,
    setProfileName: PropTypes.func
  };

  static fetchData(store, match) {
    const { name } = match.params.name;
    store.dispatch(setProfileName(name));
  }

  componentDidMount() {
    const { name, matchName, setProfileName} = this.props;
    if (name !== matchName) {
      setTimeout(() => setProfileName(matchName), 0);
    }
  }

  render() {
    const { name } = this.props;
    return (
      <div className="profile">
        <Helmet title="Profile" />
        <h1 className={styles.title}>{`${name}'s Profile`}</h1>
      </div>
    );
  }
}

export default connect(
  (state, props) => {
    return {
      name: state.profile.name,
      matchName: props.match.params.name
    };
  },
  dispatch => ({
    setProfileName: name => dispatch(setProfileName(name))
  })
)(Profile);
