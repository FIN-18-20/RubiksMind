'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TimeSchema extends Schema {
  up() {
    this.create('times', (table) => {
      table.increments()
      table.integer('time').unsigned().notNullable()
      table.timestamps()
      table.integer('user_id').unsigned().notNullable()

      table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE')
    })
  }

  down() {
    this.drop('times')
  }
}

module.exports = TimeSchema
