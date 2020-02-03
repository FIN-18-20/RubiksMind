'use strict'

const Database = use('Database')
const User = use('App/Models/User')

class ProfileController {
  async show({ request, response, params }) {
    const user = await Database
      .select('id', 'username', 'country_code', 'created_at AS date')
      .from('users')
      .where('username', params.username)
      .first()

    return user
  }
}

module.exports = ProfileController
