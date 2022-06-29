import { Outlet } from 'react-router-dom'
// components
import MainNavbar from './MainNavbar'
import MainFooter from './MainFooter'

// ----------------------------------------------------------------------

export default function MainLayout() {
  return (
    <>
      <MainNavbar />
      <div>
        <Outlet />
      </div>

      <MainFooter />
    </>
  )
}
