<template>
  <div v-if="fetched" class="w-full">
    <div v-if="userFound">
      <div class="text-center text-blue-200 font-bold italic">
        <svg
          v-if="profile.user.country_code === 'WR'"
          class="fill-current w-6 h-6 rounded-full border border-blue-300"
        >
          <use xlink:href="#world" />
        </svg>
        <flag
          v-else
          :iso="profile.user.country_code.toLowerCase()"
          style="height:24px; width:24px;"
          class="rounded-full border border-blue-300 w-16 h-16"
        />
        <div class="flex items-center justify-center">
          <hr class="w-12 sm:w-32" />
          <div class="mx-4 flex items-center">
            <span class="text-lg sm:text-xl">P</span>
            <p class="text-base uppercase sm:text-lg">
              rofile of
              <span class="text-lg sm:text-xl">{{ profile.user.username }}</span>
            </p>
          </div>
          <hr class="w-12 sm:w-32" />
        </div>
        <div class="text-sm text-blue-200 font-normal italic">Joined on {{ registerDate }}</div>
      </div>

      <div
        v-if="timers.length"
        class="mt-2 max-w-3xl mx-auto sm:flex sm:items-start sm:justify-around"
      >
        <div class="mt-3 p-2 bg-blue-800 border border-blue-700 rounded-md sm:inline-block">
          <div class="box-styles flex items-center justify-around rounded-md leading-none">
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
                >{{ profile.totalTimes }}</p>
              </div>
            </div>
            <div class="ml-4 px-6 pb-2">
              <div class="mt-2">
                <p class="text-xs text-left text-blue-100">Average</p>
                <p class="text-sm italic font-medium text-left text-blue-300">{{ averageTime }}</p>
              </div>
              <div class="mt-2">
                <p class="text-xs text-left text-blue-100">Avg 5</p>
                <p class="text-sm italic font-medium text-left text-blue-300">{{ average5Time }}</p>
              </div>
              <div class="mt-2">
                <p class="text-xs text-left text-blue-100">Avg 12</p>
                <p class="text-sm italic font-medium text-left text-blue-300">{{ average12Time }}</p>
              </div>
              <div class="mt-2">
                <p class="text-xs text-left text-blue-100">Rank</p>
                <p class="text-sm italic font-medium text-left text-blue-300">{{ profile.rank }}</p>
              </div>
            </div>
          </div>
        </div>
        <div
          class="mt-4 p-2 bg-blue-800 border border-blue-700 rounded-md overflow-y-scroll sm:inline-block"
          style="max-height: 600px; scrollbar-width: none;"
        >
          <div class="box-styles rounded-md">
            <div class="px-4 py-1 text-sm text-blue-100">Last {{ profile.times.length }} scores:</div>
            <div
              v-for="(time, index) in profile.times"
              :key="time.id"
              :class="[index % 2 === 0 ? 'bg-blue-1000' : 'bg-blue-900', {'rounded-b-md': index === profile.times.length - 1}]"
              class="flex items-center justify-between px-8 py-1 text-sm text-blue-300 sm:px-4"
            >
              <div class="flex items-center">
                <svg
                  :class="getTimeColor(displayTime(time.time, true))"
                  class="w-4 h-4 fill-current"
                >
                  <use :xlink:href="getTimeIcon(displayTime(time.time, true))" />
                </svg>
                <div class="ml-2 w-16">{{ displayTime(time.time, true) }}</div>
              </div>
              <div class="flex items-center">
                <svg class="ml-4 w-3 h-3 fill-current text-blue-600">
                  <use xlink:href="#calendar" />
                </svg>
                <div class="ml-2">{{ new Date(time.date).toLocaleDateString() }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div>The user has no time saved.</div>
      </div>
    </div>
    <div v-else class="mt-4">
      The user
      <span
        class="text-blue-200 font-semibold border-b-2 border-blue-200"
      >{{ $route.params.username }}</span> can not be found.
    </div>
  </div>
</template>

<script>
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
      return new Date(this.profile.user.date).toLocaleDateString()
    },
    timers() {
      return this.profile.times
    },
    userFound() {
      return this.fetched && Object.keys(this.profile).length !== 0
    }
  },

  async created() {
    this.fetched = false
    const res = await this.$axios.get(`/profile/${this.$route.params.username}`)
    this.profile = res.status === 200 ? res.data : {}
    console.log(res.data)
    this.fetched = true
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