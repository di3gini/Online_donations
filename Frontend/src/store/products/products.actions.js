import ProductsService from './products.service'
import { executeAction } from '../app/app.actions'
import { actionTypes } from './products.types'

export const getProducts = ({ page = 1, pageSize = 10, search, category = 0 }) => dispatch => {
  const process = () => ProductsService.getProducts({ page, pageSize, search, category })
  dispatch(executeAction(actionTypes.GET_PRODUCTS, process))
}
