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
        <div v-if="hasData">
          <transition-group name="times" tag="div">
            <div
              class="relative flex items-center justify-between"
              v-for="(time, index) in times.slice().reverse()"
              :key="time.try"
              :class="[(times.length - index) % 2 ? 'bg-blue-1000' : 'bg-blue-900' , index  === 0  ? 'rounded-t-md' : '', index === times.length - 1 ? 'rounded-b-md' : '' , 'w-full h-8']"
            >
              <div class="flex">
                <span class="w-6 ml-1 text-xs font-medium text-right text-blue-200">{{time.try}}.</span>
                <img
                  src="@/assets/img/trophy.svg"
                  class="ml-3"
                  alt="trophy"
                  v-if="time.personalBest"
                />
              </div>
              <span
                class="text-sm italic font-medium text-center text-blue-300 absoluteElement"
                @click="addTime"
              >{{time.time}}</span>
              <div
                class="flex items-center justify-center w-6 h-6 mr-2 cursor-pointer"
                @click="removeTime(times.length - 1 - index)"
              >
                <img
                  src="@/assets/img/cross-delete-score.svg"
                  class="w-auto h-3 cursor-pointer"
                  alt="deleteScore"
                />
              </div>
            </div>
          </transition-group>
        </div>
        <div v-else class="flex flex-col items-center justify-center w-1/5 w-full h-full">
          <img src="@/assets/img/timer.svg" alt="timer" />
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
        { try: 1, time: '00:58.24', personalBest: false },
        { try: 2, time: '00:58.24', personalBest: false },
        { try: 3, time: '00:58.24', personalBest: false },
        { try: 4, time: '00:58.24', personalBest: false },
        { try: 8, time: '00:03.47', personalBest: true },
        { try: 9, time: '00:58.24', personalBest: false },
        { try: 10, time: '59:59.10', personalBest: false },
        { try: 30, time: '00:58.24', personalBest: false },
        { try: 101, time: '01:17.24', personalBest: false },
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