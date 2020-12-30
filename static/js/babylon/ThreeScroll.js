///<reference path="babylon.d.ts"/>
import {
  Engine,
  Scene,
  Color3,
  Color4,
  ArcRotateCamera,
  Vector3,
  AxesViewer,
  MeshBuilder,
  PointsCloudSystem
} from 'babylonjs'

import {
  AdvancedDynamicTexture,
  Control,
  StackPanel,
  Button,
  TextBlock,
  Slider
} from 'babylonjs-gui'

import 'babylonjs-loaders'

export default function ThreeScroll() {
  var butterflies
  let attractors = []

  let toggleAttractor = true
  let togglePanel = false

  let a = 43,
    b = 55,
    c = 11 / 6,
    d = 0.16,
    e = -0.65,
    f = 20

  let dt = 0.001,
    numPoints = 40000,
    numPart = 600

  // let papayawhip = new Color4(255 / 255, 239 / 255, 213 / 255, 0.5)
  // let palegoldenrod = new Color4(238 / 255, 232 / 255, 17 / 255, 0.5)
  // let lightgoldenrodyellow = new Color4(
  //   250 / 255,
  //   250 / 255,
  //   210 / 255,
  //   0.5
  // )
  // let salmon = new Color4(250 / 255, 128 / 255, 114 / 255, 0.1)
  // let lightgreen = new Color4(144 / 255, 238 / 255, 144 / 255, 0.5)
  // let peachpuff = new Color4(255 / 255, 218 / 255, 185 / 255, 0.5)
  // let lightcyan = new Color4(224 / 255, 255 / 255, 255 / 255, 0.5)
  // let aquamarine = new Color4(127 / 255, 255 / 255, 212 / 255, 0.5)
  // let thistle = new Color4(216 / 255, 191 / 255, 216 / 255, 0.2)
  // let orange = new Color4(255 / 255, 165 / 255, 0 / 255, 0.1)
  // let darkred = new Color4(139 / 255, 0, 0, 0.1)
  // let tan = new Color4(210 / 255, 180 / 255, 140 / 255, 0.5)
  // let olive = new Color4(128 / 255, 12 / 2558, 0, 0.6)
  // let mediumseagreen = new Color4(60 / 255, 179 / 255, 113 / 255, 0.6)

  let seagreen = new Color4(46 / 255, 139 / 255, 87 / 255, 0.1)
  let tomato = new Color4(255 / 255, 99 / 255, 71 / 255, 0.5)
  let gold = new Color4(255 / 255, 215 / 255, 0 / 255, 0.3)
  let lightskyblue = new Color4(135 / 255, 206 / 255, 250 / 255, 1)

  let attractorColor = []
  attractorColor[-2] = seagreen
  attractorColor[0] = lightskyblue
  attractorColor[2] = tomato

  var particleColor = gold // new Color4(8 / 255, 170 / 255, 245 / 255, 1)

  function makeVertices(N) {
    // make points for Lorenz
    let points = []
    let y = 0.1,
      z = 400
    for (let t = -2; t < 4; t += 2) {
      let x = t * 300

      points[t] = []
      for (let j = 0; j < 1000; j++) {
        x = x + dt * (a * (y - x) + d * x * z)
        y = y + dt * (b * x + f * y - x * z)
        z = z + dt * (c * z + x * y + e * (x * x))
      }
      for (let i = 0; i < N / 3; i++) {
        x = x + dt * (a * (y - x) + d * x * z)
        y = y + dt * (b * x + f * y - x * z)
        z = z + dt * (c * z + x * y + e * (x * x))
        points[t].push(new Vector3(x, z, y)) // exchange z and y
      }
    }

    return points
  }

  var createScene = function(engine, canvas) {
    var scene = new Scene(engine)
    scene.clearColor = new Color3(0, 0, 0)

    let camera = new ArcRotateCamera(
      'camera',
      -1.57,
      -1.8,
      50,
      new Vector3(0, 0, 0),
      scene
    )

    camera.attachControl(canvas, false)
    camera.setPosition(new Vector3(400, 200, -400))
    camera.minZ = 0.001
    camera.maxZ = 6000
    camera.setTarget(new Vector3(0, 100, 0))
    let axes = new AxesViewer(scene, 50)

    function updateAttractor() {
      let pointsAttractor = makeVertices(numPoints)

      for (let t = -2; t < 4; t += 2) {
        attractors[t] = MeshBuilder.CreateLines(
          'Lorenz1',
          { points: pointsAttractor[t], updatable: true },
          scene
        )
        attractors[t].color = attractorColor[t]
        attractors[t].isVisible = toggleAttractor
      }
    }

    updateAttractor()

    function createParticles() {
      butterflies = new PointsCloudSystem('butterflies', 3.6, scene, {
        updatable: true
      })
      butterflies.addPoints(numPart)
      butterflies.initParticles = function() {
        for (let p = 0; p < butterflies.nbParticles; p++) {
          butterflies.particles[p].position = new Vector3(
            Math.random() * 1000 - 500,
            Math.random() * 1000 - 500,
            Math.random() * 1000 - 500
          )

          butterflies.particles[p].color = particleColor
        }
      }
      butterflies.buildMeshAsync().then(mesh => {
        butterflies.initParticles()
        butterflies.setParticles()

        mesh.position.x = 0
        mesh.position.y = 0
        mesh.position.z = 0
        mesh.alwaysSelectAsActiveMesh = true
      })

      butterflies.updateParticle = function(particle) {
        let x = particle.position.x
        let y = particle.position.y
        let z = particle.position.z

        x = x + dt * (a * (z - x) + d * x * y)

        z = z + dt * (b * x + f * z - x * y) // exchange z and y

        y = y + dt * (c * y + x * z + e * (x * x))

        particle.position.x = x
        particle.position.y = y
        particle.position.z = z
      }
    }

    createParticles()

    scene.registerBeforeRender(function() {
      butterflies.setParticles()
    })

    let advancedTexture = new AdvancedDynamicTexture.CreateFullscreenUI('myUI')
    advancedTexture.isForeground = false // panel behind attractor

    let panel = new StackPanel()
    panel.width = '160px'
    panel.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT
    panel.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM
    advancedTexture.addControl(panel)

    let hidePanel = new Button.CreateSimpleButton('hidePanel', 'Controles')
    hidePanel.width = '100px'
    hidePanel.height = '40px'
    hidePanel.color = '#08a31f'
    hidePanel.fontSize = 18
    hidePanel.thickness = 0
    hidePanel.cornerRadius = 20
    hidePanel.background = '#0f0f0f' //'#1e1e1e'

    hidePanel.onPointerUpObservable.add(function() {
      togglePanel = !togglePanel
      startButton.isVisible = togglePanel
      textA.isVisible = togglePanel
      textB.isVisible = togglePanel
      textC.isVisible = togglePanel
      textD.isVisible = togglePanel
      textE.isVisible = togglePanel
      textF.isVisible = togglePanel
      sliderA.isVisible = togglePanel
      sliderB.isVisible = togglePanel
      sliderC.isVisible = togglePanel
      sliderD.isVisible = togglePanel
      sliderE.isVisible = togglePanel
      sliderF.isVisible = togglePanel

      startButton.isVisible = togglePanel
      hideAttractor.isVisible = togglePanel
    })
    panel.addControl(hidePanel)

    let hideAttractor = new Button.CreateSimpleButton(
      'hide attractor',
      'Sem/Com Atrator'
    )
    hideAttractor.isVisible = togglePanel
    hideAttractor.width = '100px'
    hideAttractor.height = '40px'
    hideAttractor.color = '#08a31f'
    hideAttractor.fontSize = 16
    hideAttractor.thickness = 0
    hideAttractor.cornerRadius = 20
    //hideAttractor.bottom = '120px'
    hideAttractor.background = '#0f0f0f' //'#1e1e1e'

    hideAttractor.onPointerUpObservable.add(function() {
      toggleAttractor = !toggleAttractor
      for (let t = -2; t < 4; t += 2) {
        attractors[t].isVisible = toggleAttractor
      }
    })
    panel.addControl(hideAttractor)

    let startButton = new Button.CreateSimpleButton(
      'startButton',
      'Recriar partículas'
    )
    startButton.isVisible = togglePanel
    startButton.width = '140px'
    startButton.height = '40px'
    startButton.color = '#08a31f'
    startButton.fontSize = 16
    startButton.thickness = 0
    startButton.cornerRadius = 20
    startButton.background = '#0f0f0f' //'#1e1e1e'
    startButton.onPointerUpObservable.add(function() {
      butterflies.dispose()
      createParticles()
    })
    panel.addControl(startButton)

    let textA = new TextBlock()
    textA.isVisible = togglePanel
    textA.text = 'a = ' + a.toFixed(1).toString()
    textA.color = '#08a31f'
    textA.height = '40px'
    textA.fontSize = 18
    textA.top = '40px'
    panel.addControl(textA)

    let sliderA = new Slider()
    sliderA.isVisible = togglePanel
    sliderA.minimum = 32
    sliderA.maximum = 50
    sliderA.value = 42

    sliderA.height = '15px'
    sliderA.thumbWidth = 20
    sliderA.width = '150px'
    sliderA.color = 'green'
    sliderA.borderColor = 'black'
    sliderA.isThumbCircle = true
    sliderA.step = 1
    sliderA.background = '#2f2f2f'
    //sliderA.top = '60px'
    //sliderA.isVertical = true

    sliderA.onValueChangedObservable.add(function(value) {
      textA.text = 'a = ' + value.toFixed(1).toString() //(Tools.toString(value) | 0)
      a = value
      for (let t = -2; t < 4; t += 2) {
        attractors[t].dispose()
      }

      updateAttractor()

      // Camera should follow the position of singularities....-------
      //butterflies.mesh.position.y = -rho + 1
    })
    panel.addControl(sliderA)

    let textB = new TextBlock()
    textB.isVisible = togglePanel
    textB.text = 'b = ' + b.toFixed(0).toString()
    textB.color = '#08a31f'
    textB.height = '40px'
    textB.fontSize = 18
    //textB.top = '40px'
    panel.addControl(textB)
    let sliderB = new Slider()
    sliderB.isVisible = togglePanel
    sliderB.minimum = 30
    sliderB.maximum = 70
    sliderB.value = 43
    sliderB.height = '15px'
    sliderB.thumbWidth = 20
    sliderB.width = '150px'
    sliderB.color = 'green'
    sliderB.borderColor = 'black'
    sliderB.isThumbCircle = true
    sliderB.step = 1
    sliderB.background = '#2f2f2f'
    //sliderB.top = '60px'
    //sliderB.isVertical = true

    sliderB.onValueChangedObservable.add(function(value) {
      textB.text = 'b = ' + value.toFixed(1).toString() //(Tools.toString(value) | 0)
      b = value
      for (let t = -2; t < 4; t += 2) {
        attractors[t].dispose()
      }
      updateAttractor()
    })
    panel.addControl(sliderB)

    let textC = new TextBlock()
    textC.isVisible = togglePanel
    textC.text = 'c = ' + c.toFixed(1).toString()
    textC.color = '#08a31f'
    textC.height = '40px'
    textC.fontSize = 18
    //textC.top = '40px'
    panel.addControl(textC)
    let sliderC = new Slider()
    sliderC.isVisible = togglePanel
    sliderC.minimum = 0
    sliderC.maximum = 10
    sliderC.value = 11 / 6
    sliderC.height = '15px'
    sliderC.thumbWidth = 20
    sliderC.width = '150px'
    sliderC.color = 'green'
    sliderC.borderColor = 'black'
    sliderC.isThumbCircle = true
    sliderC.step = 0.1
    sliderC.background = '#2f2f2f'
    //sliderC.top = '60px'
    //sliderC.isVertical = true

    sliderC.onValueChangedObservable.add(function(value) {
      textC.text = 'c = ' + value.toFixed(2).toString() //(Tools.toString(value) | 0)
      c = value
      for (let t = -2; t < 4; t += 2) {
        attractors[t].dispose()
      }

      updateAttractor()
    })
    panel.addControl(sliderC)

    let textD = new TextBlock()
    textD.isVisible = togglePanel
    textD.text = 'd = ' + d.toFixed(2).toString()
    textD.color = '#08a31f'
    textD.height = '40px'
    textD.fontSize = 18
    //textD.top = '40px'
    panel.addControl(textD)
    let sliderD = new Slider()
    sliderD.isVisible = togglePanel
    sliderD.minimum = 0
    sliderD.maximum = 0.22
    sliderD.value = 0.16
    sliderD.height = '15px'
    sliderD.thumbWidth = 20
    sliderD.width = '150px'
    sliderD.color = 'green'
    sliderD.borderColor = 'black'
    sliderD.isThumbCircle = true
    sliderD.step = 0.01
    sliderD.background = '#2f2f2f'

    //sliderD.top = '60px'
    //sliderD.isVertical = true

    sliderD.onValueChangedObservable.add(function(value) {
      textD.text = 'd = ' + value.toFixed(2).toString() //(Tools.toString(value) | 0)
      d = value
      for (let t = -2; t < 4; t += 2) {
        attractors[t].dispose()
      }

      updateAttractor()
    })
    panel.addControl(sliderD)

    let textE = new TextBlock()
    textE.isVisible = togglePanel
    textE.text = 'e = ' + e.toFixed(2).toString()
    textE.color = '#08a31f'
    textE.height = '40px'
    textE.fontSize = 18
    //textE.top = '40px'
    panel.addControl(textE)
    let sliderE = new Slider()
    sliderE.isVisible = togglePanel
    sliderE.minimum = -0.72
    sliderE.maximum = -0.54
    sliderE.value = -0.65
    sliderE.height = '15px'
    sliderE.thumbWidth = 20
    sliderE.width = '150px'
    sliderE.color = 'green'
    sliderE.borderColor = 'black'
    sliderE.isThumbCircle = true
    sliderE.step = 0.01
    sliderE.background = '#2f2f2f'

    //sliderE.top = '60px'
    //sliderE.isVertical = true

    sliderE.onValueChangedObservable.add(function(value) {
      textE.text = 'e = ' + value.toFixed(2).toString() //(Tools.toString(value) | 0)
      e = value
      for (let t = -2; t < 4; t += 2) {
        attractors[t].dispose()
      }

      updateAttractor()
    })
    panel.addControl(sliderE)

    let textF = new TextBlock()
    textF.isVisible = togglePanel
    textF.text = 'f = ' + f.toFixed(0).toString()
    textF.color = '#08a31f'
    textF.height = '40px'
    textF.fontSize = 18
    //textF.top = '40px'
    panel.addControl(textF)
    let sliderF = new Slider()
    sliderF.isVisible = togglePanel
    sliderF.minimum = -5
    sliderF.maximum = 24
    sliderF.value = 20
    sliderF.height = '30px'
    sliderF.thumbWidth = 20
    sliderF.width = '150px'
    sliderF.color = 'green'
    sliderF.borderColor = 'black'
    sliderF.isThumbCircle = true
    sliderF.step = 1
    sliderF.background = '#2f2f2f'
    sliderF.paddingBottom = '15px'

    //sliderF.top = '60px'
    //sliderF.isVertical = true

    sliderF.onValueChangedObservable.add(function(value) {
      textF.text = 'f = ' + value.toFixed(0).toString() //(Tools.toString(value) | 0)
      f = value
      for (let t = -2; t < 4; t += 2) {
        attractors[t].dispose()
      }

      updateAttractor()
    })
    panel.addControl(sliderF)

    let panel2 = new StackPanel()
    panel2.width = '400px'
    panel2.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT
    panel2.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM
    advancedTexture.addControl(panel2)

    let comment = new TextBlock()
    comment.text = 'Use mouse, um dedo ou as setas para rotar'
    comment.height = '20px'
    comment.fontSize = 16
    comment.color = '#08a31f'
    panel2.addControl(comment)

    let comment2 = new TextBlock()
    comment2.text = 'Use Ctrl+setas ou dois dedos para transladar'
    comment2.height = '20px'
    comment2.fontSize = 16
    comment2.color = '#08a31f'
    panel2.addControl(comment2)

    return scene
  }

  let canvas = document.getElementById('lorenzCanvas')
  let engine = new Engine(canvas, true)
  let scene = createScene(engine, canvas)

  const myPath = window.location.pathname

  engine.runRenderLoop(function() {
    scene.render()
    if (window.location.pathname !== myPath) {
      engine.stopRenderLoop()
    }

    // let route = window.location.pathname
    // if (
    //   route == 'www.dydx.ufes.br/Attractors/3scroll' ||
    //   route == '/Attractors/3scroll/' ||
    //   route == '/Attractors/3scroll'
    // ) {
    //   scene.render()
    // } else {
    //   engine.stopRenderLoop()
    // }
  })
  window.addEventListener('resize', function() {
    engine.resize()
  })
}
