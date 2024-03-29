'use strict';
const User = use('App/Models/User');
const { validateAll, sanitize } = use('Validator')

class AuthController {

  async check({ request, auth, response }) {
    const rules = {
      email: 'required|email',
      password: 'required'
    }

    const messages = {
      'email.required': 'You must provide an email address.',
      'email.email': 'You must provide a valid email address.',
      'password.required': 'You must provide a password.'
    }

    const validation = await validateAll(request.all(), rules, messages)

    if (validation.fails()) {
      return response.badRequest(validation.messages())
    } else {
      const { email, password } = request.all()

      if (await User.findBy('email', email) === null)
        return response.ok()
      else
        return response.unauthorized('The email address is already taken.')
    }
  }

  async register({ request, auth, response }) {
    let { username, email, password, country_code } = request.all();
    const userDetails = {
      username,
      email,
      password,
      country_code,
      login_source: 'local',
    }

    if (await User.findBy('username', username) === null) {

      let user = await User.create(userDetails);

      let token = await auth.withRefreshToken().attempt(email, password);
      token.user = {
        name: user.username,
        country: user.country_code,
      }

      return response.created(token);
    }
    else {
      return response.unauthorized('The username is already taken.');
    }
  }

  async login({ ally, auth, request, response, params }) {
    const { email, password } = request.all();
    const provider = params.provider;
    if (provider !== null && provider !== 'local') { // Social login
      return response.notFound();
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
      const rules = {
        email: 'required|email',
        password: 'required'
      }

      const messages = {
        'email.required': 'You must provide an email address.',
        'email.email': 'You must provide a valid email address.',
        'password.required': 'You must provide a password.'
      }

      const validation = await validateAll(request.all(), rules, messages)

      if (validation.fails()) {
        return response.badRequest(validation.messages())
      } else {
        try {
          if (await auth.attempt(email, password)) {
            let user = await User.findBy('email', email);
            let token = await auth.withRefreshToken().generate(user);
            token.user = {
              name: user.username,
              country: user.country_code,
            }

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
  }

  async callback({ ally, auth, params, response }) {
    return response.notFound();

    try {
      let socialUser = await ally.driver(params.provider).getUser();

      const userDetails = {
        username: socialUser.getNickname(),
        email: socialUser.getEmail(),
        login_source: params.provider,
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

    let refreshToken = request.header('X-Refresh-Token');
    if (refreshToken === 'undefined') {
      return response.unauthorized('No refresh token');
    }
    try {
      let token = await auth.newRefreshToken().generateForRefreshToken(refreshToken);
      return response.created(token);
    } catch (e) {
      return response.unauthorized(e.message);
    }
  }

  async logout({ auth, request, response }) {
    let refreshToken = request.header('X-Refresh-Token');
    if (refreshToken === 'undefined') {
      return response.unauthorized('No refresh token');
    }
    try {
      await auth.revokeTokens([refreshToken], true);
      return response.ok()
    }
    catch (e) {
      return response.badRequest(e.message)
    }
  }
}

module.exports = AuthController;
