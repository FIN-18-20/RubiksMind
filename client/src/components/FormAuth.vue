<template>
  <div>
    <div v-if="!secondStep">
      <div
        class="flex items-center justify-center bg-blue-800 border border-blue-700 rounded-md"
        style="width:450px;height:550px;"
      >
        <div class="box-styles py-5 px-8 rounded-md sm:px-10" style="width:420px;height:512px;">
          <form @submit.prevent="postNextStep">
            <div class="flex items-center justify-center mb-2">
              <hr style="width:50px;" class="border-blue-200" />
              <h4 class="mx-2 text-base italic text-blue-200">
                Register
              </h4>
              <hr style="width:50px;" class="border-blue-200" />
            </div>

            <div>
              <div class="flex justify-between">
                <label for="email" class="ml-1 block text-xs font-medium leading-5 text-blue-600">
                  Email address
                </label>
                <span v-if="errorMessage.email !== ''" class="mr-1 block text-xs italic leading-5 text-red-400">
                  {{ errorMessage.email }}
                </span>
              </div>
              <div class="mt-1 rounded-md shadow-sm">
                <input
                  v-model="email" 
                  id="email"
                  required 
                  type="email"
                  name="email" 
                  :class="[ errorMessage.email !== '' ? 'border-red-400' : 'border-blue-1000','bg-blue-1000 text-blue-300 appearance-none block w-full px-3 py-2 border  rounded-md placeholder-blue-500 focus:outline-none focus:border-blue-500 transition duration-150 ease-in-out sm:text-sm sm:leading-5']"
                />
              </div>
            </div>

            <div class="mt-2">
              <div class="flex justify-between">
                <label for="password" class="ml-1 block text-xs font-medium leading-5 text-blue-600">
                  Password
                </label>
                <span v-if="errorMessage.password !== ''" class="mr-1 block text-xs italic leading-5 text-red-400">
                  {{ errorMessage.password }}
                </span>
              </div>
              <div class="mt-1 rounded-md shadow-sm">
                <input
                  v-model="password"
                  id="password"
                  required
                  type="password"
                  name="password"
                  :class="[ errorMessage.password !== '' ? 'border-red-400' : 'border-blue-1000','bg-blue-1000 text-blue-300 appearance-none block w-full px-3 py-2 border  rounded-md placeholder-blue-500 focus:outline-none focus:border-blue-500 transition duration-150 ease-in-out sm:text-sm sm:leading-5']"
                />
              </div>
            </div>

            <div class="mt-2">
              <div class="flex justify-between">
                <label for="confirmPassword" class="ml-1 block text-xs font-medium leading-5 text-blue-600">
                  Confirm Password
                </label>
                <span v-if="errorMessage.confirmPassword !== '' " class="mr-1 block text-xs italic leading-5 text-red-400">
                  {{ errorMessage.confirmPassword }}
                </span>
              </div>
              <div class="mt-1 rounded-md shadow-sm">
                <input
                  v-model="confirmPassword"
                  id="confirmPassword"
                  required
                  type="password"
                  :class="[ errorMessage.confirmPassword !== '' ? 'border-red-400' : 'border-blue-1000','bg-blue-1000 text-blue-300 appearance-none block w-full px-3 py-2 border  rounded-md placeholder-blue-500 focus:outline-none focus:border-blue-500 transition duration-150 ease-in-out sm:text-sm sm:leading-5']"
                />
              </div>
            </div>

            <div class="mt-5">
              <span class="block w-full rounded-md shadow-sm">
                <button type="submit" class="w-full flex justify-center py-3 px-4 text-base text-blue-100 rounded-md button-bg focus:outline-none transition duration-150 ease-in-out">
                  Register
                </button>
              </span>
            </div>
          </form>
          <div class="mt-5">
            <div class="flex items-center justify-center mb-3">
              <hr style="width:50px;" class="border-blue-200" />
              <h4 class="mx-2 text-sm italic text-blue-200">
                Or connect with
              </h4>
              <hr style="width:50px;" class="border-blue-200" />
            </div>

            <div class="mt-4 grid grid-cols-2 gap-4">
              <div>
                <span class="w-full h-12 inline-flex rounded-md shadow-sm" style="padding:2px;background-image:linear-gradient(90deg, rgba(7,201,104,1) 0%, rgba(231,69,57,1) 50%, rgba(228,173,69,1) 100%);">
                  <button @click="authProvider = 'google'" type="button" class="w-full inline-flex justify-center items-center py-1 px-3 rounded-md bg-blue-100 text-blue-900 hover:text-blue-600 focus:outline-none transition duration-150 ease-in-out">
                    <svg class="h-4 w-4">
                      <use xlink:href="#google-logo" />
                    </svg>
                    <span class="text-xs ml-2 leading-5 font-medium">Login with Google</span>
                  </button>
                </span>
              </div>
              <div>
                <span class="w-full h-12 inline-flex rounded-md shadow-sm" style="padding:2px;background-color:#1B1F23;">
                  <button @click="authProvider = 'github'" type="button" class="w-full inline-flex justify-center items-center py-1 px-3 rounded-md bg-blue-100 text-blue-900 hover:text-blue-600 focus:outline-none transition duration-150 ease-in-out">
                    <svg class="h-4 w-4">
                      <use xlink:href="#github-logo" />
                    </svg>
                    <span class="text-xs ml-2 leading-5 font-medium">Login with Github</span>
                  </button>
                </span>
              </div>
              <div>
                <span class="w-full h-12 inline-flex rounded-md shadow-sm" style="padding:2px;background-color:#1DA1F2">
                  <button type="button" class="w-full inline-flex justify-center items-center py-1 px-3 rounded-md bg-blue-100 hover:font-semi-bold text-blue-900 hover:text-blue-600 focus:outline-none transition duration-150 ease-in-out">
                    <svg class="h-4 w-4">
                      <use xlink:href="#twitter-logo" />
                    </svg>
                    <span class="text-xs ml-2 leading-5 font-medium">Login with Twitter</span>
                  </button>
                </span>
              </div>
              <div>
                <span class="w-full h-12 inline-flex rounded-md shadow-sm" style="padding:2px;background-color:#7289DA;">
                  <button type="button" class="w-full inline-flex justify-center items-center py-1 px-3 rounded-md bg-blue-100 text-blue-900 hover:text-blue-600 focus:outline-none transition duration-150 ease-in-out">
                    <svg class="h-4 w-4">
                      <use xlink:href="#discord-logo" />
                    </svg>
                    <span class="text-xs ml-2 leading-5 font-medium">Login with Discord</span>
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div
        class="mt-32 flex items-center justify-center mt-1 bg-blue-800 border border-blue-700 rounded-md"
        style="width:450px;height:340px;"
      >
        <div class="box-styles py-2 px-8 rounded-md sm:px-10" style="width:420px;height:300px;">
        
          <form @submit.prevent="postAction">
            <div class="flex items-center justify-center my-2">
              <hr style="width:50px;" class="border-blue-200" />
              <h4 class="mx-2 text-base italic text-blue-200">
                Register
              </h4>
              <hr style="width:50px;" class="border-blue-200" />
            </div>

            <h5 class="text-center text-xs text-blue-300 italic mb-3">Choose your username and country.</h5>

            <div>
              <div class="flex justify-between">
                <label for="username" class="ml-1 block text-xs font-medium leading-5 text-blue-600">
                  Username
                </label>
                <span v-if="errorMessage.username !== '' " class="mr-1 block text-xs italic leading-5 text-red-400">
                  {{ errorMessage.username }}
                </span>
              </div>
              <div class="mt-1 rounded-md shadow-sm">
                <input
                  v-model="username" 
                  id="username"
                  required 
                  type="username"
                  name="username"
                  :class="[ errorMessage.username !== '' ? 'border-red-400' : 'border-blue-1000','bg-blue-1000 text-blue-300 appearance-none block w-full px-3 py-2 border  rounded-md placeholder-blue-500 focus:outline-none focus:border-blue-500 transition duration-150 ease-in-out sm:text-sm sm:leading-5']"
                />
              </div>
            </div>

            <div class="mt-2">
              <div class="flex justify-between">
                <label for="country" class="ml-1 block text-xs font-medium leading-5 text-blue-600">
                  Country
                </label>
                <span v-if="errorMessage.country !== '' " class="mr-1 block text-xs italic leading-5 text-red-400">
                  {{ errorMessage.country }}
                </span>
              </div>
              <div class="mt-1 rounded-md shadow-sm">
                <select
                  v-model="country"
                  id="country" 
                  class="bg-blue-1000 text-blue-300 appearance-none block w-full px-3 py-2 border border-blue-1000 rounded-md placeholder-blue-500 focus:outline-none focus:border-blue-500 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  required
                >
                  <option>World</option>
                  <option v-for="(c, index) in sortedCountryList"
                          :key="index"
                          :value="c.code"
                  >{{ c.name }}</option>
                </select>
              </div>
            </div>

            <div class="mt-5">
              <span class="block w-full rounded-md shadow-sm">
                <button type="submit" class="w-full flex justify-center py-3 px-4 text-base text-blue-100 rounded-md button-bg focus:outline-none transition duration-150 ease-in-out">
                  Create account
                </button>
              </span>
            </div>

          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .box-styles {
    background: linear-gradient(181.21deg, #2a4365 0.81%, #1f3451 89.6%);
    box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.25);
    scrollbar-width: none;
  }

  .button-bg {
    background: linear-gradient(105.11deg, #7bbae0 -6.07%, #1a6fbf 93.36%);
  }
  .button-bg:hover {
    background: linear-gradient(105.11deg, #64a0c5 -6.07%, #105697 93.36%);
  }
</style>

<script>
import { mapActions } from 'vuex'
const countryList = require('country-list')

export default {
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
      country: '',
      email: '',
      password: '',
      confirmPassword: '',
      errorMessage: {
        username: '',
        country: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
      authProvider: 'local',
      secondStep: false,
      countries: countryList.getData(),

      actionsRoutes: {
        login: this.loginRoute,
        register: this.registerRoute
      }
    }
  },
  computed: {
    samePasswords: function () {
      if (this.action === 'register') {
        if (this.password !== '') {
          return this.password === this.confirmPassword
        }
        return true
      }
      return true
    },
    sortedCountryList: function () {
      return [...this.countries].sort((a, b) => {
        return a.name.localeCompare(b.name)
      })
    }
  },
  methods: {
    ...mapActions('auth', ['login']),
    ...mapActions(['changeLocalMode']),
    sortErrorMessage(messages) {
      this.errorMessage = {
        username: '',
        country: '',
        email: '',
        password: '',
        confirmPassword: '',
      }
      messages.map(message => {
        this.errorMessage[message.field] = message.message
        console.log(this.errorMessage[message.field])
      })
    },
    async postNextStep() {
      if (this.authProvider === 'local') {
        if (this.samePasswords) {
          this.errorMessage.password = ''
          this.errorMessage.confirmPassword = ''
          if (this.action === 'register') {
            this.$axios.post('/register/check', {
              username: 'temporaryName',
              email: this.email,
              password: this.password
            })
              .then(res => {
                console.log(res)
                this.secondStep = true
              })
              .catch(err => {
                if (err.response.status === 401) {
                  this.errorMessage.email = err.response.data
                }
                if (err.response.status === 400) {
                  this.sortErrorMessage(err.response.data)
                }
                else {
                  console.log(err)
                }
              })
          }
        } else {
          this.errorMessage.password = ''
          this.errorMessage.confirmPassword = 'Passwords don\'t match'
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
    async postAction() {
      this.$axios
        .post(this.actionsRoutes[this.action], {
          username: this.username,
          email: this.email,
          password: this.password,
          country: this.country
        })
        .then(async response => {
          if (response.status === 201) {
            const { refreshToken, token } = response.data
            await this.login({ token, refreshToken })
            this.$router.push('/')
          }
        })
        .catch(error => {
          if (error.response) {
            switch (error.response.status) {
              case 400: {
                this.sortErrorMessage(error.response.data)
                break
              }
              case 401: {
                this.errorMessage.username = error.response.data
                break
              }
              case 403: {
                this.errorMessage.username = 'You are already connected !'
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
    },
  },
}
</script>
