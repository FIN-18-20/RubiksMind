<template>
  <div>
    <h1>{{ action | capitalize }}</h1>
    <form @submit.prevent="postAction" class="flex flex-col items-start justify-center w-128">
      <div v-if="action === 'register'" class="w-128 flex flex-row justify-between px-12 my-2">
        <label for="username">Username</label>
        <input
          v-model="username"
          id="username"
          class="text-black ml-4 rounded"
          type="text"
          name="username"
        />
      </div>
      <div class="w-128 flex flex-row justify-between px-12 my-2">
        <label for="email">E-mail</label>
        <input
          v-model="email"
          id="passemailword"
          class="text-black ml-4 rounded"
          type="email"
          name="email"
        />
      </div>
      <div class="w-128 flex flex-row justify-between px-12 my-2">
        <label for="password">Password</label>
        <input
          v-model="password"
          id="password"
          class="text-black ml-4 rounded"
          type="password"
          name="password"
        />
      </div>
      <div v-if="action === 'register'" class="w-128 flex flex-row justify-between px-12 my-2">
        <label for="confirmPassword">Confirm Password</label>
        <input
          v-model="confirmPassword"
          @blur="verifyPasswords"
          id="confirmPassword"
          class="text-black ml-4 rounded"
          type="password"
          name="confirmPassword"
        />
      </div>
      <p class="w-128 h-6 text-red-600 text-sm px-24 text-right">{{ bottomMessage }}</p>
      <button
        class="w-64 mx-auto bg-blue-500 rounded my-2 p-1 disabled:opacity-50 disabled:cursor-not-allowed"
        type="submit"
        :disabled="action === 'register' && !passwordIsValid"
      >{{ action | capitalize }}</button>

      <button @click="authProvider = 'github'">Github</button>
      <button @click="authProvider = 'google'">Google</button>
      <!--<button @click="authProvider = 'discord'">Discord</button>
      <button @click="authProvider = 'twitter'">Twitter</button>-->
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  },
  props: {
    action: {
      type: String,
      required: true,
      validator: function (value) {
        return ['login', 'register'].indexOf(value) !== -1
      }
    },
    loginRoute: {
      type: String,
      default: 'login'
    },
    registerRoute: {
      type: String,
      default: 'register'
    }
  },
  data() {
    return {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      errorMessage: '',
      authProvider: 'local',

      actionsRoutes: {
        login: this.loginRoute,
        register: this.registerRoute
      }
    }
  },
  computed: {
    passwordIsValid: function () {
      if (this.action === 'register') {
        if (this.confirmPassword !== '') {
          return this.password === this.confirmPassword
        }
        return false
      }
      return true
    },
    bottomMessage: function () {
      if (this.errorMessage !== '') {
        return this.errorMessage
      }
      return this.passwordIsValid ? '' : 'Passwords don\'t match !'
    },
  },
  methods: {
    ...mapActions('auth', ['login']),
    async postAction() {
      if (this.authProvider === 'local') {
        if (this.passwordIsValid) {
          this.$axios
            .post(this.actionsRoutes[this.action], {
              username: this.username,
              email: this.email,
              password: this.password
            })
            .then(async response => {
              if (response.status === 201) {
                const { refreshToken, token, user } = response.data
                await this.login({ token, refreshToken, user })
                this.$router.push('/')
              }
            })
            .catch(error => {
              if (error.response) {
                switch (error.response.status) {
                  case 401: {
                    console.warn(error.response.data)
                    this.errorMessage = error.response.data
                    break
                  }
                  case 403: {
                    console.warn('You are already connected !')
                    this.errorMessage = 'You are already connected !'
                    break
                  }
                  default: {
                    console.warn(error.response.data)
                    break
                  }
                }
              }
              else {
                console.error(error)
              }
            })
        } else {
          console.warn('Passwords don\'t match')
        }
      } else {
        this.$axios
          .post(this.actionsRoutes[this.action] + '/' + this.authProvider)
          .then(response => {
            if (response.status === 201) {
              window.location.href = response.data
            }
          })
      }
    },
    verifyPasswords() {
      /*if (this.password !== this.confirmPassword) {

      }*/
    },
  },
}
</script>
