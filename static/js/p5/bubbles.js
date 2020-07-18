export default function(p) {
  return Bubble
}

let Bubble = class {
  constructor(x, y, hue, saturation, lightness, radium) {
    this.x = x
    this.y = y
    this.l = lightness
    this.hue = hue
    this.sat = saturation
    this.r = radium
    this.maxforce = 0.5
    this.maxspeed = 8

    this.pos = p.createVector(x, y)
    this.target = p.createVector()
    this.vel = p.createVector()
    this.acc = p.createVector()
  }

  update() {
    this.pos.add(this.vel)

    this.vel.add(this.acc)

    this.acc.mult(0)
    this.x = this.pos.x
    this.y = this.pos.y
  }

  applyForce(f) {
    this.acc.add(f)
  }

  behaviors() {
    this.arrive(this.target)
  }

  arrive(target) {
    let newForce = p.createVector(target.x - this.pos.x, target.y - this.pos.y)

    let d = newForce.mag()

    let speed = this.maxspeed

    if (d < 100) {
      speed = p.map(d, 0, 100, 0, this.maxspeed)
    }

    newForce.setMag(speed)

    let steer = p.createVector(newForce.x - this.vel.x, newForce.y - this.vel.y)
    steer.limit(this.maxforce)

    this.applyForce(steer)
  }

  display() {
    p.fill(this.hue, this.sat, this.l)
    p.ellipse(this.x, this.y, this.r, this.r)
  }
  fall() {
    this.x = this.x + p.random(-1, 1)
    this.y = this.y + 0.05 * this.x
    this.pos = p.createVector(this.x, this.y)
  }
  wiggle() {
    this.x = this.x + p.random(-2, 2)
    this.y = this.y + p.random(-2, 2)
  }
}
