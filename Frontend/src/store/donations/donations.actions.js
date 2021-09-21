import DonationsService from './donations.service'
import { executeAction } from '../app/app.actions'
import { actionTypes } from './donations.types'

export const getCountries = () => (dispatch) => {
  const process = async () => DonationsService.getCountries()
  dispatch(executeAction(actionTypes.GET_COUNTRIES, process))
}

export const getInstitutions = ({ idCountry }) => dispatch => {
  const process = () => DonationsService.getInstitutions({ idCountry })
  dispatch(executeAction(actionTypes.GET_INSTITUTIONS, process))
}

export const donate = (amount, idUser, idInstitution) => dispatch => {
  const process = () => DonationsService.donate({ amount, idUser, idInstitution })
  dispatch(executeAction(actionTypes.DONATE, process))
}

export const getDonationsByUser = (idUser) => dispatch => {
  const process = () => DonationsService.getDonationsByUser({ idUser })
  dispatch(executeAction(actionTypes.GET_DONATIONSBYUSER, process))
}
