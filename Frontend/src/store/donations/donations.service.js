import { $http } from '../../utils/http.utils'

class DonationsService {
  getCountries = () =>
    $http.get('/catalog/countries', {})

  getInstitutions =
    ({ idCountry }) =>
      $http.get(`/catalog/institutions/${idCountry}`, {})
}

export default new DonationsService()
