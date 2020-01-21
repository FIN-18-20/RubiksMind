<template>
    <div>
        <div class="flex" v-if="isLocal">
            <img src="@/assets/img/bolt.svg" alt="bolt-left">
                <h3 class="mx-1 font-semibold text-blue-200">LOCAL MODE</h3>
            <img src="@/assets/img/bolt.svg" style="transform:scaleX(-1);" alt="bolt-right">    
        </div>
        <div class="flex" v-else>
            <img src="@/assets/img/online.svg" alt="online-left">
                <h3 class="mx-1 font-semibold text-blue-200">ONLINE MODE</h3>
            <img src="@/assets/img/online.svg" alt="online-right">    
        </div>
        <div class="flex">
            <play-times></play-times>
        
          <div class="ml-4">
              <play-stats></play-stats>
              <play-graph></play-graph>
          </div>
        </div>
    </div>
</template>

<script>
import PlayTimes from '../PlayInfos/PlayTimes.vue'
import PlayStats from '../PlayInfos/PlayStats.vue'
import PlayGraph from '../PlayInfos/PlayGraph.vue'

export default {
  components: {
    PlayTimes,
    PlayStats,
    PlayGraph
  },
  data() {
    return {
      isLocal: true
    }
  },
}
</script>