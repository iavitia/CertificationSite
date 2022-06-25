import { Routes, Route } from 'react-router-dom'
//pages
import { NewStudyQuestion, PracticePost, Profile } from '../pages/dashboard'
import { Page404, ProtectedRoute } from '../pages'
import { Login, Register } from '../pages/authentication'
// Layouts
import DashboardLayout from '../layouts/Dashboard'

export default function Router() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="practice" element={<PracticePost />} />
        <Route path="contribute" element={<NewStudyQuestion />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<h1>settings</h1>} />
      </Route>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  )
}
