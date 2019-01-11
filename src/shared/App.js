import React from 'react';
import { NavLink } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import Helmet from 'react-helmet';
import * as metadata from './common/metadata';
import routes from './routes';

const App = () => {
  return (
    <div className="app">
      <Helmet
        title={metadata.title}
        titleTemplate={metadata.titleTemplate}
        link={metadata.link}
        script={metadata.script}
        noscript={metadata.noscript}
      />
      <nav>
        <NavLink exact to="/" activeClassName="active">
          Home
        </NavLink>
        <NavLink exact to="/about" activeClassName="active">
          About
        </NavLink>
      </nav>
      <div className="main">{renderRoutes(routes)}</div>
    </div>
  );
};

export default App;
