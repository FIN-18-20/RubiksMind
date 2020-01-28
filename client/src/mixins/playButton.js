export const playButton = {
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
  },

  mounted() {
    window.addEventListener('mouseup', () => {
      if (this.state === 'started') {
        return
      }
      this.stopWaiting()
    })
    window.addEventListener('keydown', (e) => {
      if (e.keyCode !== 32) {
        return
      }
      // Prevent space from scrolling the page
      e.preventDefault()
      this.startWaiting()
    })
    window.addEventListener('keyup', (e) => {
      if (e.keyCode !== 32) {
        return
      }
      this.stopWaiting()
    })
  },

  methods: {
    startWaiting() {
      if (this.state === 'pressed' || this.state === 'ready') {
        return
      }
      // Stop timer if started
      if (this.state === 'started') {
        this.state = 'none'
        this.$emit('stopTimer')
        return
      }
      this.state = 'pressed'
      this.timeDown = 100
      this.timer = setInterval(() => {
        this.timeDown += 100
        if (this.timeDown >= 1000) {
          this.state = 'ready'
        }
      }, 100)
    },
    stopWaiting() {
      // Start timer
      if (this.state === 'ready') {
        this.state = 'started'
        this.$emit('startTimer')
      } else {
        this.state = 'none'
      }
      this.timeDown = 0
      clearInterval(this.timer)
    },
  },
}
