export default function goldenRatio(p) {
  let total_points = 1000 // total number of ball per angle
  let c = 8
  let escala = 0.7
  let bubbles = []
  let rate = 0.00005
  let xp = 650
  let yp = 650

  let angle
  let figFall = false
  let stopped = false
  let over = false
  let slider
  let angleSlider
  let button, btn

  p.setup = function() {
    let cnv = p.createCanvas(xp, yp)
    cnv.parent('#figure')

    p.angleMode(p.RADIANS)
    p.colorMode(p.HSB)

    slider = p.createSlider(0, 2 * p.PI, 1 / p.PI, rate)
    slider.style('width', '300px')
    slider.parent('#figure')
    //slider.style('height: 60px;')

    angle = slider.value() // set angle inicial in slider

    button = p.createButton('Parar/Seguir')
    btn = p.createButton('Stop')
    btn.parent('#figure')
    button.parent('#figure')

    button.style(
      'background-color: black; width: 200px; height: 60px; color:lightgoldenrodyellow'
    )
    button.style('font-size', '18px')

    btn.style(
      'background-color: black; width: 200px; height: 60px; color:lightgoldenrodyellow'
    )
    btn.style('font-size', '18px')
  }

  function toggleStopAngle() {
    stopped = !stopped
  }

  p.draw = function() {
    //slider.changed(setAngle)
    button.mousePressed(toggleStopAngle)
    btn.mousePressed(stopSketch)

    p.background(0)
    p.translate(0.5 * xp, 0.5 * yp) // translate to center

    p.mouseOver()
    p.scale(escala)
    let hue, sat
    angleSlider = slider.value()
    if (angle != angleSlider) {
      angle = angleSlider
    }

    if (figFall == false) {
      bubbles = []
      if (stopped == false) {
        angle += rate
        slider.value(angle)
      }
      for (let n = 0; n < total_points; n++) {
        let x = c * Math.sqrt(n) * p.cos(n * angle)
        let y = c * Math.sqrt(n) * p.sin(n * angle)
        hue = n % 267 //67 + 279*Math.sqrt(n)/Math.sqrt(total_points);
        sat = 70

        let bubble = new Bubble(x, y, hue, sat)
        bubbles.push(bubble)
        if (over == true) {
          bubble.wiggle()
        }
        bubble.display()
      }
    } else {
      for (let bubble of bubbles) {
        if (stopped == false) {
          bubble.fall()
        }
        bubble.display()
      }
    }
  } // end draw

  function stopSketch() {
    p.noLoop()
    p.remove()
  }
  function setAngle() {
    angle = slider.value()
  }

  p.mouseOver = function() {
    if (p.dist(p.mouseX, p.mouseY, p.width / 2, p.height / 2) < 300) {
      over = true
    } else {
      over = false
    }
  }

  p.mouseClicked = function() {
    if (p.dist(p.mouseX, p.mouseY, p.width / 2, p.height / 2) < 300) {
      figFall = !figFall
    }
  }

  class Bubble {
    constructor(x, y, hue, sat) {
      this.x = x
      this.y = y
      this.hue = hue
      this.sat = sat
    }

    display() {
      p.stroke(100)
      p.fill(this.hue, this.sat, 100)
      p.ellipse(this.x, this.y, 10)
    }
    fall() {
      this.x = this.x + p.random(-1, 1)
      this.y = this.y + 0.05 * this.x
    }
    wiggle() {
      this.x = this.x + p.random(-2, 2)
      this.y = this.y + p.random(-2, 2)
    }
  }
}
