'use strict';
const User = use('App/Models/User');

class AuthController {
  async register({ request, auth, response }) {
    return response.notFound();

    let { username, password } = request.all();
    const userDetails = {
      username,
      password,
      login_source: 'local',
    }

    if (await User.findBy('username', username) === null) {

      let user = await User.create(userDetails);

      let token = await auth.withRefreshToken().attempt(username, password);

      return response.created(token);
    }
    else {
      return response.unauthorized('User already exists');
    }
  }

  async login({ ally, auth, request, response, params }) {
    return response.notFound();

    const { username, password } = request.all();
    const provider = params.provider;
    if (provider !== null && provider !== 'local') { // Social login
      try {
        let url;
        if (provider === 'github') {
          url = await ally.driver(provider).scope(['user:email']).getRedirectUrl();
        }
        else {
          url = await ally.driver(provider).getRedirectUrl();
        }

        return response.created(url);
      }
      catch (e) {
        return response.badRequest(e.message);
      }
    }
    else { // Local login
      if(username === null || password === null) {
        return response.unauthorized('The fields can\'t be empty');
      }
      try {
        if (await auth.attempt(username, password)) {
          let user = await User.findBy('username', username);
          let token = await auth.withRefreshToken().generate(user);

          return response.created(token);
        }
        else {
          return response.unauthorized('Bad credentials');
        }

      }
      catch (e) {
        return response.unauthorized(e.message);
      }
    }
  }

  async callback({ ally, auth, params, response }) {
    return response.notFound();

    try {
      let socialUser = await ally.driver(params.provider).getUser();

      const userDetails = {
        username: socialUser.getNickname(),
        email: socialUser.getEmail(),
        login_source: 'oauth',
      }

      const whereClause = {
        email: socialUser.getEmail()
      }

      const user = await User.findOrCreate(whereClause, userDetails);
      let token = await auth.withRefreshToken().generate(user);

      return response.created(token);
    }
    catch (e) {
      return response.badRequest(e.message);
    }
  }

  async refresh({ auth, request, response }) {
    return response.notFound();
    
    let refreshToken = request.header('X-Refresh-Token');
    if (refreshToken === 'undefined') {
      return response.unauthorized('No refresh token');
    }
    try {
      let token = await auth.generateForRefreshToken(refreshToken);
      console.log(token);
      return response.created(token);
    } catch (e) {
      return response.unauthorized(e.message);
    }
  }
}

module.exports = AuthController;
