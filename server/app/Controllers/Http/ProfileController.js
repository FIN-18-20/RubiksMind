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

    const leaderboard = await Database
      .select('times.user_id', 'times.time as time', 'times.created_at AS date')
      .from('times')
      .min('times.time as time')
      .groupBy('times.user_id')
      .orderBy('time', 'asc')
      .orderBy('times.created_at', 'asc')

    let rank = leaderboard.findIndex(player => player.user_id === userId)
    rank === -1 ? 'Not in leaderboard' : rank++

    return response.json({
      rank,
      times,
      totalTimes: totalTimes[0].total,
      user,
    })
  }
}

module.exports = ProfileController
