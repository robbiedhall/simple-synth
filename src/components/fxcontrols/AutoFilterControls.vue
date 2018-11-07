<template>
  <div class="auto-filter-controls il-grid">
    <div class="param-display">
      <div class="af-type-controls il-grid param-control" v-if="paramFocus === 'type'">
        <div class="af-type-display is-center">
          <SineIcon :height="38" v-if="currentParams.type ==='sine'"/>
          <SquareIcon :height="38" v-if="currentParams.type ==='square'"/>
          <SawtoothIcon :height="38" v-if="currentParams.type ==='sawtooth'"/>
          <TriangleIcon :height="38" v-if="currentParams.type ==='triangle'"/>
        </div>
        <div class="af-type-buttons is-spaced">
          <i class="is-center clickable fa fa-chevron-left" @click="changeType(-1)"/>
          <i class="is-center clickable fa fa-chevron-right" @click="changeType(1)"/>
        </div>
      </div>
      <div class="af-freq-controls is-center param-control" v-if="paramFocus === 'freq'">
        <circle-slider
          class="is-center"
          progress-color="#f00"
          knob-color="#f00"
          :side="42"
          :min="0"
          :max="100"
          v-model="freqSlider"
          />
        <span>{{currentParams.frequency}}</span>
      </div>
      <div class="af-q-controls is-center param-control" v-if="paramFocus === 'Q'">
        <circle-slider
          class="is-center"
          progress-color="#f00"
          knob-color="#f00"
          :side="42"
          :min="0"
          :max="100"
          v-model="qSlider"
          />
        <span>{{currentParams.q}}</span>
      </div>
    </div>
    <div class="param-select il-grid">
      <i class="is-center clickable fa fa-chevron-left" @click="changeParamFocus(-1)"/>
      <span>{{paramFocus}}</span>
      <i class="is-center clickable fa fa-chevron-right"@click="changeParamFocus(1)"/>
    </div>
  </div>
</template>
<script>
import SineIcon from '../../../static/svg/waves/SineIcon'
import SquareIcon from '../../../static/svg/waves/SquareIcon'
import SawtoothIcon from '../../../static/svg/waves/SawtoothIcon'
import TriangleIcon from '../../../static/svg/waves/TriangleIcon'
export default {
  name: 'AutoFilterControls',
  components: {
    SineIcon,
    SquareIcon,
    SawtoothIcon,
    TriangleIcon
  },
  data () {
    return {
      types: ['sine', 'square', 'sawtooth', 'triangle'],
      typeSelect: 0,
      params: ['type', 'freq', 'Q'],
      paramSelect: 0,
      freqSlider: 2.54,
      speedSelect: 0,
      speeds: ['1n', '2n', '4n', '8n', '16n', '32n', '64n'],
      qSlider: 1
    }
  },
  methods: {
    scaleFreq(sliderVal) {
      const minp = 0
      const maxp = 100
      const minv = Math.log(0.09)
      const maxv = Math.log(100)
      const scale = (maxv-minv) / (maxp-minp)
      return Math.exp(minv + scale*(sliderVal-minp)).toFixed(2)
    },
    changeType (dir) {
      const typeNum = this.types.length
      this.typeSelect += dir
      if(this.typeSelect < 0) {
        this.typeSelect = typeNum - 1
      }
      if (this.typeSelect > typeNum - 1) {
        this.typeSelect = 0
      }
    },
    changeParamFocus (dir) {
      const paramNum = this.params.length
      this.paramSelect += dir
      if (this.paramSelect < 0) {
        this.paramSelect = paramNum - 1
      }
      if (this.paramSelect > paramNum - 1) {
        this.paramSelect = 0
      }
    }
  },
  computed: {
    paramFocus () {
      return this.params[this.paramSelect]
    },
    currentParams () {
      return {
        type: this.types[this.typeSelect],
        frequency: this.scaleFreq(this.freqSlider),
        q: this.qSlider
      }
    }
  },
  watch: {
    currentParams: {
      handler (newVal, oldVal) {
        if (newVal) {
          this.$emit('af-param-change', newVal)
        }
      }
    }
  }
}
</script>
<style scoped>
.auto-filter-controls {
  width: 100%;
  height: 100%;
  grid-template-rows: 2fr 1fr;
}
.param-control {
  width: 100%;
  height: 100%;
}
.param-display {

}
.af-type-controls {

}
.af-freq-controls {
  flex-direction: column;
}
.af-freq-controls div {
 flex: 1;
}
.af-freq-controls span {
  font-size: 12px;
}
.af-q-controls {
  flex-direction: column;
}
.af-q-controls div {
 flex: 1;
}
.af-q-controls span {
  padding: 2px;
  font-size: 12px;
}
.param-select {
  grid-template-columns: 1fr 4fr 1fr;
  grid-row: 2/3;
  align-items: center;
}
.param-select i{
  height: 100%;
  width: 100%;
}
.param-select span {
  word-wrap: break-word;
  font-size: 10px;
  text-align: center;
}

.af-type-controls {
  grid-template-rows: 3fr 1fr;
}
.af-type-buttons i {
  font-size: 14px;
  flex: 1
}
</style>
