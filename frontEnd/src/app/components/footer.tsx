// app/components/Footer.tsx

import React from 'react';
import styles from './Footer.module.css'; // Import the CSS module

const Footer = () => {
  return (
    <footer className={styles.footer}> {/* Apply the .footer class */}
      <p className={styles.footerText}>&copy; Powered by PlayON. All rights reserved.</p> {/* Apply the .footerText class */}
    </footer>
  );
};

export default Footer;
