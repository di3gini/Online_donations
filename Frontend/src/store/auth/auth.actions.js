import AuthService from './auth.service'
import { executeAction } from '../app/app.actions'
import { actionTypes } from './auth.types'

export const login = ({ email, password }) => dispatch => {
  const process = async () => AuthService.login({ email, password })
  dispatch(executeAction(actionTypes.LOGIN, process))
}

export const register = ({ email, name, surname, idNumber, password }) => dispatch => {
  const process = async () => AuthService.register({ email, name, surname, idNumber, password })
  dispatch(executeAction(actionTypes.REGISTER, process))
}

export const hideLogout = () => dispatch => {
  const process = () => false
  dispatch(executeAction(actionTypes.HIDE_LOGOUT, process))
}
