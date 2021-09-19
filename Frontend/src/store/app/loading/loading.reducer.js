import { actionTypes } from '../app.types'

const reducer = (state = {}, action) => {
  const { type } = action
  const matches = /(.*)_(REQUEST|SUCCESS|ERROR)/.exec(type)
  if (matches) {
    const [, requestName, requestState] = matches
    return {
      ...state,
      [requestName]: requestState === 'REQUEST'
    }
  }

  if (type === actionTypes.GLOBAL_RESET) return {}

  const matchesReset = /(.*)_RESET/.exec(type)

  if (!matchesReset) return state

  const [, requestName] = matchesReset
  const newState = state
  delete newState[requestName]
  return newState
}

export default reducer
