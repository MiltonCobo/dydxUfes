<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <client-only placeholder="carregando...">
            <vue-plotly
              v-if="startChart"
              :data="data"
              :layout="layout"
              :options="options"
            />
          </client-only>
        </v-col>
        <v-col>
          <v-btn @click="startChart = !startChart" class="primary">
            Figura
          </v-btn>
        </v-col>
        <v-col cols="12">
          <v-card style="width:100%;">
            <v-card-title>
              <!--class="green--text lighten-4" -->
              Exercicio:
            </v-card-title>
            <v-divider />
            <v-card-text style="width:100%;" id="mathjax">
              <!-- <client-only> -->
              $ \color{blue} {\cos(x)^2 = 3 \e^{2} \R } $ \( \log(x) \e \RR \)
              Lorem ipsum $${\bf R} \e \R$$ dolor sit amet, \(\mathbb{Q}\)
              consectetur adipisicing elit. Quo officia, cumque \( \color{green}
              {\int g(\cos(t)) dt } \) dolorem at atque molestiae?
              $$\color{brown}{\int_0^\infty f(\xi) d\xi = \log(1+x^2)}.$$
              <!-- </client-only> -->
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <!-- <client-only>  -->
    <div>$$ \sin(x) $$</div>
    <!-- </client-only> -->
    <!--mathjax dont typeset-->

    <v-btn color="primary" text @click="startPlot">
      Lorenz!
    </v-btn>
    <div id="figure" ref="p5figure"></div>

    <!-- <v-spacer /> -->
  </div>
</template>

<script>
import lorenz from '@/static/js/p5/lorenzp5.js'
import {
  getDataSurface,
  layout,
  options
} from '@/static/js/Plotly/plotly-config.js'
//import getDataSurface from '@/static/js/drawSurface.js'
// import p5 from '@/static/js/p5.min.js'
//import Plotly from 'plotly.js-dist'

export default {
  data() {
    let xwidth = 6
    let ywidth = 10
    let xcenter = xwidth / 2
    let ycenter = (ywidth - 2) / 2
    var ysteps = 30
    var xsteps = 30
    let center = {
      x: xcenter,
      y: ycenter
    }

    function funct(x, y) {
      return y * y - 2 * y - x * x * x - 2 * x * x - 2 * x
    }

    let data = getDataSurface(funct, center, xwidth, ywidth, xsteps, ysteps)

    data.type = 'surface' /* contour ...*/

    return {
      p5plot: null,
      startChart: true,
      startChart2: false,

      data: [data],
      layout,
      options
    }
  },
  created() {},

  mounted() {
    //this.startPlot()
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'mathjax'])
  },

  updated() {},

  methods: {
    startPlot() {
      this.startChart2 = !this.startChart2
      if (this.startChart2) {
        let divFigure = this.$refs.p5figure
        this.p5plot = new p5(lorenz, divFigure)
      } else {
        this.p5plot.remove()
      }
    }
  },
  head() {
    return {
      title: 'Minha pagina UFES',
      script: [
        {
          type: 'text/x-mathjax-config',
          src: 'js/MathJax/mathjax2Config.js',
          async: false,
          defer: false
        },
        {
          type: 'text/javascript',
          async: false,
          defer: false, //&delayStartupUntil=configured
          // id: 'MathJaxScript',
          src:
            'https://cdn.jsdelivr.net/npm/mathjax@2.7.8/MathJax.js?config=TeX-MML-AM_CHTML' //TeX-AMS-MML_SVG&delayStartupUntil=onLoad'
          //'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.8/MathJax.js?config=TeX-AMS-MML_SVG' //&delayStartupUntil=onload'
          //'https://cdn.jsdelivr.net/npm/mathjax@2/MathJax.js?config=TeX-AMS-MML_SVG'
          //'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.8/MathJax.js?config=TeX-AMS-MML_SVG'
        },
        {
          type: 'text/javascript',
          src: '/js/p5/p5.min.js',
          // src: 'https://cdn.jsdelivr.net/npm/p5@1.0.0/lib/p5.js',
          async: false,
          defer: true
        },
        {
          type: 'text/javascript',
          src: '/js/p5/p5.dom.min.js',
          // src: 'https://cdn.jsdelivr.net/npm/p5@1.0.0/lib/p5.js',
          async: false,
          defer: true
        }
      ]
    }
  }
}
</script>

<style scoped>
#mathjax {
  font-family: 'Neucha', cursive;
  font-size: 22px;
}
</style>
