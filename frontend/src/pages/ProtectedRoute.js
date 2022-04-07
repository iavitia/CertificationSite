import { useAppContext } from '../context/appContext'
import { Navigate } from 'react-router-dom'
// routes
import { PATH_AUTH } from '../routes/paths'

const ProtectedRoute = ({ children }) => {
  const { user } = useAppContext()

  if (!user) {
    return <Navigate to={PATH_AUTH.register} />
  }
  return children
}

export default ProtectedRoute
