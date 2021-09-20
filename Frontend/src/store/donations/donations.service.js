import { $http } from '../../utils/http.utils'

class DonationsService {
  getCountries = () =>
    $http.get('/catalog/countries', {})

  getInstitutions =
    ({ idCountry }) =>
      $http.get(`/catalog/institutions/${idCountry}`, {})

  donate =
    ({ amount, idUser, idInstitution }) =>
      $http.post('/donation/donate', { amount, idUser, idInstitution })
}

export default new DonationsService()
