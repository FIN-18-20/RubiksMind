<template>
    <div class="flex flex-col items-center" style="width:220px;">
        <div class="mt-2 flex items-center">
            <hr style="width:68px;" class="border-blue-200">
                <h4 class="mx-2 text-blue-200 font-semibold italic"><span class="font-xl">T</span>imes</h4>
            <hr style="width:68px;" class="border-blue-200">
        </div>
        <div class="mt-1 bg-blue-800 border border-blue-700 rounded-md flex items-center justify-center" style="width:220px;height:280px;">
            <div class="box-styles rounded-md" style="width:200px;height:260px;">
                <div v-if="hasData">

                </div>
                <div v-else class="w-full h-full flex flex-col items-center justify-center">
                    <img src="@/assets/img/timer.svg" alt="timer">
                    <p class="mt-4 text-sm italic text-blue-700 mx-auto">No times to display</p>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .box-styles{
        background: linear-gradient(181.21deg, #2A4365 0.81%, #1F3451 89.6%);
        box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.25);
    }
</style>

<script>
export default {
  data() {
    return {
      hasData: false
    }
  },
}
</script>