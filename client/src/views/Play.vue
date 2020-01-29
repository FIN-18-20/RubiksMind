<template>
  <div class="mt-12 text-center">
    <div class="w-full h-10">
      <Scramble class="group">
        <ScrambleTooltip class="group-hover:inline-block" />
      </Scramble>
    </div>
    <Timer :time="resolutionTime" />
    <template v-if="breakpoint !== 'mobile'">
      <PlayButton @startTimer="startTimer" @stopTimer="stopTimer" />
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
</template>

<script>
import { mapActions, mapState } from 'vuex'
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

  data() {
    return {
      resolutionTime: 0,
      ticker: null,
      startTime: null,
    }
  },

  computed: {
    ...mapState(['breakpoint']),
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
    stopTimer() {
      this.ticker.stop()
      this.addTimer({ date: Date.now(), time: this.resolutionTime })
      console.timeEnd('timer')
    },
    ...mapActions('timer', ['addTimer', 'getTimers']),
  }
}
</script>

<style scoped>
.nav-mobile {
  box-shadow: 0px -2px 7px rgba(0, 0, 0, 0.25);
  border-radius: 27px 27px 0px 0px;
}
</style>
