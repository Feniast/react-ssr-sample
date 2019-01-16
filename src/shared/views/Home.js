import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/common.module.scss';

const Home = () => (
  <div className="home">
    <h1 className={styles.title}>Home</h1>
    <ul>
      <li><Link to="/profile/Alice">Alice</Link></li>
      <li><Link to="/profile/Allen">Allen</Link></li>
      <li><Link to="/profile/Alison">Alison</Link></li>
    </ul>
  </div>
);

export default Home;
