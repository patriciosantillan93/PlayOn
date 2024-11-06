// app/layout.tsx

import React from 'react';
import Header from './components/header';
import Footer from './components/footer';
import '../styles/globals.css';

export const metadata = {
  title: 'PlayOn',
  description: 'Alquila tu cancha en un cl',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex justify-center items-center px-4 py-8 bg-gray-100">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
