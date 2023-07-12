import { useReducer, useContext, createContext } from 'react'
import axios from 'axios'
import * as actionTypes from './actionTypes'

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  user: user ? JSON.parse(user) : null,
  token: token,
  // ----------------- Study -----------------
  problems: []
}

const AppContext = createContext()

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.DISPLAY_ALERT:
      return {
        ...state,
        showAlert: false,
        alertType: '',
        alertText: ''
      }
    // ----------------- Auth -----------------
    case actionTypes.REGISTER:
    case actionTypes.LOGIN:
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user
      }
    case actionTypes.LOGOUT:
      return {
        ...initialState,
        user: null,
        token: null
      }
    case actionTypes.UPDATE_USER:
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user
      }
    // ----------------- Study -----------------
    case actionTypes.FETCH_ORGANIZATIONS:
      return {
        ...state,
        problems: action.payload
      }

    default:
      throw new Error(`Unknown action type: ${action.type}`)
  }
}

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
    dispatch({ type: actionTypes.DISPLAY_ALERT })
  }

  const addUserToLocalStorage = ({ user, token }) => {
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)
  }

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  // ----------------- Auth -----------------

  const registerUser = async (currentUser) => {
    try {
      const { data } = await axios.post('/api/v1/auth/register', currentUser)
      const { user, token } = data

      dispatch({
        type: actionTypes.REGISTER,
        payload: { user, token }
      })

      addUserToLocalStorage({ user, token })
    } catch (error) {
      throw new Error(error.response.data.msg)
    }
  }

  const login = async (currentUser) => {
    try {
      const { data } = await axios.post('/api/v1/auth/login', currentUser)
      const { user, token } = data

      dispatch({
        type: actionTypes.LOGIN,
        payload: { user, token }
      })

      addUserToLocalStorage({ user, token })
    } catch (error) {
      throw new Error(error.response.data.msg)
    }
  }

  const logout = () => {
    try {
      dispatch({ type: actionTypes.LOGOUT })
      removeUserFromLocalStorage()
    } catch (error) {
      throw new Error(error)
    }
  }

  const updateUser = async (currentUser) => {
    try {
      const { data } = await authFetch.patch('/auth/updateUser', currentUser)
      const { user, token } = data

      dispatch({ type: actionTypes.UPDATE_USER, payload: { user, token } })
      addUserToLocalStorage({ user, token })
    } catch (error) {
      throw new Error(error.response.data.msg)
    }
  }

  // ----------------- Study -----------------

  const getAllProblems = async () => {
    try {
      const { data } = await authFetch.get('/organizations')
      dispatch({
        type: actionTypes.FETCH_ORGANIZATIONS,
        payload: data.organizations
      })
    } catch (error) {
      console.log(error.response)
      throw new Error(error.response.data.msg)
    }
  }

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        registerUser,
        login,
        logout,
        updateUser,
        getAllProblems
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

const useAppContext = () => {
  return useContext(AppContext)
}

export { AppProvider, useAppContext }
