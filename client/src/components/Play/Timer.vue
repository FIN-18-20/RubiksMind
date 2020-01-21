<template>
  <div
    class="text-10xl text-center text-blue-100 italic font-extrabold flex items-baseline justify-center"
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
export default {
  props: {
    time: {
      type: Number,
      required: true
    }
  },

  computed: {
    displayTime() {
      let min = parseInt(this.time / 60000)
      let sec = parseInt((this.time - (min * 60000)) / 1000)
      let hundredth = this.time % 1000

      if (hundredth > 99) {
        hundredth = Math.floor(hundredth / 10)
      }

      min = min.toString()
      sec = sec.toString()
      hundredth = hundredth.toString()

      if (min.length < 2) {
        min = '0' + min
      }

      if (sec.length < 2) {
        sec = '0' + sec
      }

      if (hundredth.length < 2) {
        hundredth = '0' + hundredth
      }

      return { min, sec, hundredth }
    }
  }
}
</script>
