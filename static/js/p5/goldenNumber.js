export default function goldenRatio(p) {
  let totalPoints = 400 // total number of ball per angle
  let totalSteps = 40 //80
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

    r0 = Math.max(Math.floor(0.016 * viewport.w), 15) // LINE ADDED

    let cnv = p.createCanvas(width, height)

    cnv.parent('#container-figure')

    p.angleMode(p.RADIANS)
    p.colorMode(p.HSL)

    // controls

    // create controls
    control = p.createButton('Controles')
    button = p.createButton('Parar/Seguir')
    angleTexto = p.createElement('p', '')
    inputAngle = p.createInput('fração de 2PI')
    slider = p.createSlider(0, p.TWO_PI, 1 / p.PI, rate)

    //controls parent
    control.parent('#container-figure')
    angleTexto.parent('#container-figure')
    inputAngle.parent('#container-figure')
    button.parent('#container-figure')
    slider.parent('#container-figure')

    // controls style

    // background, border, color

    angleTexto.style('background-color: inherit;')
    inputAngle.style(
      'background-color: lightgrey; color: green; padding-left: 1%;'
    )
    button.style(
      'border: 0px solid white; background-color: lightgrey; color:green '
    )
    control.style('border: 0px solid white; color: green;')
    inputAngle.style('border: 1px solid green;')
    button.style('border: 1px solid green')

    // font-size

    angleTexto.style('font-size', '0.8em')
    button.style('font-size', '0.8em') // 70% of fontSize
    inputAngle.style('font-size', '0.8em')
    control.style('font-size', '0.9em')

    // width

    slider.style('width', Math.floor(0.3 * width).toString() + 'px') //30% of width
    button.style('width', Math.floor(0.2 * width).toString() + 'px')
    button.style('height', Math.floor(0.05 * width).toString() + 'px')
    inputAngle.style('width', Math.floor(0.2 * width).toString() + 'px')
    inputAngle.style('height', Math.floor(0.05 * width).toString() + 'px')

    let offsetX = 0.01

    button.position(offsetX * width, 0.63 * height)
    inputAngle.position(offsetX * width, 0.71 * height)
    slider.position(offsetX * width, 0.8 * height)
    angleTexto.position(offsetX * width, 0.87 * height) //(0.7 * width, 0.02 * width)
    control.position(offsetX * width, 0.95 * height)

    button.hide()
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
    console.log('controlToggle=', controlToggle)

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

        let bubble = new Bubble(x, y, hue, sat, lightness, r0)
        bubble.display()
      }

      p.pop()
    } else if (inflation > 0.005) {
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

        let bubble = new Bubble(x, y, hue, sat, lightness, r0)
        //bubbles.push(bubble)
        bubble.display()
      }
      //setTimeout(() => console.log('hola'), 1000)
      p.pop()
    } else {
      angleString = (angle % p.TWO_PI).toFixed(6).toString()
      angleTexto.html('ângulo (radianos) =' + angleString)
      angleTexto.style('color: green')
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
