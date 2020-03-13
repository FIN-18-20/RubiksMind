<template>
  <div>
    <div v-if="timerStarted" class="fixed z-40 inset-0" style="background-color: rgba(0, 0, 0, 0.7);"></div>
    <transition
      enter-active-class="transition ease-out duration-100"
      enter-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div v-if="timerStarted" @click="stopTimer" class="fixed z-50 inset-0 flex items-center justify-center">
        <div
          class="bg-red-900 rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl border border-red-600 transform transition-all sm:max-w-sm sm:w-full sm:p-6"
        >
          <div>
            <div
              class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-800"
            >
              <svg
                class="h-10 w-10 text-red-600"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <div class="mt-3 text-center sm:mt-4">
              <h3 class="text-lg leading-6 font-medium text-red-200">Focus lost</h3>
              <div class="mt-2">
                <p
                  class="text-sm leading-5 text-red-100"
                >You will not be able to stop the timer with just a press on your space key.</p>
              </div>
            </div>
          </div>
          <div class="mt-5 sm:mt-6">
            <span class="flex w-full rounded-md shadow-sm">
              <button
                type="button"
                class="button-gradient-red inline-flex justify-center w-full rounded-md px-4 py-2 bg-red-600 text-base leading-loose font-medium text-white shadow-sm focus:outline-none transition ease-in-out duration-150 sm:text-sm sm:leading-5"
              >Tap anywhere to stop timer</button>
            </span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    timerStarted: {
      type: Boolean,
      required: true
    }
  },

  methods: {
    stopTimer() {
      this.$emit('stopTimer')
    }
  }
}
</script>