'use strict'

const Database = use('Database')

class CubeController {
  async scramble({ response }) {
    const maxId = (await Database.from('scrambles').max('id as max').first()).max
    const rand = Math.floor(Math.random() * maxId) + 1

    const scramble = await Database
      .select('scramble')
      .from('scrambles')
      .where('id', '>=', rand)
      .orderBy('id')
      .first()

    return response.json({
      scramble: scramble.scramble,
    })
  }
}

module.exports = CubeController
