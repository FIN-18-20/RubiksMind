'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class UserSeeder {
  async run() {
    for (let i = 0; i < 50; i++) {
      const user = await Factory.model('App/Models/User').create()
      const times = await Factory.model('App/Models/Time').makeMany(20)
      await user.times().saveMany(times)
    }
  }
}

module.exports = UserSeeder
