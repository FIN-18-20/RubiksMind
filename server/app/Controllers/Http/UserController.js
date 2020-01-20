'use strict'

class UserController {
    async login({ ally, auth, request, response }) {
        const { username, password, provider } = request.all();
        if (provider !== null && provider !== 'local') {
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
        else {
            // Local auth
        }
    }

    async callback({ ally, auth }) {
        console.log('callback received')
    }
}

module.exports = UserController
