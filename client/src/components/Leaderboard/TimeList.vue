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
              :key="time.try"
              class="relative flex items-center justify-between"
              :class="[(times.length - index) % 2 ? 'bg-blue-1000' : 'bg-blue-900' , index === 0 ? 'rounded-t-md' : '', index === times.length - 1 ? 'rounded-b-md' : '' , 'w-full h-8']"
            >
              <div class="flex items-center justify-center">
                <span class="w-6 ml-1 text-xs font-medium text-right text-blue-200">{{ time.try }}.</span>
                <svg v-if="time.personalBest" width="13" height="12" class="fill-current text-orange-400 ml-3">
                  <use xlink:href="#trophy" />
                </svg>
              </div>
              <span
                @click="addTime"
                class="text-sm italic font-medium text-center text-blue-300 absoluteElement"
              >{{ time.time }}</span>
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
      hasData: true,
      times: [
        { try: 'O', username: 'Lazzer', time: '00:58.24', date: '24.01.2020' },
        { try: 'O', time: '00:58.24', personlBest: false },
        { try: 9, time: '00:58.24', personalBest: false },
        { try: 3, time: '00:08.24', personalBest: true },
        { try: 2, time: '00:05.24', personalBest: true },
        { try: 1, time: '00:03.47', personalBest: true },
      ]
    }
  },
  methods: {
    addTime() {
      this.times.push({ try: this.times.length + 20, time: '00:00.00', personalBest: false })
    },
    removeTime(index) {
      this.times.splice(index, 1)
    }
  }
}
</script>