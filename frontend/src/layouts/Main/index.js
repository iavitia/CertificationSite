import { useLocation } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
// components
import MainNavbar from './MainNavbar'
import MainFooter from './MainFooter'
// routes
import { PATH_AUTH } from '../../routes/paths'

// ----------------------------------------------------------------------

export default function MainLayout() {
  const { pathname } = useLocation()
  const authLink =
    pathname === PATH_AUTH.login || pathname === PATH_AUTH.register

  return (
    <>
      <MainNavbar />
      <div>
        <Outlet />
      </div>

      {!authLink && <MainFooter />}
    </>
  )
}
