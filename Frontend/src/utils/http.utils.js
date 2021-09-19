import { API_URL } from '../app.settings'
import { store } from '../store'
import { selectAccessToken } from '../store/auth/auth.selectors'
import { logout, showLogout } from '../store/auth/logout.actions'

const axios = require('axios')

const instance = axios.create({
  baseURL: API_URL,
  timeout: 60000
})

instance.interceptors.request.use(
  async config => {
    const state = store.getState()
    const accessToken = selectAccessToken(state)
    if (accessToken) {
      config.headers.Authorization = `bearer ${accessToken}`
    }
    return config
  },
  error => Promise.reject(error)
)

instance.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401 && error.response.config.url !== '/auth/login') {
      store.dispatch(showLogout())
      store.dispatch(logout())
    } else {
      return Promise.reject(error)
    }
  })

export const $http = instance

export const downloadFile = async (url, params) => {
  const response = await $http.get(url, { responseType: 'blob', headers: { accept: 'application/octet-stream' }, params })
  const data = response.data
  if (!(data instanceof Blob)) return

  const filename = response.headers['x-file-name']
  const blob = new Blob([data], { type: 'application/pdf' })
  const link = document.createElement('a')
  link.href = window.URL.createObjectURL(blob)
  link.download = filename
  link.click()
}

export const uploadFile = async (url, file) => {
  const formData = new FormData()
  formData.append('file', file)
  return $http.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
