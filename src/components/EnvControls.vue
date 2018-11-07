<template>
  <div class="controls control-panel il-grid">
    <div class="text is-center" draggable="false">
      {{target}} Envelope
    </div>
    <div class="display display-slot">
      <div class="screen display-screen" :id="`${target}-env-screen`">
        <EnvelopeDisplay class="envelope-display" :env="env" @display-mounted="calcSize" :size="compSize" :target="target"/>
      </div>
    </div>
    <div class="sliders is-spaced">
      <input class="clickable" type="range" min="1" max="40" orient="vertical" v-model="env.attack">
      <input class="clickable" type="range" min="1" max="40" orient="vertical" v-model="env.decay">
      <input class="clickable" type="range" min="1" max="40" orient="vertical" v-model="env.sustain">
      <input class="clickable" type="range" min="1" max="40" orient="vertical" v-model="env.release">
    </div>
  </div>
</template>
<script>
import Env from '@/mixins/env.js'
import Map from '@/mixins/map.js'
import EnvelopeDisplay from './EnvelopeDisplay.vue'
export default {
  name: 'EnvControls',
  mixins: [ Env, Map ],
  components: {
    EnvelopeDisplay
  },
  props: {
    target: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      displaySize: {}
    }
  },
  methods: {
    calcSize () {
      const display = document.getElementById(this.target + '-display')
      this.displaySize = {
        width: display.clientWidth,
        height: display.clientHeight
      }
    }
  },
  computed: {
    compSize () {
      return this.displaySize
    }
  },
  mounted () {
  }
}
</script>

<style scoped>
.controls {
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-columns: repeat(5, 1fr);
}
.controls input[orient=vertical] {
  width: 10px;
  height: 40px;
  writing-mode: bt-lr; /* IE */
  -webkit-appearance: slider-vertical; /* WebKit */
}
.text {
  grid-row: 1 / 3;
  grid-column: 1 / 3;
}
.sliders {
  grid-row: 3 / 4;
  grid-column: 1 / 6;
}
.display {
  grid-row: 1 / 3;
  grid-column: 3 / 6;
}
.screen {
  display: flex;
}
.envelope-display {
flex: 1;
}
.sliders input[orient=vertical] {
  width: 10px;
  height: 44px;
  writing-mode: bt-lr; /* IE */
  -webkit-appearance: slider-vertical; /* WebKit */
}
</style>
