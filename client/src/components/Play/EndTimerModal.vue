<template>
  <div>
    <div
      v-if="timerStarted"
      class="fixed z-40 inset-0"
      style="background-color: rgba(31, 52, 81, .85);"
    ></div>
    <transition
      enter-active-class="transition ease-out duration-100"
      enter-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
    >
      <div
        v-if="timerStarted"
        @click="stopTimer"
        class="mt-1 fixed z-50 inset-0 flex flex-col items-center justify-center select-none"
      >
        <div class="rounded-lg transform transition-all sm:max-w-sm sm:w-full">
          <div class="mt-24">
            <span class="flex w-full rounded-md shadow-sm">
              <div
                class="button-gradient-red mx-auto inline-flex justify-center rounded-md px-12 py-8 bg-red-600 text-lg leading-tight font-bold text-blue-100 uppercase italic shadow-sm select-none focus:outline-none sm:text-sm sm:leading-5"
              >
                Tap anywhere
                <br />to
                <br />stop timer
              </div>
            </span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {

  computed: {
    timerStarted() {
      return this.state === 'started'
    },
    ...mapState({
      state: state => state.timer.state,
    }),
  },

  mounted() {
    window.addEventListener('touchstart', this.stopTimer)
  },

  beforeDestroy() {
    window.removeEventListener('touchstart', this.stopTimer)
  },

  methods: {
    stopTimer() {
      if (!this.timerStarted) return

      this.updateState('none')
      this.$emit('stopTimer')
    },
    ...mapActions('timer', ['updateState']),
  }
}
</script>
