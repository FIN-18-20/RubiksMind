<template>
  <div class="relative inline-block select-none">
    <slot></slot>
    <div
      @click="updateScramble"
      class="px-12 text-sm font-semibold text-blue-400 tracking-wider cursor-pointer sm:px-0 sm:text-base md:text-xl lg:text-2xl"
    >{{ scramble }}</div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  computed: {
    ...mapState('cube', ['scramble']),
  },

  async created() {
    this.updateScramble()
  },

  methods: {
    ...mapActions('cube', ['updateScramble']),
  }
}
</script>
