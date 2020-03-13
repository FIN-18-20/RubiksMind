<template>
  <div class="btn-container fixed z-20 bottom-0 mb-6">
    <button
      ref="play-btn"
      @mousedown="startWaiting"
      :class="btnClasses"
      :style="btnStyle"
      class="play relative flex items-center justify-center select-none focus:outline-none"
    >
      <div class="content relative z-10 bg-cover bg-center bg-no-repeat">
        <h1
          class="text-blue-100 text-lg font-bold uppercase"
        >{{ state === 'started' ? 'Stop' : 'Start' }}</h1>
      </div>
    </button>
  </div>
</template>

<script>
import { playButton } from '@/mixins/playButton'
import NoSleep from '@/lib/NoSleep.js'

export default {
  mixins: [
    playButton,
  ],

  data() {
    return {
      noSleep: null,
      noSleepActive: false,
    }
  },

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

  created() {
    this.noSleep = new NoSleep()
  },

  mounted() {
    this.$refs['play-btn'].addEventListener('touchstart', () => {
      this.startWaiting()
    })
    this.$refs['play-btn'].addEventListener('touchend', () => {
      this.noSleepActive = !this.noSleepActive
      this.noSleepActive ? this.noSleep.enable() : this.noSleep.disable()
      this.stopWaiting()
    })
  }
}
</script>

<style scoped>
.btn-container {
  left: 50%;
  transform: translateX(-50%) rotate(45deg);
}

.play {
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  width: 90px;
  height: 90px;
}

.play::after {
  content: "";
  position: absolute;
  width: 90px;
  height: 90px;
  z-index: 1;
  background-image: url("data:image/svg+xml,%3Csvg style='transform: rotate(45deg)' width='90' height='89' viewBox='0 0 90 89' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M56.0546 11.1333L47.282 2.4049C45.9812 1.11065 43.8766 1.11687 42.5812 2.41879L33.8453 11.199C32.5499 12.5009 32.5543 14.6055 33.8551 15.8997L42.6277 24.6281C43.9286 25.9224 46.0332 25.9162 47.3285 24.6142L56.0645 15.8341C57.3599 14.5322 57.3554 12.4276 56.0546 11.1333Z' fill='black' fill-opacity='0.21'/%3E%3Cpath d='M40.6133 26.6517L31.8406 17.9233C30.5398 16.629 28.4352 16.6353 27.1398 17.9372L18.4039 26.7173C17.1085 28.0193 17.1129 30.1239 18.4137 31.4181L27.1864 40.1465C28.4872 41.4408 30.5918 41.4346 31.8871 40.1326L40.6231 31.3525C41.9185 30.0505 41.9141 27.9459 40.6133 26.6517Z' fill='black' fill-opacity='0.21'/%3E%3Cpath d='M25.1722 42.1707L16.3996 33.4423C15.0988 32.1481 12.9942 32.1543 11.6988 33.4562L2.96285 42.2364C1.66748 43.5383 1.6719 45.6429 2.9727 46.9372L11.7453 55.6656C13.0461 56.9598 15.1508 56.9536 16.4461 55.6517L25.1821 46.8715C26.4775 45.5696 26.473 43.465 25.1722 42.1707Z' fill='black' fill-opacity='0.21'/%3E%3Cpath d='M71.5601 26.5601L62.7875 17.8317C61.4867 16.5375 59.3821 16.5437 58.0867 17.8456L49.3507 26.6258C48.0554 27.9277 48.0598 30.0323 49.3606 31.3266L58.1332 40.055C59.434 41.3492 61.5386 41.343 62.834 40.0411L71.57 31.2609C72.8653 29.959 72.8609 27.8544 71.5601 26.5601Z' fill='black' fill-opacity='0.21'/%3E%3Cpath d='M55.8259 42.3739L47.0532 33.6454C45.915 32.513 44.0735 32.5184 42.9401 33.6576L34.2041 42.4378C33.0706 43.577 33.0745 45.4185 34.2127 46.5509L42.9854 55.2794C44.1236 56.4118 45.9651 56.4064 47.0985 55.2672L55.8345 46.487C56.968 45.3479 56.9641 43.5063 55.8259 42.3739Z' fill='black' fill-opacity='0.21'/%3E%3Cpath d='M40.3848 57.8931L31.6121 49.1647C30.4739 48.0322 28.6324 48.0377 27.499 49.1769L18.763 57.957C17.6296 59.0962 17.6334 60.9377 18.7716 62.0702L27.5443 70.7986C28.6825 71.9311 30.524 71.9256 31.6574 70.7865L40.3934 62.0063C41.5269 60.8671 41.523 59.0256 40.3848 57.8931Z' fill='black' fill-opacity='0.21'/%3E%3Cpath d='M86.7726 42.2825L78 33.554C76.8618 32.4216 75.0202 32.427 73.8868 33.5662L65.1508 42.3464C64.0174 43.4855 64.0212 45.3271 65.1594 46.4595L73.9321 55.1879C75.0703 56.3204 76.9118 56.315 78.0453 55.1758L86.7812 46.3956C87.9147 45.2564 87.9108 43.4149 86.7726 42.2825Z' fill='black' fill-opacity='0.21'/%3E%3Cpath d='M71.3317 57.8016L62.559 49.0731C61.4208 47.9407 59.5793 47.9461 58.4458 49.0853L49.7099 57.8655C48.5764 59.0047 48.5803 60.8462 49.7185 61.9786L58.4911 70.7071C59.6293 71.8395 61.4709 71.8341 62.6043 70.6949L71.3403 61.9147C72.4737 60.7756 72.4699 58.934 71.3317 57.8016Z' fill='black' fill-opacity='0.21'/%3E%3Cpath d='M56.1838 73.0259L47.4111 64.2974C46.1103 63.0032 44.0057 63.0094 42.7104 64.3113L33.9744 73.0915C32.679 74.3934 32.6834 76.498 33.9842 77.7923L42.7569 86.5207C44.0577 87.8149 46.1623 87.8087 47.4577 86.5068L56.1936 77.7266C57.489 76.4247 57.4846 74.3201 56.1838 73.0259Z' fill='black' fill-opacity='0.21'/%3E%3C/svg%3E%0A");
}

.play .content {
  transform: rotate(-45deg);
}
</style>
