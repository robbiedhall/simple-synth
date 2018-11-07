export default function (sketch) {
  console.log(target)
  let width, height
  sketch.setup = function () {
    width = document.getElementById('sketch').clientWidth
    height = document.getElementById('sketch').clientHeight
    sketch.createCanvas(width, height)
  }

  sketch.draw = function () {
    sketch.background(0, 0, 0)
    sketch.stroke(255, 0, 0)
    sketch.line(0, height, 23, height / 4)
    sketch.line(23, height/4, 46, height / 2)
    sketch.line(46, height / 2, 69, height / 2)
    sketch.line(69, height / 2, width, height)
  }
}
