<template>
  <div class="flex flex-col items-center" style="width:220px;">
    <div class="flex items-center mt-2">
      <hr style="width:59px;" class="border-blue-200">
      <h4 class="mx-2 text-base italic font-semibold text-blue-200"><span class="text-xl">G</span>RAPH</h4>
      <hr style="width:59px;" class="border-blue-200">
    </div>
    <div class="flex items-center justify-center mt-1 bg-blue-800 border border-blue-700 rounded-md" style="width:207px;height:113px;">
      <div class="box-styles rounded-md" style="width:195px;height:101px;">
        <div v-if="hasData" class="flex items-center justify-center w-full h-full">
          <progress-line :data="data" :width="190" :height="90" class="flex items-center justify-center w-full h-full"></progress-line>
        </div>
        <div v-else>
          <svg width="47" height="36">
            <use xlink:href="#stats" />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.box-styles {
  background: linear-gradient(181.21deg, #2a4365 0.81%, #1f3451 89.6%);
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.25);
}
</style>

<script>
import ProgressLine from './ProgressLine.js'

export default {
  components: {
    ProgressLine
  },
  data() {
    return {
      hasData: true,
      data:
        [
          39.45,
          23.45,
          40.45,
          50.45,
          34.45,
          20.45,
          44.45,
          30.45,
          44.45,
          45,
          32.45,
          33.45,
          20.45,
          28.45,
          23.45,
          20.45,
        ]
    }
  },
}
</script>