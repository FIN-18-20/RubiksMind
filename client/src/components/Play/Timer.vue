<template>
  <div
    class="text-10xl text-center text-blue-100 italic font-extrabold flex items-baseline justify-center select-none"
  >
    <div class="w-20">{{ timeObject.min[0] }}</div>
    <div class="w-20">{{ timeObject.min[1] }}</div>
    <div>:</div>
    <div class="w-20">{{ timeObject.sec[0] }}</div>
    <div class="w-20">{{ timeObject.sec[1] }}</div>
    <div>.</div>
    <div class="w-12 text-6xl">{{ timeObject.hundredth[0] }}</div>
    <div class="w-12 text-6xl">{{ timeObject.hundredth[1] }}</div>
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
