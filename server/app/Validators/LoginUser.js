'use strict'

class LoginUser {
  get validateAll () {
    return true
  }

  get rules() {
    return {
      email: 'required|email',
      password: 'required'
    }
  }

  get sanitizationRules() {
    return {
      email: 'trim|strip_tags|normalizeEmail',
      password: 'strip_tags'
    }
  }

  get messages() {
    return {
      'email.required': 'You must provide a email address.',
      'email.email': 'You must provide a valid email address.',
      'password.required': 'You must provide a password.'
    }
  }
}

module.exports = LoginUser
