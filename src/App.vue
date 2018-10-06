<template>
  <div id="app" draggable="false">
    <div draggable="false" class="synth-body">
      <div class="main-logo">
        RH-A001
      </div>
      <div class="osc-controls">
        <div class="osc-display">
          <div class="osc-display-screen">
            {{currentWaveShape}}
          </div>
        </div>
        <div class="osc-text">
          Oscillator
        </div>
        <div class="osc-selector">
          <input class="osc-slider clickable" type="range" min="0" max="3" v-model="osc.select">
        </div>
      </div>
      <div class="osc-env-controls">
        <div class="osc-env-text">
          Oscillator Envelope
        </div>
        <div class="osc-env-sliders">
          <input class="clickable" type="range" min="1" max="1000" orient="vertical" v-model="osc.env.attack">
          <input class="clickable" type="range" min="1" max="1000" orient="vertical" v-model="osc.env.decay">
          <input class="clickable" type="range" min="1" max="1000" orient="vertical" v-model="osc.env.sustain">
          <input class="clickable" type="range" min="1" max="1000" orient="vertical" v-model="osc.env.release">
        </div>
        <div class="osc-env-display">
          <div class="osc-env-screen" id="oscEnvScreen">
            <div class="osc-env-attack env-screen-phase" :style="{minWidth: oscEnvScreenStyle.attack + 'px'}">

            </div>
            <div class="osc-env-decay env-screen-phase" :style="{minWidth: oscEnvScreenStyle.decay + 'px'}">
            </div>
            <div class="osc-env-sustain env-screen-phase" :style="{minWidth: oscEnvScreenStyle.sustain + 'px'}">
            </div>
            <div class="osc-env-release env-screen-phase" :style="{minWidth: oscEnvScreenStyle.release + 'px'}">
            </div>
          </div>
        </div>
      </div>
      <div class="filter-controls">
        <div class="filter-text">
          Filter
        </div>
        <div class="filter-frequency-controls">
          <div class="filter-frequency-display">
            <div class="filter-frequency-screen">
              {{Math.floor(this.scaleFilterFreq)}}Hz
            </div>
          </div>
          <div class="filter-frequency-slider">
            <input class="clickable" type="range" min="1" max="1000" orient="vertical" v-model="filter.freq">
          </div>
        </div>
        <div class="filter-type-controls">
          <div class="filter-type-display">
            <div class="filter-type-screen">
              {{currentFilterType}}
            </div>
          </div>
          <div class="filter-type-slider">
            <input class="clickable" type="range" min="0" max="2" v-model="filter.select">
          </div>
        </div>
      </div>
      <div class="filter-env-controls">
        <div class="filter-env-text">
          Filter Envelope
        </div>
        <div class="filter-env-sliders">
          <input class="clickable" type="range" min="1" max="1000" orient="vertical" v-model="filter.env.attack">
          <input class="clickable" type="range" min="1" max="1000" orient="vertical" v-model="filter.env.decay">
          <input class="clickable" type="range" min="1" max="1000" orient="vertical" v-model="filter.env.sustain">
          <input class="clickable" type="range" min="1" max="1000" orient="vertical" v-model="filter.env.release">
        </div>
        <div class="filter-env-display">
          <div class="filter-env-screen" id="oscEnvScreen">
            <div class="filter-env-attack env-screen-phase" :style="{minWidth: filterEnvScreenStyle.attack + 'px'}">

            </div>
            <div class="filter-env-decay env-screen-phase" :style="{minWidth: filterEnvScreenStyle.decay + 'px'}">
            </div>
            <div class="filter-env-sustain env-screen-phase" :style="{minWidth: filterEnvScreenStyle.sustain + 'px'}">
            </div>
            <div class="filter-env-release env-screen-phase" :style="{minWidth: filterEnvScreenStyle.release + 'px'}">
            </div>
          </div>
        </div>
      </div>
      <div class="fx1-controls">
        <div class="fx-power-button">
          <input type="checkbox" class="fx-power-button-input" v-model="fx1.power">
        </div>
        <div class="fx-text">
          FX1
        </div>
        <div class="fx-type-display">
          <div class="fx-type-screen">
            <div class="fx-type-left clickable" @click="moveFxLeft(1)">
              <i class="fa fa-chevron-left"/>
            </div>
            <div class="fx-type-text">
              {{currentFx1.type}}
            </div>
            <div class="fx-type-right clickable" @click="moveFxRight(1)">
              <i class="fa fa-chevron-right"/>
            </div>
          </div>
        </div>
        <div class="fx-params-display">
          <div class="fx-params-screen">
          </div>
        </div>
      </div>
      <div class="fx2-controls">
        <div class="fx-power-button">
          <input type="checkbox" class="fx-power-button-input" v-model="fx2.power">
        </div>
        <div class="fx-text">
          FX2
        </div>
        <div class="fx-type-display">
          <div class="fx-type-screen">
            <div class="fx-type-left clickable" @click="moveFxLeft(2)">
              <i class="fa fa-chevron-left"/>
            </div>
            <div class="fx-type-text">
              {{currentFx2.type}}
            </div>
            <div class="fx-type-right clickable" @click="moveFxRight(2)">
              <i class="fa fa-chevron-right"/>
            </div>
          </div>
        </div>
        <div class="fx-params-display">
          <div class="fx-params-screen">
          </div>
        </div>
      </div>
      <div class="keyboard">
        <div class="white-keys">
          <div v-for="(whiteKeys, i) in 14"
            draggable="false"
            class="white-key" :key="i"
            @mousedown="processKeyClick('white' + i)"
            @mouseover="checkIfClickingAndPlay('white' + i)"
            >
          </div>
        </div>
        <div class="black-keys">
          <div v-for="(blackKeys, j) in 13"
            draggable="false"
            class="black-key" :key="j"
            @mousedown="processKeyClick('black' + j)"
            :class="{'invisible' : amInvisible(j)}"
            @mouseover="checkIfClickingAndPlay('black' + j)"
            >
          </div>
        </div>
      </div>
    </div>
    <button type="button" @click="testFunc('C4')">Test</button>
  </div>
