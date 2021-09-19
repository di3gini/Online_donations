import { PAGGED_RESPONSE } from '../../utils/constants.utils'
import { successState } from '../app/app.actions'
import { actionTypes } from './products.types'

const initialState = {
  products: PAGGED_RESPONSE
}

const ProductsReducer = (state, { type, data }) => {
  switch (type) {
    case successState(actionTypes.GET_PRODUCTS):
      return {
        ...state,
        products: data
      }
    default:
      return state || initialState
  }
}
export default ProductsReducer
