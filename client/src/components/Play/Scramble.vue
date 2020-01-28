<template>
  <div class="relative inline-block select-none">
    <slot></slot>
    <div
      @click="updateScramble"
      class="text-2xl font-semibold text-blue-400 tracking-wider cursor-pointer"
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
