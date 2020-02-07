'use strict'

const Database = use('Database')

class ProfileController {
  async show({ response, params }) {
    const user = await Database
      .select('id', 'username', 'country_code', 'created_at AS date')
      .from('users')
      .where('username', params.username)
      .first()

    const times = await Database
      .select('id', 'time', 'user_id', 'created_at AS date')
      .from('times')
      .where('user_id', user.id)

    return response.json({
      user,
      times,
    })
  }
}

module.exports = ProfileController
