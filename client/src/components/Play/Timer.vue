<template>
  <div
    class="flex items-baseline justify-center text-6xl text-center text-blue-100 italic font-extrabold leading-none select-none sm:text-10xl"
  >
    <div class="w-12 sm:w-20">{{ timeObject.min[0] }}</div>
    <div class="w-12 sm:w-20">{{ timeObject.min[1] }}</div>
    <div>:</div>
    <div class="w-12 sm:w-20">{{ timeObject.sec[0] }}</div>
    <div class="w-12 sm:w-20">{{ timeObject.sec[1] }}</div>
    <div>.</div>
    <div class="w-8 text-5xl sm:text-6xl sm:w-12">{{ timeObject.hundredth[0] }}</div>
    <div class="w-8 text-5xl sm:text-6xl sm:w-12">{{ timeObject.hundredth[1] }}</div>
  </div>
</template>

<script>
import { formatTimer } from '@/mixins/formatTimer'

export default {
  mixins: [
    formatTimer,
  ],

  props: {
    time: {
      type: Number,
      required: true
    }
  },

  computed: {
    timeObject() {
      return this.displayTime(this.time, false)
    }
  }
}
</script>
