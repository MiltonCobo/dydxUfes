import * as BABYLON from 'babylonjs'
import * as GUI from 'babylonjs-gui'

export default {
  scene: null,
  engine: null,
  camera: null,
  axes: null,
  advancedTexture: null,
  comment: null,
  panel2: null,
  textBeta: null,
  sliderBeta: null,
  textSigma: null,
  sliderSigma: null,
  textRho: null,
  sliderRho: null,
  startButton: null,
  advancedTexture: null,
  panel: null,
  axes: null,
  butterflies: null,
  attractor1: null,
  attractor2: null,
  rho: 28,
  sigma: 10,
  beta: 8.0 / 3.0,

  numPoints: 5000,

  //attractorColor: new BABYLON.Color4(245 / 255, 150 / 255, 7 / 255, 1),
  //particleColor: new BABYLON.Color4(8 / 255, 170 / 255, 245 / 255, 0.6),

  lorenzOffset: 27, //rho - 1,
  singularity: 13, //Math.sqrt(beta * (rho - 1)),

  makeVertices: function(N) {
    let points = []

    for (let t = -1; t < 2; t += 2) {
      let y = 0.01,
        z = 0.01,
        x = t

      let dt = 0.005
      points[t] = []
      for (let j = 0; j < 300; j++) {
        x = x + this.sigma * (z - x) * dt
        z = z + (x * (this.rho - y) - z) * dt
        y = y + (x * z - this.beta * y) * dt
      }
      for (let i = 0; i < N; i++) {
        x = x + this.sigma * (z - x) * dt
        z = z + (x * (this.rho - y) - z) * dt
        y = y + (x * z - this.beta * y) * dt
        points[t].push(new BABYLON.Vector3(x, y - this.lorenzOffset, z))
      }
    }

    return points
  },

  createScene: function(engine, canvas) {
    this.scene = new BABYLON.Scene(engine)
    this.scene.clearColor = new BABYLON.Color3(21 / 255, 21 / 255, 21 / 255)

    this.camera = new BABYLON.ArcRotateCamera(
      'camera',
      0,
      0,
      0,
      new BABYLON.Vector3(0, 0, 0),
      this.scene
    )

    this.camera.attachControl(canvas, true)
    this.camera.setPosition(
      new BABYLON.Vector3(5 * this.singularity, 3.2, -4.5 * this.singularity)
    )
    this.camera.minZ = 0.01
    this.camera.maxZ = 300
    //this.camera.target = new BABYLON.Vector3(0,0, 0)

    this.axes = new BABYLON.AxesViewer(this.scene, 5)
    this.axes.position = new BABYLON.Vector3(0, 0, -this.lorenzOffset)

    return this.scene
  },

  updateAttractor: function() {
    let pointsLorenz = this.makeVertices(this.numPoints)[-1]
    // draw attractor
    this.attractor1 = BABYLON.MeshBuilder.CreateLines(
      'Lorenz',
      { points: pointsLorenz, updatable: true },
      this.scene
    )
    pointsLorenz = this.makeVertices(this.numPoints)[1]

    this.attractor2 = BABYLON.MeshBuilder.CreateLines(
      'Lorenz',
      { points: pointsLorenz, updatable: true },
      this.scene
    )

    this.attractor1.color = new BABYLON.Color4(245 / 255, 150 / 255, 7 / 255, 1) //this.attractorColor
    this.attractor2.color = new BABYLON.Color4(245 / 255, 150 / 255, 7 / 255, 1) //this.attractorColor
  },

  createParticles: function() {
    this.butterflies = new BABYLON.PointsCloudSystem(
      'butterflies',
      1.8,
      this.scene,
      {
        updatable: true
      }
    )
    // this.butterflies.addPoints(10000)
    let N = this.butterflies.nbParticles
    // let butterflies = this.butterflies
    // console.log(butterflies)

    // this.butterflies.initParticles = function() {
    //   console.log('this inside this.butterflies', this)
    //   for (let p = 0; p < N; p++) {
    //     this.particles[p].position = new BABYLON.Vector3(
    //       Math.random() * 200,
    //       Math.random() * 200,
    //       Math.random() * 200
    //     )

    //     this.particles[p].color = new BABYLON.Color4(
    //       8 / 255,
    //       170 / 255,
    //       245 / 255,
    //       0.6
    //     )

    //     console.log('butterflies particles', this.butterflies.particles)
    //   }
    // }

    this.butterflies.buildMeshAsync().then(mesh => {
      this.butterflies.initParticles()
      this.butterflies.setParticles()
      console.log('setParticles')
      //console.log('this inside buildMesh', this.butterflies)
      mesh.position.x = 0
      mesh.position.y = -this.lorenzOffset
      mesh.position.z = 0
      mesh.alwaysSelectAsActiveMesh = true
    })

    this.butterflies.updateParticle = function(particle) {
      let x = particle.position.x
      let y = particle.position.y
      let z = particle.position.z
      let dt = 0.005

      x = x + this.sigma * (z - x) * dt
      z = z + (x * (this.rho - y) - z) * dt
      y = y + (x * z - this.beta * y) * dt

      particle.position.x = x
      particle.position.y = y
      particle.position.z = z
    }

    //this.butterflies.initParticles()

    //this.butterflies.updateParticle()
  },

  // registerBeforeRender: function() {
  //   this.scene.registerBeforeRender: function() {
  //   this.butterflies.setParticles()
  //   console.log('running')
  // },

  makeControls: function() {
    BABYLON.GUI = GUI

    this.advancedTexture = new BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI(
      'myUI'
    )
    this.advancedTexture.isForeground = false // this.panel behind attractor

    this.panel = new BABYLON.GUI.StackPanel()
    this.panel.width = '220px'
    this.panel.horizontalAlignment =
      BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT
    this.panel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER
    this.advancedTexture.addControl(this.panel)

    this.startButton = new BABYLON.GUI.Button.CreateSimpleButton(
      'this.startButton',
      'Recriar partículas'
    )
    this.startButton.width = '160px'
    this.startButton.height = '40px'
    this.startButton.color = 'green'
    this.startButton.fontSize = 18
    this.startButton.borderRadius = 20
    this.startButton.borderColor = 'green'
    //this.startButton.top = '120px'
    this.startButton.background = 'black'
    this.startButton.onPointerUpObservable.add(function() {
      this.butterflies.dispose()
      this.createParticles()
    })
    this.panel.addControl(this.startButton)

    this.textRho = new BABYLON.GUI.TextBlock()
    this.textRho.text = 'rho = ' + this.rho.toFixed(0).toString()
    this.textRho.color = 'green'
    this.textRho.height = '40px'
    this.textRho.fontSize = 18
    this.textRho.top = '40px'
    this.panel.addControl(this.textRho)

    this.sliderRho = new BABYLON.GUI.Slider()
    this.sliderRho.minimum = 0
    this.sliderRho.maximum = 30
    this.sliderRho.value = 28
    this.sliderRho.height = '15px'
    this.sliderRho.thumbWidth = 15
    this.sliderRho.width = '150px'
    this.sliderRho.color = 'green'
    this.sliderRho.borderColor = 'black'
    this.sliderRho.isThumbCircle = true
    this.sliderRho.step = 0.1
    //this.sliderRho.top = '60px'
    //this.sliderRho.isVertical = true

    this.sliderRho.onValueChangedObservable.add(function(value) {
      this.text = 'rho = ' + value.toFixed(1).toString() //(BABYLON.Tools.toString(value) | 0)
      this.rho = value
      this.attractor1.dispose()
      this.attractor2.dispose()
      this.updateAttractor()
    })
    this.panel.addControl(this.sliderRho)

    this.textSigma = new BABYLON.GUI.TextBlock()
    this.textSigma.text = 'sigma = ' + this.sigma.toFixed(0).toString()
    this.textSigma.color = 'green'
    this.textSigma.height = '40px'
    this.textSigma.fontSize = 18
    //this.textSigma.top = '40px'
    this.panel.addControl(this.textSigma)

    this.sliderSigma = new BABYLON.GUI.Slider()
    this.sliderSigma.minimum = 0
    this.sliderSigma.maximum = 20
    this.sliderSigma.value = 10
    this.sliderSigma.height = '15px'
    this.sliderSigma.thumbWidth = 15
    this.sliderSigma.width = '150px'
    this.sliderSigma.color = 'green'
    this.sliderSigma.borderColor = 'black'
    this.sliderSigma.isThumbCircle = true
    this.sliderSigma.step = 0.1
    //this.sliderSigma.top = '60px'
    //this.sliderSigma.isVertical = true

    this.sliderSigma.onValueChangedObservable.add(function(value) {
      this.text = 'sigma = ' + value.toFixed(1).toString() //(BABYLON.Tools.toString(value) | 0)
      this.sigma = value
      this.attractor1.dispose()
      this.attractor2.dispose()
      this.updateAttractor()
    })
    this.panel.addControl(this.sliderSigma)

    this.textBeta = new BABYLON.GUI.TextBlock()
    this.textBeta.text = 'beta = 8/3 ' //+ beta.toFixed(1).toString()
    this.textBeta.color = 'green'
    this.textBeta.height = '40px'
    this.textBeta.fontSize = 18
    //this.textBeta.top = '40px'
    this.panel.addControl(this.textBeta)

    this.sliderBeta = new BABYLON.GUI.Slider()
    this.sliderBeta.minimum = 0
    this.sliderBeta.maximum = 20
    this.sliderBeta.value = 10
    this.sliderBeta.height = '15px'
    this.sliderBeta.thumbWidth = 15
    this.sliderBeta.width = '150px'
    this.sliderBeta.color = 'green'
    this.sliderBeta.borderColor = 'black'
    this.sliderBeta.isThumbCircle = true
    this.sliderBeta.step = 0.1
    //this.sliderBeta.top = '60px'
    //this.sliderBeta.isVertical = true

    this.sliderBeta.onValueChangedObservable.add(function(value) {
      this.textBeta.text = 'beta = ' + value.toFixed(1).toString() //(BABYLON.Tools.toString(value) | 0)
      this.sigma = value
      this.attractor1.dispose()
      this.attractor2.dispose()
      this.updateAttractor()
    })
    this.panel.addControl(this.sliderBeta)

    this.panel2 = new BABYLON.GUI.StackPanel()
    this.panel2.width = '500px'
    this.panel2.horizontalAlignment =
      BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT
    this.panel2.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP
    this.advancedTexture.addControl(this.panel2)

    this.comment = new BABYLON.GUI.TextBlock()
    this.comment.text =
      'Use mouse ou setas para rotar e Ctrl+seta para transladar'
    this.comment.height = '20px'
    this.comment.fontSize = 18
    this.comment.color = 'green'
    this.panel2.addControl(this.comment)
  }
} //end object
