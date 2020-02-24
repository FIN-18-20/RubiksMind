<template>
  <div class="app min-h-screen text-white font-sans">
    <SVGContainer />
    <div class="container mx-auto">
      <nav class="flex justify-between items-center py-6">
        <router-link :to="{ name: 'play' }">
          <img class="w-48" src="@/assets/img/logo.svg" alt="logo" />
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
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import SVGContainer from '@/components/SVGContainer.vue'

export default {
  components: {
    SVGContainer,
  },

  created() {
    this.loadAllSettings()
    this.loadAuth()
  },

  methods: {
    ...mapActions('settings', ['loadAllSettings']),
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
</style>
