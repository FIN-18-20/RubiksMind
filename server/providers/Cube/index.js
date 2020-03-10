'use strict'

const CubeJs = require('cubejs');

class Cube {
  constructor() {
    CubeJs.initSolver()
  }

  scramble() {
    return CubeJs.scramble()
  }
}

module.exports = Cube
