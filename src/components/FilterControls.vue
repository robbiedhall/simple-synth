<template>
  <div class="controls control-panel il-grid">
    <div class="text is-center">
      Filter
    </div>
    <div class="frequency-controls il-grid">
      <div class="frequency-display display-slot">
        <div class="frequency-screen display-screen is-center">
          {{currentFilter.frequency}}Hz
        </div>
      </div>
      <div class="frequency-slider is-center">
        <input class="clickable" type="range" min="1" max="64" orient="vertical" v-model="freq">
      </div>
    </div>
    <div class="type-controls il-grid">
      <div class="display-slot">
        <div class="display-screen is-center">
          {{currentFilter.type}}
        </div>
      </div>
      <input class="type-slider clickable" type="range" min="0" max="3" v-model="typeSelect">
    </div>
  </div>
</template>
<script>
import Map from '@/mixins/map.js'
export default {
  name: 'FilterControls',
  mixins: [ Map ],
  data () {
    return {
      types: ["lowpass", "highpass", "bandpass", 'peaking'],
      typeSelect: 0,
      freq: 42
    }
  },
  computed: {
    scaleFilterFreq() {
      const freqSlide = this.freq
      const minp = 1
      const maxp = 64
      const minv = Math.log(40)
      const maxv = Math.log(22000)
      const scale = (maxv-minv) / (maxp-minp)
      return Math.floor(Math.exp(minv + scale * (freqSlide-minp)))
    },
    currentFilter () {
      return {
        frequency: this.scaleFilterFreq,
        type: this.types[this.typeSelect]
      }
    }
  },
  watch: {
    currentFilter: {
      handler (newVal, oldVal) {
        let targetProp
        for (let prop in newVal) {
          if (newVal[prop] !== oldVal[prop]) {
            targetProp = prop
            this.$emit('filter-change', targetProp, newVal[targetProp])
          }
        }
      },
      deep: true
    }
  }
}
</script>
<style>
.controls {
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(3, 1fr);
}
.text {
  grid-row: 1/2;
  grid-column: 1/4;
}
.frequency-controls {
  grid-row: 1 / 4;
  grid-column: 4 / 6;
  grid-template-rows: 1fr 1fr 1fr;
}
.frequency-display {
  grid-row: 1/2;
}
.frequency-screen {
  font-size: 0.9rem;
}
.frequency-slider {
  grid-row: 2/4;
}
.frequency-slider {
  grid-row: 2/4;
}
.frequency-slider input[orient=vertical] {
  width: 10px;
  height: 60px;
  writing-mode: bt-lr; /* IE */
  -webkit-appearance: slider-vertical; /* WebKit */
}
.type-controls {
  grid-row: 2/4;
  grid-column: 1/4;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr;
}
</style>
