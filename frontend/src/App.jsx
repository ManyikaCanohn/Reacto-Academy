import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './publicPages/LandingPage'
import Register from './publicPages/Register'
import Login from './publicPages/Login'
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
import { AuthProvider } from "./context/AppContext";
import { LectureProvider } from "./lecture/context/LectureContext";
import { LectureRoute, StudentRoute } from "./components/ProtectedRoute";
import PWAInstallPrompt from './PWAInstallPrompt';

const App = () => {
  return (
    <AuthProvider>
      <LectureProvider>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/lecturedashboard' element={<LectureRoute><LectureDashboard /></LectureRoute>} />
          <Route path='/studentdashboard' element={<StudentRoute><StudentDashboard /></StudentRoute>} />
          <Route path='/studentassignments' element={<StudentRoute><StudentAssignments /></StudentRoute>} />
          <Route path='/studentnotifications' element={<StudentRoute><StudentNotifications /></StudentRoute>} />
          <Route path='/studentcourses' element={<StudentRoute><StudentCourses /></StudentRoute>} />
          <Route path='/studentprofile' element={<StudentRoute><StudentProfile /></StudentRoute>} />
          <Route path='/loginfirst' element={<StudentRoute><AccountLogs /></StudentRoute>} />
          <Route path='/studenttodoapp' element={<StudentRoute><StudentToDoApp /></StudentRoute>} />
          <Route path="/file" element={<LectureRoute><LectureFileUpload /></LectureRoute>} />
          <Route path="/courses/:language" element={<WikiNotes />} />
          <Route path='/dashboard' element={<StudentRoute><StudentDashboard /></StudentRoute>} />
        </Routes>

        {/* These are always visible */}
        <QuizTester />
        <AITutor />
        <PWAInstallPrompt />
      </LectureProvider>
    </AuthProvider>
  )
}

export default App
