export const statsTimer = {
  computed: {
    bestTime() {
      return this.displayTime(this.timesSorted[0].time, true)
    },
    worstTime() {
      return this.displayTime(this.timesSorted[this.timesSorted.length - 1].time, true)
    },
    lastTime() {
      return this.displayTime(this.lastTimes[0].time, true)
    },
    averageTime() {
      const average = this.timers.reduce((accumulator, time) => accumulator + time.time, 0) / this.timers.length
      return this.displayTime(average.toFixed(0), true)
    },
    lastTimes() {
      return [...this.timers].sort((first, next) => next.id - first.id)
    },
    timesSorted() {
      return [...this.timers].sort((first, next) => first.time - next.time)
    }
  },

  methods: {
    averageXTime(x) {
      const slicedArr = this.lastTimes.slice(0, x)
      const average = slicedArr.reduce((accumulator, time) => accumulator + time.time, 0) / slicedArr.length
      return this.displayTime(average.toFixed(0), true)
    },
    getXBest(x) {
      return this.displayTime(this.timesSorted[x - 1].time, true)
    }
  }
}
