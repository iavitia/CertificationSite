import { Routes, Route } from 'react-router-dom'
//pages
import { Contribute, PracticePost, Profile } from '../pages/dashboard'
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
        <Route path="practice" element={<PracticePost />} />
        <Route path="contribute" element={<Contribute />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<h1>settings</h1>} />
      </Route>

      {/* Main */}
      <Route path="/" element={<MainLayout />}>
        <Route path="contact" element={<Contact />} />
      </Route>

      {/* Authentication */}
      <Route
        path="/register"
        element={
          <GuestGuard>
            <Register />
          </GuestGuard>
        }
      />
      <Route
        path="/login"
        element={
          <GuestGuard>
            <Login />
          </GuestGuard>
        }
      />

      {/* Misc */}
      <Route path="*" element={<LogoOnlyLayout />}>
        <Route path="*" element={<Page404 />} />
      </Route>
    </Routes>
  )
}
