///<reference path="BABYLON.d.ts"/>

import * as BABYLON from 'babylonjs'
import * as GUI from 'babylonjs-gui'

export default function QiChenPlot() {
  var butterflies
  let attractor1, attractor2

  let toggleAttractor = true
  let togglePanel = false

  let BYN = BABYLON

  var a = 40,
    b = 3,
    c = 28

  var dt = 0.004,
    numPoints = 8000

  let papayawhip = new BYN.Color4(255 / 255, 239 / 255, 213 / 255, 0.5)
  let palegoldenrod = new BYN.Color4(238 / 255, 232 / 255, 17 / 255, 0.5)
  let lightgoldenrodyellow = new BYN.Color4(
    250 / 255,
    250 / 255,
    210 / 255,
    0.5
  )
  let gold = new BYN.Color4(255 / 255, 215 / 255, 0 / 255, 0.5)
  let salmon = new BYN.Color4(250 / 255, 128 / 255, 114 / 255, 0.5)
  let lightgreen = new BYN.Color4(144 / 255, 238 / 255, 144 / 255, 0.5)
  let tomato = new BYN.Color4(255 / 255, 99 / 255, 71 / 255, 0.5)
  let peachpuff = new BYN.Color4(255 / 255, 218 / 255, 185 / 255, 0.5)
  let lightcyan = new BYN.Color4(224 / 255, 255 / 255, 255 / 255, 0.5)
  let aquamarine = new BYN.Color4(127 / 255, 255 / 255, 212 / 255, 0.5)
  let seagreen = new BYN.Color4(46 / 255, 139 / 255, 87 / 255, 0.8)
  var attractorColor1 = tomato //new BYN.Color4(50 / 255, 100 / 255, 200 / 255, 0.1)
  var attractorColor2 = seagreen // new BYN.Color4(50 / 255, 200 / 255, 100 / 255, 0.1)
  //var attractorColor = new BYN.Color4(245 / 255, 150 / 255, 7 / 255, 0.0)
  var particleColor = new BYN.Color4(8 / 255, 170 / 255, 245 / 255, 1)
  //   var particleColor = tomato //new BYN.Color4(255 / 255, 182 / 255, 193 / 255, 1)
  //   var particleColor = new BYN.Color4(240 / 255, 128 / 255, 0 / 255, 1)

  var lorenzOffset = 2 * c - a,
    singularity = Math.sqrt((2 * c - a) * b)

  function makeVertices(N) {
    // make points for Lorenz
    let points = []

    for (let t = -1; t < 2; t += 2) {
      let y = 0.01, // y = z!
        z = t,
        x = t
      points[t] = []
      for (let j = 0; j < 300; j++) {
        x = x + a * (y - x) * dt
        y = y + ((c - a) * x - x * z + c * y) * dt
        z = z + (x * y - b * z) * dt
      }
      for (let i = 0; i < N; i++) {
        x = x + a * (y - x) * dt
        y = y + ((c - a) * x - x * z + c * y) * dt
        z = z + (x * y - b * z) * dt
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

    camera.attachControl(canvas, true)
    camera.setPosition(
      new BYN.Vector3(6 * singularity, lorenzOffset, -5 * singularity)
    )
    camera.minZ = 0.001
    camera.maxZ = 1000
    camera.setTarget(new BYN.Vector3(0, lorenzOffset, 0))

    let axes = new BYN.AxesViewer(scene, 8)

    function updateAttractor() {
      let pointsLorenz = makeVertices(numPoints)[-1]

      attractor1 = BYN.MeshBuilder.CreateLines(
        'Lorenz1',
        { points: pointsLorenz, updatable: true },
        scene
      )
      pointsLorenz = makeVertices(numPoints)[1]

      attractor2 = BYN.MeshBuilder.CreateLines(
        'Lorenz2',
        { points: pointsLorenz, updatable: true },
        scene
      )

      attractor1.color = attractorColor1
      attractor2.color = attractorColor2

      attractor1.isVisible = toggleAttractor
      attractor2.isVisible = toggleAttractor
    }

    updateAttractor()

    function createParticles() {
      butterflies = new BYN.PointsCloudSystem('butterflies', 2.2, scene, {
        updatable: true
      })
      butterflies.addPoints(8000)
      butterflies.initParticles = function() {
        for (let p = 0; p < butterflies.nbParticles; p++) {
          butterflies.particles[p].position = new BYN.Vector3(
            Math.random() * 200,
            Math.random() * 200,
            Math.random() * 200
          )

          butterflies.particles[p].color = particleColor
        }
      }
      butterflies.buildMeshAsync().then(mesh => {
        butterflies.initParticles()
        butterflies.setParticles()

        mesh.position.x = 0
        mesh.position.y = 0 //-lorenzOffset
        mesh.position.z = 0
        mesh.alwaysSelectAsActiveMesh = true
      })

      butterflies.updateParticle = function(particle) {
        let x = particle.position.x
        let y = particle.position.y
        let z = particle.position.z

        x = x + a * (z - x) * dt
        z = z + ((c - a) * x - x * y + c * z) * dt //exchange z-y formulas
        y = y += (x * z - b * y) * dt

        particle.position.x = x
        particle.position.y = y
        particle.position.z = z
      }

      //}
      // updateAttractor()
      // console.log(butterflies)
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
    hidePanel.background = '#1e1e1e'

    hidePanel.onPointerUpObservable.add(function() {
      togglePanel = !togglePanel
      startButton.isVisible = togglePanel
      sliderRho.isVisible = togglePanel
      textRho.isVisible = togglePanel
      sliderSigma.isVisible = togglePanel
      textSigma.isVisible = togglePanel
      sliderBeta.isVisible = togglePanel
      textBeta.isVisible = togglePanel
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
    hideAttractor.background = '#1e1e1e'
    hideAttractor.onPointerUpObservable.add(function() {
      toggleAttractor = !toggleAttractor
      attractor1.isVisible = toggleAttractor
      attractor2.isVisible = toggleAttractor
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
    startButton.background = '#1e1e1e'
    startButton.onPointerUpObservable.add(function() {
      butterflies.dispose()
      createParticles()
    })
    panel.addControl(startButton)

    let textRho = new BABYLON.GUI.TextBlock()
    textRho.isVisible = togglePanel
    textRho.text = 'a = ' + a.toFixed(1).toString()
    textRho.color = '#08a31f'
    textRho.height = '40px'
    textRho.fontSize = 18
    textRho.top = '40px'
    panel.addControl(textRho)

    let sliderRho = new BABYLON.GUI.Slider()
    sliderRho.isVisible = togglePanel
    sliderRho.minimum = 28
    sliderRho.maximum = 56
    sliderRho.value = 40

    sliderRho.height = '15px'
    sliderRho.thumbWidth = 20
    sliderRho.width = '150px'
    sliderRho.color = 'green'
    sliderRho.borderColor = 'black'
    sliderRho.isThumbCircle = true
    sliderRho.step = 0.1
    //sliderRho.top = '60px'
    //sliderRho.isVertical = true

    sliderRho.onValueChangedObservable.add(function(value) {
      textRho.text = 'a = ' + value.toFixed(1).toString() //(BABYLON.Tools.toString(value) | 0)
      a = value

      attractor1.dispose()
      attractor2.dispose()
      camera.setTarget(new BYN.Vector3(0, 2 * c - a, 0))
      updateAttractor()

      // Camera should follow the position of singularities....-------
      //butterflies.mesh.position.y = -rho + 1
    })
    panel.addControl(sliderRho)

    let textSigma = new BABYLON.GUI.TextBlock()
    textSigma.isVisible = togglePanel
    textSigma.text = 'b = ' + b.toFixed(0).toString()
    textSigma.color = '#08a31f'
    textSigma.height = '40px'
    textSigma.fontSize = 18
    //textSigma.top = '40px'
    panel.addControl(textSigma)
    let sliderSigma = new BABYLON.GUI.Slider()
    sliderSigma.isVisible = togglePanel
    sliderSigma.minimum = 0
    sliderSigma.maximum = 5
    sliderSigma.value = 3
    sliderSigma.height = '15px'
    sliderSigma.thumbWidth = 20
    sliderSigma.width = '150px'
    sliderSigma.color = 'green'
    sliderSigma.borderColor = 'black'
    sliderSigma.isThumbCircle = true
    sliderSigma.step = 0.5
    //sliderSigma.top = '60px'
    //sliderSigma.isVertical = true

    sliderSigma.onValueChangedObservable.add(function(value) {
      textSigma.text = 'b = ' + value.toFixed(1).toString() //(BABYLON.Tools.toString(value) | 0)
      b = value
      attractor1.dispose()
      attractor2.dispose()
      updateAttractor()
    })
    panel.addControl(sliderSigma)

    let textBeta = new BABYLON.GUI.TextBlock()
    textBeta.isVisible = togglePanel
    textBeta.text = 'c = ' + c.toFixed(1).toString()
    textBeta.color = '#08a31f'
    textBeta.height = '40px'
    textBeta.fontSize = 18
    //textBeta.top = '40px'
    panel.addControl(textBeta)
    let sliderBeta = new BABYLON.GUI.Slider()
    sliderBeta.isVisible = togglePanel
    sliderBeta.minimum = 20
    sliderBeta.maximum = 40
    sliderBeta.value = 28
    sliderBeta.height = '15px'
    sliderBeta.thumbWidth = 20
    sliderBeta.width = '150px'
    sliderBeta.color = 'green'
    sliderBeta.borderColor = 'black'
    sliderBeta.isThumbCircle = true
    sliderBeta.step = 0.1
    //sliderBeta.top = '60px'
    //sliderBeta.isVertical = true

    sliderBeta.onValueChangedObservable.add(function(value) {
      textBeta.text = 'c = ' + value.toFixed(1).toString() //(BABYLON.Tools.toString(value) | 0)
      c = value
      attractor1.dispose()
      attractor2.dispose()
      camera.setTarget(new BYN.Vector3(0, 2 * c - a, 0))
      updateAttractor()
    })
    panel.addControl(sliderBeta)

    let panel2 = new BABYLON.GUI.StackPanel()
    panel2.width = '500px'
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
      route == 'www.dydx.ufes.br/Attractors/qichen' ||
      route == '/Attractors/qichen/' ||
      route == '/Attractors/qichen'
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
