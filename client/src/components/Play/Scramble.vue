<template>
  <div class="inline-block relative">
    <slot></slot>
    <div
      @click="generateScramble"
      class="text-2xl font-semibold text-blue-400 tracking-wider cursor-pointer"
    >{{ scramble }}</div>
  </div>
</template>

<script>
import Cube from 'cubejs'

export default {
  data() {
    return {
      scramble: ''
    }
  },

  async created() {
    console.time('SCRAMBLE')
    Cube.initSolver()
    this.generateScramble()
    console.timeEnd('SCRAMBLE')
  },

  methods: {
    generateScramble() {
      this.scramble = Cube.scramble()
    }
  }
}
</script>
