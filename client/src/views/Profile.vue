<template>
  <div class="w-full">
    <div class="italic font-bold text-center text-blue-200">
      <!-- <svg
        v-if="profile.user.country_code === 'WR'"
        class="block w-6 h-6 mx-auto border border-blue-300 rounded-full"
      >
        <use xlink:href="#world" />
      </svg>
      <flag
        v-else
        :iso="profile.user.country_code.toLowerCase()"
        style="height:24px; width:24px;"
        class="w-16 h-16 border border-blue-300 rounded-full"
      /> -->
      <div class="flex items-center justify-center">
        <hr class="sm:w-32 w-12" />
        <div class="flex items-center mx-4">
          <div class="whitespace-no-wrap">
            <span class="sm:text-xl text-lg">Y</span>
            <span class="sm:text-lg text-base uppercase">our profile</span>
          </div>
          <!-- <span class="sm:text-xl ml-1 text-lg uppercase">{{ profile.user.username }}</span> -->
        </div>
        <hr class="sm:w-32 w-12" />
      </div>
      <div
        v-if="timers.length" 
        class="text-sm italic font-normal text-blue-200"
      >Joined on {{ registerDate }}</div>
    </div>

    <div
      v-if="timers.length"
      class="sm:flex sm:items-start sm:justify-around max-w-3xl mx-auto mt-2"
    >
      <div class="sm:inline-block p-2 mt-3 bg-blue-800 border border-blue-700 rounded-md">
        <div class="box-styles flex items-center justify-around leading-none rounded-md">
          <div class="px-6 pb-2">
            <div class="mt-2">
              <p class="text-xs text-left text-blue-100">Best</p>
              <p class="text-sm italic font-medium text-left text-blue-300">{{ bestTime }}</p>
            </div>
            <div class="mt-2">
              <p class="text-xs text-left text-blue-100">Worst</p>
              <p class="text-sm italic font-medium text-left text-blue-300">{{ worstTime }}</p>
            </div>
            <div class="mt-2">
              <p class="text-xs text-left text-blue-100">Last</p>
              <p class="text-sm italic font-medium text-left text-blue-300">{{ lastTime }}</p>
            </div>
            <div class="mt-2">
              <p class="text-xs text-left text-blue-100">Total resolutions</p>
              <p
                class="text-sm italic font-medium text-left text-blue-300"
              >{{ timers.length }}</p>
            </div>
          </div>
          <div class="px-6 pb-2 ml-4">
            <div class="mt-2">
              <p class="text-xs text-left text-blue-100">Average</p>
              <p class="text-sm italic font-medium text-left text-blue-300">{{ averageTime }}</p>
            </div>
            <div class="mt-2">
              <p class="text-xs text-left text-blue-100">Avg 5</p>
              <p class="text-sm italic font-medium text-left text-blue-300">{{ averageXTime(5) }}</p>
            </div>
            <div class="mt-2">
              <p class="text-xs text-left text-blue-100">Avg 12</p>
              <p class="text-sm italic font-medium text-left text-blue-300">{{ averageXTime(12) }}</p>
            </div>
            <div class="mt-2"></div>
          </div>
        </div>
      </div>
      <div
        class="sm:inline-block p-2 mt-4 overflow-y-scroll bg-blue-800 border border-blue-700 rounded-md"
        style="max-height: 600px; scrollbar-width: none;"
      >
        <div class="box-styles rounded-md">
          <div class="px-4 py-1 text-sm text-blue-100">Last {{ timers.length }} scores:</div>
          <div
            v-for="(time, index) in timers"
            :key="time.id"
            :class="[index % 2 === 0 ? 'bg-blue-1000' : 'bg-blue-900', {'rounded-b-md': index === timers.length - 1}]"
            class="sm:px-4 flex items-center justify-between px-8 py-1 text-sm text-blue-300"
          >
            <div class="flex items-center">
              <svg
                :class="getTimeColor(displayTime(time.time, true))"
                class="w-4 h-4 fill-current"
              >
                <use :xlink:href="getTimeIcon(displayTime(time.time, true))" />
              </svg>
              <div class="w-16 ml-2">{{ displayTime(time.time, true) }}</div>
            </div>
            <div class="flex items-center">
              <svg class="w-3 h-3 ml-4 text-blue-600 fill-current">
                <use xlink:href="#calendar" />
              </svg>
              <div class="ml-2">{{ new Date(time.date).toLocaleDateString() }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="text-center">
      <div class="mt-12">You have no time saved.</div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { formatTimer } from '@/mixins/formatTimer'
import { statsTimer } from '@/mixins/statsTimer'

export default {
  mixins: [
    formatTimer,
    statsTimer,
  ],

  data() {
    return {
      fetched: false,
      profile: {},
    }
  },

  computed: {
    registerDate() {
      return new Date(this.timers[this.timers.length - 1].date).toLocaleDateString()
    },
    ...mapState('timer', ['timers']),
  },

  methods: {
    getTimeColor(time) {
      switch (time) {
        case this.bestTime:
          return 'text-orange-400'
        case this.getXBest(2):
          return 'text-silver'
        case this.getXBest(3):
          return 'text-orange-700'
        default:
          return 'text-blue-600'
      }
    },
    getTimeIcon(time) {
      switch (time) {
        case this.bestTime:
        case this.getXBest(2):
        case this.getXBest(3):
          return '#trophy'
        default:
          return '#timer'
      }
    },
  }
}
</script>

<style scoped>
::-webkit-scrollbar {
  width: 0;
  height: 0;
}
</style>