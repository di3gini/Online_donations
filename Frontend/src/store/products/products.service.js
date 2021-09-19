import { $http } from '../../utils/http.utils'

class ProductsService {
  getProducts =
    ({ page, pageSize, search, category }) =>
      $http.get('/products', { params: { page, pageSize, search, category, searchProperty: 'name,brand' } })
}

export default new ProductsService()
