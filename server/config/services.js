'use strict'

/*
|--------------------------------------------------------------------------
| Services Configuration
|--------------------------------------------------------------------------
|
| This is general purpose file to define configuration for multiple services.
| The below config is for the ally provider. Make sure to save it inside
| config/services.js file.
|
| Happy Coding :)
|
*/

const Env = use('Env')

module.exports = {
  ally: {
    /*
    |--------------------------------------------------------------------------
    | Google Configuration
    |--------------------------------------------------------------------------
    |
    | You can access your application credentials from the google developers
    | console. https://console.developers.google.com
    |
    */
    google: {
      clientId: Env.get('GOOGLE_CLIENT_ID'),
      clientSecret: Env.get('GOOGLE_CLIENT_SECRET'),
      redirectUri: `http://localhost/oauth-connection-successfull/google`
    },

    /*
    |--------------------------------------------------------------------------
    | Github Configuration
    |--------------------------------------------------------------------------
    |
    | You can access your application credentials from the github developers
    | console. https://github.com/settings/developers
    |
    */
    github: {
      clientId: Env.get('GITHUB_CLIENT_ID'),
      clientSecret: Env.get('GITHUB_CLIENT_SECRET'),
      redirectUri: `http://localhost/oauth-connection-successfull/github`
    },

    /*
    |--------------------------------------------------------------------------
    | Discord Configuration
    |--------------------------------------------------------------------------
    |
    | You can access your application credentials from the discord developers
    | console. https://discordapp.com/developers/applications
    |
    */
    discord: {
      clientId: Env.get('DISCORD_CLIENT_ID'),
      clientSecret: Env.get('DISCORD_CLIENT_SECRET'),
      redirectUri: `http://localhost/oauth-connection-successfull/discord`
    }
  }
}
