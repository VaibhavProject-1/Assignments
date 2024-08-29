// // src/components/Navbar.tsx
// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '../redux/store';
// import { logout } from '../redux/authSlice';

// const Navbar: React.FC = () => {
//   const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
//   const studentName = useSelector((state: RootState) => state.auth.name);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [isOpen, setIsOpen] = useState(false);

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate('/login');
//   };

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <nav className="bg-blue-600 p-4">
//       <div className="container mx-auto flex justify-between items-center">
//         <Link to="/" className="text-white text-lg font-semibold">
//           All Courses
//         </Link>
//         <div className="lg:hidden">
//           {/* Hamburger Icon */}
//           <button onClick={toggleMenu} className="text-white focus:outline-none">
//             <svg
//               className="w-6 h-6"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M4 6h16M4 12h16m-7 6h7"
//               ></path>
//             </svg>
//           </button>
//         </div>

//         {/* Desktop Menu */}
//         <div className="hidden lg:flex space-x-4 items-center">
//           {isAuthenticated ? (
//             <>
//               <span className="text-white">Welcome, {studentName}</span>
//               <Link to="/dashboard" className="text-white">
//                 Dashboard
//               </Link>
//               <button
//                 onClick={handleLogout}
//                 className="bg-red-500 text-white px-3 py-1 rounded"
//               >
//                 Logout
//               </button>
//             </>
//           ) : (
//             <Link to="/login" className="text-white">
//               Login
//             </Link>
//           )}
//         </div>
//       </div>

//       {/* Mobile Dropdown Menu with Slide Animation */}
//       <div
//         className={`lg:hidden absolute top-16 left-0 w-full bg-blue-600 text-white shadow-md overflow-hidden transition-all duration-300 ease-in-out transform ${
//           isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
//         }`}
//       >
//         <div className={`flex flex-col items-center space-y-4 py-4 ${isOpen ? 'block' : 'hidden'}`}>
//           {isAuthenticated ? (
//             <>
//               <span>Welcome, {studentName}</span>
//               <Link to="/dashboard" className="w-full text-center">
//                 Dashboard
//               </Link>
//               <button
//                 onClick={handleLogout}
//                 className="bg-red-500 text-white px-3 py-1 rounded"
//               >
//                 Logout
//               </button>
//             </>
//           ) : (
//             <Link to="/login" className="w-full text-center">
//               Login
//             </Link>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { logout } from '../redux/authSlice';
import { toggleDarkMode } from '../redux/themeSlice';

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
    <nav className={`p-4 ${darkMode ? 'bg-gray-900 text-white' : 'bg-blue-600 text-white'}`}>
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

          {/* Dark Mode Switch */}
          <button
            onClick={handleDarkModeToggle}
            className="focus:outline-none flex items-center space-x-2"
          >
            <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
            <div
              className={`w-10 h-5 flex items-center bg-gray-300 rounded-full p-1 ${
                darkMode ? 'bg-gray-700' : ''
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${
                  darkMode ? 'translate-x-5' : ''
                }`}
              ></div>
            </div>
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