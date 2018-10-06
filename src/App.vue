<template>
  <div id="app" draggable="false" class="il-grid" @mouseover="mousePress === false">
    <div draggable="false" class="synth-body il-grid">
      <div class="main-logo is-center">
        RH-A001
      </div>
      <OscControls class="osc-slot" @osc-change="oscChange"/>
      <EnvControls :target="`oscillator`" class="osc-env" @env-change="envChange"/>
      <FilterControls class="filter-slot" @filter-change="filterChange"/>
      <EnvControls :target="`filter`" class="filter-env" @env-change="envChange"/>
      <FXControls :fxSlot="1" class="fx1" @fx-change="fxChange"/>
      <FXControls :fxSlot="2" class="fx2" @fx-change="fxChange"/>
      <Keyboard :mousePressed="mousePressed":octave="octave" class="keyboard" @keybed-click="keybedClick"/>
    </div>
    <div class="debug is-centre">
      <p>Oscillator: {{oscillator}}</p>
      <p>Filter: {{filter}}</p>
      <p>FX1: {{fx1}}</p>
      <p>FX2: {{fx2}}</p>
      <p>Octave: {{octave}}</p>
      <p>mousePressed: {{mousePressed}}</p>
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
import Keyboard from '@/components/Keyboard.vue'
export default {
  name: 'app',
  components: {
    OscControls,
    FilterControls,
    EnvControls,
    FXControls,
    Keyboard
  },
  data() {
    return {
      oscillator: {
        osc: {},
        env: {}
      },
      filter: {
        filter: {},
        env: {}
      },
      fx1: {},
      fx2: {},
      octave: 3,
      keys: {},
      mousePressed: false
    }
  },
  computed: {
    synth () {
      var synth = new Tone.Synth()
      synth.oscillator.type = this.oscillator.osc.shape
      const oscEnv = this.oscillator.env
      for (let prop in oscEnv) {
        synth.envelope[prop] = oscEnv[prop]
      }
      return synth
    },
    currentFilter () {
      let filtParam = this.filter.filter
      var filter = new Tone.Filter(filtParam.freq, filtParam.type)
      return filter
    },
    chain () {
      let chain = [this.synth, this.currentFilter]
      if (this.fx1.power) {
        chain.push(this.fx1)
      }
      if (this.fx2.power) {
        chain.push(this.fx2)
      }
      for(let i = 0; i < chain.length; i++) {
        if (i === chain.length - 1) {
          chain[i].toMaster()
          return chain[i]
        } else {
          chain[i].connect(chain[i+1])
        }
      }
    }
  },
  methods: {
    test(){
      console.log(this.synth)
      this.synth.triggerAttackRelease('C4', 0.4)
    },
    oscChange (oscObj) {
      this.oscillator.osc = oscObj
    },
    filterChange(filterObj) {
      this.filter.filter = filterObj
    },
    envChange (target, envObj) {
      this[target].env = envObj
    },
    fxChange (target, fxObj) {
      this[target] = fxObj
    },
    keybedClick(note) {
    // TODO Decide how to best handle sustain / slide over the keybed while clicking
    },
    mousePress(event) {
      this.mousePressed = true
    },
    mouseRelease(event) {
      this.mousePressed = false
    },
    keyPress (event) {
      //Controls the keyboard octave - KEYS Z and X
      if (event.keyCode === 90 && this.octave > 0) {
          this.octave--
      } else if (event.keyCode === 88 && this.octave < 9 ) {
        this.octave++
      } else {
        const keys = this.keys
        const note = this.keyToNote(event.keyCode)
        if (!note) {
          console.log('invalid key pressed')
          return
        }
        if (keys[note]){
          // Sustain
        } else {
          //New note press
          this.playSynth(note)
          this.$set(this.keys, note, true)
        }
      }
    },
    keyRelease (event) {
      const keys = this.keys
      const note = this.keyToNote(event.keyCode)
      if (keys[note]) {
        // New key release
        this.$set(this.keys, note, false)
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
  mounted() {
    const app = document.getElementById('app')
    app.addEventListener('mousedown', this.mousePress)
    app.addEventListener('mouseup', this.mouseRelease)
  },
  beforeDestroy() {
    const app = document.getElementById('app')
    app.removeEventListener('mousedown', this.mousePress)
    app.removeEventListener('mouseup', this.mouseRelease)
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
.debug {
  padding: 10px;
  background: darkblue;
}

.debug p {
  color: white;
  font-size: 12px;
}
</style>
