'use strict'

const Database = use('Database')

class ProfileController {
  async show({ response, params }) {
    const user = await Database
      .select('id', 'username', 'country_code', 'created_at AS date')
      .from('users')
      .where('username', params.username)
      .first()

    if (!user) {
      return response.noContent(null)
    }

    const times = await Database
      .select('id', 'time', 'user_id', 'created_at AS date')
      .from('times')
      .where('user_id', user.id)
      .orderBy('id', 'desc')

    return response.json({
      user,
      times,
    })
  }
}

module.exports = ProfileController
