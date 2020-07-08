import * as BABYLON from 'babylonjs'
import * as GUI from 'babylonjs-gui'

export default function lorenzPlot() {
  console.log(GUI)
  var pointsLorenz = []
  var butterflies
  var attractor

  //var attractor

  var rho = 28,
    sigma = 10,
    beta = 8.0 / 3.0

  var dt = 0.005,
    numPoints = 5000

  var attractorColor = new BABYLON.Color4(245 / 255, 150 / 255, 7 / 255, 1)
  var particleColor = new BABYLON.Color4(8 / 255, 170 / 255, 245 / 255, 0.6)

  var lorenzOffset = rho - 1,
    singularity = Math.sqrt(beta * (rho - 1))

  function makeVertices() {
    let points = []

    for (let t = -1; t < 2; t += 2) {
      let y = 0.01,
        z = 0.01,
        x = t

      for (let j = 0; j < 300; j++) {
        x = x + sigma * (z - x) * dt
        z = z + (x * (rho - y) - z) * dt
        y = y + (x * z - beta * y) * dt
      }
      for (let i = 0; i < numPoints; i++) {
        x = x + sigma * (z - x) * dt
        z = z + (x * (rho - y) - z) * dt
        y = y + (x * z - beta * y) * dt
        points.push(new BABYLON.Vector3(x, y - lorenzOffset, z))
      }
    }

    return points
  }

  var createScene = function(engine, canvas) {
    var scene = new BABYLON.Scene(engine)
    scene.clearColor = new BABYLON.Color3(0, 0, 0)

    let camera = new BABYLON.ArcRotateCamera(
      'camera',
      0,
      0,
      0,
      new BABYLON.Vector3(0, 0, 0),
      scene
    )

    camera.attachControl(canvas, true)
    camera.setPosition(
      new BABYLON.Vector3(5 * singularity, 3.2, -4.5 * singularity)
    )
    camera.minZ = 0.01
    camera.maxZ = 300

    let axes = new BABYLON.AxesViewer(scene, 10)
    axes.position = new BABYLON.Vector3(0, 0, -lorenzOffset)

    //   lights
    scene.createDefaultLight()

    function updateAttractor() {
      pointsLorenz = makeVertices({ x: 0.01, y: 0.01, z: -1 }, numPoints)
      // draw attractor
      attractor = BABYLON.MeshBuilder.CreateLines(
        'Lorenz',
        { points: pointsLorenz, updatable: true },
        scene
      )

      attractor.color = attractorColor
    }
    updateAttractor()

    function createParticles() {
      butterflies = new BABYLON.PointsCloudSystem('butterflies', 1.5, scene, {
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
        mesh.position.y = -lorenzOffset
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
      console.log('running')
    })
    BABYLON.GUI = GUI
    //
    var advancedTexture = new BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI(
      'myUI'
    )
    advancedTexture.isForeground = false // panel behind attractor

    var panel = new BABYLON.GUI.StackPanel()
    panel.width = '220px'
    panel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT
    panel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER
    advancedTexture.addControl(panel)

    var startButton = new BABYLON.GUI.Button.CreateSimpleButton(
      'startButton',
      'Reiniciar'
    )
    startButton.width = '60px'
    startButton.height = '20px'
    startButton.color = 'brown'
    startButton.fontSize = 14
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
    textRho.color = 'green'
    textRho.height = '20px'
    textRho.fontSize = 14
    textRho.top = '40px'
    panel.addControl(textRho)

    var sliderRho = new BABYLON.GUI.Slider()
    sliderRho.minimum = 15
    sliderRho.maximum = 30
    sliderRho.value = 28
    sliderRho.height = '15px'
    sliderRho.thumbWidth = 15
    sliderRho.width = '150px'
    sliderRho.color = 'brown'
    sliderRho.borderColor = 'black'
    sliderRho.isThumbCircle = true
    sliderRho.step = 0.1
    //sliderRho.top = '60px'
    //sliderRho.isVertical = true

    sliderRho.onValueChangedObservable.add(function(value) {
      textRho.text = 'rho = ' + value.toFixed(1).toString() //(BABYLON.Tools.toString(value) | 0)
      rho = value
      attractor.dispose()
      updateAttractor()
      //updateAttractor()
    })
    panel.addControl(sliderRho)

    var textSigma = new BABYLON.GUI.TextBlock()
    textSigma.text = 'sigma = ' + sigma.toFixed(0).toString()
    textSigma.color = 'green'
    textSigma.height = '20px'
    textSigma.fontSize = 14
    //textSigma.top = '40px'
    panel.addControl(textSigma)
    var sliderSigma = new BABYLON.GUI.Slider()
    sliderSigma.minimum = 0
    sliderSigma.maximum = 20
    sliderSigma.value = 10
    sliderSigma.height = '15px'
    sliderSigma.thumbWidth = 15
    sliderSigma.width = '150px'
    sliderSigma.color = 'brown'
    sliderSigma.borderColor = 'black'
    sliderSigma.isThumbCircle = true
    sliderSigma.step = 0.1
    //sliderSigma.top = '60px'
    //sliderSigma.isVertical = true

    sliderSigma.onValueChangedObservable.add(function(value) {
      textSigma.text = 'sigma = ' + value.toFixed(1).toString() //(BABYLON.Tools.toString(value) | 0)
      sigma = value
      attractor.dispose()
      updateAttractor()
      //updateAttractor()
    })
    panel.addControl(sliderSigma)

    var textBeta = new BABYLON.GUI.TextBlock()
    textBeta.text = 'beta = ' + beta.toFixed(0).toString()
    textBeta.color = 'green'
    textBeta.height = '20px'
    textBeta.fontSize = 14
    //textBeta.top = '40px'
    panel.addControl(textBeta)
    var sliderBeta = new BABYLON.GUI.Slider()
    sliderBeta.minimum = 0
    sliderBeta.maximum = 20
    sliderBeta.value = 10
    sliderBeta.height = '15px'
    sliderBeta.thumbWidth = 15
    sliderBeta.width = '150px'
    sliderBeta.color = 'brown'
    sliderBeta.borderColor = 'black'
    sliderBeta.isThumbCircle = true
    sliderBeta.step = 0.1
    //sliderBeta.top = '60px'
    //sliderBeta.isVertical = true

    sliderBeta.onValueChangedObservable.add(function(value) {
      textBeta.text = 'beta = ' + value.toFixed(1).toString() //(BABYLON.Tools.toString(value) | 0)
      sigma = value
      attractor.dispose()
      updateAttractor()
      //updateAttractor()
    })
    panel.addControl(sliderBeta)

    var panel2 = new BABYLON.GUI.StackPanel()
    panel2.width = '500px'
    panel2.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT
    panel2.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP
    advancedTexture.addControl(panel2)

    var comment = new BABYLON.GUI.TextBlock()
    comment.text = 'Use mouse ou setas para rotar e Ctrl+seta para transladar'
    comment.height = '20px'
    comment.fontSize = 12
    comment.color = 'brown'
    panel2.addControl(comment)

    return scene
  }

  function pageLoaded() {
    var canvas = document.getElementById('lorenzCanvas')
    var engine = new BABYLON.Engine(canvas, true)
    var scene = createScene(engine, canvas)

    engine.runRenderLoop(function() {
      scene.render()

      let route = window.location.pathname

      if (route !== '/lorenz') {
        engine.dispose()
      }
    })
    window.addEventListener('resize', function() {
      engine.resize()
    })
  }
  pageLoaded()
  //   window.addEventListener('DOMContentLoaded', function() {
  //     pageLoaded()
  //   })
}
