<template>
  <div v-if="fetched">
    <div v-if="userFound">
      <div class="flex items-center">
        <h1>
          Profile of
          <span
            class="text-lg text-blue-200 font-semibold border-b-2 border-blue-200"
          >{{ profile.user.username }}</span>
        </h1>
        <div class="ml-2">{{ profile.user.country_code }}</div>
      </div>
      <div class="mt-2 text-blue-200 italic">Joined on {{ registerDate }}</div>

      <div v-if="timers.length" class="flex flex-col items-start">
        <div class="mt-3 inline-block p-2 bg-blue-800 border border-blue-700 rounded-md">
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
            </div>
          </div>
        </div>
        <div class="mt-4 inline-block p-2 bg-blue-800 border border-blue-700 rounded-md">
          <div class="box-styles px-4 py-2 rounded-md">
            <div class="text-sm text-blue-100">Last {{ profile.times.length }} scores:</div>
            <div
              v-for="(time) in profile.times"
              :key="time.id"
              class="flex items-center text-sm text-blue-300"
            >
              <div class="w-16">{{ displayTime(time.time, true) }}</div>
              <div class="ml-4">{{ new Date(time.date).toLocaleDateString() }}</div>
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
    this.fetched = true
  }
}
</script>
