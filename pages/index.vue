<template>
  <div>
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
              $ \color{blue} {\cos(x)^2 = 3 \e^{2} \R } $ \( \log(x) \e \RR \)
              Lorem ipsum $${\bf R} \e \R$$ dolor sit amet, \(\mathbb{Q}\)
              consectetur adipisicing elit. Quo officia, cumque \( \color{green}
              {\int g(\cos(t)) dt } \) dolorem at atque molestiae?
              $$\color{brown}{\int_0^\infty f(\xi) d\xi = \log(1+x^2)}.$$
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <div>$$ \sin(x) $$</div>
    <div id="figure" ref="p5figure" style="width:600px; height:600px"></div>
    <!-- mathjax dont typeset here style="background-color: black;" -->
  </div>
</template>

<script>
import lorenz from '@/static/js/lorenzp5.js'
import goldenRatio from '@/static/js/goldenRatio.js'

// import p5 from '@/static/js/p5.min.js'
//import Plotly from 'plotly.js-dist'

export default {
  //components: { 'vue-plotly': () => import('@/plugins/vue-plotly.js') },
  data() {
    let trace1 = {
      x: [1, 2, 3, 4],
      y: [10, 15, 13, 17],
      type: 'scatter'
    }
    let trace2 = {
      x: [1, 2, 3, 4],
      y: [10, 15, 13, 17],
      type: 'scatter'
    }
    let data = [trace1, trace2]

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
        width: 400,
        height: 400
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
    //this.loadMathJaxConf()
    MathJax.Hub.Queue(['Typeset', window.MathJax.Hub, 'mathjax'])
  },

  updated() {
    //this.startPlot()
  },

  methods: {
    loadMathJaxConf() {
      let config = document.getElementById('MathJaxConfig')
      if (config !== undefined) {
        let script = document.createElement('script')
        let mathjaxNode = document.getElementById('MathJaxScript')
        console.log(mathjaxNode)
        script.src = 'js/config-mathjax2.js'
        script.async = false
        script.defer = false
        script.id = 'MathJaxConfig'
        document.head.insertBefore(script, mathjaxNode)
      }
    },
    startPlot() {
      let divFigure = this.$refs.p5figure
      this.p5plot = new p5(goldenRatio, divFigure)
      // this.p5plot.remove()
      // console.log('startChart2=', this.startChart)
      // console.log(window.MathJax)
      // window.MathJax.typeset()
      //this.startChart = true
    }
  },
  head() {
    return {
      title: 'Minha pagina UFES',
      script: [
        {
          type: 'text/javascript',
          src: '/js/p5.min.js',
          // src: 'https://cdn.jsdelivr.net/npm/p5@1.0.0/lib/p5.js',
          async: false,
          defer: true
        }
        // {
        //   type: 'text/javascript',
        //   async: true,
        //   defer: true,
        //   src:
        //     'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-AMS-MML_SVG'
        // }
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
