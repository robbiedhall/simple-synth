<template>
  <div class="keybed il-grid" id="keybed" draggable="false">
    <div class="octave-display">
      {{octave}}
    </div>
    <div class="white-keys il-grid" draggable="false">
      <div v-for="(whiteKeys, i) in 14"
        draggable="false"
        class="white-key" :key="i"
        @click="keybedClick(`white${i}`)"
        @mouseover="mouseOverKey(`white${i}`)"
        >
      </div>
    </div>
    <div class="black-keys il-grid" draggable="false">
      <div v-for="(blackKeys, j) in 13"
        draggable="false"
        class="black-key" :key="j"
        :class="{'invisible' : amInvisible(j)}"
        @click="keybedClick(`black${j}`)"
        @mouseover="mouseOverKey(`black${j}`)"
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Keyboard',
  props: {
    octave: {
      type: Number
    },
    mousePressed: {
      type: Boolean
    }
  },
  methods: {
    mouseOverKey(key) {
      if (this.mousePressed) {
        this.keybedClick(key)
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
    keybedClick(clickedKey) {
      const check = this.keybedClickCheck(clickedKey)
      if (check) {
        this.$emit('keybed-click', check)
      }
    },
    keybedClickCheck(clickedKey) {
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
          //Invisble key clicks go here. Might need some clever click event calcs to decide which which note to trigger
        default:
          return null
      }
    }
  }
}
</script>
<style scoped>
.keybed {
  grid-template-columns: 1fr;
  grid-template-rows: repeat(5, 1fr);
}
.white-keys {
  grid-column: 1 / 2;
  grid-row: 1 / 6;
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
