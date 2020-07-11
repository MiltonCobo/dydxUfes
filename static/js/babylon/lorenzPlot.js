import * as BABYLON from 'babylonjs'
import * as GUI from 'babylonjs-gui'

export default function lorenzPlot() {
  var butterflies
  var attractor1, attractor2
  var camera, axes

  //var attractor

  var rho = 28,
    sigma = 10,
    beta = 8.0 / 3.0

  var dt = 0.005,
    numPoints = 6000

  var attractorColor = new BABYLON.Color4(245 / 255, 150 / 255, 0 / 255, 1)
  var particleColor = new BABYLON.Color4(0 / 255, 170 / 255, 245 / 255, 0.6)

  var lorenzOffset = rho - 1,
    singularity = Math.sqrt(beta * (rho - 1))

  function makeVertices(N) {
    let points = []

    for (let t = -1; t < 2; t += 2) {
      let y = 0.01,
        z = 0.01,
        x = t
      points[t] = []
      for (let j = 0; j < 300; j++) {
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

  var createScene = function(engine, canvas) {
    var scene = new BABYLON.Scene(engine)
    scene.clearColor = new BABYLON.Color3(21 / 255, 21 / 255, 21 / 255)

    camera = new BABYLON.ArcRotateCamera(
      'camera',
      0,
      0,
      0,
      new BABYLON.Vector3(0, 0, 0),
      scene
    )

    camera.attachControl(canvas, true)
    camera.setPosition(
      new BABYLON.Vector3(5 * singularity, rho - 1, -4.5 * singularity)
    )
    camera.minZ = 0.001
    camera.maxZ = 300
    camera.setTarget(new BABYLON.Vector3(0, -27 + rho - 1, 0))

    axes = new BABYLON.AxesViewer(scene, 5)
    axes.position = new BABYLON.Vector3(0, -27 + rho - 1, 0)

    function updateAttractor() {
      let pointsLorenz = makeVertices(numPoints)[-1]
      // draw attractor
      attractor1 = BABYLON.MeshBuilder.CreateLines(
        'Lorenz',
        { points: pointsLorenz, updatable: true },
        scene
      )
      pointsLorenz = makeVertices(numPoints)[1]

      attractor2 = BABYLON.MeshBuilder.CreateLines(
        'Lorenz',
        { points: pointsLorenz, updatable: true },
        scene
      )

      attractor1.color = attractorColor
      attractor2.color = attractorColor

      attractor1.position = new BABYLON.Vector3(0, -rho + 1, 0)
      attractor2.position = new BABYLON.Vector3(0, -rho + 1, 0)
    }
    updateAttractor()

    function createParticles() {
      butterflies = new BABYLON.PointsCloudSystem('butterflies', 2, scene, {
        updatable: true
      })
      butterflies.addPoints(10000)
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
        mesh.position.y = -rho + 1
        mesh.position.z = 0
        mesh.alwaysSelectAsActiveMesh = true
      })

      butterflies.updateParticle = function(particle) {
        let x = particle.position.x
        let y = particle.position.y
        let z = particle.position.z

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

    var advancedTexture = new BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI(
      'myUI'
    )
    advancedTexture.isForeground = false // panel behind attractor

    var panel = new BABYLON.GUI.StackPanel()
    panel.width = '220px'
    panel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT
    panel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM
    advancedTexture.addControl(panel)

    var startButton = new BABYLON.GUI.Button.CreateSimpleButton(
      'startButton',
      'Recriar partículas'
    )
    startButton.width = '160px'
    startButton.height = '40px'
    startButton.color = '#08a31f'
    startButton.fontSize = 18
    startButton.borderRadius = 20
    startButton.borderColor = 'green'
    //startButton.top = '120px'
    startButton.background = 'black'
    startButton.onPointerUpObservable.add(function() {
      butterflies.dispose()
      createParticles()
    })
    panel.addControl(startButton)

    var textRho = new BABYLON.GUI.TextBlock()
    textRho.text = 'rho = ' + rho.toFixed(0).toString()
    textRho.color = '#08a31f'
    textRho.height = '40px'
    textRho.fontSize = 18
    textRho.top = '40px'
    panel.addControl(textRho)

    var sliderRho = new BABYLON.GUI.Slider()
    sliderRho.minimum = 0
    sliderRho.maximum = 30
    sliderRho.value = 28
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
      textRho.text = 'rho = ' + value.toFixed(1).toString() //(BABYLON.Tools.toString(value) | 0)
      rho = value
      attractor1.dispose()
      attractor2.dispose()
      updateAttractor()
      butterflies.mesh.position.y = -rho + 1
    })
    panel.addControl(sliderRho)

    var textSigma = new BABYLON.GUI.TextBlock()
    textSigma.text = 'sigma = ' + sigma.toFixed(0).toString()
    textSigma.color = '#08a31f'
    textSigma.height = '40px'
    textSigma.fontSize = 18
    //textSigma.top = '40px'
    panel.addControl(textSigma)
    var sliderSigma = new BABYLON.GUI.Slider()
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

    var textBeta = new BABYLON.GUI.TextBlock()
    textBeta.text = 'beta = 8/3 ' //+ beta.toFixed(1).toString()
    textBeta.color = '#08a31f'
    textBeta.height = '40px'
    textBeta.fontSize = 18
    //textBeta.top = '40px'
    panel.addControl(textBeta)
    var sliderBeta = new BABYLON.GUI.Slider()
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

    var panel2 = new BABYLON.GUI.StackPanel()
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

  var canvas = document.getElementById('lorenzCanvas')
  var engine = new BABYLON.Engine(canvas, true)
  var scene = createScene(engine, canvas)

  engine.runRenderLoop(function() {
    let route = window.location.pathname
    if (
      route == 'www.dydx.ufes.br/lorenz/' ||
      route == '/lorenz/' ||
      route == '/lorenz'
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
  var result
  var p

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
