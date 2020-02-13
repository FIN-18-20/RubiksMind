'use strict'

const { Command } = require('@adonisjs/ace')
const fs = require('fs')
const readline = require('readline')
const Database = use('Database')
const Scramble = use('App/Models/Scramble')

class ImportScramble extends Command {
  static get signature() {
    return `
      import:scramble
      { fileName?=scrambles : Name of the CSV file to import scrambles from }
    `
  }

  static get description() {
    return 'Import scrambles from CSV file into the Database'
  }

  async handle(args) {
    // Check if CSV file exists
    if (!fs.existsSync(`${args.fileName}.csv`)) {
      return this.error(`${this.icon('error')} The file ${args.fileName}.csv does not exist.`)
    }

    const now = new Date().toLocaleTimeString('en-US', { hour12: false })
    this.info(`Start importing the scrambles at ${now}.`)
    console.time('importScrambles')

    const readInterface = readline.createInterface({
      input: fs.createReadStream(`${args.fileName}.csv`),
      console: false,
    })

    // Read file and import to database
    let scrambles = 0
    for await (const line of readInterface) {
      if (line === 'scramble') {
        continue
      }
      await Scramble.create({ scramble: line }).catch(() => { })
      scrambles++
    }

    Database.close()
    console.timeEnd('importScrambles')
    const finished = new Date().toLocaleTimeString('en-US', { hour12: false })
    this.success(`${this.icon('success')} Import ${scrambles} Scrambles completed at ${finished}.`)
  }
}

module.exports = ImportScramble
