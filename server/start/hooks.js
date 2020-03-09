const { hooks } = require('@adonisjs/ignitor')
const countryList = require('country-list')


hooks.after.providersRegistered(() => {
  use('Validator').extend('validCountryCode', async (data, field, message) => {

    const code = data[field]

    if (!code || code === 'WR') return

    if (countryList.getCodes().find(countryCode => countryCode === code) === undefined) {
      throw message
    } else {
      return
    }
  })
})