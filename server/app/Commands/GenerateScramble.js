'use strict'

const { Command } = require('@adonisjs/ace')
const fs = require('fs')
const csvWriter = require('csv-write-stream')
const Cube = use('Cube')

class GenerateScramble extends Command {
  static get signature() {
    return `
      generate:scramble
      { number?=10 : Number of scrambles to generate }
      { fileName?=scrambles : Name of the CSV file }
    `
  }

  static get description() {
    return 'Generate scrambles and save it in a CSV file.'
  }

  async handle(args) {
    const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit' }
    const now = new Date().toLocaleTimeString('fr-FR', timeOptions)
    this.info(`Start creating the scrambles at ${now}.`)
    console.time('generateScrambles')

    const writer = fs.existsSync(`${args.fileName}.csv`) ? csvWriter({ sendHeaders: false }) : csvWriter({ headers: ['scramble'] }) 

    writer.pipe(fs.createWriteStream(`${args.fileName}.csv`, { flags: 'a' }))

    // Generate scrambles
    for (let i = 0; i < args.number; i++) {
      writer.write({ scramble: Cube.scramble() })
    }

    writer.end()
    console.timeEnd('generateScrambles')
    const finished = new Date().toLocaleTimeString('fr-FR', timeOptions)
    this.success(`${this.icon('success')} Generate ${args.number} Scrambles completed at ${finished}.`)
  }
}

module.exports = GenerateScramble
