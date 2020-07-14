export default function goldenRatio(p) {
  let totalPoints = 400 // total number of ball per angle
  let totalSteps = 80
  let c = 14 //7
  //let radium = 13
  let escala = 0.6
  let initialRadium = 100
  let bubbles = []
  let rate = 0.0001

  let angle
  let figFall = false
  let stopped = false
  //let over = false
  let angleSlider
  let button
  let inflation = 1
  let r0 = 10
  let r1 = 6
  let N = 0
  let steps = 1
  let distances = []
  let hue = 100 //steps % 267
  let sat = 80
  let lightness = 70
  let inputAngle
  let angleTexto
  let angleString
  let slider
  let control
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

    let factor = 0.5
    if (viewport.w < 600) {
      factor = 0.9 // force to break boxes ....?
    }

    let width = Math.floor(factor * viewport.w)
    let height = Math.floor(0.6 * factor * viewport.w)

    console.log('client width=', viewport.w)
    console.log('width=', width)

    let cnv = p.createCanvas(width, height) //(p.windowWidth / 2, p.windowHeight / 2)
    cnv.parent('#container')
    console.log('dimensions p5=', p.width, p.height)
    p.angleMode(p.RADIANS)
    p.colorMode(p.HSL)

    // controls

    control = p.createButton('Controles')
    control.parent('#container')

    button = p.createButton('Parar/Seguir')
    button.parent('#container')
    angleTexto = p.createElement('p', '')

    angleTexto.style('background-color: inherit; color:lightgoldenrodyellow')
    angleTexto.parent('#container')

    inputAngle = p.createInput('Fração de 2PI')
    inputAngle.style('background-color: #1e1e1e;')
    inputAngle.parent('#container')

    slider = p.createSlider(0, p.TWO_PI, 1 / p.PI, rate)

    let sliderLength = Math.floor(0.4 * width)

    slider.style('width', sliderLength.toString() + 'px')
    slider.parent('#container')
    //slider.style('height: 60px;')

    angle = slider.value() // set angle inicial in slider

    // button = p.createButton('Parar/Seguir')
    // button.parent('#container')

    button.style(
      'border: 0px solid white; background-color: #1e1e1e; color:lightgoldenrodyellow'
    )
    control.style(
      'border: 0px solid white; background-color: inherit; color:lightgoldenrodyellow'
    )
    slider.style('background-color : #1e1e1e;')

    // fontSize

    let fontFactor = 0.015
    fontSize = Math.floor(fontFactor * viewport.w).toString()
    console.log('fontSize=', fontSize)
    let fontSize = Math.floor(fontFactor * viewport.w.toString())
    angleTexto.style('font-size', fontSize + 'px')
    button.style('font-size', fontSize + 'px')
    control.style('font-size', fontSize + 'px')

    button.style('width', Math.floor(8 * fontSize).toString() + 'px')
    button.style('height', Math.floor(1.8 * fontSize).toString() + 'px')
    inputAngle.style('width', Math.floor(6 * fontSize).toString() + 'px')
    inputAngle.style('font-size', fontSize + 'px')

    let xpos = 0.05

    control.position(xpos * width, 0.43 * width)
    angleTexto.position(0.7 * width, 0.02 * width)
    button.position(xpos * width, 0.52 * width)
    slider.position(xpos * width, 0.58 * width)
    inputAngle.position(xpos * width, 0.48 * width)

    button.hide()
    slider.hide()
    inputAngle.hide()
    control.hide()
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
    console.log('controlToggle=', controlToggle)

    if (controlToggle) {
      button.show()
      slider.show()
      inputAngle.show()
    } else {
      button.hide()
      slider.hide()
      inputAngle.hide()
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
    console.log(p.windowWidth)
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

    // if (steps < totalSteps) {
    //   p.push()
    //   p.stroke('rgb(0, 100, 0)')
    //   p.strokeWeight(2)
    //   p.noFill()
    //   p.circle(0, 0, 2 * initialRadium)

    //   if (p.frameCount % 13 === 0) {
    //     steps++
    //   }

    //   for (let n = 0; n < steps; n++) {
    //     let x = initialRadium * p.cos(-n * angle)
    //     let y = initialRadium * p.sin(-n * angle)
    //     p.noStroke()
    //     hue = (21 * n) % 267
    //     let bubble = new Bubble(x, y, hue, sat, lightness, 5)
    //     bubble.display()
    //   }
    //   p.pop()
    // } else

    if (initialRadium > 20) {
      initialRadium--
      p.push()
      //p.translate(0.2 * p.width, 0.4 * p.height)
      // p.noStroke()
      // p.noFill()
      // p.strokeWeight(3)
      //p.scale()
      //p.circle(0, 0, 2 * R)
      for (let n = 0; n < totalSteps; n++) {
        let x = initialRadium * p.cos(n * angle)
        let y = initialRadium * p.sin(n * angle)

        let bubble = new Bubble(x, y, hue, sat, lightness, 5)
        bubble.display()
      }

      p.pop()
    } else if (inflation > 0) {
      inflation -= 0.01
      p.push()
      //p.scale(escala)
      for (let n = 0; n < totalPoints; n++) {
        distances[n] = 0.5 * inflation + 0.5 * (1 - inflation) * Math.sqrt(n)
        let x = c * distances[n] * p.cos(n * angle)
        let y = c * distances[n] * p.sin(n * angle)
        hue = n % 267
        sat = 70
        lightness = 55

        let bubble = new Bubble(x, y, hue, sat, lightness, 5)
        //bubbles.push(bubble)
        bubble.display()
      }
      //setTimeout(() => console.log('hola'), 1000)
      p.pop()
    } else {
      angleString = (angle % p.TWO_PI).toFixed(6).toString()
      angleTexto.html('ângulo (radianos) =' + angleString)

      control.show()
      button.mousePressed(toggleStopAngle)
      control.mousePressed(toggleControls)
      slider.changed(setAngle)
      inputAngle.changed(updateAngle)

      p.push()
      p.scale(escala)

      angleSlider = slider.value() % p.TWO_PI
      angle = angle % p.TWO_PI
      if (angle != angleSlider) {
        angle = angleSlider
      }

      if (figFall == false) {
        bubbles = []
        if (stopped == false) {
          angle += rate
          slider.value(angle)
        }

        for (let n = 0; n < totalPoints; n++) {
          let x = c * Math.sqrt(n) * p.cos(n * angle)
          let y = c * Math.sqrt(n) * p.sin(n * angle)
          hue = n % 267 //(n%93) + 60 ;//80 + 123*Math.sqrt(n)/Math.sqrt(totalPoints);
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
      p.pop()
    } // end draw
  }
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
    if (p.dist(p.mouseX, p.mouseY, p.width / 2, p.height / 2) < 200) {
      figFall = !figFall
    }
  }

  class Bubble {
    constructor(x, y, hue, saturation, lightness, radium) {
      this.x = x
      this.y = y
      this.L = lightness
      this.hue = hue
      this.sat = saturation
      this.r = radium
    }

    display() {
      //p.stroke(100)
      p.fill(this.hue, this.sat, this.L)
      p.ellipse(this.x, this.y, this.r)
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
