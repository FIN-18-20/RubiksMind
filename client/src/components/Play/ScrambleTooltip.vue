<template>
  <div class="tooltipPos mb-3 inline-block absolute hidden">
    <div class="tooltip relative bg-blue-1000 tri-right rounded-lg">
      <div class="p-2">
        <div class="flex items-center">
          <svg class="w-3 h-3 italic">
            <use xlink:href="#question-circle" />
          </svg>
          <div class="ml-1 text-xxs text-blue-300 italic">Click to rescramble</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.tooltipPos {
  top: -40px;
  right: 75px;
}
.tooltip:after {
  content: " ";
  position: absolute;
  width: 0;
  height: 0;
  left: 18px;
  right: auto;
  top: auto;
  bottom: -9px;
  border: 10px solid;
  border-color: #1f3451 transparent transparent #1f3451;
}
</style>
