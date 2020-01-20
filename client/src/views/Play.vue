<template>
  <div>
    <h1>Pipou</h1>
    <Scramble>
      <ScrambleTooltip />
    </Scramble>
    <Timer :time="resolutionTime" />
    <PlayButton @startTimer="startTimer" @stopTimer="stopTimer" />
  </div>
</template>

<script>
import PlayButton from '@/components/Play/PlayButton.vue'
import ScrambleTooltip from '@/components/Play/ScrambleTooltip.vue'
import Scramble from '@/components/Play/Scramble.vue'
import Timer from '@/components/Play/Timer.vue'
export default {
  components: {
    PlayButton,
    ScrambleTooltip,
    Scramble,
    Timer
  },

  data() {
    return {
      resolutionTime: 0,
      interval: null,
    }
  },

  methods: {
    startTimer() {
      this.resolutionTime = 0
      
      this.interval = setInterval(() => {
        this.resolutionTime += 10
      }, 10)
    },
    stopTimer() {
      clearInterval(this.interval)
    }
  }
}
</script>
