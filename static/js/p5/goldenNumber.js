// import Bubble from 'static/js/p5/bubbles'

export default function goldenRatio(p) {
  let totalPoints = 400 // total number of ball per angle

  let c = 8 // parameter to determine size of figure

  let stepSlider = 0.00001

  let angle
  let figFall = false
  let stopped = false
  let angleSlider
  let button
  let r0 = 11 //   size of the balls
  let bubbles = []

  let minDist = 1
  let count = 0
  let controlToggle = false

  let inputAngle
  let angleTexto
  let angleString
  let slider
  let control
  let msg

  //   function return width and heigth of portview
  // function getViewportSize() {
  //   // This works for all browsers except IE8 and before
  //   if (window.innerWidth != null)
  //     return { w: window.innerWidth, h: window.innerHeight }

  //   // For IE (or any browser) in Standards mode
  //   let d = window.document
  //   if (document.compatMode == 'CSS1Compat')
  //     return {
  //       w: d.documentElement.clientWidth,
  //       h: d.documentElement.clientHeight
  //     }

  //   // For browsers in Quirks mode
  //   return { w: d.body.clientWidth, h: d.body.clientHeight }
  // }

  //--------------------------------------
  p.setup = function() {
    //let canvasSize = setCanvasSize()
    let width = window.innerWidth
    let height = window.innerHeight //canvasSize.h

    let cnv = p.createCanvas(width, height)

    cnv.parent('#container-figure')

    p.angleMode(p.RADIANS)
    p.colorMode(p.HSL)

    // controls

    // create controls
    control = p.createButton('Controles')
    button = p.createButton('parar/seguir')
    angleTexto = p.createElement('p', '')
    inputAngle = p.createInput('fração de 2PI')
    slider = p.createSlider(0, p.TWO_PI, 0.31835, stepSlider)
    msg = p.createElement('p', 'clique no centro da figura...de novo')

    //controls parent
    control.parent('#container-figure')
    angleTexto.parent('#container-figure')
    inputAngle.parent('#container-figure')
    button.parent('#container-figure')
    slider.parent('#container-figure')
    msg.parent('#container-figure')

    // controls style

    // background, border, color

    angleTexto.style('background-color: RGBA(250,250,250,0.1); color:green')
    inputAngle.style(
      'background-color: RGBA(250,250,250,0.1); color: green; padding-left: 1%;'
    )
    button.style(
      'border: 0px solid white; background-color: RGBA(250,250,250,0.1); color:green '
    )
    control.style('border: 0px solid white; color: green;')
    inputAngle.style('border: 1px solid green;')
    control.style('background-color: RGBA(250,250,250,0.1);')
    msg.style('color: green; background-color: RGBA(250,250,250,0.1);')

    // font-size

    angleTexto.style('font-size', '0.8em')
    button.style('font-size', '0.8em') // 80% of fontSize
    inputAngle.style('font-size', '0.8em')
    msg.style('font-size', '0.6em')
    control.style('font-size', '0.9em')

    // width

    slider.style('width', '10em') //30% of width
    button.style('width', '6em')
    button.style('height', '1.5em')
    control.style('height', '1.5em')
    control.style('width', '6em')
    inputAngle.style('width', '7em')
    inputAngle.style('height', '1.5em')

    // control posiitions
    let offsetX = 0.05
    let stepY = 0.06
    let step0 = 0.02

    control.position(offsetX * width, step0 * height)
    inputAngle.position(offsetX * width, (step0 + stepY) * height)
    angleTexto.position(offsetX * width, (step0 + 2 * stepY) * height)
    slider.position(offsetX * width, (step0 + 3 * stepY) * height)
    button.position(offsetX * width, (step0 + 4 * stepY) * height) // 95%  of height
    msg.position(0.7 * width, step0 * height) // 95%  of height

    // all controls are hide at the beginning
    button.hide()
    msg.hide()
    slider.hide()
    inputAngle.hide()
    control.hide()
    angleTexto.hide()

    angle = slider.value() // set angle inicial in slider

    // make distances

    //make bubbles for the first time
    for (let n = 0; n < totalPoints; n++) {
      let x = 10 * c * p.cos(n * angle)
      let y = 10 * c * p.sin(n * angle)

      let hue = (n % 150) + 20
      let saturation = 100 - 0.167 * n
      let lightness = 0.08 * n + 40

      let bubble = new Bubble(x, y, hue, saturation, lightness, r0)

      bubble.target.set(0.1 * Math.sqrt(n) * x, 0.1 * Math.sqrt(n) * y) //set initial targets and velocities

      bubble.vel.set(40 * (Math.random() - 0.5), 40 * (Math.random() - 0.5))
      bubbles.push(bubble)
    }
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

  function setCanvasSize() {
    let canvas = document.getElementById('container-figure')

    let canvasRect = canvas.getBoundingClientRect()

    let width, height

    let windowW = window.innerWidth
    let windowH = window.innerHeight

    let aspRatio = windowH / windowW

    if (windowW < 600) {
      width = 0.98 * windowW
      height = 1.1 * width
      r0 = 0.03 * windowW
      c = 6
    } else if (windowW > 600 && aspRatio > 1) {
      width = 0.98 * canvasRect.width
      height = canvasRect.width
      r0 = Math.max(Math.floor(0.002 * windowW), 11) // LINE ADDED
    } else {
      width = 0.98 * canvasRect.width
      height = 1.5 * canvasRect.width * aspRatio
      r0 = Math.max(Math.floor(0.003 * windowW), 11) // LINE ADDED
    }
    return { w: width, h: height }

    //let viewport = getViewportSize()
    // let aspectRatioInverse = viewport.h / viewport.w
    // let factor = 0.5 // almost 60%
    // if (viewport.w < 600) {
    //   // break point xs="600"
    //   factor = 0.9 // force to break boxes ....?
    // }
    // let width = Math.floor(factor * viewport.w)
    // let height = Math.min(
    //   Math.floor(1.4 * aspectRatioInverse * width),
    //   1.4 * width
    // ) // height is 40% bigger
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
    p.translate(0.5 * p.width, 200) //0.5 * p.height)

    button.mousePressed(toggleStopAngle)
    control.mousePressed(toggleControls)
    slider.changed(setAngle)
    inputAngle.changed(updateAngle)

    //make the first bubbles in the circle
    if (count < 160) {
      for (let n = 0; n < count; n++) {
        bubbles[n].display()
      }
      count++

      return
    }

    if (minDist > 0.1) {
      // bubbles are wandering
      let distances = []
      bubbles.forEach(bubble => {
        bubble.behaviors()
        bubble.update()
        let dist = p.createVector(
          bubble.target.x - bubble.pos.x,
          bubble.target.y - bubble.pos.y
        )
        distances.push(dist.mag())
      })

      bubbles.forEach(bubble => bubble.display())
      minDist = Math.max(...distances) // when steering stop
    } else {
      // show control and button stop
      control.show()
      msg.show()

      // callbacks for controls
      button.mousePressed(toggleStopAngle)
      control.mousePressed(toggleControls)
      slider.changed(setAngle)
      inputAngle.changed(updateAngle)

      if (figFall == false) {
        if (minDist > 0.1) {
          // when click second time minDist = 10
          let distances = []
          bubbles.forEach(bubble => {
            bubble.behaviors()
            bubble.update()
            let dist = p.createVector(
              //bubble.target.sub(bubble.pos)
              bubble.target.x - bubble.pos.x,
              bubble.target.y - bubble.pos.y
            )
            distances.push(dist.mag())
          })

          bubbles.forEach(bubble => bubble.display())
          minDist = Math.max(...distances)
          return
        } else {
          angleSlider = slider.value() % p.TWO_PI
          angle = angle % p.TWO_PI

          if (angle != angleSlider) {
            angle = angleSlider
          }

          // show angle in angleText
          angleString = (angle % p.TWO_PI).toFixed(5).toString()
          angleTexto.html('ângulo (radianos) =' + angleString)

          if (stopped == false) {
            angle += stepSlider
            slider.value(angle)
          }
        }

        // update bubbles positions

        bubbles.forEach((bubble, index) => {
          bubble.pos.x = c * Math.sqrt(index) * p.cos(index * angle)
          bubble.pos.y = c * Math.sqrt(index) * p.sin(index * angle)
        })
        //display bubbles
        bubbles.forEach(bubble => bubble.display())
      } else {
        bubbles.forEach(bubble => {
          if (stopped == false) {
            bubble.fall()
          }
          bubble.display()
        })
      }
    }
  } // end draw

  p.mouseOver = function() {
    if (p.dist(p.mouseX, p.mouseY, p.width / 2, p.height / 2) < 200) {
      over = true
    } else {
      over = false
    }
  }

  p.mouseClicked = function() {
    if (p.dist(p.mouseX, p.mouseY, p.width / 2, 200) < 200) {
      if (figFall == true) {
        // clicked by the second time
        bubbles.forEach(bubble => {
          bubble.vel.set(30 * (Math.random() - 0.5), 30 * (Math.random() - 0.5))
        })
        minDist = 10
      } else {
        // clicked by the first time
        bubbles.forEach(bubble => {
          bubble.target.set(bubble.pos)
        })
        minDist = 0 // stop steering behavior...
      }
      figFall = !figFall
    }
  }

  let Bubble = class {
    constructor(x, y, hue, saturation, lightness, radium) {
      this.lightness = lightness
      this.hue = hue
      this.sat = saturation
      this.r = radium
      this.maxforce = 0.5
      this.maxspeed = 8

      this.pos = p.createVector(x, y)
      this.vel = p.createVector()
      this.acc = p.createVector()
      this.target = p.createVector(x, y)
    }

    update() {
      this.pos.add(this.vel)
      this.vel.add(this.acc)
      this.acc.mult(0)
    }

    applyForce(f) {
      this.acc.add(f)
    }

    behaviors() {
      this.arrive(this.target)
    }

    arrive(target) {
      let newForce = p.createVector(
        target.x - this.pos.x,
        target.y - this.pos.y
      )

      let d = newForce.mag()

      let speed = this.maxspeed

      if (d < 100) {
        speed = p.map(d, 0, 100, 0, this.maxspeed)
      }

      newForce.setMag(speed)

      let steer = newForce.sub(this.vel)

      steer.limit(this.maxforce)

      this.applyForce(steer)
    }

    display() {
      p.fill(this.hue, this.sat, this.lightness)
      p.ellipse(this.pos.x, this.pos.y, this.r)
    }

    fall() {
      this.pos.add(p.random(-1, 1), 0.05 * this.pos.x)
    }

    wiggle() {
      this.pos.add(p.random(-2, 2), p.random(-2, 2))
    }
  }
}
