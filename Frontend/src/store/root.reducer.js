import { combineReducers } from 'redux'
import loading from './app/loading/loading.reducer'
import error from './app/error/error.reducer'
import auth from './auth/auth.reducer'
import products from './products/products.reducer'
import donations from './donations/donations.reducer'

export const rootReducer = combineReducers({
  loading,
  error,
  auth,
  products,
  donations
})
