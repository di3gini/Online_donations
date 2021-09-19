import moment from 'moment'

export const inputRequired = {
  required: true,
  message: 'Requerido'
}

export const typeEmail = {
  type: 'email',
  message: 'Ingresa un correo electrónico válido'
}

export const min8 = {
  min: 8,
  message: 'La contraseña debe tener al menos 8 caractéres'
}

export const dpi = {
  min: 13,
  max: 13,
  message: 'EL DPI debe tener 13 caractéres'
}

export const min20 = {
  min: 20,
  message: 'El comentario debe tener al menos 20 caracteres.'
}

export const typeNumber = {
  type: 'number',
  message: 'Ingresa un precio válido'
}

export const maxDateToday = (current) => {
  return current && current > moment().endOf('day')
}
