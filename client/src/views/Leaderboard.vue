<template>
  <div>
    <TitleAndCup class="mb-2" />
    <TimeList />
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