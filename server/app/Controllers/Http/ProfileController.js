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

    const userId = user.id

    const times = await Database
      .select('id', 'time', 'user_id', 'created_at AS date')
      .from('times')
      .where('user_id', user.id)
      .orderBy('id', 'desc')
      .limit(100)

    const totalTimes = await Database
      .from('times')
      .where('user_id', userId)
      .count('id as total')

    const rank = await Database.raw('SELECT 1 + COUNT(DISTINCT user_id) AS rank FROM times WHERE time < (SELECT time FROM times WHERE user_id = ? ORDER BY time ASC LIMIT 1)', [userId])

    return response.json({
      rank: rank[0][0].rank,
      times,
      totalTimes: totalTimes[0].total,
      user,
    })
  }
}

module.exports = ProfileController
