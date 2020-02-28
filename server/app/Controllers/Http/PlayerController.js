'use strict'

const Database = use('Database')

class PlayerController {

  //GET
  async leaderboard({ response }) {
    const leaderboard = await Database
      .select('users.country_code', 'users.username', 'times.time as time', 'times.created_at AS date')
      .from('times')
      .min('times.time as time')
      .leftJoin('users', 'users.id', 'times.user_id')
      .groupBy('users.id')
      .orderBy('time', 'asc')
      .orderBy('times.created_at', 'asc')
      .limit(100)

    return response.accepted(leaderboard)
  }

}

module.exports = PlayerController
