<template>
  <div class="mt-12 text-center">
    <Scramble class="group">
      <ScrambleTooltip class="group-hover:inline-block" />
    </Scramble>
    <Timer :time="resolutionTime" />
    <PlayButton @startTimer="startTimer" @stopTimer="stopTimer" />
    <ExplanationMessage class="mt-4" />
    <play-infos class="mt-4 flex flex-col items-center justify-center text-xl"></play-infos>
  </div>
</template>

<script>
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
    Timer,
  },

  data() {
    return {
      resolutionTime: 0,
      ticker: null,
    }
  },

  methods: {
    AdjustingInterval(workFunc, interval, errorFunc) {
      let expected, timeout

      this.start = () => {
        expected = Date.now() + interval
        timeout = setTimeout(step, interval)
      }

      this.stop = () => {
        clearTimeout(timeout)
      }

      const step = () => {
        let drift = Date.now() - expected
        if (drift > interval) {
          if (errorFunc) {
            errorFunc()
          }
        }
        workFunc()
        expected += interval

        timeout = setTimeout(step, Math.max(0, interval - drift))
      }
    },
    startTimer() {
      this.resolutionTime = 0

      const doWork = () => {
        this.resolutionTime += 10
      }

      const doError = () => {
        alert('[ALPHA] RUBIKSMIND - Error in timer')
      }

      this.ticker = new this.AdjustingInterval(doWork, 10, doError)

      this.ticker.start()
      console.time('timer')
    },
    stopTimer() {
      this.ticker.stop()
      console.timeEnd('timer')
    }
  }
}
</script>
