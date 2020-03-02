<template>
  <div class="app min-h-screen text-white font-sans">
    <SVGContainer />
    <div class="container mx-auto">
      <nav class="flex justify-between items-center p-4 sm:px-0 sm:py-6">
        <router-link :to="{ name: 'play' }">
          <img class="w-28 sm:w-48" src="@/assets/img/logo.svg" alt="logo" />
        </router-link>
        <div class="leading-relaxed text-center">
          <div v-if="isLogged()">
            <a
              @click="methodLogout"
              class="inline-block w-24 py-2 border border-blue-300 rounded-md"
            >Logout</a>
          </div>
          <div v-else>
            <router-link
              :to="{ name: 'login' }"
              class="inline-block w-24 py-2 border border-blue-300 rounded-md"
            >Login</router-link>
            <router-link
              :to="{ name: 'register' }"
              class="ml-5 inline-block w-24 py-2 bg-blue-900 border border-blue-300 rounded-md"
            >Register</router-link>
          </div>
        </div>
      </nav>
      <router-view />
      <div v-if="windowWidth < 400">
        <nav class="fixed bottom-0 w-full z-10 select-none">
          <div class="nav-mobile flex justify-between bg-blue-1000 px-12 py-2 leading-normal">
            <router-link :to="{ name: 'play' }" class="flex flex-col items-center justify-between">
              <svg class="w-8 h-8 text-blue-700">
                <use xlink:href="#home" />
              </svg>
              <span class="text-blue-100 text-xxs uppercase">Home</span>
            </router-link>
            <router-link :to="{ name: 'play' }" class="flex flex-col items-center justify-between">
              <svg class="w-8 h-8 text-blue-700">
                <use xlink:href="#trophy" />
              </svg>
              <span class="text-blue-100 text-xxs uppercase">Scores</span>
            </router-link>
          </div>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { mapActions, mapState } from 'vuex'
import SVGContainer from '@/components/SVGContainer.vue'

export default {
  components: {
    SVGContainer,
  },

  computed: {
    ...mapState(['windowWidth']),
  },

  created() {
    this.loadAllSettings()
    this.loadAuth()
  },

  mounted() {
    this.updateWindowWidth(window.innerWidth)
    window.addEventListener('resize', this.handleWindowResize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleWindowResize)
  },

  methods: {
    handleWindowResize(event) {
      this.updateWindowWidth(event.currentTarget.innerWidth)
    },
    ...mapActions('settings', ['loadAllSettings']),
    ...mapActions(['updateWindowWidth']),
    ...mapActions('auth', ['logout', 'getLoggedState', 'loadAuth']),
    ...mapGetters('auth', ['isLogged']),
    methodLogout() {
      this.$axios.get('logout')
        .then(async () => {
          await this.logout()
        })
        .catch(error => {
          console.warn(error.message)
        })
    }
  }
}
</script>

<style>
.app {
  background-image: linear-gradient(180deg, #2c5282 0%, #00224e 100%);
}

a.router-link-exact-active {
  /* color: #63b3ed; */
}

.nav-mobile {
  box-shadow: 0px -2px 7px rgba(0, 0, 0, 0.25);
  border-radius: 27px 27px 0px 0px;
}
</style>
