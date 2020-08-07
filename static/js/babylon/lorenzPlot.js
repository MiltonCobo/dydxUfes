import * as BABYLON from 'babylonjs'
import * as GUI from 'babylonjs-gui'

export default function lorenzPlot() {
  let butterflies
  let attractor1, attractor2
  let camera

  let toggleAttractor = true
  let togglePanel = false

  //let attractor

  let rho = 28,
    sigma = 10,
    beta = 8.0 / 3.0

  let BYN = BABYLON

  const numPoints = 6000
  const numPart = 10000

  //let attractorColor = new BABYLON.Color4(245 / 255, 150 / 255, 0 / 255, 1)
  let tomato = new BYN.Color4(255 / 255, 99 / 255, 71 / 255, 1)
  let seagreen = new BYN.Color4(46 / 255, 139 / 255, 87 / 255, 1)
  let gold = new BYN.Color4(255 / 255, 215 / 255, 0 / 255, 0.2)
  let orange = new BYN.Color4(255 / 255, 165 / 255, 0 / 255, 1)
  let goldenrod = new BYN.Color4(218 / 255, 165 / 255, 32 / 255, 1)
  let sandybrown = new BYN.Color4(244 / 255, 164 / 255, 96 / 255, 1)
  let beige = new BYN.Color4(245 / 255, 245 / 255, 220 / 255, 1)
  let aquamarine = new BYN.Color4(127 / 255, 255 / 255, 212 / 255, 0.2)
  let salmon = new BYN.Color4(250 / 255, 128 / 255, 114 / 255, 1)
  let thistle = new BYN.Color4(216 / 255, 191 / 255, 216 / 255, 1)

  let attractorColor1 = new BYN.Color4(245 / 255, 150 / 255, 0 / 255, 1)
  let attractorColor2 = seagreen //thistle //new BYN.Color4(188 / 255, 143 / 255, 143 / 255, 1)
  // let attractorColor2 = new BYN.Color4(50 / 255, 200 / 255, 100 / 255, 0.1)

  let particleColor = new BABYLON.Color4(0 / 255, 170 / 255, 245 / 255, 0.8)

  let singularity = Math.sqrt(beta * (rho - 1))

  function makeVertices(N) {
    let points = []

    for (let t = -1; t < 2; t += 2) {
      let y = 0.01,
        z = t, //0.01,
        x = t

      let dt = 0.005

      points[t] = []
      for (let j = 0; j < 200; j++) {
        x = x + sigma * (z - x) * dt
        z = z + (x * (rho - y) - z) * dt
        y = y + (x * z - beta * y) * dt
      }
      for (let i = 0; i < N; i++) {
        x = x + sigma * (z - x) * dt
        z = z + (x * (rho - y) - z) * dt
        y = y + (x * z - beta * y) * dt
        points[t].push(new BABYLON.Vector3(x, y, z))
      }
    }
    return points
  }

  let createScene = function(engine, canvas) {
    let scene = new BABYLON.Scene(engine)
    scene.clearColor = new BABYLON.Color3(0, 0, 0) // (21 / 255, 21 / 255, 21 / 255)

    camera = new BABYLON.ArcRotateCamera(
      'camera',
      0,
      0,
      0,
      new BABYLON.Vector3(0, 0, 0),
      scene
    )

    camera.attachControl(canvas, false) // FALSE scroll in canvas is not passed to browser
    camera.setPosition(
      new BABYLON.Vector3(5 * singularity, rho - 1, -4.5 * singularity)
    )
    camera.minZ = 0.001
    camera.maxZ = 300
    camera.setTarget(new BABYLON.Vector3(0, rho - 1, 0))

    let axes = new BABYLON.AxesViewer(scene, 8)
    //axes.position = new BABYLON.Vector3(0, -27 + rho - 1, 0)

    function updateAttractor() {
      let pointsLorenz = makeVertices(numPoints)

      attractor1 = BABYLON.MeshBuilder.CreateLines(
        'Lorenz',
        { points: pointsLorenz[-1], updatable: true },
        scene
      )

      attractor2 = BABYLON.MeshBuilder.CreateLines(
        'Lorenz',
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
      butterflies = new BABYLON.PointsCloudSystem('butterflies', 2, scene, {
        updatable: true
      })
      butterflies.addPoints(numPart)
      butterflies.initParticles = function() {
        for (let p = 0; p < butterflies.nbParticles; p++) {
          butterflies.particles[p].position = new BABYLON.Vector3(
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
        mesh.position.y = 0 //-rho + 1
        mesh.position.z = 0
        mesh.alwaysSelectAsActiveMesh = true
      })

      butterflies.updateParticle = function(particle) {
        let x = particle.position.x
        let y = particle.position.y
        let z = particle.position.z

        let dt = 0.01
        x = x + sigma * (z - x) * dt
        z = z + (x * (rho - y) - z) * dt
        y = y + (x * z - beta * y) * dt

        particle.position.x = x
        particle.position.y = y
        particle.position.z = z
      }
    }

    createParticles()

    scene.registerBeforeRender(function() {
      butterflies.setParticles()
    })

    BABYLON.GUI = GUI

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
    textRho.text = 'rho = ' + rho.toFixed(0).toString()
    textRho.color = '#08a31f'
    textRho.height = '40px'
    textRho.fontSize = 18
    textRho.top = '40px'
    panel.addControl(textRho)

    let sliderRho = new BABYLON.GUI.Slider()
    sliderRho.isVisible = togglePanel
    sliderRho.minimum = 0
    sliderRho.maximum = 30
    sliderRho.value = 28

    sliderRho.height = '15px'
    sliderRho.thumbWidth = 20
    sliderRho.width = '150px'
    sliderRho.color = 'green'
    sliderRho.borderColor = 'black'
    sliderRho.isThumbCircle = true
    sliderRho.step = 0.01
    //sliderRho.top = '60px'
    //sliderRho.isVertical = true

    sliderRho.onValueChangedObservable.add(function(value) {
      textRho.text = 'rho = ' + value.toFixed(2).toString() //(BABYLON.Tools.toString(value) | 0)
      rho = value

      attractor1.dispose()
      attractor2.dispose()
      updateAttractor()
      camera.setTarget(new BABYLON.Vector3(0, rho - 1, 0))
      // Camera should follow the position of singularities....-------
    })
    panel.addControl(sliderRho)

    let textSigma = new BABYLON.GUI.TextBlock()
    textSigma.isVisible = togglePanel
    textSigma.text = 'sigma = ' + sigma.toFixed(0).toString()
    textSigma.color = '#08a31f'
    textSigma.height = '40px'
    textSigma.fontSize = 18
    //textSigma.top = '40px'
    panel.addControl(textSigma)
    let sliderSigma = new BABYLON.GUI.Slider()
    sliderSigma.isVisible = togglePanel
    sliderSigma.minimum = 0
    sliderSigma.maximum = 20
    sliderSigma.value = 10
    sliderSigma.height = '15px'
    sliderSigma.thumbWidth = 20
    sliderSigma.width = '150px'
    sliderSigma.color = 'green'
    sliderSigma.borderColor = 'black'
    sliderSigma.isThumbCircle = true
    sliderSigma.step = 0.1
    //sliderSigma.top = '60px'
    //sliderSigma.isVertical = true

    sliderSigma.onValueChangedObservable.add(function(value) {
      textSigma.text = 'sigma = ' + value.toFixed(1).toString() //(BABYLON.Tools.toString(value) | 0)
      sigma = value
      attractor1.dispose()
      attractor2.dispose()
      updateAttractor()
    })
    panel.addControl(sliderSigma)

    let textBeta = new BABYLON.GUI.TextBlock()
    textBeta.isVisible = togglePanel
    textBeta.text = 'beta = 8/3 ' //+ beta.toFixed(1).toString()
    textBeta.color = '#08a31f'
    textBeta.height = '40px'
    textBeta.fontSize = 18
    //textBeta.top = '40px'
    panel.addControl(textBeta)
    let sliderBeta = new BABYLON.GUI.Slider()
    sliderBeta.isVisible = togglePanel
    sliderBeta.minimum = 0
    sliderBeta.maximum = 20
    sliderBeta.value = 10
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
      textBeta.text = 'beta = ' + value.toFixed(1).toString() //(BABYLON.Tools.toString(value) | 0)
      sigma = value
      attractor1.dispose()
      attractor2.dispose()
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

    //advancedTexture.addControl(hidePanel)

    return scene
  }

  let canvas = document.getElementById('lorenzCanvas')
  let engine = new BABYLON.Engine(canvas, true)
  let scene = createScene(engine, canvas)

  engine.runRenderLoop(function() {
    // console.log('running')

    // let navigation = navigationType()
    // console.log(navigation)

    // if (navigation != 1) {
    //   engine.stopRenderLoop()
    // } else {
    //   scene.render()
    // }
    let route = window.location.pathname
    if (
      route == 'www.dydx.ufes.br/Attractors/lorenz/' ||
      route == '/Attractors/lorenz/' ||
      route == '/Attractors/lorenz'
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

function navigationType() {
  let result
  let p

  if (window.performance.navigation) {
    result = window.performance.navigation
    if (result == 255) {
      result = 4
    } // 4 is my invention!
  }

  if (window.performance.getEntriesByType('navigation')) {
    p = window.performance.getEntriesByType('navigation')[0].type

    if (p == 'navigate') {
      result = 0
    }
    if (p == 'reload') {
      result = 1
    }
    if (p == 'back_forward') {
      result = 2
    }
    if (p == 'prerender') {
      result = 3
    } //3 is my invention!
  }
  return result
}
