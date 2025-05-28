import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <h2 style={styles.logo}>AI Photo Trader</h2>
      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/upload" style={styles.link}>Upload</Link>
        <Link to="/trade" style={styles.link}>Trade</Link>
        <Link to="/wallet" style={styles.link}>Wallet</Link>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    background: '#111',
    color: '#fff',
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logo: {
    margin: 0,
    fontSize: '1.5rem'
  },
  links: {
    display: 'flex',
    gap: '1.5rem'
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '1rem'
  }
};

export default Navbar;
