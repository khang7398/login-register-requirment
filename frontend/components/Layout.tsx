import React from 'react';
import Navbar from './Navbar';

export default function Layout({ children }: any) {
  return (
    <div className="content">
      <Navbar />
      {children}
    </div>
  );
}
