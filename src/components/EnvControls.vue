<template>
  <div class="controls control-panel il-grid">
    <div class="text is-center" draggable="false">
      {{target}} Envelope
    </div>
    <div class="display display-slot">
      <div class="screen display-screen" :id="`${target}-env-screen`">
        <div class="attack" :style="{minWidth: envScreenStyle.attack + 'px'}">
        </div>
        <div class="decay" :style="{minWidth: envScreenStyle.decay + 'px'}">
        </div>
        <div class="sustain" :style="{minWidth: envScreenStyle.sustain + 'px'}">
        </div>
        <div class="release" :style="{minWidth: envScreenStyle.release + 'px'}">
        </div>
      </div>
    </div>
    <div class="sliders is-spaced">
      <input class="clickable" type="range" min="1" max="1000" orient="vertical" v-model="env.attack">
      <input class="clickable" type="range" min="1" max="1000" orient="vertical" v-model="env.decay">
      <input class="clickable" type="range" min="1" max="1000" orient="vertical" v-model="env.sustain">
      <input class="clickable" type="range" min="1" max="1000" orient="vertical" v-model="env.release">
    </div>
  </div>
</template>
<script>
import Env from '@/mixins/env.js'
import Map from '@/mixins/map.js'
export default {
  name: 'EnvControls',
  mixins: [ Env, Map ],
  props : {
    target: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      env: {
        attack: 500,
        decay: 500,
        sustain: 500,
        release: 500
      }
    }
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
.attack {
  background: blue;
}
.decay {
    background: green;
}
.sustain {
  background: purple;
}
.release {
  background: yellow;
}
</style>
