<template>
  <div>
    <h1>Pipou</h1>
    <Scramble>
      <ScramblePopUp />
    </Scramble>
    <Timer />
  </div>
</template>

<script>
import ScramblePopUp from "@/components/Play/ScramblePopUp.vue"
import Scramble from "@/components/Play/Scramble.vue"
import Timer from "@/components/Play/Timer.vue"
export default {
  components: {
    ScramblePopUp,
    Scramble,
    Timer
  }
};
</script>
