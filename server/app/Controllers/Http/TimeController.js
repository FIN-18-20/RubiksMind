'use strict'

const Time = use('App/Models/Time')
const Database = use('Database')


class TimeController {

  //GET
  async index({ response, auth }) {

    const times = await Database
      .select('time', 'created_at AS date')
      .from('times')
      .where('user_id', auth.user.id)

    return response.accepted(times)
  }

  //POST
  async create({ request, response, auth }) {

    //Validation here

    const time = new Time()
    time.fill({ time: request.all().time, user_id: auth.user.id })
    await time.save()

    return response.created('time saved')
  }
}

module.exports = TimeController
