'use strict'

class RegisterUser {
  get validateAll() {
    return true
  }

  get rules() {
    return {
      username: 'required|regex:^[A-Za-z0-9]+([ _-][A-Za-z0-9]+)*$|min:4|max:24|unique:users,username',
      email: 'required|email',
      password: 'required',
      country_code: 'required|validCountryCode'
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
      'username.unique': 'The username is already taken',
      'email.required': 'You must provide an email address.',
      'email.email': 'You must provide a valid email address.',
      'password.required': 'You must provide a password.',
      'country_code.required': 'You must provide a location.',
      'country_code.validCountryCode': 'The country code is not valid.'
    }
  }
}

module.exports = RegisterUser
