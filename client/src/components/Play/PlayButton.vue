<template>
  <button
    :class="btnClasses"
    :style="btnStyle"
    class="play mx-auto w-full max-w-md flex items-center justify-center py-3 rounded-md text-blue-100 font-bold italic uppercase leading-relaxed"
  >
    <div class="icon-left transition-transform ease-in-out duration-200">
      <img class="w-4" src="@/assets/img/rubiks-icon.svg" alt="rubiks icon" />
    </div>
    <div class="mx-5">{{ this.state === 'started' ? 'Stop Timer' : 'Get Started' }}</div>
    <div class="icon-right transition-transform ease-in-out duration-200">
      <img class="w-4" src="@/assets/img/rubiks-icon.svg" alt="rubiks icon" />
    </div>
  </button>
</template>

<script>
export default {
  data() {
    return {
      state: 'none',
      timeDown: 0,
      timer: null,
    }
  },

  computed: {
    btnClasses() {
      switch (this.state) {
        case 'pressed':
        case 'ready':
          return 'pressed'
        case 'started':
          return 'started'
        default:
          return ''
      }
    },
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

  mounted() {
    window.addEventListener('keydown', (e) => {
      if (e.keyCode !== 32 || this.state === 'pressed' || this.state === 'ready') {
        return
      }
      // Stop timer
      if (this.state === 'started') {
        this.state = 'none'
        this.$emit('stopTimer')
        return
      }
      this.state = 'pressed'
      this.timeDown += 100
      this.timer = setInterval(() => {
        this.timeDown += 100
        if (this.timeDown >= 1000) {
          this.state = 'ready'
        }
      }, 100)
    });
    window.addEventListener('keyup', (e) => {
      if (e.keyCode !== 32) {
        return
      }
      // Start timer
      if (this.timeDown >= 1000) {
        this.state = 'started'
        this.$emit('startTimer')
      } else {
        this.state = 'none'
      }
      this.timeDown = 0
      clearInterval(this.timer)
    });
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

.pressed .icon-left img,
.pressed .icon-right img {
  animation: 1s linear 0s infinite normal none running rotate;
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}
</style>
