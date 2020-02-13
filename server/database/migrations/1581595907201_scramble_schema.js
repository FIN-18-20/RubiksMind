'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ScrambleSchema extends Schema {
  up () {
    this.create('scrambles', (table) => {
      table.increments()
      table.string('scramble', 72).notNullable().unique()
    })
  }

  down () {
    this.drop('scrambles')
  }
}

module.exports = ScrambleSchema
