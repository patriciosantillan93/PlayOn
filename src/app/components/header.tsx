// app/components/Header.tsx

import React from 'react';

const Header = () => {
  return (
    <header>
      <nav>
        <a href="/">Home</a>
        <a href="/example">Example</a>
        {/* Add more navigation links as needed */}
      </nav>
    </header>
  );
};

export default Header;