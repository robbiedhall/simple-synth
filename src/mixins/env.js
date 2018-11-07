export default {
  props : {
    target: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      env: {
        attack: 3,
        decay: 6,
        sustain: 20,
        release: 1
      }
    }
  },
  watch: {
    currentEnv: {
      handler (newVal, oldVal) {
        if (!oldVal) {
          // creation
          this.$emit('env-create', this.target, newVal)
        } else {
          // Param change
          let targetProp
          for (let prop in newVal) {
            if (newVal[prop] !== oldVal[prop]) {
              targetProp = prop
              this.$emit('env-change', this.target, targetProp, newVal[targetProp])
            }
          }
        }
      },
      deep: true,
      immediate: true
    }
  },
  computed: {
    currentEnv () {
      return {
        attack: this.mapBetween4Dec(this.env.attack, 1, 40, 0.005, 10),
        decay: this.mapBetween4Dec(this.env.decay, 1, 40, 0.005, 30),
        sustain: this.mapBetween2Dec(this.env.sustain, 1, 40, 0.01, 1),
        release: this.mapBetween4Dec(this.env.release, 1, 40, 0.005, 30)
      }
    }
  }
}
