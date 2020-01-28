<template>
  <div v-if="display" class="text-center">
    <div class="relative inline-flex items-center pl-3 pr-8 py-2 border border-blue-800 rounded-lg">
      <svg
        @click="updateExplanationMessage(false)"
        class="absolute right-0 top-0 mr-2 mt-2 w-2-5 h-2-5 text-blue-400 cursor-pointer hover:text-blue-300"
      >
        <use xlink:href="#cross-delete" />
      </svg>
      <svg class="w-8 h-8">
        <use xlink:href="#question-circle" />
      </svg>
      <div class="ml-3 text-left text-sm text-blue-300 italic">
        <div>
          Press and hold
          <span
            class="key inline-flex bg-blue-100 rounded-md text-xs text-blue-700 not-italic"
          >space</span> to start.
        </div>
        <div>The timer will start on key up.</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      display: state => state.settings.explanationMessage
    }),
  },

  methods: {
    ...mapActions('settings', ['updateExplanationMessage']),
  }
}
</script>

<style scoped>
.key {
  padding: 0 0.45rem;
  box-shadow: 0px 2px 0px 0px #3182ce, 0 5px 3px 0 rgba(0, 0, 0, 0.1),
    0 5px 2px 0 rgba(0, 0, 0, 0.06);
}
</style>
