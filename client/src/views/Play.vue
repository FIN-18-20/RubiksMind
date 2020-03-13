<template>
  <div class="relative w-full text-center pb-32 sm:pb-0">
    <template v-if="windowWidth < breakpoints.sm">
      <EndTimerModal @stopTimer="stopTimer" :resolution-time="resolutionTime" />
    </template>

    <div
      v-if="lostFocus && false"
      class="fixed z-40 inset-0"
      style="background-color: rgba(0, 0, 0, 0.7);"
    ></div>
    <transition
      enter-active-class="transition ease-out duration-100"
      enter-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div v-if="lostFocus && false" class="fixed z-50 inset-0 flex items-center justify-center">
        <div
          class="bg-blue-900 rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl border border-blue-600 transform transition-all sm:max-w-sm sm:w-full sm:p-6"
        >
          <div>
            <div
              class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-800"
            >
              <svg
                class="h-10 w-10 text-blue-600"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <div class="mt-3 text-center sm:mt-4">
              <h3 class="text-lg leading-6 font-medium text-blue-200">Focus lost</h3>
              <div class="mt-2">
                <p
                  class="text-sm leading-5 text-blue-100"
                >You will not be able to stop the timer with just a press on your space key.</p>
              </div>
            </div>
          </div>
          <div class="mt-5 sm:mt-6">
            <span class="flex w-full rounded-md shadow-sm">
              <button
                type="button"
                class="button-gradient inline-flex justify-center w-full rounded-md px-4 py-2 bg-blue-600 text-base leading-loose font-medium text-white shadow-sm focus:outline-none transition ease-in-out duration-150 sm:text-sm sm:leading-5"
              >Take focus back</button>
            </span>
          </div>
        </div>
      </div>
    </transition>

    <img
      src="@/assets/img/leaderboard-cube.svg"
      alt="left cube"
      class="absolute leftCube w-64 z-20 select-none hidden md:block"
    />
    <img
      src="@/assets/img/leaderboard-cube.svg"
      alt="rightcube"
      class="absolute rightCube w-64 z-20 select-none hidden md:block"
    />
    <template v-if="windowWidth > breakpoints.md && status === 'Personal best'">
      <svg class="star-left-xl absolute w-20 h-20 text-orange-400">
        <use xlink:href="#star" />
      </svg>
      <svg class="star-left absolute w-12 h-12 text-orange-400" style="transform: rotate(-20deg);">
        <use xlink:href="#star" />
      </svg>

      <svg class="star-right-xl absolute w-20 h-20 text-orange-400">
        <use xlink:href="#star" />
      </svg>
      <svg class="star-right absolute w-12 h-12 text-orange-400" style="transform: rotate(20deg);">
        <use xlink:href="#star" />
      </svg>
    </template>
    <div class="relative z-30">
      <div
        :class="statusColor"
        class="flex items-center justify-center h-10 text-sm font-semibold italic uppercase md:text-base"
      >{{ status }}</div>
      <div class="w-full min-h-10">
        <Scramble class="group">
          <ScrambleTooltip class="group-hover:inline-block" />
        </Scramble>
      </div>
      <div
        :class="statusColor"
        class="flex items-start justify-center h-6 text-base font-semibold italic md:text-xl"
      >{{ statusTime }}</div>
      <Timer :time="resolutionTime" />
      <template v-if="breakpoint !== 'mobile'">
        <PlayButton @startTimer="startTimer" @stopTimer="stopTimer" class="mt-6" />
        <ExplanationMessage class="mt-4" />
        <play-infos></play-infos>
      </template>
      <template v-else>
        <play-infos></play-infos>
        <nav class="fixed bottom-0 left-0 right-0 z-10 select-none">
          <div class="nav-mobile flex justify-between bg-blue-1000 px-12 py-2 leading-normal">
            <router-link :to="{ name: 'play' }" class="flex flex-col items-center justify-between">
              <svg class="w-8 h-8 text-blue-700">
                <use xlink:href="#home" />
              </svg>
              <span class="text-blue-100 text-xxs uppercase">Home</span>
            </router-link>
            <router-link
              :to="{ name: 'leaderboard' }"
              class="flex flex-col items-center justify-between"
            >
              <svg class="w-8 h-8 text-blue-700">
                <use xlink:href="#trophy" />
              </svg>
              <span class="text-blue-100 text-xxs uppercase">Scores</span>
            </router-link>
          </div>
        </nav>
        <PlayButtonMobile @startTimer="startTimer" @stopTimer="stopTimer" />
      </template>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { formatTimer } from '@/mixins/formatTimer'
import EndTimerModal from '@/components/Play/EndTimerModal.vue'
import PlayButton from '@/components/Play/PlayButton.vue'
import PlayButtonMobile from '@/components/Play/PlayButtonMobile.vue'
import ScrambleTooltip from '@/components/Play/ScrambleTooltip.vue'
import Scramble from '@/components/Play/Scramble.vue'
import Timer from '@/components/Play/Timer.vue'
import PlayInfos from '@/components/Play/PlayInfos.vue'
import ExplanationMessage from '@/components/Play/ExplanationMessage.vue'

