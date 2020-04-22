export default function lorenz(p) {
  var maxIterations = 2000
  // numero total de iteracoes antes de mudar ponto inicial

  var cont = 0
  var attractor
  var rate //var angleRate = 0.026;

  var x, y, z
  //var scala = 1;

  var points = []

  var angle = 0.2
  var R = 220
  let cnv
  let attractorFall = false
  let attractorWiggle = false

  const a = 10
  const b = 99.96 // parameters of Lorenz
  const c = 8.0 / 3.0

  p.setup = function() {
    cnv = p.createCanvas(600, 600, p.WEBGL)

    let figure = p.select('#figure')

    figure.html(
      `<span style ="color : lightgoldenrodyellow; font-size: 12px;
        position: relative; left: 30%; top: 600px;">
        clique duas vezes no atrator...clique de novo.
        </span>`
    )

    // btnLorenz = createButton('Atrator de Lorenz');
    // btnLorenz.parent('#figura1');
    // btnLorenz.position(windowWidth - 100, windowHeight - 100);
    // btnLorenz.mousePressed(playLorenz);

    // btnOuro = createButton('O Numero de Ouro');
    // btnOuro.parent('#figura1');
    // btnOuro.position(windowWidth - 100, windowHeight - 200);
    // btnOuro.mousePressed(playOuro);

    cnv.parent('#figure')
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

  p.draw = function() {
    p.background(0)
    p.mouseOver()

    if (attractorWiggle) {
      attractor.wiggle()
      attractor.show()
    }

    //p.clear();

    // rotacao da camera -------------------

    angle += 0.015 //angleRate; ; // rotacao da camera
    if (cont > maxIterations / 2) {
      p.noLoop()
      p.remove()
      //R -= 0.3
    }

    let x0 = R * p.cos(angle)
    let z0 = R * p.sin(angle)
    p.camera(x0, z0, 60, 0, 0, 90, 0, 0, -1)
    //-----------------------------

    //-------faz o titulo como testura sobre um plano------
    //titlebox.texture(tela_textura);
    //titlebox.plane(400, 100);
    //---------------------------------------------------

    rate = Math.floor(p.map(cont, 0, maxIterations, 1, 8))
    //acelera plot
    let dt = 0.0035

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

    cont = cont + rate

    if (cont > maxIterations) {
      points = [] // reinicia points
      R = 220
      //angleRate = 0.028;
      angle = p.random(0, p.TWO_PI)

      let ip = initial_random()
      x = ip.x
      y = ip.y
      z = ip.z
      points.push(ip)

      cont = 0 // reinicia contador
    }

    let bright = 100
    for (let i = 0; i < points.length; i += 200) {
      // change color every 200 points
      attractor.points = points.slice(i) // take 200 points each time and draw in random color
      p.push()
      // if (i < 200) { bright = 100 }
      // else { }
      p.stroke(i % 360, 100, bright)
      p.strokeWeight(0.5)

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
  } //  ------end Draw()----------------------

  class Attractor {
    constructor(points) {
      this.points = points
    }

    show() {
      p.noFill() // mostra atrator principal
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
      //
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

    p.stroke('white') // y axes yellow color
    p.line(0, 0, 0, 0, L, 0)
    p.line(0, L, 0, l, L - l, 0)
    p.line(0, L, 0, -l, L - l, 0)

    p.stroke('white') // z axes blue color
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
