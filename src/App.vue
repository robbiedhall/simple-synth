<template>
  <div id="app" draggable="false" class="il-grid">
    <div draggable="false" class="synth-body il-grid">
      <div class="main-logo is-center">
        RH-A001
      </div>
      <OscControls class="osc-slot" @osc-change="oscChange"/>
      <EnvControls :target="`osc`" class="osc-env" @env-change="envChange"/>
      <FilterControls class="filter-slot" @filter-change="filterChange"/>
      <EnvControls :target="`filter`" class="filter-env" @env-change="envChange"/>
      <FXControls :fxSlot="1" :fx="synth[`fx1`]" class="fx1" @fx-power-change="fxPowerChange" @af-param-change="afParamChange"/>
      <FXControls :fxSlot="2" :fx="synth[`fx2`]" class="fx2" @fx-power-change="fxPowerChange" @af-param-change="afParamChange"/>
      <OctaveControls @change-octave="changeOctave" :octave="octave"/>
      <Keyboard :mousePressed="mousePressed" :octave="octave" class="keyboard" @keybed-click="keybedClick" @keybed-release="triggerSynthRelease" @key-drag="keyDrag"/>
    </div>
    <div class="debug is-centre">
      <p>Oscillator: {type: {{this.synth.osc ? this.synth.osc.type : ''}}}</p>
      <p>Filter:  {type: {{this.synth.filter ? this.synth.filter.type : ''}}, frequency: {{this.synth.filter ? this.synth.filter.frequency.value : ''}} }</p>
      <p>FX1: </p>
      <p>FX2: </p>
      <p>Octave: {{octave}}</p>
      <p>mousePressed: {{mousePressed}}</p>
      <p>trigger: {{trigger}}</p>
      <p>filter: {{synth.filter && synth.filter.frequency ? synth.filter.frequency.value : ''}}</p>
      <p>filterEnv: </p>
    </div>
    <button type="button" @click="test">Test</button>
  </div>
</template>

