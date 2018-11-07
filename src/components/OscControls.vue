C<template>
  <div class="controls control-panel">
    <div class="text body-text is-center" draggable="false">
      Oscillator
    </div>
    <div class="display display-slot">
      <div class="display-screen is-center" draggable="false">
        {{currentOsc.shape}}
      </div>
    </div>
    <div class="selector is-center">
      <input class="slider clickable" type="range" min="0" max="3" v-model="shapeSelect">
    </div>
  </div>
</template>
<script>
export default {
  name: 'OscControls',
  data () {
    return {
      shapes: ['sine', 'triangle', 'square', 'sawtooth'],
      shapeSelect: 1
    }
  },
  computed: {
    currentOsc () {
      return {
        shape: this.shapes[this.shapeSelect]
      }
    }
  },
  watch: {
    currentOsc: {
      handler (newVal) {
        this.$emit('osc-change', newVal)
      },
      deep: true
    }
  }
}
</script>
<style scoped>
.controls {
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 1fr);
}
.display {
  grid-row: 1 / 3;
  grid-column: 3 / 5;
}
.selector {
  grid-row: 3/4;
  grid-column: 1/5;
}
.text {
  grid-row: 1 / 3;
  grid-column: 1 /3;
}
.slider {
  width: 80%;
}
</style>
