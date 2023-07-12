import { Navigate } from 'react-router-dom'
// routes
import { PATH_AUTH } from '../routes/paths'
// context
import { useAppContext } from '../context/appContext'

// ----------------------------------------------------------------------

const AuthGuard = ({ children }) => {
  const { user } = useAppContext()

  if (!user) {
    return <Navigate to={PATH_AUTH.login} />
  }
  return children
}

export default AuthGuard
