'use strict'


const Time = use('App/Models/Time')
const Database = use('Database')
const Player = use('App/Models/User')

class PlayerController {
  
  //GET
  async leaderboard({ response }) {
    // const leaderboard = await Database
    //   .select('')
    
    //SELECT users.username, times.`time`, times.created_at FROM rubiksmind.users left join times ON times.user_id = users.id group by user_id order by times.time asc, times.created_at asc
    return response.accepted('yolo')
  }

}

module.exports = PlayerController
