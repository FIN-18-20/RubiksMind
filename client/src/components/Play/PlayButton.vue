<template>
  <button
    @mousedown="startWaiting"
    :class="btnClasses"
    :style="btnStyle"
    class="play mx-auto w-full max-w-md flex items-center justify-center py-3 rounded-md text-blue-100 font-bold italic uppercase leading-relaxed select-none"
  >
    <div class="icon-left transition-transform ease-in-out duration-200">
      <svg class="w-4 h-4 text-blue-100">
        <use xlink:href="#rubiks-icon" />
      </svg>
    </div>
    <div class="mx-5">{{ state === 'started' ? 'Stop Timer' : 'Get Started' }}</div>
    <div class="icon-right transition-transform ease-in-out duration-200">
      <svg class="w-4 h-4 text-blue-100">
        <use xlink:href="#rubiks-icon" />
      </svg>
    </div>
  </button>
</template>

<script>
import { playButton } from '@/mixins/playButton'

export default {
  mixins: [
    playButton,
  ],

  computed: {
    btnStyle() {
      switch (this.state) {
        case 'pressed':
          return {
            background: `linear-gradient(90deg, rgba(150, 39, 92, ${this.timeDown / 1000}) 0%, rgba(72, 0, 72, ${this.timeDown / 1000}) 100%)`,
          }
        case 'ready':
          return {
            background: 'linear-gradient(90deg, #00C996 0%, #003D4D 100%)',
          }
        case 'started':
          return {
            background: 'linear-gradient(90deg, rgb(150, 39, 92) 0%, rgb(72, 0, 72) 100%)',
          }
        default:
          return {
            backgroundImage: 'linear-gradient(105.11deg, #90cdf4 -6.07%, #1a6fbf 93.36%)',
          }
      }
    }
  },
}
</script>

<style scoped>
.play:hover .icon-left {
  transform: translateX(-20px);
}

.play:hover .icon-right {
  transform: translateX(20px);
}

.pressed .icon-left {
  transition: transform 1s;
  transform: translateX(-75px) !important;
}

.pressed .icon-right {
  transition: transform 1s;
  transform: translateX(75px) !important;
}

.pressed .icon-left svg,
.pressed .icon-right svg {
  animation: 1s linear 0s infinite normal none running rotate;
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}
</style>
