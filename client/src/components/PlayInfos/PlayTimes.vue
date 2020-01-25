<template>
  <div class="flex flex-col items-center" style="width:220px;">
    <div class="flex items-center mt-2">
      <hr style="width:68px;" class="border-blue-200" />
      <h4 class="mx-2 text-base italic font-semibold text-blue-200">
        <span class="text-xl">T</span>IMES
      </h4>
      <hr style="width:68px;" class="border-blue-200" />
    </div>
    <div
      class="flex items-center justify-center mt-1 bg-blue-800 border border-blue-700 rounded-md"
      style="width:220px;height:280px;"
    >
      <div class="overflow-y-scroll box-styles rounded-md" style="width:200px;height:260px;">
        <div v-if="hasData && times.length > 0">
          <transition-group name="times" tag="div">
            <div
              v-for="(time, index) in times.slice().reverse()"
              :key="index"
              class="relative flex items-center justify-between"
              :class="[(times.length - index) % 2 ? 'bg-blue-1000' : 'bg-blue-900' , index === 0 ? 'rounded-t-md' : '', index === times.length - 1 ? 'rounded-b-md' : '' , 'w-full h-8']"
            >
              <div class="flex items-center justify-center">
                <span class="w-6 ml-1 text-xs font-medium text-right text-blue-200">{{ times.length - index }}.</span>
                <svg v-if="time === bestTime" width="13" height="12" class="ml-3">
                  <use xlink:href="#trophy" />
                </svg>
              </div>
              <span
                @click="addTime"
                class="text-sm italic font-medium text-center text-blue-300 absoluteElement"
              >{{ displayTime(time.time) }}</span>
              <div
                @click="removeTime(times.length - 1 - index)"
                class="flex items-center justify-center w-6 h-6 mr-2 cursor-pointer"
              >
                <svg
                  class="w-auto h-3 text-blue-400 cursor-pointer hover:text-blue-300"
                >
                  <use xlink:href="#cross-delete" />
                </svg>
              </div>
            </div>
          </transition-group>
        </div>
        <div v-else class="flex flex-col items-center justify-center w-1/5 w-full h-full">
          <svg width="58" height="71">
            <use xlink:href="#timer" />
          </svg>
          <p class="mx-auto mt-4 text-sm italic text-blue-700">No times to display</p>
        </div>
      </div>
    </div>
  </div>
</template>
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
</style>

<script>
export default {
  data() {
    return {
      isLocal: this.$store.state.localMode,
      hasData: null,
      dummyData: [
        { date: 1579980220571, time: 42671.85595703125, }, // Date: Sat Jan 25 2020 20:24:31 GMT+0100, time: 00:42.67
        { date: 1579980220571, time: 3316.85498046875, }, // Date: Sat Jan 25 2020 20:24:31 GMT+0100, time: 00:03.31
        { date: 1579980220571, time: 20211.68896484375, }, // Date: Sat Jan 25 2020 20:24:31 GMT+0100, time: 00:20.21
        { date: 1579980220571, time: 42671.85595703125, },
        { date: 1579980220571, time: 3216.85498046875, },
        { date: 1579980220571, time: 20211.68896484375, },
        { date: 1579980220571, time: 42671.85595703125, },
        { date: 1579980220571, time: 3316.85498046875, },
        { date: 1579980220571, time: 20211.68896484375, },
        { date: 1579980220571, time: 42671.85595703125, },
        { date: 1579980220571, time: 3316.85498046875, },
      ],
      times: [],
      bestTime: {}
    }
  },
  created() {
    this.loadData(this.isLocal)
  },
  methods: {
    displayTime(msTime) {
      let min = parseInt(msTime / 60000)
      let sec = parseInt((msTime - (min * 60000)) / 1000)
      let hundredth = msTime % 1000

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
    },
    getBestTime() {
      const timesSorted = [...this.times].sort((first, next) => first.time - next.time)
      this.bestTime = timesSorted[0]
    },
    addTime() {
      this.times.push({ date: Date.now() + 20, time: 2211.58896484375 })
      localStorage.times = JSON.stringify(this.times)
      this.getBestTime()
    },
    removeTime(index) {
      this.times.splice(index, 1)
      localStorage.times = JSON.stringify(this.times)
      this.getBestTime()
    },
    loadData(isLocal) {
      if (isLocal) {
        if (!localStorage.times) {
          // return this.hasData = false
          localStorage.times = JSON.stringify(this.dummyData)
        }
        this.times = JSON.parse(localStorage.times)
        if (this.times.length === 0) {
          return this.hasData = false
        }

        this.getBestTime()

        this.hasData = true
      } else {
        // Call API
      }
    }
  },
}
</script>