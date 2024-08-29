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
  const email = useSelector((state: RootState) => state.auth.email) || '';

  return (
    <Router>
      <Navbar />
      <ToastContainer />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<CourseList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/course/:id" element={<CourseDetail />} />
          <Route
            path="/dashboard"
            element={
              isAuthenticated && email ? (
                <StudentDashboard email={email} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;