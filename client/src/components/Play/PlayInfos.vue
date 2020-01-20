<template>
    <div>
        <div class="flex">
            <img src="@/assets/img/bolt.svg" alt="bolt-left">
                <h3 class="text-blue-200 font-semibold mx-1">LOCAL MODE</h3>
            <img src="@/assets/img/bolt.svg" style="transform:scaleX(-1);" alt="bolt-right">    
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
  }
}
</script>