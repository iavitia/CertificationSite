import { DISPLAY_ALERT, REGISTER, LOGIN, LOGOUT } from './actions'
import { initialState } from './appContext'

const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: '',
      alertText: ''
    }
  }

  if (action.type === REGISTER) {
    return { ...state, token: action.payload.token, user: action.payload.user }
  }

  if (action.type === LOGIN) {
    return { ...state, token: action.payload.token, user: action.payload.user }
  }

  if (action.type === LOGOUT) {
    return { ...initialState, user: null, token: null }
  }

  throw new Error(`no such action : ${action.type}`)
}

export default reducer
