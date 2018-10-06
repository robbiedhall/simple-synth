<template>
  <div class="controls control-panel il-grid">
    <div class="text is-center">
      Filter
    </div>
    <div class="frequency-controls il-grid">
      <div class="frequency-display display-slot">
        <div class="frequency-screen display-screen is-center">
          {{currentFilter.freq}}Hz
        </div>
      </div>
      <div class="frequency-slider is-center">
        <input class="clickable" type="range" min="1" max="1000" orient="vertical" v-model="freq">
      </div>
    </div>
    <div class="type-controls il-grid">
      <div class="display-slot">
        <div class="display-screen is-center">
          {{currentFilter.type}}
        </div>
      </div>
      <input class="type-slider clickable" type="range" min="0" max="2" v-model="typeSelect">
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
      types: ["lowpass", "highpass", "bandpass"],
      typeSelect: 0,
      freq: 1000
    }
  },
  computed: {
    scaleFilterFreq () {
      const freqSlide = this.freq
      let inMin
      let inMax
      let outMin
      let outMax
      if (freqSlide <= 100) {
        inMin = 1
        inMax = 100
        outMin = 1
        outMax = 30
      } else if (freqSlide <= 200) {
        inMin = 101
        inMax = 200
        outMin = 31
        outMax = 100
      } else if (freqSlide <=500) {
        inMin = 201
        inMax = 500
        outMin = 100
        outMax = 1000
      } else if (freqSlide <= 800) {
        inMin = 501
        inMax = 800
        outMin = 1001
        outMax = 10000
      } else {
        inMin = 801
        inMax = 1000
        outMin = 10001
        outMax = 22000
      }
      return this.mapBetween(freqSlide, inMin, inMax, outMin, outMax)
    },
    currentFilter () {
      return {
        freq: this.scaleFilterFreq,
        type: this.types[this.typeSelect]
      }
    }
  },
  watch: {
    currentFilter: {
      handler (newVal, oldVal) {
        this.$emit('filter-change', newVal)
      },
      immediate: true
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
