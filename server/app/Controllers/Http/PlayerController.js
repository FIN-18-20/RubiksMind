'use strict'

const Database = use('Database')

class PlayerController {

  //GET
  async leaderboard({ response }) {
    const leaderboard = await Database
      .raw('SELECT * FROM (SELECT users.country_code, users.username, times.created_at AS date, min(times.time) AS time FROM times LEFT JOIN users ON times.user_id = users.id GROUP BY time ) AS selected GROUP BY selected.username ORDER BY selected.time asc LIMIT 100')
    return response.accepted(leaderboard[0])
  }

}

module.exports = PlayerController
