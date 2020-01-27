<template>
  <div class="flex flex-col items-center" style="width:220px;">
    <div class="flex items-center mt-2">
      <hr style="width:63px;" class="border-blue-200" />
      <h4 class="mx-2 text-base italic font-semibold text-blue-200">
        <span class="text-xl">S</span>TATS
      </h4>
      <hr style="width:63px;" class="border-blue-200" />
    </div>
    <div
      class="flex items-center justify-center mt-1 bg-blue-800 border border-blue-700 rounded-md"
      style="width:207px;height:127px;"
    >
      <div class="box-styles rounded-md" style="width:195px;height:115px;">
        <div v-if="timers.length > 0" class="flex items-center justify-around">
          <div class="my-2 stats-left">
            <div class="best">
              <p class="text-xs text-left text-blue-100">Best</p>
              <p
                class="mb-1 text-sm italic font-medium leading-none text-left text-blue-300"
                style="margin-top:-0.15rem;"
              >{{ bestTime }}</p>
            </div>
            <div class="worst">
              <p class="text-xs text-left text-blue-100">Worst</p>
              <p
                class="mb-1 text-sm italic font-medium leading-none text-left text-blue-300"
                style="margin-top:-0.15rem;"
              >{{ worstTime }}</p>
            </div>
            <div class="last">
              <p class="text-xs text-left text-blue-100">Last</p>
              <p
                class="text-sm italic font-medium leading-none text-left text-blue-300"
                style="margin-top:-0.15rem;"
              >{{ lastTime }}</p>
            </div>
          </div>
          <div class="my-2 stats-right">
            <div class="average">
              <p class="text-xs text-left text-blue-100">Average</p>
              <p
                class="mb-1 text-sm italic font-medium leading-none text-left text-blue-300"
                style="margin-top:-0.15rem;"
              >{{ averageTime }}</p>
            </div>
            <div class="avg5">
              <p class="text-xs text-left text-blue-100">Avg 5</p>
              <p
                class="mb-1 text-sm italic font-medium leading-none text-left text-blue-300"
                style="margin-top:-0.15rem;"
              >{{ average5Time }}</p>
            </div>
            <div class="avg12">
              <p class="text-xs text-left text-blue-100">Avg 12</p>
              <p
                class="text-sm italic font-medium leading-none text-left text-blue-300"
                style="margin-top:-0.15rem;"
              >{{ average12Time }}</p>
            </div>
          </div>
        </div>
        <div v-else class="flex flex-col items-center justify-center w-full h-full">
          <svg width="47" height="36">
            <use xlink:href="#stats" />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.box-styles {
  background: linear-gradient(181.21deg, #2a4365 0.81%, #1f3451 89.6%);
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.25);
}
</style>

<script>
import { mapState } from 'vuex'

export default {
  computed:{
    ...mapState('timer', ['timers']),
    bestTime(){
      const timesSorted = [...this.timers].sort((first, next) => first.time - next.time)
      return this.displayTime(timesSorted[0].time)
    },
    worstTime(){
      const timesSorted = [...this.timers].sort((first, next) => next.time - first.time)
      return this.displayTime(timesSorted[0].time)
    },
    lastTime(){
      return this.displayTime(this.timers[this.timers.length - 1].time)
    },
    averageTime(){
      const average = this.timers.reduce((accumulator, time) => accumulator + time.time, 0)/ this.timers.length
      return this.displayTime(average.toFixed(0))
    },
    average5Time(){
      const reversedArr = [...this.timers].reverse()
      const slicedArr = reversedArr.slice(0,5)
      const average = slicedArr.reduce((accumulator, time) => accumulator + time.time, 0) / slicedArr.length
      return this.displayTime(average.toFixed(0))
    },
    average12Time(){
      const reversedArr = [...this.timers].reverse()
      const slicedArr = reversedArr.slice(0,12)
      const average = slicedArr.reduce((accumulator, time) => accumulator + time.time, 0) / slicedArr.length
      return this.displayTime(average.toFixed(0))
    }
  },
  methods: {
    displayTime(msTime) {
      let min = parseInt(msTime / 60000)
      let sec = parseInt((msTime - (min * 60000)) / 1000)
      let hundredth = msTime % 1000
      console.log(hundredth)
      if (hundredth > 99) {
        hundredth = Math.floor(hundredth / 10)
      }

      min = min.toString()
      sec = sec.toString()
      hundredth = hundredth.toString()

      if (min.length < 2) {
        min = '0' + min
      }

      if (sec.length < 2) {
        sec = '0' + sec
      }

      if (hundredth.length < 2) {
        hundredth = '0' + hundredth
      }
      return min + ':' + sec + '.' + hundredth
    }
  },
}
</script>