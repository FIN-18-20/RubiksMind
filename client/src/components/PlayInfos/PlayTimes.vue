<template>
    <div class="flex flex-col items-center" style="width:220px;">
        <div class="flex items-center mt-2">
            <hr style="width:68px;" class="border-blue-200">
                <h4 class="mx-2 text-base italic font-semibold text-blue-200"><span class="text-xl">T</span>IMES</h4>
            <hr style="width:68px;" class="border-blue-200">
        </div>
        <div class="flex items-center justify-center mt-1 bg-blue-800 border border-blue-700 rounded-md" style="width:220px;height:280px;">
            <div class="overflow-y-scroll box-styles rounded-md" style="width:200px;height:260px;">
                <div v-if="hasData">
                  <div class="relative flex items-center justify-between" v-for="(time, index) in times" :key="time.try"
                    :class="[index % 2 ? 'bg-blue-1000' : 'bg-blue-900' , index === 0  ? 'rounded-t-md' : '', index === times.length - 1 ? 'rounded-b-md' : '' , 'w-full h-8']">
                    <div class="flex">
                      <span class="w-6 ml-1 text-xs font-medium text-right text-blue-200">{{time.try}}.</span>
                      <img src="@/assets/img/trophy.svg" class="ml-3" alt="trophy" v-if="time.personalBest">
                    </div>
                    <span class="absolute z-0 w-full text-sm italic font-medium text-center text-blue-300"> {{time.time}}</span>
                    <div class="z-10 flex items-center justify-center w-6 h-6 mr-2 cursor-pointer">
                      <img src="@/assets/img/cross-delete-score.svg" class="w-auto h-3 cursor-pointer" alt="deleteScore">
                    </div>
                  </div>
                </div>
                <div v-else class="flex flex-col items-center justify-center w-1/5 w-full h-full">
                    <img src="@/assets/img/timer.svg" alt="timer">
                    <p class="mx-auto mt-4 text-sm italic text-blue-700">No times to display</p>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .box-styles{
        background: linear-gradient(181.21deg, #2A4365 0.81%, #1F3451 89.6%);
        box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.25);
        scrollbar-width: none; 
    }
    ::-webkit-scrollbar {
        width: 0;
        height: 0;
    }
</style>

<script>
export default {
  data() {
    return {
      hasData: true,
      times: [
        { try: 100, time: '01:17.24', personalBest: false },
        { try: 10, time: '59:59.10', personalBest: false },
        { try: 9, time: '00:58.24', personalBest: false },
        { try: 8, time: '00:03.47', personalBest: true },
        { try: 4, time: '00:58.24', personalBest: false },
        { try: 3, time: '00:58.24', personalBest: false },
        { try: 2, time: '00:58.24', personalBest: false },
        { try: 1, time: '00:58.24', personalBest: false },
        { try: 30, time: '00:58.24', personalBest: false },
      ]
    }
  },
}
</script>