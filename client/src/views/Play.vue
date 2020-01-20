<template>
  <div>
    <h1>Pipou</h1>
    <Scramble>
      <ScramblePopUp />
    </Scramble>
    <Timer />
    <PlayButton />
  </div>
</template>

<script>
import PlayButton from '@/components/Play/PlayButton.vue'
import ScramblePopUp from '@/components/Play/ScramblePopUp.vue'
import Scramble from '@/components/Play/Scramble.vue'
import Timer from '@/components/Play/Timer.vue'
export default {
  components: {
    PlayButton,
    ScramblePopUp,
    Scramble,
    Timer
  }
}
</script>