</template>

<script>
import Tone from 'tone'
export default {
  name: 'app',
  components: {
  },
  data() {
    return {
      osc: {
        env: {
          attack: 500,
          decay: 500,
          sustain: 500,
          release: 500
        },
        shapes: ['sine', 'triangle', 'square', 'sawtooth'],
        select: 0,

      },
      filter: {
        types: ["lowpass", "highpass", "bandpass"],
        select: 0,
        freq: 1000,
        env: {
          attack: 500,
          decay: 500,
          sustain: 500,
          release: 500
        }
      },
      fx1: {
        power: false,
        typeSelect: 0,
        type: 'auto-filter'
      },
      fx2: {
        power: false,
        typeSelect: 0,
        type: 'auto-filter'
      },
      fxTypes: ['auto-filter', 'distortion', 'phaser'],
      octave: 3,
      keys: {},
      mouseIsClicked: false,
    }
  },
  computed: {
    currentFx1 () {
      return {
        type: this.fxTypes[this.fx1.typeSelect],
        params: {
          freq: 10
        }
      }
    },
    currentFx2 () {
      return {
        type: this.fxTypes[this.fx2.typeSelect],
        params: {
          freq: 20
        }
      }
    },
    currentOscEnv() {
      return {
        attack: this.mapBetween(this.osc.env.attack, 1, 1000, 0, 3).toFixed(2),
        decay: this.mapBetween(this.osc.env.decay, 1, 1000, 0, 2).toFixed(2),
        sustain: this.mapBetween(this.osc.env.sustain, 1, 1000, 0, 1).toFixed(2),
        release: this.mapBetween(this.osc.env.release, 1, 1000, 0, 2).toFixed(2)
      }
    },
    oscEnvScreenStyle() {
      const screen = document.getElementById('oscEnvScreen')
      const screenW = screen ? screen.offsetWidth : ''
      const attackW = Math.floor(this.mapBetween(this.currentOscEnv.attack, 0, 3, 1, screenW / 4))
      const decayW = Math.floor(this.mapBetween(this.currentOscEnv.decay, 0, 2, 1, screenW / 4))
      const releaseW = Math.floor(this.mapBetween(this.currentOscEnv.release, 0, 2, 1, screenW / 4))
      const sustainW = screenW - decayW - attackW - releaseW
      return {
        attack: attackW,
        decay: decayW,
        sustain: sustainW,
        release: releaseW
      }
    },
    currentFilterEnv() {
      return {
        attack: this.mapBetween(this.filter.env.attack, 1, 1000, 0, 3).toFixed(2),
        decay: this.mapBetween(this.filter.env.decay, 1, 1000, 0, 2).toFixed(2),
        sustain: this.mapBetween(this.filter.env.sustain, 1, 1000, 0, 1).toFixed(2),
        release: this.mapBetween(this.filter.env.release, 1, 1000, 0, 2).toFixed(2)
      }
    },
    filterEnvScreenStyle() {
      const screen = document.getElementById('oscEnvScreen')
      const screenW = screen ? screen.offsetWidth : ''
      const attackW = Math.floor(this.mapBetween(this.currentFilterEnv.attack, 0, 3, 1, screenW / 4))
      const decayW = Math.floor(this.mapBetween(this.currentFilterEnv.decay, 0, 2, 1, screenW / 4))
      const releaseW = Math.floor(this.mapBetween(this.currentFilterEnv.release, 0, 2, 1, screenW / 4))
      const sustainW = screenW - decayW - attackW - releaseW
      return {
        attack: attackW,
        decay: decayW,
        sustain: sustainW,
        release: releaseW
      }
    },
    currentWaveShape() {
      return this.osc.shapes[this.osc.select]
    },
    currentFilterType() {
      return this.filter.types[this.filter.select]
    },
    scaleFilterFreq () {
      const freqSlide = this.filter.freq
      if (freqSlide <= 100) {
        return this.mapBetween(freqSlide, 1, 100, 1, 30)
      }
      if (freqSlide <= 200) {
        return this.mapBetween(freqSlide, 101, 200, 31, 100)
      }
      if (freqSlide <=500) {
        return this.mapBetween(freqSlide, 201, 500, 100, 1000)
      }
      if (freqSlide <= 800) {
        return this.mapBetween(freqSlide, 501, 800, 1001, 10000)
      }
      return this.mapBetween(freqSlide, 801, 1000, 10001, 22000)
    }
  },
  methods: {
    moveFxLeft(fxNum) {
      const target = this[`fx${fxNum}`]
      const fxTypes = this.fxTypes
      if (target.typeSelect === 0) {
        target.typeSelect = fxTypes.length - 1
      } else {
        target.typeSelect--
      }
    },
    moveFxRight(fxNum) {
      const target = this[`fx${fxNum}`]
      const fxTypes = this.fxTypes
      if (target.typeSelect === fxTypes.length - 1) {
        target.typeSelect = 0
      } else {
        target.typeSelect++
      }
    },
    createFx(type, params) {
      switch (type) {
        case 'auto-filter':
        return new Tone.AutoFilter(Math.floor(Math.random() * 30)).start()
        default:
        return null
      }
    },
    createFilter(freq, type) {
      return new Tone.Filter(freq, type)
    },
    testFunc (note) {
      const filter = this.createFilter(100, 'lowpass')
      console.log(filter)
      let synth = new Tone.Synth()
      synth.oscillator.type = this.currentWaveShape
      synth.connect(filter)
      console.log(synth)
      filter.toMaster()
      synth.triggerAttackRelease(note, 0.4)
    },
    mapBetween(value, minIn, maxIn, minOut, maxOut) {
      return (value - minIn) * (maxOut - minOut) / (maxIn - minIn) + minOut
    },
    mousePress(event) {
      this.mouseIsClicked = true
    },
    mouseRelease(event) {
      this.mouseIsClicked = false
    },
    playSynth(note) {
      const fx1 = this.createFx(this.currentFx1.type, this.currentFx1.params)
      const fx2 = this.createFx(this.currentFx2.type, this.currentFx1.params)
      const filter = this.createFilter(this.scaleFilterFreq, this.currentFilterType)
      const synth = new Tone.Synth()
      synth.oscillator.type = this.currentWaveShape
      synth.connect(filter)
      if (this.fx1.power && this.fx2.power) {
        filter.connect(fx1)
        fx1.connect(fx2)
        fx2.toMaster()
      } else if (this.fx1.power) {
        filter.connect(fx1)
        fx1.toMaster()
      } else if(this.fx2.power) {
        filter.connect(fx2)
        fx2.toMaster()
      } else {
        filter.toMaster()
      }
      synth.volume.value = -10
      synth.triggerAttackRelease(note, 0.4)
    },
    checkIfClickingAndPlay(key) {
      if (this.mouseIsClicked) {
        const check = this.keyClick(key)
        if (check) {
          this.playSynth(check)
        }
      }
    },
    amInvisible(ind) {
      switch(ind) {
        case 2:
        case 6:
        case 9:
          return true
        default:
          return false
      }
    },
    processKeyClick(clickedKey) {
      const check = this.keyClick(clickedKey)
      if (check) {
        this.playSynth(check)
      }
    },
    keyClick(clickedKey) {
      switch(clickedKey) {
        case 'white0':
          return `C${this.octave}`
        case 'black0':
          return `C#${this.octave}`
        case 'white1':
          return `D${this.octave}`
        case 'black1':
          return `D#${this.octave}`
        case 'white2':
          return `E${this.octave}`
        case 'white3':
          return `F${this.octave}`
        case 'black3':
          return `F#${this.octave}`
        case 'white4':
          return `G${this.octave}`
        case 'black4':
          return `G#${this.octave}`
        case 'white5':
          return `A${this.octave}`
        case 'black5':
          return `A#${this.octave}`
        case 'white6':
          return `B${this.octave}`
        case 'white7':
          return `C${this.octave+1}`
        case 'black7':
          return `C#${this.octave+1}`
        case 'white8':
          return `D${this.octave+1}`
        case 'black8':
          return `D#${this.octave+1}`
        case 'white9':
          return `E${this.octave+1}`
        case 'white10':
          return `F${this.octave+1}`
        case 'black10':
            return `F#${this.octave+1}`
        case 'white11':
          return `G${this.octave+1}`
        case 'black11':
          return `G#${this.octave+1}`
        case 'white12':
          return `A${this.octave+1}`
        case 'black12':
          return `A#${this.octave+1}`
        case 'white13':
          return `B${this.octave+1}`
        default:
          return null
      }
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
  created() {
    window.removeEventListener('keydown', this.keyPress)
    window.removeEventListener('keyup', this.keyRelease)
    window.removeEventListener('mousedown', this.mousePress)
    window.removeEventListener('mouseup', this.mouseRelease)
    window.addEventListener('keydown', this.keyPress)
    window.addEventListener('keyup', this.keyRelease)
    window.addEventListener('mousedown', this.mousePress)
    window.addEventListener('mouseup', this.mouseRelease)
  },
  beforeDetroy(){
    window.removeEventListener('keydown', this.keyPress)
    window.removeEventListener('keyup', this.keyRelease)
    window.removeEventListener('mousedown', this.mousePress)
    window.removeEventListener('mouseup', this.mouseRelease)
  }
}
</script>
<style>
/*Multi-use style at the top*/
.clickable:hover {
  cursor: pointer;
  box-shadow: inset 0 0 10px red;
}
#app {
  position: absolute;
  top:0;
  left:0;
  right:0;
  bottom:0;
  background: #fafafa;
  display: inline-grid;
  grid-template-rows: 1fr 600px 1fr;
  grid-template-columns: 1fr 800px 1fr;
}
.synth-body {
  grid-row: 2/3;
  grid-column: 2/3;
  background: #303030;
  border-radius: 30px;
  display: inline-grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(12, 1fr);
}
.main-logo {
  grid-row: 1/2;
  grid-column: 1/5;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 32px;
  font-family: monospace;
  font-style: italic;
  text-decoration: underline;
}
.invisible {
  opacity: 0;
}
.osc-controls {
  margin-left: 12%;
  margin-right: 12%;
  grid-row: 2/4;
  grid-column: 1/5;
  background: grey;
  display: inline-grid;
  border: 1px solid black;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 1fr);
}
.osc-display {
  grid-row: 1 / 3;
  grid-column: 3 / 5;
  padding: 10%;
}
.osc-selector {
  display: flex;
  justify-content: center;
  grid-row: 3/4;
  grid-column: 1/5;
}
.osc-text {
  grid-row: 1 / 3;
  grid-column: 1 /3;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Monospace;
}
.osc-slider {
  margin: 0;
  width: 80%;
  background: black;
  color: grey;
}
.osc-display-screen {
  width: 100%;
  height: 100%;
  background: black;
  color: red;
  font-family: monospace;
  display: flex;
  justify-content: center;
  align-items: center;
}
.osc-env-controls {
  margin-left: 12%;
  margin-right: 12%;
  grid-row: 5 / 7;
  grid-column: 1 / 5;
  background: grey;
  border: 1px solid black;
  display: inline-grid;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-columns: repeat(5, 1fr);
}
.osc-env-controls input[orient=vertical] {
  width: 10px;
  height: 40px;
  writing-mode: bt-lr; /* IE */
  -webkit-appearance: slider-vertical; /* WebKit */
}
.osc-env-text {
  grid-row: 1 / 3;
  grid-column: 1 / 3;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  font-family: Monospace;
}
.osc-env-sliders {
  grid-row: 3/4;
  grid-column: 1 / 6;
  display: flex;
  justify-content: space-around;
}
.osc-env-display {
  grid-row: 1/3;
  grid-column: 3/6;
  padding: 10%;
}
.osc-env-screen {
  background: black;
  color: red;
  width: 100%;
  height: 100%;
  display: flex;
}
.osc-env-screen div {
  height: 30px;
  display: inline;
}
.env-screen-phase {
  min-height: 1px;
}
.osc-env-attack {
  background: blue;
}
.osc-env-decay {
    background: green;
}
.osc-env-sustain {
  background: purple;
}
.osc-env-release {
  background: yellow;
}
.filter-env-controls {
  margin-left: 12%;
  margin-right: 12%;
  grid-row: 5 / 7;
  grid-column: 5 / 9;
  background: grey;
  border: 1px solid black;
  display: inline-grid;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-columns: repeat(5, 1fr);
}
.filter-env-controls input[orient=vertical] {
  width: 10px;
  height: 40px;
  writing-mode: bt-lr; /* IE */
  -webkit-appearance: slider-vertical; /* WebKit */
}
.filter-env-text {
  grid-row: 1 / 3;
  grid-column: 1 / 3;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  font-family: Monospace;
}
.filter-env-sliders {
  grid-row: 3/4;
  grid-column: 1 / 6;
  display: flex;
  justify-content: space-around;
}
.filter-env-display {
  grid-row: 1/3;
  grid-column: 3/6;
  padding: 10%;
}
.filter-env-screen {
  background: black;
  color: red;
  width: 100%;
  height: 100%;
  display: flex;
}
.filter-env-screen div {
  height: 30px;
  display: inline;
}
.filter-screen-phase {
  min-height: 1px;
}
.filter-env-attack {
  background: blue;
}
.filter-env-decay {
    background: green;
}
.filter-env-sustain {
  background: purple;
}
.filter-env-release {
  background: yellow;
}
.filter-controls{
  margin-left: 12%;
  margin-right: 12%;
  grid-row: 2 / 4;
  grid-column: 5 / 9;
  background: grey;
  display: inline-grid;
  border: 1px solid black;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(3, 1fr);
}
.filter-text {
  grid-row: 1/2;
  grid-column: 1/4;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Monospace;
}
.filter-frequency-controls {
  grid-row: 1 / 4;
  grid-column: 4 / 6;
  display: inline-grid;
  grid-template-rows: 1fr 1fr 1fr;
}
.filter-frequency-display {
  grid-row: 1/2;
  color: red;
  font-family: monospace;

  padding: 10%;
}
.filter-frequency-screen {
  width: 100%;
  height: 100%;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.9rem;
}
.filter-frequency-slider {
  grid-row: 2/4;
  display: flex;
  justify-content: center;
  align-items: center;
}
.filter-frequency-slider input[orient=vertical] {
  width: 10px;
  height: 60px;
  writing-mode: bt-lr; /* IE */
  -webkit-appearance: slider-vertical; /* WebKit */
}
.filter-type-controls {
  grid-row: 2/4;
  grid-column: 1/4;
  display: inline-grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr;
}
.filter-type-slider input {
  width: 100%;
}
.filter-type-display {
    padding: 10%;
  }