<script>
import Tone from 'tone'
import OscControls from '@/components/OscControls'
import EnvControls from '@/components/EnvControls'
import FilterControls from '@/components/FilterControls'
import FXControls from '@/components/FXControls'
import OctaveControls from '@/components/OctaveControls'
import Keyboard from '@/components/Keyboard.vue'
import Map from '@/mixins/map'
export default {
  name: 'app',
  components: {
    OscControls,
    FilterControls,
    EnvControls,
    FXControls,
    OctaveControls,
    Keyboard
  },
  mixins: [ Map ],
  data() {
    return {
      synth: {
        osc: null,
        oscEnv: null,
        filter: null,
        filterEnv: null,
        fx1: {
          type: 'autofilter',
          fx: null
        },
        fx1pow: false,
        fx2: {
          type: null,
          fx: null
        },
        fx2pow: false,
        lastInChain: 'filter',
        master: null,
      },
      octave: 3,
      keys: {},
      mousePressed: false,
      keyClick: false,
      trigger: false
    }
  },
  methods: {
    test () {

    },
    afParamChange(params, fxSlot) {
      this.synth[fxSlot].fx.stop()
      this.synth[fxSlot].fx = new Tone.AutoFilter({frequency: params.frequency, type: params.type, q: params.q})
      this.synth[fxSlot].fx.start()
      this.connectToOutput()
    },
    createSynth () {
      let s = this.synth
      s['osc'] = new Tone.Oscillator()
      s.osc.type = 'triangle'
      s['oscEnv'] = new Tone.AmplitudeEnvelope({
        "attack": 0.005,
        "decay": 4.35,
        "sustain": 0.55,
        "release": 0.013
      })
      s.osc.connect(s.oscEnv)
      s['filter'] = new Tone.Filter().toMaster()
      s.filter.frequency.value = 22000
      s.oscEnv.connect(s.filter)
      s['filterEnv'] = new Tone.FrequencyEnvelope({
          "attack": 0.005,
          "decay": 4.35,
          "sustain": 0.55,
          "release": 4.35,
          "baseFrequency": s.filter.frequency.value,
          "octaves": 3
        }
      )
      s.filterEnv.connect(s.filter.frequency)
      s['master'] = Tone.Master
      s.master.volume.volume = -60
      s['fx1'].fx = new Tone.AutoFilter('4n').start()
      s['fx2'].fx = new Tone.AutoFilter('4n').start()
    },
    oscChange (oscObj) {
      this.synth.osc.stop()
      this.synth.osc.type = oscObj.shape
      this.synth.osc.start()
    },
    filterChange(prop, val) {
      if (prop === 'type'){
        this.synth.filter[prop] = val
      } else if (prop === 'frequency'){
        this.synth.filter[prop].value = val
        this.synth.filterEnv.baseFrequency = val
      }
    },
    envChange (targetEnv, targetProp, val) {
      this.synth[`${targetEnv}Env`][targetProp] = val
    },
    connectToOutput() {
      let s = this.synth
      if (s.fx1pow && s.fx2pow) {
        s.filter.disconnect()
        s.filter.connect(s.fx1.fx)
        s.fx1.fx.connect(s.fx2.fx)
        s.fx2.fx.toMaster()
      } else if (s.fx1pow) {
        s.filter.disconnect()
        s.filter.connect(s.fx1.fx)
        s.fx1.fx.toMaster()
      } else if (s.fx2pow) {
        s.filter.disconnect()
        s.filter.connect(s.fx2.fx)
        s.fx2.fx.toMaster()
      } else {
        s.filter.disconnect()
        s.filter.toMaster()
      }
    },
    fxPowerChange (target, powerBool) {
        let s = this.synth
        s[`${target}pow`] = powerBool
        this.connectToOutput()
    },
    changeOctave(dir) {
      this.octave += dir
      if (this.octave < 0) {
        this.octave = 0
      }
      if (this.octave > 9) {
        this.octave = 9
      }
    },
    triggerSynthAttack (note) {
      if (note){
        this.synth.osc.frequency.value = note
      }
      this.synth.osc.start()
      this.synth.oscEnv.triggerAttack()
      this.synth.filterEnv.triggerAttack()
    },
    triggerSynthRelease () {
      this.synth.oscEnv.triggerRelease()
      this.synth.filterEnv.triggerRelease()
    },
    keybedClick (note) {
      this.triggerSynthAttack(note)
    },
    keyDrag (note) {
      this.synth.osc.start()
      this.triggerSynthAttack(note)
    },
    mousePress(){
      this.mousePressed = true
    },
    mouseRelease() {
      this.mousePressed = false
    },
    keyPress (event) {
      //Controls the keyboard octave - KEYS Z and X
      if (event.keyCode === 90 && this.octave > 0) {
          this.octave--
      } else if (event.keyCode === 88 && this.octave < 8 ) {
        this.octave++
      } else {
        const keys = this.keys
        const note = this.keyToNote(event.keyCode)
        if (!note) {
          return
        }
        if (keys[note]){
          // Sustain
        } else {
          //New note press
          this.$set(this.keys, note, true)
          this.triggerSynthAttack(note)
        }
      }
    },
    keyRelease (event) {
      const keys = this.keys
      const note = this.keyToNote(event.keyCode)
      if (keys[note]) {
        // New key release
        this.$set(this.keys, note, false)
        this.triggerSynthRelease()
      }
    },
    keyToNote(keyCode) {
      switch(keyCode) {
        case 65:
          return `C${this.octave}`
        case 87:
          return `C#${this.octave}`
        case 83:
          return `D${this.octave}`
        case 69:
          return `D#${this.octave}`
        case 68:
          return `E${this.octave}`
        case 70:
          return `F${this.octave}`
        case 84:
          return `F#${this.octave}`
        case 71:
          return `G${this.octave}`
        case 89:
          return `G#${this.octave}`
        case 72:
          return `A${this.octave}`
        case 85:
          return `A#${this.octave}`
        case 74:
          return `B${this.octave}`
        case 75:
          return `C${this.octave+1}`
        case 79:
          return `C#${this.octave+1}`
        case 76:
          return `D${this.octave+1}`
        case 80:
          return `D#${this.octave+1}`
        case 186:
          return `E${this.octave+1}`
        case 192:
          return `F${this.octave+1}`
        default:
          return null
      }
    }
  },
  created() {
    window.addEventListener('mousedown', this.mousePress)
    window.addEventListener('mouseup', this.mouseRelease)
    window.addEventListener('keydown', this.keyPress)
    window.addEventListener('keyup', this.keyRelease)
    this.createSynth()

  },
  mounted () {

  },
  computed: {
    tester () {
      return this
    }
  },
  beforeDestroy() {
    window.removeEventListener('mousedown', this.mousePress)
    window.removeEventListener('mouseup', this.mouseRelease)
    window.removeEventListener('keydown', this.keyPress)
    window.removeEventListener('keyup', this.keyRelease)
  }
}
</script>
<style>
/* Multi-use style at the top */
.clickable:hover {
  cursor: pointer;
  box-shadow: inset 0 0 10px red;
}
.control-panel {
  margin-left: 12%;
  margin-right: 12%;
  background: grey;
  border: 1px solid black;
}
.display-slot {
  padding: 10%;
}
.display-screen {
  width: 100%;
  height: 100%;
  background: black;
  color: red;
}
.invisible {
  opacity: 0;
}
.is-center {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.is-spaced {
  display: flex;
  justify-content: space-around;
}
.il-grid {
  display: inline-grid;
}

/* Component specific styles here */
#app {
  position: absolute;
  top:0;
  left:0;
  right:0;
  bottom:0;
  background: #fafafa;
  grid-template-rows: 1fr 600px 1fr;
  grid-template-columns: 1fr 800px 1fr;
  font-family: Monospace;
}
.synth-body {
  grid-row: 2/3;
  grid-column: 2/3;
  background: #303030;
  border-radius: 30px;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(12, 1fr);
}
.main-logo {
  grid-row: 1/2;
  grid-column: 1/5;
  color: white;
  font-size: 32px;
  font-style: italic;
  text-decoration: underline;
}
.osc-slot {
  grid-row: 2/4;
  grid-column: 1/5;
}
.osc-env {
  grid-row: 5 / 7;
  grid-column: 1 / 5;
}
.filter-slot {
  grid-row: 2 / 4;
  grid-column: 5 / 9;
}
.filter-env {
  grid-row: 5 / 7;
  grid-column: 5 / 9;
}
.fx1 {
  grid-row: 2 / 4;
  grid-column: 9 / 13;
}
.fx2 {
  grid-row: 5 / 7;
  grid-column: 9 / 13;
}
.keyboard {
  grid-row: 8/13;
  grid-column: 2/12;
}
.octave-controls {
  grid-row: 7 / 8;
  grid-column: 9 / 13;
}
.debug {
  padding: 10px;
  background: darkblue;
}

.debug p {
  color: white;
  font-size: 12px;
}
</style>
