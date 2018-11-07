<template>
  <div class="octave-controls is-center control-panel">
    Octave
    <div class="screen-buttons is-center">
      <i class="clickable fa fa-chevron-left" @click="changeOctave(-1)"/>
      <div class="octave-screen">
        {{octave}}
      </div>
      <i class="clickable fa fa-chevron-right" @click="changeOctave(1)"/>
    </div>
  </div>
</template>
<script>
export default {
  name: 'OctaveControls',
  props: {
    octave: {
      type: Number,
      required: true
    }
  },
  methods: {
    changeOctave(dir) {
      this.$emit('change-octave', dir)
    }
  }
}
</script>
<style scoped>
.octave-controls {
  margin: 0 25% !important;
  padding: 10 0;
  flex-direction: column;
}
.screen-buttons {
  flex-direction: row;
}
.screen-buttons i {
  padding: 2px;
  background: black;
  margin: 0 15px;
  color: red
}
.octave-screen {
  background: black;
  color: red;
  padding: 4px;
  font-size: 16px;
}
</style>
