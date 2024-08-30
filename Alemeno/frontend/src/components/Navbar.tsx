// src/components/Navbar.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { logout } from '../redux/authSlice';
import { toggleDarkMode } from '../redux/themeSlice';
import { ReactComponent as SunIcon } from '../sun_icon.svg'; // Assuming you have imported the sun icon
import { ReactComponent as MoonIcon } from '../moon_icon.svg'; // Assuming you have imported the moon icon

const Navbar: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const studentName = useSelector((state: RootState) => state.auth.name);
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleDarkModeToggle = () => {
    dispatch(toggleDarkMode());
  };

  return (
    <nav className={`p-4 ${darkMode ? 'bg-violet-800 text-white' : 'bg-blue-600 text-white'}`}>
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-lg font-semibold">
          All Courses
        </Link>
        <div className="flex items-center space-x-4">
          <div className="lg:hidden">
            {/* Hamburger Icon */}
            <button onClick={toggleMenu} className="focus:outline-none">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={handleDarkModeToggle}
            className="focus:outline-none"
          >
            {darkMode ? <SunIcon className="w-6 h-6" /> : <MoonIcon className="w-6 h-6" />}
          </button>

          {/* Desktop Menu */}
          <div className="hidden lg:flex space-x-4 items-center">
            {isAuthenticated ? (
              <>
                <span>Welcome, {studentName}</span>
                <Link to="/dashboard">
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu with Slide Animation */}
      <div
        className={`lg:hidden absolute top-16 left-0 w-full shadow-md overflow-hidden transition-all duration-300 ease-in-out transform ${
          isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
        } ${darkMode ? 'bg-gray-900 text-white' : 'bg-blue-600 text-white'}`}
      >
        <div className={`flex flex-col items-center space-y-4 py-4 ${isOpen ? 'block' : 'hidden'}`}>
          {isAuthenticated ? (
            <>
              <span>Welcome, {studentName}</span>
              <Link to="/dashboard" className="w-full text-center">
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="w-full text-center">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;