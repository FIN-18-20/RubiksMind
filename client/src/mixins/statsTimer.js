export const statsTimer = {
  computed: {
    bestTime() {
      const timesSorted = [...this.timers].sort((first, next) => first.time - next.time)
      return this.displayTime(timesSorted[0].time, true)
    },
    worstTime() {
      const timesSorted = [...this.timers].sort((first, next) => next.time - first.time)
      return this.displayTime(timesSorted[0].time, true)
    },
    lastTime() {
      return this.displayTime(this.timers[this.timers.length - 1].time, true)
    },
    averageTime() {
      const average = this.timers.reduce((accumulator, time) => accumulator + time.time, 0) / this.timers.length
      return this.displayTime(average.toFixed(0), true)
    },
    average5Time() {
      const reversedArr = [...this.timers].reverse()
      const slicedArr = reversedArr.slice(0, 5)
      const average = slicedArr.reduce((accumulator, time) => accumulator + time.time, 0) / slicedArr.length
      return this.displayTime(average.toFixed(0), true)
    },
    average12Time() {
      const reversedArr = [...this.timers].reverse()
      const slicedArr = reversedArr.slice(0, 12)
      const average = slicedArr.reduce((accumulator, time) => accumulator + time.time, 0) / slicedArr.length
      return this.displayTime(average.toFixed(0), true)
    }
  }
}
