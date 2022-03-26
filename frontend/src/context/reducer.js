import { DISPLAY_ALERT, REGISTER } from './actions'

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

  throw new Error(`no such action : ${action.type}`)
}

export default reducer
