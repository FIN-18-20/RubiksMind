'use strict'

class UserController {
    async login({ ally, auth, request, response }) {
        const { username, password, provider } = request.all();
        if (provider !== null) {
            try {
                let url = await ally.driver(provider).getRedirectUrl();

                return response.created(url);
            }
            catch (e) {
                return response.badRequest(e.message);
            }
        }
    }

    async callback({ ally, auth }) {
        console.log('callback received')
    }
}

module.exports = UserController
