import { Navigate } from 'react-router-dom'
// context
import { useAppContext } from '../context/appContext'
// routes
import { PATH_DASHBOARD } from '../routes/paths'

// ----------------------------------------------------------------------

export default function GuestGuard({ children }) {
  const { user } = useAppContext()

  if (user) {
    return <Navigate to={PATH_DASHBOARD.root} />
  }

  return <>{children}</>
}