.filter-type-screen {
  background: black;
  color: red;
  font-family: Monospace;
  display: flex;
  justify-content: center;
  align-items: center;
}
.fx1-controls {
  border: 1px solid black;
  margin-left: 12%;
  margin-right: 12%;
  background: grey;
  grid-row: 2 / 4;
  grid-column: 9 / 13;
  display: inline-grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(3, 1fr);
}
.fx2-controls {
  border: 1px solid black;
  margin-left: 12%;
  margin-right: 12%;
  background: grey;
  grid-row: 5 / 7;
  grid-column: 9 / 13;
  display: inline-grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(3, 1fr);
}
.fx-power-button {
  grid-row: 1/2;
  grid-column: 1/2;
  display: flex;
  justify-content: center;
  align-items: center;
}
.fx-power-button-input {
-webkit-appearance: none;
background-color: black;
box-shadow: 0 1px 2px rgba(0,0,0,0.05), inset 0px -15px 10px -12px rgba(0,0,0,0.05);
padding: 10px;
display: inline-block;
position: relative;
}
.fx-power-button-input:active, .fx-power-button-input:checked:active {
 border: none;
}

.fx-power-button-input:checked {
	background-color: red;
	color: #99a1a7;
}
.fx-text {
  grid-row: 1/2;
  grid-column: 2/4;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  font-family: Monospace;
}
.fx-type-display {
  grid-row: 2 /4;
  grid-column: 1 / 4;
  padding: 5%;
}
.fx-type-screen {
  width: 100%;
  height: 100%;
  background: black;
  display: inline-grid;
  grid-template-columns: 1fr 4fr 1fr;
  color: red;
}
.fx-type-screen div{
  font-family: monospace;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.fx-params-display {
  grid-row: 1 / 4;
  grid-column: 4 /6;
  padding: 5%;
}
.fx-params-screen {
  width: 100%;
  height: 100%;
  background: black;
  color: red;
}
.keyboard {
  grid-row: 8/13;
  grid-column: 2/12;
  background: green;
  display: inline-grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(5, 1fr);
}
.white-keys {
  grid-column: 1 / 2;
  grid-row: 1 / 6;
  display: inline-grid;
  grid-template-rows: 1fr;
  grid-template-columns: repeat(14, 1fr);
}
.white-key {
  color: black;
  background: white;
  border: 1px solid black;
}
.black-keys {
  padding-left: 25px;
  padding-right: 25px;
  grid-column: 1 / 2;
  grid-row: 1 / 4;
  z-index: 2;
  display: inline-grid;
  grid-template-rows: 1fr;
  grid-template-columns: repeat(13, 1fr);
}
.black-key {
  margin-left:5px;
  margin-right:5px;
  color: white;
  background: black;
  border-radius: 0 0 10px 10px;
}
</style>
