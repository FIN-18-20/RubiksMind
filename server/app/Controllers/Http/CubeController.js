'use strict'

const Cube = use('Cube');

class CubeController {
  scramble({ response }) {
    return response.json({
      scramble: Cube.scramble(),
    });
  }
}

module.exports = CubeController
