const formatter = new Intl.NumberFormat('en-GT', {
  style: 'currency',
  currency: 'GTQ'
})

export const money = value => formatter.format(value).replace('GTQ', 'Q')
