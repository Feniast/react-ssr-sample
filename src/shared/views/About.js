import React from 'react';
import Helmet from 'react-helmet';
import logo from '../assets/react.svg';
import styles from '../styles/common.module.scss';

const About = () => (
  <div className="about">
    <Helmet title="About"></Helmet>
    <h1 className={styles.title}>About</h1>
    <img className={styles.logo} src={logo} />
  </div>
);

export default About;
