import { successState } from '../app/app.actions'
import { actionTypes } from './donations.types'

const initialState = {
  countries: [],
  institutions: []
}

const DonationsReducer = (state, { type, data }) => {
  switch (type) {
    case successState(actionTypes.GET_COUNTRIES):
      return {
        ...state,
        countries: data.countries
      }
    case successState(actionTypes.GET_INSTITUTIONS):
      if (data.institutions !== undefined) {
        return {
          ...state,
          institutions: data.institutions
        }
      } else return { ...state, institutions: [] }
    default:
      console.log('default')
      return state || initialState
  }
}
export default DonationsReducer
