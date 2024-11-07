"use client"
// app/components/Header.tsx

import React, { useState } from 'react';
import styles from './Header.module.css'; // Assuming you have a CSS module for styling

const handleLogout = () => {
  // Remove the authentication token from localStorage or sessionStorage
  localStorage.removeItem("authToken");  // If you're using localStorage
  // Or, if you're using sessionStorage:
  // sessionStorage.removeItem("authToken");
  
  // Redirect to the login page after logout
  window.location.href = "/login";  // Or use a route in your Next.js app
};

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
            {/* Update this link to handle logout */}
            <button onClick={handleLogout} className={styles.dropdownItem}>Logout</button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
