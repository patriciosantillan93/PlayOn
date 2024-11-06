"use client"
// app/components/Header.tsx

import React, { useState } from 'react';
import styles from './Header.module.css'; // Assuming you have a CSS module for styling

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <a href="/" className={styles.navLink}>Home</a>
        <a href="/example" className={styles.navLink}>Example</a>
        {/* Add more navigation links as needed */}
      </nav>

      {/* Avatar and User Menu */}
      <div className={styles.userMenu}>
        <img
          src="/path/to/avatar.png" // Replace with the path to your avatar image
          alt="User Avatar"
          className={styles.avatar}
          onClick={toggleMenu}
        />
        {isMenuOpen && (
          <div className={styles.dropdownMenu}>
            <a href="/profile" className={styles.dropdownItem}>Profile</a>
            <a href="/reservas" className={styles.dropdownItem}>Reservas</a>
            <a href="/settings" className={styles.dropdownItem}>Settings</a>
            <a href="/logout" className={styles.dropdownItem}>Logout</a>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