export default {
  components: {
    EndTimerModal,
    ExplanationMessage,
    PlayButton,
    PlayButtonMobile,
    PlayInfos,
    ScrambleTooltip,
    Scramble,
    Timer
  },

  mixins: [
    formatTimer,
  ],

  data() {
    return {
      resolutionTime: 0,
      ticker: null,
      startTime: null,
      status: '',
      statusColor: '',
      statusTime: '',
      lostFocus: false,
    }
  },

  computed: {
    ...mapState({
      breakpoint: state => state.breakpoint,
      breakpoints: state => state.breakpoints,
      timers: state => state.timer.timers,
      windowWidth: state => state.windowWidth,
    }),
  },

  created() {
    this.getTimers()
  },

  methods: {
    AdjustingInterval(workFunc, interval, errorFunc, resetFunc, granularity) {
      let expected, timeout, resetStep

      this.start = () => {
        expected = Date.now() + interval
        timeout = setTimeout(step, interval)
        resetStep = 0
      }

      this.stop = () => {
        clearTimeout(timeout)
      }

      const step = () => {
        let drift = Date.now() - expected
        if (drift > interval) {
          if (errorFunc) {
            errorFunc(drift)
          }
        }
        workFunc()
        expected += interval
        resetStep++
        if (resetStep >= granularity) {
          resetFunc()
          resetStep = 0
          expected = Date.now()
        }

        timeout = setTimeout(step, Math.max(0, interval - drift))
      }
    },
    startTimer() {
      // Clear status
      this.status = ''
      this.statusTime = ''

      this.resolutionTime = 0
      this.startTime = Date.now()

      const doWork = () => {
        this.resolutionTime += 25

        this.lostFocus = !document.hasFocus()
      }

      const doError = drift => {
        console.log('Drift in timer', drift)
      }

      const fixTimerDrift = () => {
        this.resolutionTime = Date.now() - this.startTime
      }

      this.ticker = new this.AdjustingInterval(doWork, 25, doError, fixTimerDrift, 10)

      this.ticker.start()
      console.time('timer')
    },
    async stopTimer() {
      this.ticker.stop()
      console.timeEnd('timer')
      this.lostFocus = false

      this.updateScramble()

      // Impossible time
      if (this.resolutionTime < 2000) {
        this.statusColor = 'text-red-500'
        return this.status = 'Did not count - Impossible time'
      }

      await this.addTimer({ date: Date.now(), time: this.resolutionTime })

      // Check if PB
      const timesSorted = this.timers.length ? [...this.timers].sort((first, next) => first.time - next.time) : []
      if (timesSorted.length === 0 || timesSorted[0].time === this.resolutionTime) {
        this.statusColor = 'text-orange-400'
        this.status = 'Personal best'
        this.statusTime = timesSorted.length > 1 ? '-' + this.displayTime(timesSorted[1].time - this.resolutionTime, true) : ''
      } else {
        this.statusColor = 'text-red-500'
        this.statusTime = '+' + this.displayTime(this.resolutionTime - timesSorted[0].time, true)
      }
    },
    ...mapActions('cube', ['updateScramble']),
    ...mapActions('timer', ['addTimer', 'getTimers']),
  }
}
</script>

<style scoped>
.nav-mobile {
  box-shadow: 0px -2px 7px rgba(0, 0, 0, 0.25);
  border-radius: 27px 27px 0px 0px;
}

.star-left,
.star-right {
  top: 170px;
}

.star-left-xl,
.star-right-xl {
  top: 120px;
  .rightCube {
    top: 19%;
    right: 11%;
    transform: rotate(180deg);
  }

  .leftCube {
    top: 53%;
    left: 13%;
  }
}

@screen md {
  .star-left-xl {
    left: 60px;
  }

  .star-left {
    left: 20px;
  }

  .star-right-xl {
    right: 60px;
  }

  .star-right {
    right: 20px;
  }

  .rightCube {
    top: 19%;
    right: -2%;
    transform: rotate(180deg);
  }

  .leftCube {
    top: 53%;
    left: -0%;
  }
}

@screen lg {
  .star-left-xl {
    left: 180px;
  }

  .star-left {
    left: 120px;
  }

  .star-right-xl {
    right: 180px;
  }

  .star-right {
    right: 120px;
  }

  .rightCube {
    top: 19%;
    right: 11%;
    transform: rotate(180deg);
  }

  .leftCube {
    top: 53%;
    left: 13%;
  }
}

@screen xl {
  .star-left-xl {
    left: 290px;
  }

  .star-left {
    left: 230px;
  }

  .star-right-xl {
    right: 290px;
  }

  .star-right {
    right: 230px;
  }

  .rightCube {
    top: 19%;
    right: 19%;
    transform: rotate(180deg);
  }

  .leftCube {
    top: 53%;
    left: 20%;
  }
}
</style>
