<template>
  <div class="app min-h-screen text-white font-sans overflow-hidden">
    <SVGContainer />
    <div class="relative container mx-auto px-2 md:px-0">
      <nav
        class="absolute left-0 right-0 flex justify-between items-center pt-4 px-2 sm:px-0 sm:pt-6"
      >
        <router-link :to="{ name: 'play' }">
          <img class="w-28 sm:w-48" src="@/assets/img/logo.svg" alt="logo" />
        </router-link>
        <div class="flex items-center leading-relaxed text-center">
          <template v-if="windowWidth < 380">
            <router-link :to="{ name: 'leaderboard'}">
              <svg class="fill-current w-6 h-6 text-blue-200 mx-auto">
                <use xlink:href="#trophy" />
              </svg>
            </router-link>
          </template>
          <template v-else>
            <router-link
              :to="{ name: 'leaderboard'}"
              class="leaderboard relative pb-1 text-sm text-white border-b border-transparent hover:text-blue-200 sm:text-base"
            >Leaderboard</router-link>
          </template>
          <div v-if="isLogged()">
            <a
              @click="methodLogout"
              class="ml-4 inline-block w-20 py-1 border border-blue-300 rounded-md cursor-pointer sm:ml-6 sm:w-24 sm:py-2"
            >Logout</a>
          </div>
          <div v-else>
            <router-link
              :to="{ name: 'login' }"
              class="ml-4 inline-block w-20 py-1 border border-blue-300 rounded-md sm:ml-6 sm:w-24 sm:py-2"
            >Login</router-link>
            <router-link
              :to="{ name: 'register' }"
              class="ml-5 hidden w-24 py-2 bg-blue-900 border border-blue-300 rounded-md sm:inline-block"
            >Register</router-link>
          </div>
        </div>
      </nav>
      <div class="app-content min-h-screen flex flex-col justify-center items-center">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import SVGContainer from '@/components/SVGContainer.vue'

export default {
  components: {
    SVGContainer,
  },

  computed: {
    ...mapState({
      windowWidth: state => state.windowWidth,
    }),
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

.app-content {
  padding-top: 55px;
}

@screen sm {
  .app-content {
    padding-top: 90px;
  }
}

.nav-mobile {
  box-shadow: 0px -2px 7px rgba(0, 0, 0, 0.25);
  border-radius: 27px 27px 0px 0px;
}

.leaderboard.router-link-exact-active {
  @apply border-blue-300;
}

.leaderboard.router-link-exact-active::after {
  content: "";
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 15 15' fill='%2390CDF4' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8.82833 1.76979L7.4338 0.382292C7.22702 0.176554 6.89246 0.177543 6.68655 0.384501L5.29784 1.78023C5.09193 1.98719 5.09263 2.32174 5.29941 2.52748L6.69394 3.91498C6.90072 4.12072 7.23528 4.11973 7.4412 3.91278L8.8299 2.51705C9.03582 2.31009 9.03511 1.97553 8.82833 1.76979Z' /%3E%3Cpath d='M6.37371 4.23666L4.97918 2.84915C4.7724 2.64342 4.43784 2.64441 4.23192 2.85136L2.84322 4.24709C2.63731 4.45405 2.63801 4.78861 2.84479 4.99434L4.23932 6.38185C4.4461 6.58758 4.78066 6.5866 4.98657 6.37964L6.37528 4.98391C6.58119 4.77695 6.58049 4.44239 6.37371 4.23666Z' /%3E%3Cpath d='M3.91915 6.70362L2.52461 5.31612C2.31783 5.11038 1.98328 5.11137 1.77736 5.31833L0.388657 6.71406C0.182741 6.92102 0.183443 7.25557 0.390223 7.46131L1.78476 8.84881C1.99154 9.05455 2.32609 9.05356 2.53201 8.8466L3.92071 7.45087C4.12663 7.24392 4.12593 6.90936 3.91915 6.70362Z' /%3E%3Cpath d='M11.2931 4.2221L9.89861 2.8346C9.69183 2.62886 9.35727 2.62985 9.15136 2.83681L7.76265 4.23254C7.55674 4.4395 7.55744 4.77405 7.76422 4.97979L9.15875 6.36729C9.36553 6.57303 9.70009 6.57204 9.90601 6.36508L11.2947 4.96935C11.5006 4.7624 11.4999 4.42784 11.2931 4.2221Z' /%3E%3Cpath d='M8.79197 6.73591L7.39744 5.34841C7.2165 5.16839 6.92377 5.16925 6.74359 5.35034L5.35489 6.74607C5.17471 6.92716 5.17532 7.2199 5.35626 7.39992L6.75079 8.78742C6.93172 8.96744 7.22446 8.96658 7.40464 8.78549L8.79334 7.38976C8.97352 7.20867 8.9729 6.91593 8.79197 6.73591Z' /%3E%3Cpath d='M6.33739 9.20291L4.94286 7.81541C4.76193 7.63539 4.46919 7.63626 4.28901 7.81734L2.90031 9.21307C2.72013 9.39416 2.72075 9.6869 2.90168 9.86692L4.29621 11.2544C4.47715 11.4344 4.76988 11.4336 4.95006 11.2525L6.33876 9.85676C6.51894 9.67567 6.51833 9.38293 6.33739 9.20291Z' /%3E%3Cpath d='M13.7114 6.72138L12.3168 5.33388C12.1359 5.15386 11.8432 5.15472 11.663 5.33581L10.2743 6.73154C10.0941 6.91263 10.0947 7.20537 10.2757 7.38539L11.6702 8.77289C11.8511 8.95291 12.1439 8.95204 12.324 8.77096L13.7127 7.37523C13.8929 7.19414 13.8923 6.9014 13.7114 6.72138Z' /%3E%3Cpath d='M11.2568 9.18836L9.86229 7.80086C9.68136 7.62084 9.38862 7.6217 9.20845 7.80279L7.81974 9.19852C7.63957 9.37961 7.64018 9.67234 7.82111 9.85236L9.21565 11.2399C9.39658 11.4199 9.68932 11.419 9.86949 11.2379L11.2582 9.8422C11.4384 9.66112 11.4378 9.36838 11.2568 9.18836Z' /%3E%3Cpath d='M8.84886 11.6085L7.45433 10.221C7.24755 10.0152 6.91299 10.0162 6.70708 10.2232L5.31837 11.6189C5.11246 11.8259 5.11316 12.1604 5.31994 12.3662L6.71447 13.7537C6.92125 13.9594 7.25581 13.9584 7.46172 13.7515L8.85043 12.3557C9.05635 12.1488 9.05564 11.8142 8.84886 11.6085Z' /%3E%3C/svg%3E");
  position: absolute;
  width: 10px;
  height: 10px;
  left: 50%;
  transform: translateX(-50%);
  top: -30%;
}
</style>
