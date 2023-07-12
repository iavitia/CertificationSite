import { Navigate } from 'react-router-dom'
// routes
import { PATH_DASHBOARD } from '../routes/paths'
// context
import { useAppContext } from '../context/appContext'

// ----------------------------------------------------------------------

export default function GuestGuard({ children }) {
  const { user } = useAppContext()

  if (user) {
    return <Navigate to={PATH_DASHBOARD.root} />
  }

  return <>{children}</>
}
