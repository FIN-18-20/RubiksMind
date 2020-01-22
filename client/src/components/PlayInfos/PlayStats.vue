<template>
  <div class="flex flex-col items-center" style="width:220px;">
    <div class="flex items-center mt-2">
      <hr style="width:63px;" class="border-blue-200" />
      <h4 class="mx-2 text-base italic font-semibold text-blue-200">
        <span class="text-xl">S</span>TATS
      </h4>
      <hr style="width:63px;" class="border-blue-200" />
    </div>
    <div
      class="flex items-center justify-center mt-1 bg-blue-800 border border-blue-700 rounded-md"
      style="width:207px;height:127px;"
    >
      <div class="box-styles rounded-md" style="width:195px;height:115px;">
        <div v-if="hasData" class="flex items-center justify-around">
          <div class="my-2 stats-left">
            <div class="best">
              <p class="text-xs text-blue-100">Best</p>
              <p
                class="mb-1 text-sm italic font-medium leading-none text-blue-300"
                style="margin-top:-0.15rem;"
              >{{ stats[0] }}</p>
            </div>
            <div class="worst">
              <p class="text-xs text-blue-100">Worst</p>
              <p
                class="mb-1 text-sm italic font-medium leading-none text-blue-300"
                style="margin-top:-0.15rem;"
              >{{ stats[1] }}</p>
            </div>
            <div class="last">
              <p class="text-xs text-blue-100">Last</p>
              <p
                class="text-sm italic font-medium leading-none text-blue-300"
                style="margin-top:-0.15rem;"
              >{{ stats[2] }}</p>
            </div>
          </div>
          <div class="my-2 stats-right">
            <div class="average">
              <p class="text-xs text-blue-100">Average</p>
              <p
                class="mb-1 text-sm italic font-medium leading-none text-blue-300"
                style="margin-top:-0.15rem;"
              >{{ stats[0] }}</p>
            </div>
            <div class="avg5">
              <p class="text-xs text-blue-100">Avg 5</p>
              <p
                class="mb-1 text-sm italic font-medium leading-none text-blue-300"
                style="margin-top:-0.15rem;"
              >{{ stats[1] }}</p>
            </div>
            <div class="avg12">
              <p class="text-xs text-blue-100">Avg 12</p>
              <p
                class="text-sm italic font-medium leading-none text-blue-300"
                style="margin-top:-0.15rem;"
              >{{ stats[2] }}</p>
            </div>
          </div>
        </div>
        <div v-else class="flex flex-col items-center justify-center w-full h-full">
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
export default {
  data() {
    return {
      hasData: true,
      stats: ['00:03.47', '59:59.10', '01:17.24', '00:03.47', '00:58.24', '01:01.24']
    }
  },
}
</script>