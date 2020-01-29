<template>
  <div class="app min-h-screen text-white font-sans">
    <SVGContainer />
    <div class="container mx-auto px-2 md:px-0">
      <nav class="flex justify-between items-center p-4 sm:px-0 sm:py-6">
        <router-link :to="{ name: 'play' }">
          <img class="w-28 sm:w-48" src="@/assets/img/logo.svg" alt="logo" />
        </router-link>
        <div class="leading-relaxed text-center">
          <router-link
            :to="{ name: 'login' }"
            class="inline-block w-20 py-1 border border-blue-300 rounded-md sm:w-24 sm:py-2"
          >Login</router-link>
          <router-link
            :to="{ name: 'register' }"
            class="ml-5 hidden w-24 py-2 bg-blue-900 border border-blue-300 rounded-md sm:inline-block"
          >Register</router-link>
        </div>
      </nav>
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import SVGContainer from '@/components/SVGContainer.vue'

export default {
  components: {
    SVGContainer,
  },

  created() {
    this.loadAllSettings()
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
