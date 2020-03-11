<template>
  <div class="flex flex-col items-center">
    <div
      class="ffefefe flex items-center justify-center mt-1 bg-blue-800 border border-blue-700 rounded-md max-w-md w-full"
      style="height:550px;"
    >
      <div class="overflow-y-scroll box-styles rounded-md mx-3" style="width:410px;height:515px;">
        <div v-if="hasData && times.length > 0">
          <transition-group name="times" tag="div">
            <div
              v-for="(time, index) in times"
              :key="index"
              class="relative flex items-center justify-between"
              :class="[
                (times.length - index) % 2 ? 'bg-blue-1000' : 'bg-blue-900' , 
                index === 0 ? 'rounded-t-md' : '',
                index === times.length - 1 ? 'rounded-b-md' : '' , 'w-full h-12',
                (times.length - index) % 2 ? 'dark-gradient-' + (index + 1) : 'light-gradient-' + (index + 1)
              ]"
            >
              <div
                v-if="isLoggedUser(time.username)"
                class="gradient-self absolute w-full h-full flex items-center"
              >
                <svg class="w-3 h-3 text-white ml-1 self-center">
                  <use xlink:href="#rubiks-icon" />
                </svg>
              </div>
              <div class="relative flex items-center justify-center">
                <span
                  :class="[isLoggedUser(time.username) ? 'text-blue-100' : 'text-blue-600', 'inline-block w-4 ml-4 mr-2 text-xs sm:text-sm font-medium text-right leading-none']"
                >{{ index + 1 }}</span>
                <svg
                  v-if="time.country_code === 'WR'"
                  class="fill-current w-6 h-6 rounded-full border border-blue-300"
                >
                  <use xlink:href="#world" />
                </svg>
                <flag
                  v-else
                  :iso="time.country_code.toLowerCase()"
                  style="height:24px;width:24px;"
                  class="rounded-full border border-blue-300 hidden sm:block"
                />
                <router-link
                  :to="{ name: 'profile', params: { username: time.username }}"
                  :class="[
                    time.username.length < 14 ? 'text-xs sm:text-sm' : 'text-xs', 'ml-2 w-12 truncate hover:text-blue-200 sm:w-24',
                    isLoggedUser(time.username) ? 'font-bold' : ''
                  ]"
                >{{ time.username }}</router-link>
              </div>
              <div
                :class="[isLoggedUser(time.username) ? 'text-blue-100' : 'text-blue-300' ,'pl-6 text-xs sm:text-base italic font-medium flex items-center text-center absoluteElement']"
              >
                <svg
                  :class="getTimeColor(index + 1)"
                  class="hidden fill-current w-4 h-4 mx-auto mr-2 sm:block"
                >
                  <use :xlink:href="getTimeIcon(index + 1)" />
                </svg>
                {{ displayTime(time.time, true) }}
              </div>
              <div
                :class="[isLoggedUser(time.username) ? 'text-blue-100' : 'text-blue-300']"
                class="mr-2 text-xs sm:text-sm italic text-center font-medium flex items-center sm:mr-4"
              >
                <svg class="hidden fill-current w-3 h-3 text-blue-600 mx-auto mr-2 sm:block">
                  <use xlink:href="#calendar" />
                </svg>
                {{ formatDate(time.date) }}
              </div>
            </div>
          </transition-group>
        </div>
        <div v-else class="flex flex-col items-center justify-center w-1/5 w-full h-full">
          <svg width="58" height="71" class="fill-current text-blue-800">
            <use xlink:href="#timer" />
          </svg>
          <p class="mx-auto mt-4 text-xs sm:text-xs italic text-blue-700">No times to display</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatTimer } from '@/mixins/formatTimer'
import { mapState } from 'vuex'

export default {
  mixins: [
    formatTimer,
  ],

  data() {
    return {
      hasData: false,
      times: [],
    }
  },

  computed: {
    ...mapState({
      user: state => state.auth.currentUser
    })
  },

  created() {
    this.getTimes()
  },

  methods: {
    formatDate(dateToParse) {
      let date = new Date(dateToParse)
      return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'numeric', year: 'numeric' })
    },
    getTimeColor(index) {
      switch (index) {
        case 1:
          return 'text-orange-400'
        case 2:
          return 'text-silver'
        case 3:
          return 'text-orange-700'
        default:
          return 'text-blue-600'
      }
    },
    getTimeIcon(index) {
      switch (index) {
        case 1:
        case 2:
        case 3:
          return '#trophy'
        default:
          return '#timer'
      }
    },
    getTimes() {
      this.$axios.get('/players/leaderboard')
        .then(res => {
          this.times = res.data
          this.hasData = true
        })
        .catch(err => {
          console.log(err)
          this.hasData = false
        })
    },
    isLoggedUser(name) {
      if (!this.user) return
      return this.user.name === name
    }
  }
}
</script>

<style scoped>
.box-styles {
  background: linear-gradient(181.21deg, #2a4365 0.81%, #1f3451 89.6%);
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.25);
  scrollbar-width: none;
}

::-webkit-scrollbar {
  width: 0;
  height: 0;
}

.absoluteElement {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.times-move {
  transition: transform 0.5s;
}

.times-leave-active {
  transition-duration: 0.5s;
}

.times-leave {
  max-height: 32px;
  overflow: hidden;
}

.times-leave-to {
  overflow: hidden;
  max-height: 0;
}

.gradient-self {
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.2) 0%,
    rgba(255, 255, 255, 0) 15%
  );
}

.light-gradient-1 {
  background: linear-gradient(
      266.65deg,
      rgba(247, 148, 30, 0.55) -21.85%,
      rgba(42, 67, 101, 0) 20.41%
    ),
    #2a4365;
}

.dark-gradient-2 {
  background: linear-gradient(
      260.78deg,
      rgba(255, 255, 255, 0.5) -36.55%,
      rgba(42, 67, 101, 0) 20.73%
    ),
    #1f3451;
}

.light-gradient-3 {
  background: linear-gradient(
      256.78deg,
      rgba(192, 86, 33, 0.45) -28.09%,
      rgba(42, 67, 101, 0) 20.28%
    ),
    #2a4365;
}
.dark-gradient-1 {
  background: linear-gradient(
      266.65deg,
      rgba(247, 148, 30, 0.55) -21.85%,
      rgba(42, 67, 101, 0) 20.41%
    ),
    #1f3451;
}

.light-gradient-2 {
  background: linear-gradient(
      260.78deg,
      rgba(255, 255, 255, 0.5) -36.55%,
      rgba(42, 67, 101, 0) 20.73%
    ),
    #2a4365;
}

.dark-gradient-3 {
  background: linear-gradient(
      256.78deg,
      rgba(192, 86, 33, 0.45) -28.09%,
      rgba(42, 67, 101, 0) 20.28%
    ),
    #1f3451;
}
</style>
