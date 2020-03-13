import { mapActions, mapState } from 'vuex'

export const playButton = {
  data() {
    return {
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
    ...mapState({
      state: state => state.timer.state,
    }),
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
      console.log('startWaiting', this.state)
      if (this.state === 'pressed' || this.state === 'ready') {
        return
      }
      // Stop timer if started
      if (this.state === 'started') {
        this.updateState('none')
        this.$emit('stopTimer')
        return
      }
      this.updateState('pressed')
      this.timeDown = 100
      this.timer = setInterval(() => {
        this.timeDown += 100
        if (this.timeDown >= 1000) {
          this.updateState('ready')
        }
      }, 100)
    },
    stopWaiting() {
      console.log('--> stop waiting')
      // Start timer
      if (this.state === 'ready') {
        this.updateState('started')
        this.$emit('startTimer')
      } else {
        this.updateState('none')
      }
      this.timeDown = 0
      clearInterval(this.timer)
    },
    ...mapActions('timer', ['updateState']),
  },
}
