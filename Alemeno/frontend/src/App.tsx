// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CourseList from './components/CourseList';
import CourseDetail from './components/CourseDetail';
import StudentDashboard from './components/StudentDashboard';
import Login from './components/Login';
import { RootState } from './redux/store';
import Navbar from './components/Navbar';

const App: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const studentId = useSelector((state: RootState) => state.auth.email) || '';

  return (
    <Router>
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<CourseList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/course/:id" element={<CourseDetail />} />
          <Route
            path="/dashboard"
            element={
              isAuthenticated && studentId ? (
                <StudentDashboard studentId={studentId} />
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