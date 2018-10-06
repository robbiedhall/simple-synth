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
          {{currentFx.type}}
        </div>
        <div class="is-center clickable" @click="changeType(1)">
          <i class="fa fa-chevron-right"/>
        </div>
      </div>
    </div>
    <div class="params-display">
      <div class="display-screen">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'FXControls',
  props: {
    fxSlot: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      select: 0,
      types: ['auto-filter', 'distortion', 'phaser'],
      power: false
    }
  },
  methods: {
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
      return {
        power: this.power,
        type: this.types[this.select]
      }
    }
  },
  watch: {
    currentFx: {
      handler (newVal) {
        this.$emit('fx-change', `fx${this.fxSlot}`, newVal)
      },
      deep: true,
      immediate: true
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
</style>
