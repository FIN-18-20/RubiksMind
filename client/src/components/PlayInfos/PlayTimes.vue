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
        <div v-if="timers.length > 0">
          <transition-group name="timers" tag="div">
            <div
              v-for="(time, index) in timers.slice().reverse()"
              :key="index"
              class="relative flex items-center justify-between"
              :class="[(timers.length - index) % 2 ? 'bg-blue-1000' : 'bg-blue-900' , index === 0 ? 'rounded-t-md' : '', index === timers.length - 1 ? 'rounded-b-md' : '' , 'w-full h-8']"
            >
              <div class="flex items-center justify-center">
                <span
                  class="w-6 ml-1 text-xs font-medium text-right text-blue-200"
                >{{ timers.length - index }}.</span>
                <svg v-if="time === bestTime" width="13" height="12" class="ml-3">
                  <use xlink:href="#trophy" />
                </svg>
              </div>
              <span
                class="text-sm italic font-medium text-center text-blue-300 absoluteElement"
              >{{ displayTime(time.time) }}</span>
              <div
                @click="removeTimer(time.id)"
                class="flex items-center justify-center w-6 h-6 mr-2 cursor-pointer"
              >
                <svg class="w-auto h-3 text-blue-400 cursor-pointer hover:text-blue-300">
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
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState('timer', ['timers']),
    bestTime(){
      const timesSorted = [...this.timers].sort((first, next) => first.time - next.time)
      return timesSorted[0]
    }
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
    ...mapActions('timer', ['removeTimer'])
  },
}
</script>