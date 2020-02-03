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
              v-for="(time, index) in times.slice().reverse()"
              :key="index"
              class="relative flex items-center justify-between"
              :class="[(times.length - index) % 2 ? 'bg-blue-1000' : 'bg-blue-900' , index === 0 ? 'rounded-t-md' : '', index === times.length - 1 ? 'rounded-b-md' : '' , 'w-full h-12']"
            >
              <div class="flex items-center justify-center">
                <span
                  class="w-6 ml-1 text-xs font-medium text-right text-blue-600"
                >{{ index + 1 }}</span>
                <div
                  :class="'flag-icon-' + time.country"
                  class="w-4
                   h-4 ml-2 flag-icon flag-icon-squared flag-icon rounded-full"
                ></div>
                <div class="ml-2 text-sm">
                  {{ time.username }}
                </div>
              </div>
              <span
                class=" pl-8 text-md italic font-medium flex items-center text-center text-blue-300 absoluteElement"
              >
                <svg class="fill-current w-4 h-4 text-blue-600 mx-auto mr-2"> /** Delete the fill tag in the svg container  */
                  <use xlink:href="#timer" />
                </svg>
                {{ time.time }}</span>
              <div
                class="mr-2 text-sm italic font-medium flex items-center text-center text-blue-300"
              >
                <svg class="fill-current w-3 h-3 text-blue-600 mx-auto mr-2">
                  <use xlink:href="#calendar" />
                </svg>
                {{ time.date }}
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
      hasData: true,
      times: [
        { country: 'ch', username: 'Rasmelthortue', time: '00:58.24', date: '24.01.2020' },
        { country: 'fr', username: 'LazGreve', time: '00:58.24', date: '24.01.2020' },
        { country: 'br', username: 'Lazhino', time: '00:58.24', date: '24.01.2020' },
        { country: 'ch', username: 'LazBank', time: '00:58.24', date: '24.01.2020' },
        { country: 'be', username: 'LazFrite', time: '00:58.24', date: '24.01.2020' },
        { country: 'ch', username: 'LazNeutre', time: '00:58.24', date: '24.01.2020' },
      ]
    }
  },
  methods: {
    addTime() {
      this.times.push({ time: '00:00.00', personalBest: false })
    },
    removeTime(index) {
      this.times.splice(index, 1)
    }
  }
}
</script>