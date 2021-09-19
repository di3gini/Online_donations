import { successState } from '../app/app.actions'
import { actionTypes } from './auth.types'

const initialState = {
  user: null,
  accessToken: null,
  logout: false
}

const authorization = (state, { type, data }) => {
  switch (type) {
    case successState(actionTypes.LOGIN):
    case successState(actionTypes.REGISTER):
      return {
        ...state,
        user: data.user,
        accessToken: data.token
      }
    case successState(actionTypes.HIDE_LOGOUT):
      return {
        ...state,
        logout: false
      }
    case successState(actionTypes.SHOW_LOGOUT):
      return {
        ...state,
        logout: true
      }
    case successState(actionTypes.LOGOUT):
      return initialState
    default:
      return state || initialState
  }
}
export default authorization
