<template>
  <div class="relative w-full text-center pb-32 sm:pb-0">
    <img src="@/assets/img/leaderboard-cube.svg" alt="left cube" class="absolute leftCube w-64 z-20 hidden md:block">
    <img src="@/assets/img/leaderboard-cube.svg" alt="rightcube" class="absolute rightCube w-64 z-20 hidden md:block">
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
            <router-link :to="{ name: 'play' }" class="flex flex-col items-center justify-between">
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
import PlayButton from '@/components/Play/PlayButton.vue'
import PlayButtonMobile from '@/components/Play/PlayButtonMobile.vue'
import ScrambleTooltip from '@/components/Play/ScrambleTooltip.vue'
import Scramble from '@/components/Play/Scramble.vue'
import Timer from '@/components/Play/Timer.vue'
import PlayInfos from '@/components/Play/PlayInfos.vue'
import ExplanationMessage from '@/components/Play/ExplanationMessage.vue'

export default {
  components: {
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
  top: 120px;.rightCube{
  top: 19%;
  right: 11%;
  transform: rotate(180deg);
  }

  .leftCube{
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

  .rightCube{
  top: 19%;
  right: -2%;
  transform: rotate(180deg);
  }

  .leftCube{
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

  .rightCube{
  top: 19%;
  right: 11%;
  transform: rotate(180deg);
  }

  .leftCube{
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

  .rightCube{
  top: 19%;
  right: 19%;
  transform: rotate(180deg);
  }

  .leftCube{
    top: 53%;
    left: 20%;
  }
}
</style>
