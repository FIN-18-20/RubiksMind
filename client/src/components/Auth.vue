<template>
  <div>
    <div v-if="!secondStep">
      <div
        class="max-w-md w-full px-4 py-6 flex items-center justify-center bg-blue-800 border border-blue-700 rounded-md"
      >
        <div class="box-styles py-5 px-8 rounded-md sm:px-10">
          <form @submit.prevent="action === 'register' ? postNextStep() : loginAction()">
            <div class="flex items-center justify-center mb-2">
              <hr style="width:50px;" class="border-blue-200" />
              <h4 class="mx-2 text-base italic text-blue-200">{{ action === 'register' ? 'Register' : 'Login' }}</h4>
              <hr style="width:50px;" class="border-blue-200" />
            </div>

            <div>
              <div class="flex justify-between">
                <label
                  for="email"
                  class="ml-1 block text-xs font-medium leading-5 text-blue-600"
                >Email address</label>
                <span
                  v-if="errorMessage.email !== ''"
                  class="mr-1 block text-xs italic leading-5 text-red-400"
                >{{ errorMessage.email }}</span>
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
                <label
                  for="password"
                  class="ml-1 block text-xs font-medium leading-5 text-blue-600"
                >Password</label>
                <span
                  v-if="errorMessage.password !== ''"
                  class="mr-1 block text-xs italic leading-5 text-red-400"
                >{{ errorMessage.password }}</span>
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

            <div v-if="action === 'register'" class="mt-2">
              <div class="flex justify-between">
                <label
                  for="confirmPassword"
                  class="ml-1 block text-xs font-medium leading-5 text-blue-600"
                >Confirm Password</label>
                <span
                  v-if="errorMessage.confirmPassword !== '' "
                  class="mr-1 block text-xs italic leading-5 text-red-400"
                >{{ errorMessage.confirmPassword }}</span>
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
            <div v-if="action === 'login' && errorMessage.login != ''" class="text-center">
              <span class="text-xs italic leading-5 text-red-400 mt-1">{{ errorMessage.login }}</span>
            </div>
            <div class="mt-5">
              <span class="block w-full rounded-md shadow-sm">
                <button
                  type="submit"
                  class="w-full flex justify-center py-3 px-4 text-base text-blue-100 rounded-md button-gradient focus:outline-none transition duration-150 ease-in-out"
                >{{ action === 'register' ? 'Register' : 'Login' }}</button>
              </span>
            </div>
          </form>
          <div class="mt-5">
            <div class="flex items-center justify-center mb-3">
              <hr style="width:50px;" class="border-blue-200" />
              <h4
                class="mx-2 text-xs italic text-blue-200 sm:text-sm"
              >{{ windowWidth > 320 ? 'Or connect with' : 'Or' }}</h4>
              <hr style="width:50px;" class="border-blue-200" />
            </div>

            <div class="mt-4 grid grid-cols-2 gap-4">
              <div>
                <span
                  class="w-full h-12 inline-flex rounded-md shadow-sm"
                  style="padding:2px;background-image:linear-gradient(90deg, rgba(7,201,104,1) 0%, rgba(231,69,57,1) 50%, rgba(228,173,69,1) 100%);"
                >
                  <button
                    @click="authProvider = 'google'"
                    type="button"
                    class="w-full inline-flex justify-center items-center py-1 px-3 rounded-md bg-blue-100 text-blue-900 hover:text-blue-600 focus:outline-none transition duration-150 ease-in-out"
                  >
                    <svg class="h-4 w-4 flex-shrink-0">
                      <use xlink:href="#google-logo" />
                    </svg>
                    <span
                      class="text-xs ml-2 leading-5 font-medium"
                    >{{ windowWidth > 360 ? 'Coming Soon' : 'Coming Soon' }}</span>
                  </button>
                </span>
              </div>
              <div>
                <span
                  class="w-full h-12 inline-flex rounded-md shadow-sm"
                  style="padding:2px;background-color:#1B1F23;"
                >
                  <button
                    @click="authProvider = 'github'"
                    type="button"
                    class="w-full inline-flex justify-center items-center py-1 px-3 rounded-md bg-blue-100 text-blue-900 hover:text-blue-600 focus:outline-none transition duration-150 ease-in-out"
                  >
                    <svg class="h-4 w-4 flex-shrink-0">
                      <use xlink:href="#github-logo" />
                    </svg>
                    <span
                      class="text-xs ml-2 leading-5 font-medium"
                    >{{ windowWidth > 360 ? 'Coming Soon' : 'Coming Soon' }}</span>
                  </button>
                </span>
              </div>
              <div>
                <span
                  class="w-full h-12 inline-flex rounded-md shadow-sm"
                  style="padding:2px;background-color:#1DA1F2"
                >
                  <button
                    type="button"
                    class="w-full inline-flex justify-center items-center py-1 px-3 rounded-md bg-blue-100 hover:font-semi-bold text-blue-900 hover:text-blue-600 focus:outline-none transition duration-150 ease-in-out"
                  >
                    <svg class="h-4 w-4 flex-shrink-0">
                      <use xlink:href="#twitter-logo" />
                    </svg>
                    <span
                      class="text-xs ml-2 leading-5 font-medium"
                    >{{ windowWidth > 360 ? 'Coming Soon' : 'Coming Soon' }}</span>
                  </button>
                </span>
              </div>
              <div>
                <span
                  class="w-full h-12 inline-flex rounded-md shadow-sm"
                  style="padding:2px;background-color:#7289DA;"
                >
                  <button
                    type="button"
                    class="w-full inline-flex justify-center items-center py-1 px-3 rounded-md bg-blue-100 text-blue-900 hover:text-blue-600 focus:outline-none transition duration-150 ease-in-out"
                  >
                    <svg class="h-4 w-4 flex-shrink-0">
                      <use xlink:href="#discord-logo" />
                    </svg>
                    <span
                      class="text-xs ml-2 leading-5 font-medium"
                    >{{ windowWidth > 360 ? 'Coming Soon' : 'Coming Soon' }}</span>
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
        class="max-w-md w-full px-4 py-6 flex items-center justify-center mt-1 bg-blue-800 border border-blue-700 rounded-md"
      >
        <div class="box-styles py-2 px-8 rounded-md sm:px-10">
          <form @submit.prevent="registerAction()">
            <div class="flex items-center justify-center my-2">
              <hr style="width:50px;" class="border-blue-200" />
              <h4 class="mx-2 text-base italic text-blue-200">Register</h4>
              <hr style="width:50px;" class="border-blue-200" />
            </div>

            <h5
              class="text-center text-xs text-blue-300 italic mb-3"
            >Choose your username and country.</h5>

            <div>
              <div class="flex justify-between">
                <label
                  for="username"
                  class="ml-1 block text-xs font-medium leading-5 text-blue-600"
                >Username</label>
                <span
                  v-if="errorMessage.username !== '' "
                  class="mr-1 block text-xs italic leading-5 text-red-400"
                >{{ errorMessage.username }}</span>
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
                <label
                  for="country"
                  class="ml-1 block text-xs font-medium leading-5 text-blue-600"
                >Country</label>
                <span
                  v-if="errorMessage.country !== '' "
                  class="mr-1 block text-xs italic leading-5 text-red-400"
                >{{ errorMessage.country }}</span>
              </div>
              <div class="mt-1 rounded-md shadow-sm">
                <select
                  v-model="country"
                  id="country"
                  required
                  :class="[ errorMessage.country !== '' ? 'border-red-400' : 'border-blue-1000','bg-blue-1000 text-blue-300 appearance-none block w-full px-3 py-2 border  rounded-md placeholder-blue-500 focus:outline-none focus:border-blue-500 transition duration-150 ease-in-out sm:text-sm sm:leading-5']"
                >
                  <option value="WR">World</option>
                  <option
                    v-for="(c, index) in sortedCountryList"
                    :key="index"
                    :value="c.code"
                  >{{ c.name }}</option>
                </select>
              </div>
            </div>

            <div class="mt-5 pb-2">
              <span class="block w-full rounded-md shadow-sm">
                <button
                  type="submit"
                  class="w-full flex justify-center py-3 px-4 text-base text-blue-100 rounded-md button-gradient focus:outline-none transition duration-150 ease-in-out"
                >Create account</button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
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
        login: ''
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
    },
    ...mapState({
      windowWidth: state => state.windowWidth,
    }),
  },
  methods: {
    ...mapActions('auth', ['login']),
    sortErrorMessage(messages) {
      this.errorMessage = {
        username: '',
        country: '',
        email: '',
        password: '',
        confirmPassword: '',
      }
      messages.map(message => {
        if (message.field === 'country_code')
          this.errorMessage['country'] = message.message

        this.errorMessage[message.field] = message.message
        //console.log(this.errorMessage[message.field])
      })
    },
    registerAction() {
      this.$axios.post('/register', {
        username: this.username,
        email: this.email.toLowerCase(),
        password: this.password,
        country_code: this.country.toUpperCase()
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
    loginAction() {
      console.log('hello')
      this.$axios.post('/login', {
        email: this.email.toLowerCase(),
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
              case 400: {
                this.sortErrorMessage(error.response.data)
                break
              }
              case 401: {
                this.errorMessage.email = ' '
                this.errorMessage.password = ' '
                this.errorMessage.login = 'Bad credentials'
                break
              }
              case 403: {
                this.errorMessage.email = 'You are already connected !'
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
    async postNextStep() {
      if (this.authProvider === 'local') {
        if (this.samePasswords) {
          this.errorMessage.password = ''
          this.errorMessage.confirmPassword = ''
          if (this.action === 'register') {
            this.$axios.post('/register/check', {
              email: this.email.toLowerCase(),
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
        // SOCIAL AUTH TODO

        // this.$axios
        //   .post(this.actionsRoutes[this.action] + '/' + this.authProvider)
        //   .then(response => {
        //     if (response.status === 201) {
        //       window.location.href = response.data
        //     }
        //   })
      }
    }
  },
}
</script>

<style scoped>
.box-styles {
  background: linear-gradient(181.21deg, #2a4365 0.81%, #1f3451 89.6%);
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.25);
  scrollbar-width: none;
}
</style>
