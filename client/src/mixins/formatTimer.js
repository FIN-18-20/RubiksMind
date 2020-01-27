export const formatTimer = (stringFormat = true) => {
  return {
    computed: {
      displayTime() {
        let milli = this.time
        let min = parseInt(milli / 60000)
        milli -= (min * 60000)
        let sec = parseInt(milli / 1000)
        milli -= (sec * 1000)
        let hundredth = Math.floor(milli / 10)

        min = min.toString()
        sec = sec.toString()
        hundredth = hundredth.toString()

        if (min.length < 2) {
          min = '0' + min
        }

        if (sec.length < 2) {
          sec = '0' + sec
        }

        if (hundredth.length < 2) {
          hundredth = '0' + hundredth
        }

        return stringFormat ? `${min}:${sec}.${hundredth}` : { min, sec, hundredth }
      }
    }
  }
}
