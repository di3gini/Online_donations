const production = `${process.env.REACT_APP_PRODUCTION}` === 'true'

export const API_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api'
export const LOG_ENABLED = !production
