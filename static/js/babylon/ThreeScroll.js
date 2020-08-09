///<reference path="BABYLON.d.ts"/>

import * as BABYLON from 'babylonjs'
import * as GUI from 'babylonjs-gui'

export default function ThreeScroll() {
  var butterflies
  let attractors = []

  let toggleAttractor = true
  let togglePanel = false

  let BYN = BABYLON

  // let a = 40,
  //   b = 0.833,
  //   c = 20,
  //   d = 0.5,
  //   f = 0.65

  let a = 42,
    b = 43,
    c = 11 / 6,
    d = 0.16,
    e = 0.65,
    f = 20

  let dt = 0.001,
    numPoints = 35000,
    numPart = 600

  // let papayawhip = new BYN.Color4(255 / 255, 239 / 255, 213 / 255, 0.5)
  // let palegoldenrod = new BYN.Color4(238 / 255, 232 / 255, 17 / 255, 0.5)
  // let lightgoldenrodyellow = new BYN.Color4(
  //   250 / 255,
  //   250 / 255,
  //   210 / 255,
  //   0.5
  // )
  // let salmon = new BYN.Color4(250 / 255, 128 / 255, 114 / 255, 0.1)
  // let lightgreen = new BYN.Color4(144 / 255, 238 / 255, 144 / 255, 0.5)
  // let peachpuff = new BYN.Color4(255 / 255, 218 / 255, 185 / 255, 0.5)
  // let lightcyan = new BYN.Color4(224 / 255, 255 / 255, 255 / 255, 0.5)
  // let aquamarine = new BYN.Color4(127 / 255, 255 / 255, 212 / 255, 0.5)
  // let thistle = new BYN.Color4(216 / 255, 191 / 255, 216 / 255, 0.2)
  // let orange = new BYN.Color4(255 / 255, 165 / 255, 0 / 255, 0.1)
  // let darkred = new BYN.Color4(139 / 255, 0, 0, 0.1)
  // let tan = new BYN.Color4(210 / 255, 180 / 255, 140 / 255, 0.5)
  // let olive = new BYN.Color4(128 / 255, 12 / 2558, 0, 0.6)
  // let mediumseagreen = new BYN.Color4(60 / 255, 179 / 255, 113 / 255, 0.6)

  let seagreen = new BYN.Color4(46 / 255, 139 / 255, 87 / 255, 0.1)
  let tomato = new BYN.Color4(255 / 255, 99 / 255, 71 / 255, 0.5)
  let gold = new BYN.Color4(255 / 255, 215 / 255, 0 / 255, 0.3)
  let lightskyblue = new BABYLON.Color4(135 / 255, 206 / 255, 250 / 255, 1)

  let attractorColor = []
  attractorColor[-2] = seagreen
  attractorColor[0] = lightskyblue
  attractorColor[2] = tomato

  var particleColor = gold // new BYN.Color4(8 / 255, 170 / 255, 245 / 255, 1)

  function makeVertices(N) {
    // make points for Lorenz
    let points = []
    let y = 0.1,
      z = 400
    for (let t = -2; t < 4; t += 2) {
      let x = t * 200

      points[t] = []
      for (let j = 0; j < 800; j++) {
        x = x + dt * (a * (y - x) + d * x * z)
        y = y + dt * (b * x + f * y - x * z)
        z = z + dt * (c * z + x * y - e * (x * x))
      }
      for (let i = 0; i < N / 3; i++) {
        x = x + dt * (a * (y - x) + d * x * z)
        y = y + dt * (b * x + f * y - x * z)
        z = z + dt * (c * z + x * y - e * (x * x))
        points[t].push(new BYN.Vector3(x, z, y)) // exchange z and y
      }
    }

    return points
  }

  var createScene = function(engine, canvas) {
    var scene = new BYN.Scene(engine)
    scene.clearColor = new BYN.Color3(0, 0, 0)

    let camera = new BYN.ArcRotateCamera(
      'camera',
      -1.57,
      -1.8,
      50,
      new BYN.Vector3(0, 0, 0),
      scene
    )

    camera.attachControl(canvas, false)
    camera.setPosition(new BYN.Vector3(400, 200, -400))
    camera.minZ = 0.001
    camera.maxZ = 6000
    camera.setTarget(new BYN.Vector3(0, 100, 0))
    let axes = new BYN.AxesViewer(scene, 50)

    function updateAttractor() {
      let pointsAttractor = makeVertices(numPoints)

      for (let t = -2; t < 4; t += 2) {
        attractors[t] = BYN.MeshBuilder.CreateLines(
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
      butterflies = new BYN.PointsCloudSystem('butterflies', 4, scene, {
        updatable: true
      })
      butterflies.addPoints(numPart)
      butterflies.initParticles = function() {
        for (let p = 0; p < butterflies.nbParticles; p++) {
          butterflies.particles[p].position = new BYN.Vector3(
            Math.random() * 600,
            Math.random() * 600,
            Math.random() * 600
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

        y = y + dt * (c * y + x * z - e * (x * x))

        particle.position.x = x
        particle.position.y = y
        particle.position.z = z
      }
    }

    createParticles()

    scene.registerBeforeRender(function() {
      butterflies.setParticles()
    })

    BYN.GUI = GUI

    let advancedTexture = new BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI(
      'myUI'
    )
    advancedTexture.isForeground = false // panel behind attractor

    let panel = new BABYLON.GUI.StackPanel()
    panel.width = '160px'
    panel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT
    panel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM
    advancedTexture.addControl(panel)

    let hidePanel = new BABYLON.GUI.Button.CreateSimpleButton(
      'hidePanel',
      'Controles'
    )
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

    let hideAttractor = new BABYLON.GUI.Button.CreateSimpleButton(
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

    let startButton = new BABYLON.GUI.Button.CreateSimpleButton(
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

    let textA = new BABYLON.GUI.TextBlock()
    textA.isVisible = togglePanel
    textA.text = 'a = ' + a.toFixed(1).toString()
    textA.color = '#08a31f'
    textA.height = '40px'
    textA.fontSize = 18
    textA.top = '40px'
    panel.addControl(textA)

    let sliderA = new BABYLON.GUI.Slider()
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
      textA.text = 'a = ' + value.toFixed(1).toString() //(BABYLON.Tools.toString(value) | 0)
      a = value
      for (let t = -2; t < 4; t += 2) {
        attractors[t].dispose()
      }

      updateAttractor()

      // Camera should follow the position of singularities....-------
      //butterflies.mesh.position.y = -rho + 1
    })
    panel.addControl(sliderA)

    let textB = new BABYLON.GUI.TextBlock()
    textB.isVisible = togglePanel
    textB.text = 'b = ' + b.toFixed(0).toString()
    textB.color = '#08a31f'
    textB.height = '40px'
    textB.fontSize = 18
    //textB.top = '40px'
    panel.addControl(textB)
    let sliderB = new BABYLON.GUI.Slider()
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
      textB.text = 'b = ' + value.toFixed(1).toString() //(BABYLON.Tools.toString(value) | 0)
      b = value
      for (let t = -2; t < 4; t += 2) {
        attractors[t].dispose()
      }
      updateAttractor()
    })
    panel.addControl(sliderB)

    let textC = new BABYLON.GUI.TextBlock()
    textC.isVisible = togglePanel
    textC.text = 'c = ' + c.toFixed(1).toString()
    textC.color = '#08a31f'
    textC.height = '40px'
    textC.fontSize = 18
    //textC.top = '40px'
    panel.addControl(textC)
    let sliderC = new BABYLON.GUI.Slider()
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
      textC.text = 'c = ' + value.toFixed(2).toString() //(BABYLON.Tools.toString(value) | 0)
      c = value
      for (let t = -2; t < 4; t += 2) {
        attractors[t].dispose()
      }

      updateAttractor()
    })
    panel.addControl(sliderC)

    let textD = new BABYLON.GUI.TextBlock()
    textD.isVisible = togglePanel
    textD.text = 'd = ' + d.toFixed(2).toString()
    textD.color = '#08a31f'
    textD.height = '40px'
    textD.fontSize = 18
    //textD.top = '40px'
    panel.addControl(textD)
    let sliderD = new BABYLON.GUI.Slider()
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
      textD.text = 'd = ' + value.toFixed(2).toString() //(BABYLON.Tools.toString(value) | 0)
      d = value
      for (let t = -2; t < 4; t += 2) {
        attractors[t].dispose()
      }

      updateAttractor()
    })
    panel.addControl(sliderD)

    let textE = new BABYLON.GUI.TextBlock()
    textE.isVisible = togglePanel
    textE.text = 'e = ' + e.toFixed(2).toString()
    textE.color = '#08a31f'
    textE.height = '40px'
    textE.fontSize = 18
    //textE.top = '40px'
    panel.addControl(textE)
    let sliderE = new BABYLON.GUI.Slider()
    sliderE.isVisible = togglePanel
    sliderE.minimum = 0.54
    sliderE.maximum = 0.72
    sliderE.value = 0.65
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
      textE.text = 'e = ' + value.toFixed(2).toString() //(BABYLON.Tools.toString(value) | 0)
      e = value
      for (let t = -2; t < 4; t += 2) {
        attractors[t].dispose()
      }

      updateAttractor()
    })
    panel.addControl(sliderE)

    let textF = new BABYLON.GUI.TextBlock()
    textF.isVisible = togglePanel
    textF.text = 'f = ' + f.toFixed(0).toString()
    textF.color = '#08a31f'
    textF.height = '40px'
    textF.fontSize = 18
    //textF.top = '40px'
    panel.addControl(textF)
    let sliderF = new BABYLON.GUI.Slider()
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
      textF.text = 'f = ' + value.toFixed(0).toString() //(BABYLON.Tools.toString(value) | 0)
      f = value
      for (let t = -2; t < 4; t += 2) {
        attractors[t].dispose()
      }

      updateAttractor()
    })
    panel.addControl(sliderF)

    let panel2 = new BABYLON.GUI.StackPanel()
    panel2.width = '400px'
    panel2.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT
    panel2.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM
    advancedTexture.addControl(panel2)

    let comment = new BABYLON.GUI.TextBlock()
    comment.text = 'Use mouse, um dedo ou as setas para rotar'
    comment.height = '20px'
    comment.fontSize = 16
    comment.color = '#08a31f'
    panel2.addControl(comment)

    let comment2 = new BABYLON.GUI.TextBlock()
    comment2.text = 'Use Ctrl+setas ou dois dedos para transladar'
    comment2.height = '20px'
    comment2.fontSize = 16
    comment2.color = '#08a31f'
    panel2.addControl(comment2)

    return scene
  }

  let canvas = document.getElementById('lorenzCanvas')
  let engine = new BABYLON.Engine(canvas, true)
  let scene = createScene(engine, canvas)

  engine.runRenderLoop(function() {
    let route = window.location.pathname
    if (
      route == 'www.dydx.ufes.br/Attractors/3scroll' ||
      route == '/Attractors/3scroll/' ||
      route == '/Attractors/3scroll'
    ) {
      scene.render()
    } else {
      engine.stopRenderLoop()
    }
  })
  window.addEventListener('resize', function() {
    engine.resize()
  })
}
