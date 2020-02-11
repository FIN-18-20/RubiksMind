'use strict'

const { Command } = require('@adonisjs/ace')
const fs = require('fs')
const csvWriter = require('csv-write-stream')
const Cube = use('Cube')

class GenerateScramble extends Command {
  static get signature() {
    return `
      generate:scramble
      { number?=10 : Number of scrambles to create }
    `
  }

  static get description() {
    return 'Generate scrambles and save it in a CSV file.'
  }

  async handle(args) {
    this.info('Start creating the scrambles.')

    let writer
    if (!fs.existsSync('scrambles.csv')) {
      writer = csvWriter({ headers: ['scramble'] })
    }
    else {
      writer = csvWriter({ sendHeaders: false })
    }

    writer.pipe(fs.createWriteStream('scrambles.csv', { flags: 'a' }))

    for (let i = 0; i < args.number; i++) {
      writer.write({ scramble: Cube.scramble() })
    }

    writer.end()
    this.success(`${this.icon('success')} Generate ${args.number} Scrambles completed`)
  }
}

module.exports = GenerateScramble
