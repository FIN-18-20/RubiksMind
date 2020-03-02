'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
const User = use('App/Models/User')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.post('/login/:provider?', 'AuthController.login').middleware(['guest'])
Route.post('/register', 'AuthController.register').middleware(['guest']).validator('RegisterUser')
Route.post('/register/check', 'AuthController.check').middleware(['guest']).validator('RegisterUser')
Route.get('/logout', 'AuthController.logout').middleware(['auth'])
Route.get('/oauth-connection-successfull/:provider', 'AuthController.callback')
Route.get('/refresh', 'AuthController.refresh')

Route.get('/test', async () => {

  const example = new User()
  example.username = 'Laurent'
  example.password = '1234'

  await example.save()

  return await User.all()
}).middleware(['auth'])

Route.get('/test-auth', async () => {

  const example = new User()
  example.username = 'Laurent'
  example.password = '1234'

  return example;
}).middleware(['auth'])

Route.get('/scramble', 'CubeController.scramble')

//Times
Route.get('/times/all', 'TimeController.index').middleware(['auth'])
Route.post('/times/create', 'TimeController.create').middleware(['auth'])
Route.delete('/times/delete/:id', 'TimeController.delete').middleware(['auth'])