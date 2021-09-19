import { useSelector } from 'react-redux'
import { loadingSelector } from './loading.selector'
import { usePrevious } from '../../../utils/hooks.utils'

export const useIsLoading = actionTypes => {
  const isLoading = useSelector(loadingSelector(actionTypes))
  const prevIsLoading = usePrevious(isLoading, false)
  return [isLoading, prevIsLoading]
}
