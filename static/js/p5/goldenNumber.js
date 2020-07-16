import { Scalar } from 'babylonjs'

export default function goldenRatio(p) {
  let totalPoints = 400 // total number of ball per angle
  let totalSteps = 80
  let c = 9

  let initialRadium = 140
  let stepSlider = 0.00001

  let angle
  let figFall = false
  let stopped = false
  let angleSlider
  let button
  let r0 = 12
  let bubbles = []

  let minScale = 0.1
  let inflation = minScale
  let scale = 1

  let distance = []

  let hue = 100
  let sat = 45
  let lightness = 50
  let inputAngle
  let angleTexto
  let angleString
  let slider
  let control
  let msg

  let controlToggle = false

  //   function return width and heigth of portview
  function getViewportSize() {
    // This works for all browsers except IE8 and before
    if (window.innerWidth != null)
      return { w: window.innerWidth, h: window.innerHeight }

    // For IE (or any browser) in Standards mode
    var d = window.document
    if (document.compatMode == 'CSS1Compat')
      return {
        w: d.documentElement.clientWidth,
        h: d.documentElement.clientHeight
      }

    // For browsers in Quirks mode
    return { w: d.body.clientWidth, h: d.body.clientHeight }
  }

  //--------------------------------------
  p.setup = function() {
    let viewport = getViewportSize()
    let aspectRatioInverse = viewport.h / viewport.w

    let factor = 0.5 // almost 60%
    if (viewport.w < 600) {
      // break point xs="600"
      factor = 0.9 // force to break boxes ....?
    }

    let width = Math.floor(factor * viewport.w)
    let height = Math.min(
      Math.floor(1.4 * aspectRatioInverse * width),
      1.4 * width
    ) // height is 40% bigger

    r0 = Math.max(Math.floor(0.001 * viewport.w), r0) // LINE ADDED

    let cnv = p.createCanvas(width, height)

    cnv.parent('#container-figure')

    p.angleMode(p.RADIANS)
    p.colorMode(p.HSL)

    // make distances

    for (let n = 0; n < totalPoints; n++) {
      distance[n] = Math.sqrt(n)
    }

    // controls

    // create controls
    control = p.createButton('Controles')
    button = p.createButton('parar/seguir')
    angleTexto = p.createElement('p', '')
    inputAngle = p.createInput('fração de 2PI')
    slider = p.createSlider(0, p.TWO_PI, 1 / p.PI, stepSlider)
    msg = p.createElement(
      'p',
      'clique duas vezes no centro da figura...de novo'
    )

    //controls parent
    control.parent('#container-figure')
    angleTexto.parent('#container-figure')
    inputAngle.parent('#container-figure')
    button.parent('#container-figure')
    slider.parent('#container-figure')
    msg.parent('#container-figure')

    // controls style

    // background, border, color

    angleTexto.style('background-color: inherit; color:green')
    inputAngle.style(
      'background-color: lightgrey; color: green; padding-left: 1%;'
    )
    button.style(
      'border: 0px solid white; background-color: lightgrey; color:green '
    )
    control.style('border: 0px solid white; color: green;')
    inputAngle.style('border: 1px solid green;')
    control.style('background-color: lightgrey;')
    msg.style('color: green; background-color: inherit;')

    // font-size

    angleTexto.style('font-size', '0.8em')
    button.style('font-size', '0.8em') // 80% of fontSize
    inputAngle.style('font-size', '0.8em')
    msg.style('font-size', '0.6em')
    control.style('font-size', '0.9em')

    // width

    slider.style('width', Math.floor(0.3 * width).toString() + 'px') //30% of width
    button.style('width', Math.floor(0.18 * width).toString() + 'px')
    button.style('height', Math.floor(0.04 * width).toString() + 'px')
    control.style('height', Math.floor(0.04 * width).toString() + 'px')
    control.style('width', Math.floor(0.18 * width).toString() + 'px')
    inputAngle.style('width', Math.floor(0.2 * width).toString() + 'px')
    inputAngle.style('height', Math.floor(0.05 * width).toString() + 'px')

    // control posiitions
    let offsetX = 0.01

    button.position(0.2 * width, 0.95 * height) // 95%  of height
    msg.position(0.5 * width, 0.95 * height) // 95%  of height
    inputAngle.position(offsetX * width, 0.71 * height)
    slider.position(offsetX * width, 0.8 * height)
    angleTexto.position(offsetX * width, 0.87 * height)
    control.position(offsetX * width, 0.95 * height)

    // all controls are hide at the beginning
    button.hide()
    msg.hide()
    slider.hide()
    inputAngle.hide()
    control.hide()
    angleTexto.hide()

    angle = slider.value() // set angle inicial in slider
  }

  function updateAngle() {
    stopped = true
    angle = p.float(inputAngle.value())
    angle = (angle * p.TWO_PI) % p.TWO_PI
    slider.value(angle)
    return
    //stopped = false
  }

  function toggleControls() {
    controlToggle = !controlToggle

    if (controlToggle) {
      button.show()
      slider.show()
      inputAngle.show()
      angleTexto.show()
    } else {
      button.hide()
      slider.hide()
      inputAngle.hide()
      angleTexto.hide()
    }
  }

  function toggleStopAngle() {
    stopped = !stopped
  }
  function setAngle() {
    angle = slider.value()
    //inputAngle.value(angle.toFixed(6).toString())
  }
  p.windowResized = function() {
    p.resizeCanvas(p.width, p.height)
  }

  p.draw = function() {
    let route = window.location.pathname
    if (route !== '/') {
      p.noLoop() /* stop sketch when route change */
      p.remove()
    }

    p.clear()
    p.translate(0.5 * p.width, 0.5 * p.height)

    button.mousePressed(toggleStopAngle)
    control.mousePressed(toggleControls)
    slider.changed(setAngle)
    inputAngle.changed(updateAngle)

    if (scale > minScale) {
      scale -= 0.005
      p.push()
      p.scale(scale)
      for (let n = 0; n < totalSteps; n++) {
        let x = initialRadium * p.cos(n * angle)
        let y = initialRadium * p.sin(n * angle)
        hue = 2 * n + 40
        new Bubble(x, y, hue, sat, lightness, r0).display()
        //bubble.display()
      }
      p.pop()
    } else if (inflation < 1) {
      inflation += 0.008
      p.push()
      p.scale(inflation)
      for (let n = 0; n < totalPoints; n++) {
        let x = c * distance[n] * p.cos(n * angle)
        let y = c * distance[n] * p.sin(n * angle)

        hue = n % 267

        let bubble = new Bubble(x, y, hue, sat, lightness, r0)
        bubble.display()
        bubbles.push(bubble)
      }

      p.pop()
    } else {
      // show control and button stop
      control.show()
      button.show()
      msg.show()
      // show angle in angleText
      angleString = (angle % p.TWO_PI).toFixed(5).toString()
      angleTexto.html('ângulo (radianos) =' + angleString)

      // callbacks for controls
      button.mousePressed(toggleStopAngle)
      control.mousePressed(toggleControls)
      slider.changed(setAngle)
      inputAngle.changed(updateAngle)

      angleSlider = slider.value() % p.TWO_PI
      angle = angle % p.TWO_PI

      if (angle != angleSlider) {
        angle = angleSlider
      }

      if (figFall == false) {
        bubbles = [] //   clear bubbles to star over again
        if (stopped == false) {
          angle += stepSlider
          slider.value(angle)
        }

        for (let n = 0; n < totalPoints; n++) {
          let x = c * Math.sqrt(n) * p.cos(n * angle)
          let y = c * Math.sqrt(n) * p.sin(n * angle)
          hue = n % 267
          sat = 70
          lightness = 55

          let bubble = new Bubble(x, y, hue, sat, lightness, r0)
          bubbles.push(bubble)
          // if (over == true) {
          // 	bubble.wiggle()
          // }
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
    }
  } // end draw

  p.mouseOver = function() {
    if (p.dist(p.mouseX, p.mouseY, p.width / 2, p.height / 2) < 300) {
      over = true
    } else {
      over = false
    }
  }

  // p.mouseClicked = function() {
  //   if (figFall == true) {
  //     figFall = false
  //   }
  // }

  p.doubleClicked = function() {
    if (p.dist(p.mouseX, p.mouseY, p.width / 2, p.height / 2) < 120) {
      figFall = !figFall
    }
  }

  class Bubble {
    constructor(x, y, hue, saturation, lightness, radium) {
      this.x = x
      this.y = y
      this.l = lightness
      this.hue = hue
      this.sat = saturation
      this.r = radium
    }

    display() {
      p.fill(this.hue, this.sat, this.l)
      p.ellipse(this.x, this.y, this.r, this.r)
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
