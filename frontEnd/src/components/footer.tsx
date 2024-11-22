

import React from "react";
// import styles from "./Footer.module.css"; // Import the CSS module

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer>
      <p className="footerText">
        &copy; Copyright {year} PlayOn. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
