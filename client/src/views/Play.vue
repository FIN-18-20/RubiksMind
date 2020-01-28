<template>
  <div class="mt-12 text-center">
    <div class="w-full h-10">
      <Scramble class="group">
        <ScrambleTooltip class="group-hover:inline-block" />
      </Scramble>
    </div>
    <Timer :time="resolutionTime" />
    <PlayButton @startTimer="startTimer" @stopTimer="stopTimer" />
    <ExplanationMessage class="mt-4" />
    <play-infos></play-infos>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import PlayButton from '@/components/Play/PlayButton.vue'
import ScrambleTooltip from '@/components/Play/ScrambleTooltip.vue'
import Scramble from '@/components/Play/Scramble.vue'
import Timer from '@/components/Play/Timer.vue'
import PlayInfos from '@/components/Play/PlayInfos.vue'
import ExplanationMessage from '@/components/Play/ExplanationMessage.vue'

export default {
  components: {
    ExplanationMessage,
    PlayButton,
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
