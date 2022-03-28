import { Routes, Route } from 'react-router-dom'
//pages
import { Study, NewStudyQuestion, Profile } from './pages/dashboard'
import { Page404, Register, Login, ProtectedRoute } from './pages'
// Layouts
import DashboardLayout from './layouts/Dashboard'

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
        <Route path="study" element={<Study />} />
        <Route path="study/new" element={<NewStudyQuestion />} />
        <Route path="profile" element={<Profile />} />
      </Route>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  )
}
