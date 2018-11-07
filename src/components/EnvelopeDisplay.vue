<template>
  <div :id="target + '-display'" style="border: 1px solid black">
    <vue-p5
      @sketch="sketch"
      @preload="preload"
      @setup="setup"
      @draw="draw"
    >
    </vue-p5>

  </div>
</template>

<script>
import VueP5 from "vue-p5";
import Map from '@/mixins/map.js'
export default {
  name: "p5-example",
  components: {
    "vue-p5": VueP5
  },
  mixins: [ Map ],
  props: {
    target: {
      type: String,
      required: true
    },
    size: {
      type: Object,
      required: true
    },
    env: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    red: 255,
    green: 0,
    blue: 0,
    lines: [],
    backgroundImage: null
  }),
  mounted () {
    this.$emit('display-mounted')
  },
  methods: {
    sketch(sketch) {
      sketch.draw = () => {
        const mb = this.mapBetween
        sketch.background(0, 0, 0);
        sketch.stroke(255, 0, 0)
        const bottomLeft = { x: 2, y: this.size.height - 2}
        const attackPeak = { x: mb(this.env.attack, 1, 40, 2, this.size.width / 4), y: 5}
        const decayPeak = { x: attackPeak.x + mb(this.env.decay,1 ,40, 0, this.size.width/4), y: mb(this.env.sustain, 1, 40, this.size.height - 3, attackPeak.y) }
        const sustainPeak = { x: decayPeak.x + this.size.width / 4, y: decayPeak.y}
        sketch.strokeWeight(2)
        sketch.line(bottomLeft.x, bottomLeft.y, attackPeak.x, attackPeak.y)
        sketch.strokeWeight(2)
        sketch.line(attackPeak.x, attackPeak.y, decayPeak.x, decayPeak.y)
        sketch.strokeWeight(2)
        sketch.line(decayPeak.x, decayPeak.y, sustainPeak.x, sustainPeak.y)
        sketch.strokeWeight(2)
        sketch.line(sustainPeak.x, sustainPeak.y, mb(this.env.release, 1, 40, sustainPeak.x, sustainPeak.x + this.size.width / 4), this.size.height - 2)
        sketch.stroke(100,100,100)
        sketch.line(0, this.size.height, this.size.width, this.size.height)
      };
    },
    preload(sketch) {

    },
    setup(sketch) {
      sketch.createCanvas(this.size.width, this.size.height)
      sketch.frameRate(24)
    },
    draw(sketch) {

    },
    keyPressed({ keyCode }) {

    },
    mouseMoved({ mouseX, mouseY, pmouseX, pmouseY }) {
      this.pushLine({ mouseX, mouseY, pmouseX, pmouseY, color: 0 });
    },
    mouseDragged({ mouseX, mouseY, pmouseX, pmouseY }) {
      this.pushLine({ mouseX, mouseY, pmouseX, pmouseY, color: 255 });
    },
    toggleRed() {
      this.red = 255 - this.red;
    },
    toggleGreen() {
      this.green = 255 - this.green;
    },
    pushLine(line) {
      let lines = this.lines;
      lines.push(line);
      this.lines = lines.slice(-100);
    }
  },
  watch: {
    size: {
      handler (newVal, oldVal) {
        if (newVal.hasOwnProperty('width') && newVal.hasOwnProperty('height')) {

        }
      },
      immediate: true
    }
  }
}
</script>
<style scoped>

</style>
