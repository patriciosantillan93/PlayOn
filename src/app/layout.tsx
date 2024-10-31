// app/layout.tsx

import React from 'react';
import Header from './components/header';
import Footer from './components/footer';

export const metadata = {
  title: 'Your App Title',
  description: 'Your App Description',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout