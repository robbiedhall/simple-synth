export default {
  computed: {
    envScreenStyle() {
      const screen = document.getElementById(`${this.target}-env-screen`)
      const screenW = screen ? screen.scrollWidth : 96
      const attackW = this.mapBetween(this.currentEnv.attack, 0.1, 3, 1, 24)
      const decayW = this.mapBetween(this.currentEnv.decay, 0.1, 3, 1, 24)
      const releaseW = this.mapBetween(this.currentEnv.release, 0.1, 3, 1, 24)
      const sustainW = screenW - (attackW + decayW + releaseW)
      return {
        attack: attackW,
        decay: decayW,
        sustain: sustainW,
        release: releaseW
      }
    },
    currentEnv () {
      return {
        attack: this.mapBetween2Dec(this.env.attack, 1, 1000, 0.1, 3),
        decay: this.mapBetween2Dec(this.env.decay, 1, 1000, 0.1, 3),
        sustain: this.mapBetween2Dec(this.env.sustain, 1, 1000, 0.1, 1),
        release: this.mapBetween2Dec(this.env.release, 1, 1000, 0.1, 3)
      }
    }
  },
  watch: {
    currentEnv: {
      handler (newVal) {
        this.$emit(`env-change`,this.target, newVal)
      },
      immediate: true
    }
  }
}
