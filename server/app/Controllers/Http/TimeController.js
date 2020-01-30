'use strict'

const Time = use('App/Models/Time')
const Database = use('Database')
const { validate } = use('Validator')

class TimeController {

  //GET
  async index({ response, auth }) {
    const times = await Database
      .select('id', 'time', 'created_at AS date')
      .from('times')
      .where('user_id', auth.user.id)

    return response.accepted(times)
  }

  //POST
  async create({ request, response, auth }) {
    const rules = {
      number: 'required|number'
    }
    const messages = {
      required: "The data can't be empty",
      number: "The data should be a valid number",
    }
    const validation = await validate(request.all().time, rules, messages)
    if (validation.fails()) {
      return response.badRequest(validation.messages())
    } else {
      const time = await Time.create({ time: request.all().time, user_id: auth.user.id })
      return response.created(time.id)
    }
  }

  //DELETE
  async delete({ response, auth, params }) {
    const deleteQuery = await Database
      .table('times')
      .where('user_id', auth.user.id)
      .where('id', params.id)
      .delete()

    return deleteQuery === 1 ? response.accepted('Time deleted') : response.noContent()
  }
}

module.exports = TimeController
