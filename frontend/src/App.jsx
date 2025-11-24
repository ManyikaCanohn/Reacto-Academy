import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './publicPages/LandingPage'
import Register from './publicPages/Register'
import Login from './publicPages/Login'
import AdminDashboard from './admin/AdminDashboard'
import LectureDashboard from './lecture/LectureDashboard'
import StudentDashboard from './student/StudentDashboard'
import StudentProfile from './student/studentComponents/StudentProfile'
import StudentAssignments from './student/studentComponents/StudentAssignments'
import StudentNotifications from './student/studentComponents/StudentNotifications'
import StudentCourses from './student/studentComponents/StudentCourses'
import AccountLogs from './Tools/AccountLogs'
import StudentToDoApp from './student/studentComponents/StudentToDoApp'
import QuizTester from './publicPages/QuizTester'
import LectureFileUpload from "./lecture/lectureComponents/LectureFileUpload"
import AITutor from './publicPages/AITutor'
import WikiNotes from './publicPages/WikiNotes'
import { LectureProvider } from "./lecture/context/LectureContext";
import PWAInstallPrompt from './PWAInstallPrompt';

const App = () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const isAuthenticated = !!token;

  return (
    <LectureProvider>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/admindashboard' element={isAuthenticated && user.role === 'admin' ? <AdminDashboard /> : <Navigate to="/login" />} />
        <Route path='/lecturedashboard' element={isAuthenticated && user.role === 'lecture' ? <LectureDashboard /> : <Navigate to="/login" />} />
        <Route path='/studentdashboard' element={isAuthenticated && user.role === 'student' ? <StudentDashboard /> : <Navigate to="/login" />} />
        <Route path='/studentassignments' element={<StudentAssignments />} />
        <Route path='/studentnotifications' element={<StudentNotifications />} />
        <Route path='/studentcourses' element={<StudentCourses />} />
        <Route path='/studentprofile' element={<StudentProfile />} />
        <Route path='/loginfirst' element={<AccountLogs />} />
        <Route path='/studenttodoapp' element={<StudentToDoApp />} />
        <Route path="/file" element={<LectureFileUpload />} />
        <Route path="/courses/:language" element={<WikiNotes />} />
        <Route path='/dashboard' element={isAuthenticated ? <StudentDashboard /> : <Navigate to="/" />} />
      </Routes>

      {/* These are always visible */}
      <QuizTester />
      <AITutor />
      <PWAInstallPrompt />
    </LectureProvider>
  )
}

export default App
