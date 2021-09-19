import { useSelector } from 'react-redux'
import { hasErrorsSelector, singleErrorSelector } from './error.selector'
import { usePrevious } from '../../../utils/hooks.utils'

export const useHasErrors = actionTypes => {
  const hasError = useSelector(hasErrorsSelector(actionTypes))
  const error = useSelector(singleErrorSelector(actionTypes))
  const hadError = usePrevious(hasError, false)

  return [error, hasError, hadError]
}
