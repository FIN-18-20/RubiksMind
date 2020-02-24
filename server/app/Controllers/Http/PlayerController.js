'use strict'

const Database = use('Database')

class PlayerController {

  //GET
  async leaderboard({ response }) {
    const leaderboard = await Database
      .select('users.country_code', 'users.username', 'times.time', 'times.created_at AS date')
      .from('users')
      .leftJoin('times', 'times.user_id', 'users.id')
      .groupBy('user_id')
      .orderBy('times.time', 'asc')
      .orderBy('times.created_at', 'asc')

    return response.accepted(leaderboard)
  }

}

module.exports = PlayerController
