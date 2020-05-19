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
  let r0 = 6
  let r1 = 10
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

  p.setup = function() {
    let cnv = p.createCanvas(600, 600) //(p.windowWidth, p.windowHeight)
    cnv.parent('#container')

    p.angleMode(p.RADIANS)
    p.colorMode(p.HSL)

    angleTexto = p.createElement('h3', '')
    angleTexto.style(
      'background-color: black; font-size: 20px; color:lightgoldenrodyellow'
    )
    angleTexto.parent('#container')

    inputAngle = p.createInput('Digite a fração de 2 PI')
    inputAngle.style('width:60; background-color: grey;')
    inputAngle.parent('#container')

    slider = p.createSlider(0, p.TWO_PI, 1 / p.PI, rate)

    slider.style('width', '300px')
    slider.parent('#container')
    //slider.style('height: 60px;')

    angle = slider.value() // set angle inicial in slider

    button = p.createButton('Parar/Seguir')
    button.parent('#container')

    button.style(
      'border: 1px solid white; background-color: inherit; width: 110px; height: 40px; color:lightgoldenrodyellow'
    )

    button.style('font-size', '18px')

    let xpos = 0.1
    angleTexto.position(0.4 * p.width, 0.1 * p.height)
    button.position(xpos * p.width, 0.82 * p.height)
    inputAngle.position(xpos * p.width, 0.92 * p.height)
    slider.position(xpos * p.width, p.height)
  }

  function updateAngle() {
    stopped = true
    angle = p.float(inputAngle.value())
    angle = (angle * p.TWO_PI) % p.TWO_PI
    slider.value(angle)
    return
    //stopped = false
  }

  function toggleStopAngle() {
    stopped = !stopped
  }
  function setAngle() {
    angle = slider.value()
    //inputAngle.value(angle.toFixed(6).toString())
  }
  // p.windowResized = function() {
  //   p.resizeCanvas(p.windowWidth, p.windowHeight)
  //   console.log(p.windowWidth)
  // }

  p.draw = function() {
    let route = window.location.pathname
    if (route !== '/') {
      p.noLoop() /* stop sketch when route change */
      p.remove()
    }

    p.clear()
    p.translate(0.5 * p.width, 0.5 * p.height)

    console.log('working')

    if (steps < totalSteps) {
      p.push()
      p.stroke('rgb(0, 100, 0)')
      p.strokeWeight(2)
      p.noFill()
      p.circle(0, 0, 2 * initialRadium)

      if (p.frameCount % 16 === 0) {
        steps++
      }

      for (let n = 0; n < steps; n++) {
        let x = initialRadium * p.cos(-n * angle)
        let y = initialRadium * p.sin(-n * angle)
        p.noStroke()
        let bubble = new Bubble(x, y, hue, sat, lightness, r0)
        hue = (21 * n) % 267
        bubble.display()
      }
      p.pop()
    } else if (initialRadium > 20) {
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
    } else if (inflation > 0) {
      inflation -= 0.01
      p.push()
      p.scale(escala)
      for (let n = 0; n < totalPoints; n++) {
        distances[n] = inflation + (1 - inflation) * Math.sqrt(n)
        let x = c * distances[n] * p.cos(n * angle)
        let y = c * distances[n] * p.sin(n * angle)
        hue = n % 267
        sat = 70
        lightness = 55

        let bubble = new Bubble(x, y, hue, sat, lightness, r1)
        //bubbles.push(bubble)
        bubble.display()
      }
      //setTimeout(() => console.log('hola'), 1000)
      p.pop()
    } else {
      angleString = (angle % p.TWO_PI).toFixed(6).toString()
      angleTexto.html('Ângulo (radianos) =' + angleString)

      button.mousePressed(toggleStopAngle)

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

          let bubble = new Bubble(x, y, hue, sat, lightness, r1)
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
    if (p.dist(p.mouseX, p.mouseY, p.width / 2, p.height / 2) < 300) {
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
