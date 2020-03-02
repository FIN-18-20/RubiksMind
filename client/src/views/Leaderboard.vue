<template>
  <div class="w-full">
    <TitleAndCup class="mb-2" />
    <TimeList class="relative z-20" />
    <img src="@/assets/img/leaderboard-cube.svg" alt="leftcube" class="absolute leftCube z-10 select-none hidden sm:block">
    <img src="@/assets/img/leaderboard-cube.svg" alt="rightcube" class="absolute rightCube z-10 select-none hidden sm:block">
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

@screen md{
  .leftCube{
    top: 35%;
    left: -13%;
  }

  .rightCube{
    top: 35%;
    right: -13%;
    transform: rotate(180deg)
  }
}

@screen lg{
  .leftCube{
    top: 35%;
    left: 3%;
  }

  .rightCube{
    top: 35%;
    right: 3%;
    transform: rotate(180deg)
  }
}

@screen xl{
  .leftCube{
    top: 35%;
    left: 12%;
  }

  .rightCube{
    top: 35%;
    right: 12%;
    transform: rotate(180deg)
  }
}
  
</style>