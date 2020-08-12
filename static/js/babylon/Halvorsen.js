///<reference path="BABYLON.d.ts"/>

import * as BABYLON from 'babylonjs'
import * as GUI from 'babylonjs-gui'

export default function QiChenPlot() {
  let pointsLorenz = []
  let butterflies
  //let attractor
  let attractors = []

  let toggleAttractor = true
  let togglePanel = false

  let BYN = BABYLON

  let a = 1.4

  let dt = 0.0043,
    numPoints = 5000

  let papayawhip = new BYN.Color4(255 / 255, 239 / 255, 213 / 255, 0.5)
  let palegoldenrod = new BYN.Color4(238 / 255, 232 / 255, 17 / 255, 0.5)
  let lightgoldenrodyellow = new BYN.Color4(
    250 / 255,
    250 / 255,
    210 / 255,
    0.5
  )
  let mediumseagreen = new BYN.Color4(60 / 255, 179 / 255, 113 / 255, 0.5)
  let orange = new BYN.Color4(255 / 255, 165 / 255, 0 / 255, 0.5)
  let tomato = new BYN.Color4(255 / 255, 99 / 255, 71 / 255, 0.5)
  let peachpuff = new BYN.Color4(255 / 255, 218 / 255, 185 / 255, 0.5)

  let c = [orange, mediumseagreen, lightgoldenrodyellow, tomato]

  let attractorColors = []
  for (let t = -2; t < 5; t += 2) {
    attractorColors[t] = c[(t + 2) / 2]
  }
  //let attractorColor = new BYN.Color4(100 / 255, 180 / 255, 80 / 255, 0.1)
  //let attractorColor = new BYN.Color4(245 / 255, 150 / 255, 7 / 255, 1)

  //let particleColor = new BYN.Color4(255 / 255, 70 / 255, 255 / 255, 0.5)
  let particleColor = new BYN.Color4(8 / 255, 170 / 255, 245 / 255, 0.2)
  //let particleColor = new BYN.Color4(8 / 255, 170 / 255, 245 / 255, 0.6)

  function makeVertices(N) {
    let points = []

    for (let t = -2; t < 5; t += 2) {
      let y = -2
      let x = t
      let z = t
      points[t] = []
      for (let j = 0; j < 300; j++) {
        for (let i = 0; i < numPoints; i++) {
          let dx = (-a * x + 2 * y - 4 * z - y * y + (3 * a + 15)) * dt
          let dy = (-a * y + 2 * z - 4 * x - z * z + (3 * a + 15)) * dt
          let dz = (-a * z + 2 * x - 4 * y - x * x + (3 * a + 15)) * dt

          x = x + dx
          y = y + dy
          z = z + dz
        }
      }
      for (let i = 0; i < N; i++) {
        let dx = (-a * x + 2 * y - 4 * z - y * y + (3 * a + 15)) * dt
        let dy = (-a * y + 2 * z - 4 * x - z * z + (3 * a + 15)) * dt
        let dz = (-a * z + 2 * x - 4 * y - x * x + (3 * a + 15)) * dt

        x = x + dx
        y = y + dy
        z = z + dz

        points[t].push(new BYN.Vector3(x, y, z))
      }
    }

    return points
  }

  let createScene = function(engine, canvas) {
    let scene = new BYN.Scene(engine)
    scene.clearColor = new BYN.Color3(0, 0, 0) //(0.2, 0.2, 0.2)

    let camera = new BYN.ArcRotateCamera(
      'camera',
      0,
      0,
      0,
      new BYN.Vector3(0, 0, 0),
      scene
    )

    camera.attachControl(canvas, false) // false avoid scroll in canvas
    camera.setPosition(new BYN.Vector3(25, -25, -25))
    camera.minZ = 0.001
    camera.maxZ = 1000

    let axes = new BYN.AxesViewer(scene, 3)
    axes.position = new BYN.Vector3(0, 0, 0)

    //scene.createDefaultLight()

    function updateAttractor() {
      let pointsAttractor = makeVertices(numPoints)
      for (let t = -2; t < 5; t += 2) {
        attractors[t] = BYN.MeshBuilder.CreateLines(
          'Lorenz',
          { points: pointsAttractor[t], updatable: true },
          scene
        )
        attractors[t].color = attractorColors[t]
        attractors[t].isVisible = toggleAttractor
      }
    }
    updateAttractor()

    function createParticles() {
      butterflies = new BYN.PointsCloudSystem('butterflies', 3, scene, {
        updatable: true
      })
      butterflies.addPoints(5000)

      let N = 30
      butterflies.initParticles = function() {
        for (let p = 0; p < butterflies.nbParticles; p++) {
          butterflies.particles[p].position = new BYN.Vector3(
            Math.random() * N - N / 2,
            Math.random() * N - N / 2, // random in (-15,15)
            Math.random() * N - N / 2
          )

          butterflies.particles[p].color = particleColor

          // new BYN.Color4(
          // 	random(),
          // 	random(),
          // 	random(),
          // 	0.5
          // )
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

        particle.position.x =
          x + (-a * x + 2 * y - 4 * z - y * y + (3 * a + 15)) * dt
        particle.position.y =
          y + (-a * y + 2 * z - 4 * x - z * z + (3 * a + 15)) * dt
        particle.position.z =
          z + (-a * z + 2 * x - 4 * y - x * x + (3 * a + 15)) * dt
      }
    }

    createParticles()
    butterflies.computeBoundingBox = true // avoid computing particles ver far away

    scene.registerBeforeRender(function() {
      butterflies.setParticles()
    })

    BYN.GUI = GUI

    let advancedTexture = new BYN.GUI.AdvancedDynamicTexture.CreateFullscreenUI(
      'myUI'
    )
    advancedTexture.isForeground = false // panel behind attractor

    let panel = new BYN.GUI.StackPanel()
    panel.width = '220px'
    panel.horizontalAlignment = BYN.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT
    panel.verticalAlignment = BYN.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM
    advancedTexture.addControl(panel)

    let hidePanel = new BABYLON.GUI.Button.CreateSimpleButton(
      'hidePanel',
      'Controles'
    )
    hidePanel.width = '100px'
    hidePanel.height = '45px'
    hidePanel.color = '#08a31f'
    hidePanel.fontSize = 18
    hidePanel.thickness = 0
    hidePanel.cornerRadius = 20
    hidePanel.background = '#0f0f0f'

    hidePanel.onPointerUpObservable.add(function() {
      togglePanel = !togglePanel
      startButton.isVisible = togglePanel
      sliderA.isVisible = togglePanel
      textA.isVisible = togglePanel

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
    hideAttractor.height = '45px'
    hideAttractor.color = '#08a31f'
    hideAttractor.fontSize = 16
    hideAttractor.thickness = 0
    hideAttractor.cornerRadius = 20
    //hideAttractor.bottom = '120px'
    hideAttractor.background = '#0f0f0f'
    hideAttractor.onPointerUpObservable.add(function() {
      toggleAttractor = !toggleAttractor
      for (let t = -2; t < 5; t += 2) {
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
    startButton.height = '45px'
    startButton.color = '#08a31f'
    startButton.fontSize = 16
    startButton.thickness = 0
    startButton.cornerRadius = 20
    startButton.background = '#0f0f0f'
    startButton.onPointerUpObservable.add(function() {
      butterflies.dispose()
      createParticles()
    })
    panel.addControl(startButton)

    let textA = new BYN.GUI.TextBlock()
    textA.isVisible = togglePanel
    textA.text = 'a = ' + a.toFixed(2).toString()
    textA.color = '#08a31f'
    textA.height = '30px'
    textA.fontSize = 18
    textA.top = '40px'
    panel.addControl(textA)

    let sliderA = new BYN.GUI.Slider()
    sliderA.isVisible = togglePanel
    sliderA.minimum = 1.2
    sliderA.maximum = 1.8
    sliderA.value = 1.4
    sliderA.height = '45px'
    sliderA.thumbWidth = 20
    sliderA.width = '150px'
    sliderA.color = '#08a31f'
    sliderA.borderColor = 'black'
    sliderA.background = '#2f2f2f'
    sliderA.isThumbCircle = true
    sliderA.step = 0.1
    // sliderA.top = '-100px'
    sliderA.paddingBottom = '20px' // elevate the slider
    //sliderA.isVertical = true

    sliderA.onValueChangedObservable.add(function(value) {
      textA.text = 'a = ' + value.toFixed(1).toString() //(BYN.Tools.toString(value) | 0)
      a = value
      //attractor.dispose()

      for (let t = -2; t < 5; t += 2) {
        attractors[t].dispose()
      }
      updateAttractor()
    })
    panel.addControl(sliderA)

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
      route == 'www.dydx.ufes.br/Attractors/halvorsen' ||
      route == '/Attractors/halvorsen/' ||
      route == '/Attractors/halvorsen'
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
