<template>
  <div :style="{ width: size, height: size, margin }">
    <div class="cube w-1/3 h-1/3 float-left bg-blue-200" style="animation-delay: 0.2s;"></div>
    <div class="cube w-1/3 h-1/3 float-left bg-blue-200" style="animation-delay: 0.3s;"></div>
    <div class="cube w-1/3 h-1/3 float-left bg-blue-200" style="animation-delay: 0.4s;"></div>
    <div class="cube w-1/3 h-1/3 float-left bg-blue-200" style="animation-delay: 0.1s;"></div>
    <div class="cube w-1/3 h-1/3 float-left bg-blue-200" style="animation-delay: 0.2s;"></div>
    <div class="cube w-1/3 h-1/3 float-left bg-blue-200" style="animation-delay: 0.3s;"></div>
    <div class="cube w-1/3 h-1/3 float-left bg-blue-200" style="animation-delay: 0s;"></div>
    <div class="cube w-1/3 h-1/3 float-left bg-blue-200" style="animation-delay: 0.1s;"></div>
    <div class="cube w-1/3 h-1/3 float-left bg-blue-200" style="animation-delay: 0.2s;"></div>
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: '40px'
    },
    margin: {
      type: String,
      default: '100px auto'
    }
  }
}
</script>

<style scoped>
.cube {
  animation: cubeGridScaleDelay 1.3s infinite ease-in-out;
}

@keyframes cubeGridScaleDelay {
  0%,
  70%,
  100% {
    transform: scale3D(1, 1, 1);
  }
  35% {
    transform: scale3D(0, 0, 1);
  }
}
</style>
