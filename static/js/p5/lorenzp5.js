export default function lorenz(p) {
  let maxIterations = 1000
  // numero total de iteracoes antes de mudar ponto inicial

  let count = 0
  let attractor
  let rate = 2 //let angleRate = 0.026;

  let x, y, z
  //let scala = 1;

  let points = []

  let angle = 0.2
  let R = 380
  let cnv
  let attractorFall = false
  let attractorWiggle = false
  var figure
  let btn

  const a = 10
  const b = 99.96 // parameters of Lorenz
  const c = 8.0 / 3.0

  p.setup = function() {
    cnv = p.createCanvas(500, 500, p.WEBGL) // (p.windowWidth, 800, p.WEBGL)
    figure = p.select('#figure')

    cnv.parent('#figure')
    //cnv.position(0, 0, 'stickily')

    // figure.html(
    //   `<span style ="color : lightgoldenrodyellow; font-size: 12px;
    //     position: relative; left: 30%; top: 20%;">
    //     clique duas vezes no atrator...clique de novo.
    //     </span>`
    // )

    btn = p.createButton('Stop')
    btn.parent('#figure')
    //btn.position(0, p.windowHeight, 'relative')
    btn.mousePressed(stopLorenz)
    btn.style(
      'background-color: black; width: 100px; height: 60px; color:lightgoldenrodyellow'
    )
    btn.style('font-size', '18px')

    let ip = initial_random()
    x = ip.x
    y = ip.y
    z = ip.z // initial point

    points.push(ip)

    p.angleMode(p.radians)
    // p.colorMode(p.RGB)
    p.colorMode(p.HSB) // color mode hue, saturation, bright

    attractor = new Attractor(points)
  }

  function stopLorenz() {
    p.noLoop()
    p.remove()
  }

  function initial_random() {
    let px, py, pz
    let r = p.random([0, 1]) // random number in {0,1}
    px = p.random(-50, 50)
    py = p.random(-50, 50)
    if (r == 0) {
      pz = p.random(200, 280)
    } else {
      pz = p.random(0, 30)
    }
    return new p5.Vector(px, py, pz)
  }

  p.mouseOver = function() {
    if (p.dist(p.mouseX, p.mouseY, p.width / 2, p.height / 2) < 200) {
      attractorWiggle = true
    } else {
      attractorWiggle = false
    }
  }
  p.doubleClicked = function() {
    attractorFall = !attractorFall

    // if (p.dist(p.mouseX, p.mouseY, p.width / 2, p.height / 2) < 200) {
    //     attractorFall = !attractorFall;
    // } //else {attractorFall = false}
  }

  /*-----------DRAW ATTRACTOR--------------------------------
  --------------------------------------------------------------*/

  p.draw = function() {
    let route = window.location.pathname
    if (route !== '/') {
      p.noLoop() /* stop sketch when route change */
      p.remove()
    }

    console.log('count=', count)
    p.background(0)
    p.noFill()
    p.mouseOver()

    // if (attractorWiggle) {
    //   attractor.wiggle()
    //   attractor.show()
    // }

    //p.clear();

    // rotacao da camera -------------------

    angle += 0.03 //angleRate; ; // rotacao da camera
    if (count > maxIterations * 0.24) {
      R -= 1
    }

    let x0 = R * p.cos(angle)
    let z0 = R * p.sin(angle)
    p.camera(x0, z0, 60, 0, 0, 90, 0, 0, -1)
    //-----------------------------

    //-------faz o titulo como testura sobre um plano------
    //titlebox.texture(tela_textura);
    //titlebox.plane(400, 100);
    //---------------------------------------------------

    rate = Math.floor(p.map(count, 0, maxIterations, 2, 12))
    //acelera plot
    let dt = 0.00375

    for (let i = 0; i < rate; i++) {
      let dx = a * (y - x) * dt //  Equations of Lorenz
      let dy = (x * (b - z) - y) * dt
      let dz = (x * y - c * z) * dt
      x = x + dx
      y = y + dy
      z = z + dz
      let newpoint = new p5.Vector(x, y, z)
      points.push(newpoint)
    }

    //p.scale(scala); // scale the figure
    //drawfloorplane();

    drawAxes(70, 6) // coloca os eixos comprim=70, asas das setas = 6

    count = count + rate
    // console.log(count)

    if (count > maxIterations) {
      points = [] // reinicia points
      R = 380
      //angleRate = 0.028;
      angle = p.random(0, p.TWO_PI)

      let ip = initial_random()
      x = ip.x
      y = ip.y
      z = ip.z
      points.push(ip)

      count = 0 // reinicia contador
    }

    let bright = 100
    for (let i = 0; i < points.length; i += 200) {
      // change color every 200 points
      attractor.points = points.slice(i) // take 200 points each time and draw in random color
      p.push()
      // if (i < 200) { bright = 100 }
      // else { }
      p.stroke(i % 360, 100, bright)
      p.strokeWeight(0.9)

      if (attractorFall) {
        attractor.fall()
      }
      attractor.show()

      let long = attractor.points.length - 1
      let pfinal = attractor.points[long]
      p.translate(pfinal)
      p.stroke('white')
      p.sphere(1.5) // plot white sphere at the end
      p.pop()
    }
  }

  //  ------end Draw()----------------------

  class Attractor {
    constructor(points) {
      this.points = points
    }

    show() {
      p.noFill()
      //p.fill(0, 0, 0, 0) // mostra atrator principal
      p.beginShape()
      for (let v of this.points) {
        p.vertex(v.x, v.y, v.z)
        // let offset = p5.Vector.random3D();
        // offset.mult(0.1);
        // v.add(offset);
      }
      p.endShape()
    }

    fall() {
      // faz cair o Atrator
      p.push()
      //p.stroke('yellow');
      p.strokeWeight(0.3)
      for (let v of this.points) {
        if (v.z > 0) {
          v.z -= 0.5
          // v.x +=random(-0.05,0.05);
          // v.y +=random(-0.05,0.05)
        } else {
          v.z = 0
        }
      }
      p.pop()
    }

    wiggle() {
      p.push()
      for (let v of this.points) {
        v.x += p.random(-0.3, 0.3)
        v.y += p.random(-0.3, 0.3)
      }
      p.pop()
    }
  } // end attractor

  function drawAxes(L, l) {
    // made the axes
    p.push() // guarda colores, posições....
    p.strokeWeight(2) // x axes red color
    p.stroke('white')
    p.line(0, 0, 0, L, 0, 0)
    p.line(L, 0, 0, L - l, l, 0)
    p.line(L, 0, 0, L - l, -l, 0)

    // p.stroke('black') // y axes yellow color
    p.line(0, 0, 0, 0, L, 0)
    p.line(0, L, 0, l, L - l, 0)
    p.line(0, L, 0, -l, L - l, 0)

    // p.stroke('black') // z axes blue color
    p.line(0, 0, 0, 0, 0, L)
    p.line(0, 0, L, -l * 0.7, l * 0.7, L - l * 0.9)
    p.line(0, 0, L, l * 0.7, -l * 0.7, L - l * 0.9)
    p.pop() // volta posições, colores...
  }

  // function drawfloorplane() {
  //     p.push();
  //     p.fill('lightgrey');
  //     p.noStroke();
  //     p.plane(130, 130); // chão plano xy
  //     p.pop();
  // }
}
