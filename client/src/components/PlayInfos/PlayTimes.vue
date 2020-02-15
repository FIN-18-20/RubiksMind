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
              <div v-show="removeMessage && time.id === idToDelete"
                   class=" bg-blue-900 delete-gradient w-full h-full flex justify-center items-center absolute z-20"
              >
                <div @click="removeTimer(time.id), removeMessage = false, idToDelete = null"
                     class="flex justify-center items-center cursor-pointer transform hover:scale-105"
                >
                  <span class="text-xs font-medium">Delete</span>
                  <svg class="w-3 h-3 ml-1 text-white">
                    <use xlink:href="#trash" />
                  </svg>
                </div>
                <div @click="removeMessage = false, idToDelete = null"
                     class="ml-8 flex justify-center items-center cursor-pointer transform hover:scale-105"
                >
                  <span class="text-xs font-medium">Undo</span>
                  <svg class="w-3 h-3 ml-1 text-white">
                    <use xlink:href="#cross-delete" />
                  </svg>
                </div>
              </div>
              <div class="flex items-center justify-center">
                <span v-show="time.id !== idToDelete"
                      class="w-6 ml-1 text-xs font-medium text-right text-blue-200"
                >{{ timers.length - index }}.</span>
                <svg v-if="time === bestTime && time.id !== idToDelete" width="13" height="12" class="ml-3 fill-current text-orange-400">
                  <use xlink:href="#trophy" />
                </svg>
              </div>
              <span v-show="time.id !== idToDelete"
                    class="text-sm italic font-medium text-center text-blue-300 absoluteElement"
              >{{ displayTime(time.time, true) }}</span>
              <div
                v-show="time.id !== idToDelete"
                @click="confirmRemove(time.id)"
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

.delete-gradient {
  background: linear-gradient(90deg, rgba(221,0,0,0.44861694677871145) 0%, rgba(255,0,0,0) 60%);
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
import { formatTimer } from '@/mixins/formatTimer'
import { mapState, mapActions } from 'vuex'

export default {
  mixins: [
    formatTimer,
  ],
  data() {
    return {
      idToDelete: null,
      removeMessage: false
    }
  },
  computed: {
    ...mapState('timer', ['timers']),
    bestTime() {
      const timesSorted = [...this.timers].sort((first, next) => first.time - next.time)
      return timesSorted[0]
    }
  },
  methods: {
    ...mapActions('timer', ['removeTimer']),
    confirmRemove(id) {
      this.idToDelete = id
      this.removeMessage = true
    },
  },
}
</script>