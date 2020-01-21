'use strict'
const User = use('App/Models/User');

class AuthController {
    async register({ request, auth, response }) {

        let user = await User.create(request.all())

        //generate token for user;
        let token = await auth.generate(user)

        Object.assign(user, token)

        return response.json(user)
    }

    async login({ ally, auth, request, response, params }) {
        const { username, password } = request.all();
        const provider = params.provider;
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
            try {
                if (await auth.attempt(email, password)) {
                    let user = await User.findBy('email', email)
                    let token = await auth.generate(user)

                    Object.assign(user, token)
                    return response.json(user)
                }


            }
            catch (e) {
                console.log(e)
                return response.json({ message: 'You are not registered!' })
            }
        }
    }

    async callback({ ally, auth, params, response }) {
        try {
            let socialUser = await ally.driver(params.provider).getUser();

            const userDetails = {
                email: socialUser.getEmail(),
                token: socialUser.getAccessToken(),
                login_source: params.provider
            }

            const whereClause = {
                email: socialUser.getEmail()
            }

            const user = await User.findOrCreate(whereClause, userDetails)
            await auth.login(user)
        }
        catch (e) {
            return response.badRequest(e.message);
        }
    }
}

module.exports = AuthController
