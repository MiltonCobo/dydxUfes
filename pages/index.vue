<template>
  <div>
    <v-btn color="primary" text @click="startPlot">
      Veja o atrator de Lorenz!
    </v-btn>
    <div id="figure" ref="p5figure"></div>

    <v-spacer />

    <v-btn @click.stop="startChart = !startChart">
      Gráfico da superfície
    </v-btn>

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
              <!-- <client-only> MathJax CONFLICT!!!-->
              Seja $\color{lightgreen}{f(x)}$ uma função dada por
              $\color{lightblue}{f(x) = \int_{0}^\infty \Psi(t,x) dt}$ considere
              que não existe uma pessoa localmente igual a água de côco. Mostre
              que podemos reduzir tudo isto a bobagem. $ \color{blue} {\cos(x)^2
              = 3 \e^{2} \R } $ \( \log(x) \e \RR \) Lorem ipsum $${\bf R} \e
              \R$$ dolor sit amet, \(\mathbb{Q}\) ESTE TEXTO EM MAIÚSCULAS NÃO
              IMPORTA. Quo officia, cumque \( \color{green} {\int g(\cos(t)) dt
              } \) dolorem at atque molestiae? $$\color{brown}{\int_0^\infty
              f(\xi) d\xi = \log(1+x^2)}.$$
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
  </div>
</template>

<script>
import lorenz from '@/static/js/p5/lorenzp5.js'
import getDataSurface from '@/static/js/Plotly/plotly-config.js'

export default {
  data() {
    let xwidth = 10
    let ywidth = 10
    let xcenter = xwidth / 2
    let ycenter = (ywidth - 2) / 2
    var ysteps = 28
    var xsteps = 28
    let center = {
      x: xcenter,
      y: ycenter
    }

    function funct(x, y) {
      return y * y - 2 * y - x * x * x - 2 * x * x - 2 * x
    }

    let info = getDataSurface(funct, center, xwidth, ywidth, xsteps, ysteps)
    let data = info.data
    let layout = info.layout
    let options = info.options

    data.type = 'surface' /* contour ...*/
    layout.width = 600
    layout.height = 600 /* set size of plot */

    return {
      p5plot: null,
      startChart: true,
      startChart2: false,

      data: [data] /* data use in the plot */,
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
      title: 'página dydx da UFES',
      meta: [
        {
          hid: 'description index.vue',
          name: 'Pagina inicial',
          content: 'Pagina inicial www.dydx.ufes.br do DMAT/UFES'
        }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: 'stylesheet',
          href:
            'https://fonts.googleapis.com/css2?family=Rock+Salt&display=swap'
        }
      ],
      script: [
        {
          type: 'text/javascript',
          src: '/js/p5/p5.min.js',
          // src: 'https://cdn.jsdelivr.net/npm/p5@1.0.0/lib/p5.js',
          async: false,
          defer: false
        },
        {
          type: 'text/javascript',
          src: '/js/p5/p5.dom.min.js',
          // src: 'https://cdn.jsdelivr.net/npm/p5@1.0.0/lib/p5.js',
          async: false,
          defer: false
        }
      ]
    }
  }
}
</script>

<style scoped>
#mathjax {
  font-family: 'Rock Salt', cursive;

  /* font-family: 'Palatino Linotype', 'Book Antiqua', Palatino, serif; */
  /* font-family: 'Montserrat', sans-serif; */
  /* font-family: 'Neucha', cursive; */
  font-size: 20px;
  font-weight: 700;
}
</style>
