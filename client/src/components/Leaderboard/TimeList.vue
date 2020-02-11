<template>
  <div class="flex flex-col items-center">
    <div
      class="flex items-center justify-center mt-1 bg-blue-800 border border-blue-700 rounded-md"
      style="width:445px;height:550px;"
    >
      <div class="overflow-y-scroll box-styles rounded-md" style="width:410px;height:515px;">
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
                'gradient-' + (index + 1),
              ]"
            >
              <div class="flex items-center justify-center">
                <span class="w-6 ml-1 text-xs font-medium text-right text-blue-600">{{ index + 1 }}</span>
                <div
                  :class="'flag-icon-' + time.country_code.toLowerCase()"
                  class="w-4 h-4 ml-2 flag-icon flag-icon-squared flag-icon rounded-full"
                ></div>
                <div v-if="time.username.length < 14" class="ml-2 text-sm">{{ time.username }}</div>
                <div v-else class="ml-2 text-xs">{{ time.username }}</div>
              </div>
              <span
                class="pl-8 text-md italic font-medium flex items-center text-center text-blue-300 absoluteElement"
              >
                <svg :class="getTimeColor(index + 1)" class="fill-current w-4 h-4 mx-auto mr-2">
                  <use :xlink:href="getTimeIcon(index + 1)" />
                </svg>
                {{ displayTime(time.time, true) }}
              </span>
              <div
                class="mr-2 text-sm italic font-medium flex items-center text-center text-blue-300"
              >
                <svg class="fill-current w-3 h-3 text-blue-600 mx-auto mr-2">
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
          <p class="mx-auto mt-4 text-sm italic text-blue-700">No times to display</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatTimer } from '@/mixins/formatTimer'

export default {
  mixins: [
    formatTimer,
  ],
  data() {
    return {
      hasData: true,
      times: [],
    }
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
        })
        .catch(err => {
          console.log(err)
          this.hasData = false
        })
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

.gradient-1 {
  background: linear-gradient(
      266.65deg,
      rgba(247, 148, 30, 0.85) -21.85%,
      rgba(42, 67, 101, 0) 29.41%
    ),
    #2a4365;
}

.gradient-2 {
  background: linear-gradient(
      260.78deg,
      rgba(255, 255, 255, 0.8) -36.55%,
      rgba(42, 67, 101, 0) 27.73%
    ),
    #1f3451;
}

.gradient-3 {
  background: linear-gradient(
      256.78deg,
      rgba(192, 86, 33, 0.75) -28.09%,
      rgba(42, 67, 101, 0) 29.28%
    ),
    #2a4365;
}
</style>
