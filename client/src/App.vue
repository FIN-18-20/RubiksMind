<template>
  <div class="app min-h-screen text-white font-sans">
    <SVGContainer />
    <div class="container mx-auto">
      <nav class="flex justify-between items-center py-6">
        <router-link :to="{ name: 'play' }">
          <img class="w-48" src="@/assets/img/logo.svg" alt="logo" />
        </router-link>
        <div class="leading-relaxed text-center flex">
          <div class="mr-6 pt-1">
            <svg class="w-2 h-2 text-blue-200 mx-auto -mb-1">
              <use xlink:href="#rubiks-icon" />
            </svg>
            <router-link 
              :to="{ name: 'leaderboard'}"
              class="leaddddd text-white pb-1"
            >Leaderboard</router-link>
          </div>
          <router-link
            :to="{ name: 'login' }"
            class="inline-block w-24 py-2 border border-blue-300 rounded-md"
          >Login</router-link>
          <router-link
            :to="{ name: 'register' }"
            class="ml-5 inline-block w-24 py-2 bg-blue-900 border border-blue-300 rounded-md"
          >Register</router-link>
        </div>
      </nav>
      <router-view />
    </div>
  </div>
</template>

<script>
import SVGContainer from '@/components/SVGContainer.vue'

export default {
  components: {
    SVGContainer,
  },
}
</script>

<style>
.app {
  background-image: linear-gradient(180deg, #2c5282 0%, #00224e 100%);
}

a.router-link-exact-active {
   /*color: #63b3ed;*/ 
}
.leaddddd.router-link-exact-active{
  @apply border-b border-solid border-blue-300 
}
</style>
