<template>
  <div ref="index0">
    <div class="text-center">
      <v-dialog v-model="startChart2" width="500">
        <template v-slot:activator="{ on }">
          <v-btn color="red lighten-2" dark v-on="on">
            Figura
          </v-btn>
        </template>

        <v-card>
          <v-card-actions>
            <client-only placeholder="carregando..." class="figure">
              <vue-plotly
                v-if="startChart2"
                :data="data"
                :layout="layout"
                :options="options"
              />
            </client-only>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="startChart2 = false">
              Voltar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>

    <v-container>
      <v-row>
        <v-col cols="12">
          <client-only placeholder="carregando..." class="figure">
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

    <div style="background-color: black width:400px; height:400px">
      <div
        style="width:100%; height:100%;background-color:inherit;"
        id="figure"
        ref="p5figure"
      ></div>
    </div>
  </div>
</template>

<script>
import lorenz from '@/static/js/lorenzp5.js'
import {
  data as dataConfig,
  getDataSurface
} from '@/static/js/plotly-config.js'
//import getDataSurface from '@/static/js/drawSurface.js'
// import p5 from '@/static/js/p5.min.js'
//import Plotly from 'plotly.js-dist'

export default {
  data() {
    let data = []
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
    let data0 = getDataSurface(funct, center, xwidth, ywidth, xsteps, ysteps)
    dataConfig.x = data0.x
    dataConfig.y = data0.y
    dataConfig.z = data0.z

    data.push(dataConfig) /* put trace1 inside data array */

    return {
      p5plot: null,
      startChart: true,
      startChart2: false,

      data: data,

      layout: {
        title: 'Grafico', //'${\\color{brown} y^2+3y-2x+\\exp(x)= C}$',
        paper_bgcolor: 'lightgrey',
        plot_bgcolor: 'lightgrey',
        showlegend: false,
        hovermode: false,
        dragmode: false,
        autosize: false,
        width: 500,
        height: 500
      },
      options: {
        displayModeBar: true,
        displaylogo: false,
        responsive: true,
        showLink: false,
        modeBarButtonsToRemove: [
          'hoverClosestCartesian',
          'hoverCompareCartesian',
          'toggleSpikelines'
        ]
      }
    }
  },
  created() {},

  mounted() {
    this.startPlot()
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'mathjax'])
  },

  updated() {},

  methods: {
    startPlot() {
      let divFigure = this.$refs.p5figure
      this.p5plot = new p5(lorenz, divFigure)
    }
  },
  head() {
    return {
      title: 'Minha pagina UFES',
      script: [
        {
          type: 'text/x-mathjax-config',
          src: 'js/mathjax2Config.js',
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
          src: '/js/p5.min.js',
          // src: 'https://cdn.jsdelivr.net/npm/p5@1.0.0/lib/p5.js',
          async: false,
          defer: true
        },
        {
          type: 'text/javascript',
          src: '/js/p5.dom.min.js',
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
