export const hasErrorsSelector = actions => state => actions.reduce(
  (prevState, value) => !!(prevState && state.error[`${value}`]),
  true
)

export const singleErrorSelector = actions => state => actions.reduce(
  (prevState, value) => {
    const error = state.error[`${value}`]
    if (error) {
      return error
    } else {
      return {}
    }
  },
  {}
)

export const errorsSelector = actions => state => actions.reduce(
  (prevState, value) => {
    const error = state.error[`${value}`]
    if (error) {
      prevState.push(error)
    }
    return prevState
  },
  []
)
