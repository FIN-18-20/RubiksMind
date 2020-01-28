const { ServiceProvider } = require('@adonisjs/fold')

class CubeProvider extends ServiceProvider {
  register() {
    this.app.singleton('Cube', () => {
      return new (require('.'))()
    })
  }

  boot() {
    // InitSolver
    use('Cube')
  }
}

module.exports = CubeProvider
