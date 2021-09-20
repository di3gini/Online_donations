import DonationsService from './donations.service'
import { executeAction } from '../app/app.actions'
import { actionTypes } from './donations.types'

export const getCountries = () => (dispatch) => {
  const process = () => DonationsService.getCountries()
  dispatch(executeAction(actionTypes.GET_COUNTRIES, process))
}

export const getInstitutions = ({ idCountry }) => dispatch => {
  const process = () => DonationsService.getInstitutions({ idCountry })
  dispatch(executeAction(actionTypes.GET_INSTITUTIONS, process))
}

export const donate = () => dispatch => {
  const process = () => DonationsService.getCountries({})
  dispatch(executeAction(actionTypes.GET_COUNTRIES, process))
}
