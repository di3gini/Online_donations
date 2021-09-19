import { actionTypes } from './app.types'

const LOG_ENABLED = true

export const globalReset = () => ({ type: actionTypes.GLOBAL_RESET })

export const actionStart = action => ({ type: requestState(action) })
export const actionSuccess = (action, data = {}) => ({ type: successState(action), data: data.data || data })
export const actionError = (action, error, onError) => {
  if (error.status === 401) {
    return { type: actionTypes.GLOBAL_RESET }
  }

  if (LOG_ENABLED) {
    // eslint-disable-next-line no-console
    console.log(`ERROR Executing action: ${action}`, `\n\ndata: ${error.data}\n\n`, error)
  }
  let theError
  if (onError) {
    theError = error ? onError(error.status, error.data) : null
  }
  if (!theError) {
    theError = error?.response?.data || {}
  }
  return { type: errorState(action), error: theError }
}
export const clearActionResult = action => ({ type: successState(action) })

export const executeAction = (action, process, onError) => async dispatch => {
  dispatch(actionStart(action))
  try {
    if (process) {
      dispatch(actionSuccess(action, await process()))
    } else {
      dispatch(actionSuccess(action))
    }
  } catch (error) {
    dispatch(actionError(action, error, onError))
  }
}

export const requestState = type => `${type}_REQUEST`
export const successState = type => `${type}_SUCCESS`
export const errorState = type => `${type}_ERROR`

export const extract = (value, defaultValue) => (value !== undefined ? value : defaultValue)
