import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname === path
      ? 'text-yellow-300 border-b-3 border-yellow-300 font-semibold'
      : 'text-white/90 hover:text-yellow-300 transition duration-300';
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-4 md:px-6">
        
        {/* Brand */}
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-wide bg-gradient-to-r from-yellow-300 via-pink-300 to-white bg-clip-text text-transparent"
        >
          🐾 Animal Rescue Reporting
        </Link>

        {/* Links */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/" className={`pb-1 ${isActive('/')}`}>Home</Link>
          <Link to="/contact-us" className={`pb-1 ${isActive('/contact-us')}`}>Contact Us</Link>
          <Link to="/about-us" className={`pb-1 ${isActive('/about-us')}`}>About Us</Link>

          {auth.token ? (
            <button
              onClick={handleLogout}
              className="ml-4 bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg text-sm font-medium shadow-md transition"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className={`pb-1 ${isActive('/login')}`}>Login</Link>
              <Link
                to="/register"
                className="ml-2 bg-white text-indigo-600 px-4 py-1 rounded-lg text-sm font-semibold shadow-md hover:bg-indigo-100 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
