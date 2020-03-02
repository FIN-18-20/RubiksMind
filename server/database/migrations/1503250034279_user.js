'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up() {
    this.create('users', (table) => {
      table.increments()
      table.string('username', 80).notNullable().unique()
      table.string('email', 254).notNullable()
      table.string('password', 60)
      table.string('login_source', 25).notNullable()
      table.string('country_code', 2)
      table.timestamps()
      table.unique('id')
    })
    .raw('ALTER TABLE `users` DROP PRIMARY KEY, ADD PRIMARY KEY(`email`,`login_source`);')
  }

  down() {
    this.drop('users')
  }
}

module.exports = UserSchema
