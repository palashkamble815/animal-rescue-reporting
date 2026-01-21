import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white py-6 mt-8 shadow-lg">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Brand Section */}
          <div className="text-lg font-bold tracking-wide">
            🐾 Animal Reporting
          </div>

          {/* Links */}
          <div className="flex space-x-6 text-sm">
            <a href="/about-us" className="hover:text-yellow-300 transition">About</a>
            <a href="/contact-us" className="hover:text-yellow-300 transition">Contact</a>
            <a href="/" className="hover:text-yellow-300 transition">Home</a>
          </div>

          {/* Copyright */}
          <div className="text-sm text-white/80">
            © {new Date().getFullYear()} Animal Reporting — All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
