import React from 'react';
import { NavLink } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import Helmet from 'react-helmet';
import * as metadata from './common/metadata';
import routes from './routes';

import './index.scss';

import commonStyles from './styles/common.module.scss';

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
        <ul className={commonStyles.navList}>
          <li className={commonStyles.navItem}>
            <NavLink exact to="/" className={commonStyles.navLink} activeClassName={commonStyles.navLinkActive}>Home</NavLink>
          </li>
          <li className={commonStyles.navItem}>
            <NavLink exact to="/about" className={commonStyles.navLink} activeClassName={commonStyles.navLinkActive}>About</NavLink>
          </li>
          <li className={commonStyles.navItem}>
            <NavLink exact to="/count" className={commonStyles.navLink} activeClassName={commonStyles.navLinkActive}>Count</NavLink>
          </li>
        </ul>
      </nav>
      <div className="main">{renderRoutes(routes)}</div>
    </div>
  );
};

export default App;
