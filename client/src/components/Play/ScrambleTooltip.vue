<template>
  <div class="mb-3 ml-64 flex justify-center">
    <div class="tooltip relative bg-blue-1000 tri-right rounded-lg">
      <div class="p-2">
        <div class="flex items-center">
          <img
            src="@/assets/img/question-circle-regular.svg"
            alt="question mark in circle"
            class="h-4 italic"
          />
          <div class="ml-2 text-blue-300 italic">Click to rescramble</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.tooltip:after {
  content: " ";
  position: absolute;
  width: 0;
  height: 0;
  left: 38px;
  right: auto;
  top: auto;
  bottom: -14px;
  border: 10px solid;
  border-color: #1f3451 transparent transparent #1f3451;
}
</style>
