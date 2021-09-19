import { executeAction } from '../app/app.actions'
import { actionTypes } from './auth.types'

export const showLogout = () => dispatch => {
  const process = () => false
  dispatch(executeAction(actionTypes.SHOW_LOGOUT, process))
}

export const logout = () => dispatch => {
  dispatch(executeAction(actionTypes.LOGOUT))
}
