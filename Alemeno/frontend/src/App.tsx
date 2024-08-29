// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CourseList from './pages/CourseList';
import CourseDetail from './pages/CourseDetail';
import StudentDashboard from './pages/StudentDashboard';
import Login from './pages/Login';
import { RootState } from './redux/store';
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  return (
    <div className={darkMode ? 'bg-gray-900 text-white min-h-screen' : 'bg-white text-black min-h-screen'}>
    <Router>
      <Navbar />
      <ToastContainer autoClose={3000} position="top-right" />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<CourseList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/course/:id" element={<CourseDetail />} />
          <Route
            path="/dashboard"
            element={
              isAuthenticated ? (
                <StudentDashboard />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
      </div>
    </Router>
    </div>
  );
};

export default App;