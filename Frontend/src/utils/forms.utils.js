import moment from 'moment'

export const inputRequired = {
  required: true,
  message: 'Required'
}

export const typeEmail = {
  type: 'email',
  message: 'Use a valid email'
}

export const min8 = {
  min: 8,
  message: 'Password must have at least 8 characters'
}

export const dpi = {
  min: 13,
  max: 13,
  message: 'ID must have at least 13 characters'
}

export const cvc = {
  min: 3,
  message: 'Must be a valid CVC number'
}

export const creditCard = {
  min: 16,
  max: 16,
  message: 'Must provide a valid card number with 16 numbers'
}

export const maxDateToday = (current) => {
  return current && current > moment().endOf('day')
}
