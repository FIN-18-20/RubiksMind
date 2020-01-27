<template>
  <div
    class="text-10xl text-center text-blue-100 italic font-extrabold flex items-baseline justify-center select-none"
  >
    <div class="w-20">{{ displayTime.min[0] }}</div>
    <div class="w-20">{{ displayTime.min[1] }}</div>
    <div>:</div>
    <div class="w-20">{{ displayTime.sec[0] }}</div>
    <div class="w-20">{{ displayTime.sec[1] }}</div>
    <div>.</div>
    <div class="w-12 text-6xl">{{ displayTime.hundredth[0] }}</div>
    <div class="w-12 text-6xl">{{ displayTime.hundredth[1] }}</div>
  </div>
</template>

<script>
import { formatTimer } from '@/mixins/formatTimer'

export default {
  mixins: [
    formatTimer(false),
  ],
  
  props: {
    time: {
      type: Number,
      required: true
    }
  },
}
</script>
