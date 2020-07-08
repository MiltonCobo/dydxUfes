<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <h1 style="color: salmon;" align="center">
          O Atrator de Lorenz
        </h1>
        <v-divider style="margin-bottom:0.5%;" />
      </v-col>
    </v-row>
    <v-row>
      <v-col xs="12" align="center">
        <canvas id="lorenzCanvas"></canvas>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import lorenzPlot from '@/static/js/babylon/lorenzPlot.js'

export default {
  layout: 'darkTheme',
  created() {},
  mounted() {
    // let script = document.createElement('script')
    // script.type = 'text/javascript'
    // script.src = '../../../js/babylon/babylon.max.js'
    // document.head.appendChild(script)
    // script.onload = console.log('load babylon')

    let script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = '../../../js/babylon/babylon.gui.min.js'
    document.head.appendChild(script)
    script.onload = console.log('load GUI')

    this.startBabylonPlot()

    // script.onload = () => {
    //   this.startBabylonPlot
    //   console.log('load GUI')
    // }
    //script.addEventListener('load', this.updated) //this.startBabylonPlot)
  },
  destroyed() {},

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
      lorenzPlot()
    }
  },
  updated() {
    this.startBabylonPlot()
    //MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'mathjax'])
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
      ],
      link: []
      //   script: [
      //     {
      //       type: 'text/javascript',
      //       src: 'https://preview.babylonjs.com/babylon.js"',
      //       sync: false,
      //       defer: false
      //     },
      //     {
      //       type: 'text/javascript',
      //       src: 'https://preview.babylonjs.com/gui/babylon.gui.min.js',
      //       async: false,
      //       defer: false
      //     }
      //   ]
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
}
</style>
