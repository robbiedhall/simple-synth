<template>
  <div class="controls control-panel il-grid">
    <div class="power-button is-center">
      <input type="checkbox" class="clickable" v-model="power">
    </div>
    <div class="text is-center" draggable="false">
      FX{{fxSlot}}
    </div>
    <div class="type-display">
      <div class="type-screen il-grid display-screen">
        <div class="is-center clickable" @click="changeType(-1)">
          <i class="fa fa-chevron-left"/>
        </div>
        <div class="is-center" draggable="false">
          {{currentFx.name}}
        </div>
        <div class="is-center clickable" @click="changeType(1)">
          <i class="fa fa-chevron-right"/>
        </div>
      </div>
    </div>
    <div class="params-display">
      <div class="display-screen">
        <AutoFilterControls @af-param-change="afParamChange" v-if="currentFx.name === 'autofilter'"/>
        <DistortionControls v-if="currentFx.name === 'distortion'"/>
        <PhaserControls v-if="currentFx.name === 'phaser'"/>
      </div>
    </div>
  </div>
</template>
<script>
import Map from '@/mixins/map'
import AutoFilterControls from './fxcontrols/AutoFilterControls'
import DistortionControls from './fxcontrols/DistortionControls'
import PhaserControls from './fxcontrols/PhaserControls'
export default {
  name: 'FXControls',
  mixins: [ Map ],
  components: {
    AutoFilterControls,
    DistortionControls,
    PhaserControls
  },
  props: {
    fxSlot: {
      type: Number,
      required: true
    },
    fx: {
      type: Object,
      required: true
    }
  },
  data () {
    const frequencies = ['1n', '2n', '4n', '8n']
    return {
      select: 0,
      waveShapes: ['sine', 'triangle', 'square', 'sawtooth'],
      filterTypes: ['lowpass', 'highpass', 'bandpass'],
      autofilterParamSelect: 0,
      autoFilterParams: [{
        name: 'frequency',
        options: []
      },{
        name: 'type'
      }, 'filter'],
      types: [{
        name: 'autofilter',
        params: {
          frequency: frequencies[Math.floor(Math.random() * 4)],
          type: 'sine',
          depth: 1,
          baseFrequency: 200,
          octaves: 2.6,
          filter: {
            type: 'lowpass',
            rolloff: -12,
            Q: 1
          }
        }
      }, {
        name: 'distortion',
        params: {
          distortion: 0.4
        }
      },{
        name: 'phaser',
        params: {
          frequency  : 0.5 ,
          octaves  : 3 ,
          stages  : 10 ,
          Q  : 10 ,
          baseFrequency  : 350
        }
      }],
      power: false
    }
  },
  methods: {
    afParamChange (params) {
      this.$emit('af-param-change', params, 'fx' + this.fxSlot)
    },
    changeType(num) {
      const max = this.types.length - 1
      const current = this.select
      const calc = current + num
      if (calc < 0) {
        this.select = max
      } else if(calc > max){
        this.select = 0
      } else {
        this.select = calc
      }
    }
  },
  computed: {
    currentFx () {
      return this.types[this.select]
    },
    paramNum () {
      return this.currentFx ? Object.keys(this.currentFx.params).length : ''
    },
    afParamValueDisplay () {
      if (this.autoFilterParams[this.autofilterParamSelect] !== 'filter') {
        return this.currentFx.params[this.autoFilterParams[this.autofilterParamSelect]]
      } else {
        return this.currentFx.params[this.autoFilterParams[this.autofilterParamSelect]].type
      }
    },
    tester () {
      return this.currentFx.params[this.autoFilterParams[this.autofilterParamSelect]]
    }
  },
  watch: {
    'power': {
      handler (newVal, oldVal) {
        console.log('power changed')
        this.$emit('fx-power-change', 'fx' + this.fxSlot, newVal)
      }
    }
  }
}
</script>
<style scoped>
.controls {
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(3, 1fr);
}
.power-button {
  grid-row: 1/2;
  grid-column: 1/2;
}
.power-button input {
-webkit-appearance: none;
background-color: black;
box-shadow: 0 1px 2px rgba(0,0,0,0.05), inset 0px -15px 10px -12px rgba(0,0,0,0.05);
padding: 10px;
display: inline-block;
position: relative;
}
.power-button input:active, .power-button input:checked:active {
 border: none;
}

.power-button input:checked {
	background-color: red;
  box-shadow: inset 0 0 10px black;
	color: #99a1a7;
}
.text {
  grid-row: 1/2;
  grid-column: 2/4;
}
.type-display {
  grid-row: 2 /4;
  grid-column: 1 / 4;
  padding: 5%;
}
.type-screen {
  grid-template-columns: 1fr 4fr 1fr;
}
.params-display {
  grid-row: 1 / 4;
  grid-column: 4 /6;
  padding: 5%;
}
.distortion-params {
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 7fr 1fr;
}
.distortion-params p {
  margin: 0;
}
.autofilter-params {
  width: 100%;
  height: 100%;
  grid-template-columns: 1fr 4fr 1fr;
  grid-template-rows: 1fr 5fr 1fr;
}
.autofilter-params p {
  margin: 0;
}
.param-name {
  grid-row: 1/2;
  grid-column: 1/4;
}
.left-button {
  grid-column: 1 / 2;
  grid-row: 2 / 3;
}
.right-button {
  grid-column: 3 / 4;
  grid-row: 2 / 3;
}
.param-value {
  grid-row: 3/4;
  grid-column: 1/4;
}
</style>
