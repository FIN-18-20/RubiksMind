<template>
  <div>
    <TitleAndCup class="mb-2" />
    <TimeList class="relative z-20" />
    <img src="@/assets/img/leaderboard-cube.svg" alt="leftcube" class="absolute leftCube z-10 hidden sm:block">
    <img src="@/assets/img/leaderboard-cube.svg" alt="rightcube" class="absolute rightCube z-10 hidden sm:block">
  </div>
</template>

<script>
import TitleAndCup from '@/components/Leaderboard/TitleAndCup.vue'
import TimeList from '@/components/Leaderboard/TimeList.vue'
export default {
  components: {
    TitleAndCup,
    TimeList
  },
}
</script>

<style scoped>
  .leftCube{
    top: 25%;
    left: 21%;
  }

  .rightCube{
    top: 25%;
    right: 21%;
    transform: rotate(180deg)
  }
</style>