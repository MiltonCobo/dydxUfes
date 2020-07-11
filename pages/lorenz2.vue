<template>
  <v-container style="margin:0px;" fluid>
    <v-row>
      <v-col>
        <h2 style="color: salmon;" align="center">
          O Atrator de Lorenz
        </h2>
        <v-divider style="margin-bottom:0.5%;" />
      </v-col>
    </v-row>
    <v-row>
      <canvas id="lorenzCanvas"></canvas>
    </v-row>
  </v-container>
</template>

<script>
import * as BABYLON from 'babylonjs'
import * as GUI from 'babylonjs-gui'
import Lorenz from '@/static/js/babylon/lorenzPlotmodule.js'

export default {
  layout: 'darkTheme',
  created() {},
  mounted() {
    console.log('mounted')
    this.startBabylonPlot()
  },
  destroyed() {
    console.log('destroyed foi ativado')
  },

  methods: {
    onBabylonLoaded() {
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = '../../../js/babylon/babylon.gui.min.js'
      document.head.appendChild(script)
      script.addEventListener('load', this.startBabylonPlot)
      this.startBabylonPlot
    },
    startBabylonPlot() {
      //BABYLON.GUI = GUI
      console.log(BABYLON)
      console.log(GUI)
      console.log(Lorenz)

      let canvas = document.getElementById('lorenzCanvas')
      Lorenz.engine = new BABYLON.Engine(canvas, true)
      Lorenz.scene = Lorenz.createScene(Lorenz.engine, canvas)
      Lorenz.createParticles()
      Lorenz.updateAttractor()
      Lorenz.makeControls()
      Lorenz.scene.registerBeforeRender(function() {
        Lorenz.butterflies.setParticles()
        //console.log('running')
      })
      Lorenz.butterflies.addPoints(10000)
      Lorenz.butterflies.initParticles(function() {
        // console.log('this inside this.butterflies', this)
        for (let p = 0; p < Lorenz.butterflies.nbParticles; p++) {
          Lorenz.butterflies.particles[p].position = new BABYLON.Vector3(
            Math.random() * 200,
            Math.random() * 200,
            Math.random() * 200
          )

          Lorenz.butterflies.particles[p].color = new BABYLON.Color4(
            8 / 255,
            170 / 255,
            245 / 255,
            0.6
          )
        }
      })
      Lorenz.butterflies.initParticles()
      console.log('butterflies=', Lorenz.butterflies)

      Lorenz.engine.runRenderLoop(function() {
        //console.log('this.engine')
        Lorenz.scene.render()
        let route = window.location.pathname
        // let p = navigationType()
        // console.log(p)
        if (route !== '/lorenz2') {
          Lorenz.engine.stopRenderLoop()
        }
      })
      //Lorenz.engine.runRenderLoop()
    }
  },
  updated() {
    this.startBabylonPlot()
  },

  data() {
    return {
      //   p5plot: null,
      //   startChart: true,
      //   startChart2: false
    }
  },

  head() {
    return {
      title: 'página dydx da UFES',
      meta: [
        {
          hid: 'description index.vue',
          name: 'Pagina inicial',
          content: 'Pagina inicial www.dydx.ufes.br do DMAT/UFES'
        }
      ]
    }
  }
}
</script>

<style scoped>
:root {
  --mjx-green: white; /* #2e7d32; /* #2e7d32; /* light-green darken-3 */
  /*  #004b07; /* #33691e;*/
  /* background-color: black; */
}

.ColorWheat {
  --mjx-green: #fff9c4; /* yellow lighten-4 */
  /* wheat; */
}

.mathjax {
  font-size: 20px;
}

#lorenzCanvas {
  width: 100%;
  height: 100%;
  touch-action: none;
  margin: 0px;
  padding: 0px;
}
</style>
