import { $http } from '../../utils/http.utils'

class AuthService {
  login =
    ({ email, password }) =>
      $http.post('/auth/login', { email, password })

  register =
    ({ email, name, surname, idNumber, password }) =>
      $http.post('/auth/register', { email, name, surname, idNumber, password })
}

export default new AuthService()
