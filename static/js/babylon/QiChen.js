///<reference path="BABYLON.d.ts"/>

import * as BYN from 'babylonjs'
import * as GUI from 'babylonjs-gui'

export default function QiChenPlot() {
  let butterflies
  let attractor1, attractor2

  let toggleAttractor = true
  let togglePanel = false

  // let BYN = BABYLON

  let a = 35,
    b = 3,
    c = 28

  let dt = 0.003,
    numPoints = 10000

  let papayawhip = new BYN.Color4(255 / 255, 239 / 255, 213 / 255, 1)
  let palegoldenrod = new BYN.Color4(238 / 255, 232 / 255, 17 / 255, 1)
  let lightgoldenrodyellow = new BYN.Color4(250 / 255, 250 / 255, 210 / 255, 1)
  let gold = new BYN.Color4(255 / 255, 215 / 255, 0 / 255, 0.5)
  let salmon = new BYN.Color4(250 / 255, 128 / 255, 114 / 255, 0.5)
  let lightgreen = new BYN.Color4(144 / 255, 238 / 255, 144 / 255, 0.5)
  let tomato = new BYN.Color4(255 / 255, 99 / 255, 71 / 255, 0.2)
  let peachpuff = new BYN.Color4(255 / 255, 218 / 255, 185 / 255, 1)
  let lightcyan = new BYN.Color4(224 / 255, 255 / 255, 255 / 255, 0.5)
  let aquamarine = new BYN.Color4(127 / 255, 255 / 255, 212 / 255, 1)
  let seagreen = new BYN.Color4(46 / 255, 139 / 255, 87 / 255, 0.2)
  let darkcyan = new BYN.Color4(0 / 255, 139 / 255, 139 / 255, 1)
  let darkturquoise = new BYN.Color4(0 / 255, 206 / 255, 209 / 255, 1)
  let lightblue = new BYN.Color4(173 / 255, 216 / 255, 230 / 255, 1)
  let pink = new BYN.Color4(255 / 255, 192 / 255, 203 / 255, 1)
  let thistle = new BYN.Color4(216 / 255, 191 / 255, 216 / 255, 1)
  let lightskyblue = new BABYLON.Color4(135 / 255, 206 / 255, 250 / 255, 1)
  let deepskyblue = new BYN.Color4(0 / 255, 191 / 255, 255 / 255, 0.5)
  let royalblue = new BYN.Color4(65 / 255, 105 / 255, 225 / 255, 0.5)
  let blue = new BYN.Color4(0, 100 / 255, 255 / 255, 0.5)
  let tan = new BYN.Color4(210 / 255, 180 / 255, 140 / 255, 0.5)
  let chocolate = new BYN.Color4(210 / 255, 105 / 255, 30 / 255, 0.5)
  let azure = new BYN.Color4(240 / 255, 255 / 255, 255 / 255, 0.5)
  let cornflowerblue = new BYN.Color4(100 / 255, 149 / 255, 237 / 255, 0.5)
  let orange = new BYN.Color4(255 / 255, 165 / 255, 0 / 255, 1)
  let lightsalmon = new BYN.Color4(255 / 255, 160 / 255, 122 / 255, 0.5)
  let maroon = new BYN.Color4(128 / 255, 0, 0, 0.5)
  let darkslategray = new BYN.Color4(47 / 255, 79 / 255, 79 / 255, 0.5)
  let dodgerblue = new BYN.Color4(30 / 255, 144 / 255, 255 / 255, 0.5)

  let darkblue = new BYN.Color4(0 / 255, 0 / 255, 139 / 255, 0.5)

  let white = new BYN.Color4(1, 1, 1, 1)

  let attractorColor1 = seagreen //new BYN.Color4(50 / 255, 100 / 255, 200 / 255, 0.1)
  let attractorColor2 = tan // new BYN.Color4(50 / 255, 200 / 255, 100 / 255, 0.1)
  //let attractorColor = new BYN.Color4(245 / 255, 150 / 255, 7 / 255, 0.0)
  let particleColor = gold //new BYN.Color4(8 / 255, 170 / 255, 245 / 255, 1)
  //   let particleColor = tomato //new BYN.Color4(255 / 255, 182 / 255, 193 / 255, 1)
  //   let particleColor = new BYN.Color4(240 / 255, 128 / 255, 0 / 255, 1)

  let lorenzOffset = 2 * c - a,
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

  let createScene = function(engine, canvas) {
    let scene = new BYN.Scene(engine)
    scene.clearColor = new BYN.Color3(0, 0, 0) //(105 / 255, 105 / 255, 105 / 255) //dimgrey

    let camera = new BYN.ArcRotateCamera(
      'camera',
      -1.57,
      -1.8,
      50,
      new BYN.Vector3(0, 0, 0),
      scene
    )

    camera.attachControl(canvas, false)
    camera.setPosition(
      new BYN.Vector3(6 * singularity, lorenzOffset, -5 * singularity)
    )
    camera.minZ = 0.001
    camera.maxZ = 1000
    camera.setTarget(new BYN.Vector3(0, lorenzOffset, 0))

    let axes = new BYN.AxesViewer(scene, 8)

    function updateAttractor() {
      let pointsLorenz = makeVertices(numPoints)

      attractor1 = BYN.MeshBuilder.CreateLines(
        'Lorenz1',
        { points: pointsLorenz[-1], updatable: true },
        scene
      )
      // pointsLorenz = makeVertices(numPoints)[1]

      attractor2 = BYN.MeshBuilder.CreateLines(
        'Lorenz2',
        { points: pointsLorenz[1], updatable: true },
        scene
      )

      attractor1.color = attractorColor1
      attractor2.color = attractorColor2

      attractor1.isVisible = toggleAttractor
      attractor2.isVisible = toggleAttractor
    }

    updateAttractor()

    function createParticles() {
      butterflies = new BYN.PointsCloudSystem('butterflies', 4, scene, {
        updatable: true
      })
      butterflies.addPoints(600)
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
    hidePanel.height = '42px'
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
      sliderB.isVisible = togglePanel
      textB.isVisible = togglePanel
      sliderC.isVisible = togglePanel
      textC.isVisible = togglePanel
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
    hideAttractor.height = '42px'
    hideAttractor.color = '#08a31f'
    hideAttractor.fontSize = 16
    hideAttractor.thickness = 0
    hideAttractor.cornerRadius = 20
    //hideAttractor.bottom = '120px'
    hideAttractor.background = '#0f0f0f' //'#1e1e1e'
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
    startButton.height = '42px'
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
    textA.height = '42px'
    textA.fontSize = 18
    textA.top = '40px'
    panel.addControl(textA)

    let sliderA = new BABYLON.GUI.Slider()
    sliderA.isVisible = togglePanel
    sliderA.minimum = 28
    sliderA.maximum = 56
    sliderA.value = 35

    sliderA.height = '15px'
    sliderA.thumbWidth = 20
    sliderA.width = '150px'
    sliderA.color = 'green'
    sliderA.borderColor = 'black'
    sliderA.isThumbCircle = true
    sliderA.step = 0.1
    sliderA.background = '#2f2f2f'
    //sliderA.top = '60px'
    //sliderA.isVertical = true

    sliderA.onValueChangedObservable.add(function(value) {
      textA.text = 'a = ' + value.toFixed(1).toString() //(BABYLON.Tools.toString(value) | 0)
      a = value

      attractor1.dispose()
      attractor2.dispose()
      camera.setTarget(new BYN.Vector3(0, 2 * c - a, 0))
      updateAttractor()

      // Camera should follow the position of singularities....-------
      //butterflies.mesh.position.y = -rho + 1
    })
    panel.addControl(sliderA)

    let textB = new BABYLON.GUI.TextBlock()
    textB.isVisible = togglePanel
    textB.text = 'b = ' + b.toFixed(0).toString()
    textB.color = '#08a31f'
    textB.height = '42px'
    textB.fontSize = 18
    //textB.top = '40px'
    panel.addControl(textB)
    let sliderB = new BABYLON.GUI.Slider()
    sliderB.isVisible = togglePanel
    sliderB.minimum = 0
    sliderB.maximum = 5
    sliderB.value = 3
    sliderB.height = '15px'
    sliderB.thumbWidth = 20
    sliderB.width = '150px'
    sliderB.color = 'green'
    sliderB.borderColor = 'black'
    sliderB.isThumbCircle = true
    sliderB.step = 0.5
    sliderB.background = '#2f2f2f'
    //sliderB.top = '60px'
    //sliderB.isVertical = true

    sliderB.onValueChangedObservable.add(function(value) {
      textB.text = 'b = ' + value.toFixed(1).toString() //(BABYLON.Tools.toString(value) | 0)
      b = value
      attractor1.dispose()
      attractor2.dispose()
      updateAttractor()
    })
    panel.addControl(sliderB)

    let textC = new BABYLON.GUI.TextBlock()
    textC.isVisible = togglePanel
    textC.text = 'c = ' + c.toFixed(1).toString()
    textC.color = '#08a31f'
    textC.height = '42px'
    textC.fontSize = 18
    //textC.top = '40px'
    panel.addControl(textC)
    let sliderC = new BABYLON.GUI.Slider()
    sliderC.isVisible = togglePanel
    sliderC.minimum = 20
    sliderC.maximum = 40
    sliderC.value = 28
    sliderC.height = '30px'
    sliderC.thumbWidth = 20
    sliderC.width = '150px'
    sliderC.color = 'green'
    sliderC.borderColor = 'black'
    sliderC.isThumbCircle = true
    sliderC.step = 0.1
    sliderC.background = '#2f2f2f'
    sliderC.paddingBottom = '15px'
    //sliderC.isVertical = true

    sliderC.onValueChangedObservable.add(function(value) {
      textC.text = 'c = ' + value.toFixed(1).toString() //(BABYLON.Tools.toString(value) | 0)
      c = value
      attractor1.dispose()
      attractor2.dispose()
      camera.setTarget(new BYN.Vector3(0, 2 * c - a, 0))
      updateAttractor()
    })
    panel.addControl(sliderC)

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
