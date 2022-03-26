import { useReducer, useContext, createContext } from 'react'
import axios from 'axios'
import reducer from './reducer'
import { DISPLAY_ALERT, REGISTER } from './actions'

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
    const response = await axios.post('/api/v1/auth/register', currentUser)
    const { user, token } = response.data

    dispatch({
      type: REGISTER,
      payload: { user, token }
    })

    addUserToLocalStorage({ user, token })
  }

  return (
    <AppContext.Provider value={{ ...state, registerUser, displayAlert }}>
      {children}
    </AppContext.Provider>
  )
}

const useAppContext = () => {
  return useContext(AppContext)
}

export { AppProvider, initialState, useAppContext }
