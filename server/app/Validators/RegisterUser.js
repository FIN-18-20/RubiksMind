'use strict'

class RegisterUser {
  get validateAll() {
    return true
  }

  get rules() {
    return {
      username: 'required|regex:^[A-Za-z0-9]+([ _-][A-Za-z0-9]+)*$|min:4|max:24',
      email: 'required|email',
      password: 'required'
    }
  }

  get sanitizationRules() {
    return {
      username: 'trim|strip_tags|escape',
      email: 'trim|strip_tags|normalizeEmail',
      password: 'strip_tags'
    }
  }

  get messages() {
    return {
      'username.required': 'You must provide a username.',
      'username.regex': 'The username is not valid.',
      'username.min': 'Minimum length is 4 characters.',
      'username.max': 'Maximum length is 20 characters.',
      'email.required': 'You must provide an email address.',
      'email.email': 'You must provide a valid email address.',
      'password.required': 'You must provide a password.'
    }
  }
}

module.exports = RegisterUser
