import { useReducer, useContext, createContext } from 'react'
import axios from 'axios'
import reducer from './reducer'
import { DISPLAY_ALERT, REGISTER, LOGIN, LOGOUT, UPDATE_USER } from './actions'

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  user: user ? JSON.parse(user) : null,
  token: token
}

const AppContext = createContext()

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  // Axios
  const authFetch = axios.create({
    baseURL: 'api/v1'
  })

  // Request
  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common['Authorization'] = `Bearer ${state.token}`
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  // Response
  authFetch.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      if (error.response.status === 401) {
        logout()
      }
      return Promise.reject(error)
    }
  )

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT })
  }

  const addUserToLocalStorage = ({ user, token }) => {
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)
  }

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  const registerUser = async (currentUser) => {
    const { data } = await axios.post('/api/v1/auth/register', currentUser)
    const { user, token } = data

    dispatch({
      type: REGISTER,
      payload: { user, token }
    })

    addUserToLocalStorage({ user, token })
  }

  const login = async (currentUser) => {
    const { data } = await axios.post('/api/v1/auth/login', currentUser)
    const { user, token } = data

    dispatch({
      type: LOGIN,
      payload: { user, token }
    })

    addUserToLocalStorage({ user, token })
  }

  const logout = () => {
    dispatch({ type: LOGOUT })
    removeUserFromLocalStorage()
  }

  const updateUser = async (currentUser) => {
    const { data } = await authFetch.patch('/auth/updateUser', currentUser)
    const { user, token } = data

    dispatch({ type: UPDATE_USER, payload: { user, token } })
    addUserToLocalStorage({ user, token })
  }

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        registerUser,
        login,
        logout,
        updateUser
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

const useAppContext = () => {
  return useContext(AppContext)
}

export { AppProvider, initialState, useAppContext }
