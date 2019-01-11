import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

const Status = ({ code, children }) => (
  <Route
    render={({ staticContext }) => {
      if (staticContext) staticContext.status = code;
      return children;
    }}
  />
);

Status.propTypes = {
  code: PropTypes.number,
  children: PropTypes.element
}

export default Status;
