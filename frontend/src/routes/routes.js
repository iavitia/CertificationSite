import { Routes, Route } from 'react-router-dom'
//pages
import {
  Contribute,
  PracticePost,
  PracticeAllProblems,
  UserProfile,
  UserSettings
} from '../pages/dashboard'
import { Contact, LandingPage, Page404 } from '../pages'
import { Login, Register } from '../pages/authentication'
// Layouts
import DashboardLayout from '../layouts/Dashboard'
import MainLayout from '../layouts/Main'
import LogoOnlyLayout from '../layouts/LogoOnlyLayout'
// guards
import { AuthGuard, GuestGuard } from '../guards'
// context
import { useAppContext } from '../context/appContext'

export default function Router() {
  const { user } = useAppContext()
  return (
    <Routes>
      {/* Home */}
      <Route
        path="/"
        element={
          user ? (
            <AuthGuard>
              <DashboardLayout />
            </AuthGuard>
          ) : (
            <MainLayout />
          )
        }
      >
        <Route path="/" element={user ? <h1>Dashboard</h1> : <LandingPage />} />
      </Route>

      {/* Dashboard */}
      <Route
        path="/"
        element={
          <AuthGuard>
            <DashboardLayout />
          </AuthGuard>
        }
      >
        <Route path="problems" element={<PracticeAllProblems />} />
        <Route path="practice" element={<PracticePost />} />
        <Route path="contribute" element={<Contribute />} />
        <Route path="profile" element={<UserProfile />} />
        <Route path="settings" element={<UserSettings />} />
      </Route>

      {/* Main */}
      <Route path="/" element={<MainLayout />}>
        <Route path="contact" element={<Contact />} />
      </Route>

      {/* Authentication */}
      <Route
        path="/"
        element={
          <GuestGuard>
            <MainLayout />
          </GuestGuard>
        }
      >
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Route>

      {/* Misc */}
      <Route path="*" element={<LogoOnlyLayout />}>
        <Route path="*" element={<Page404 />} />
      </Route>
    </Routes>
  )
}
