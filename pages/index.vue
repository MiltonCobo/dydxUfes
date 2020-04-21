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
              $ \color{blue} {\cos(x)^2 = 3 } $ \( \e \R \) Lorem ipsum dolor
              sit amet, $\Q$ consectetur adipisicing elit. Quo officia, cumque
              $\color{green} {\int g(\cos(t)) dt }$ dolorem at atque molestiae?
              $$\color{brown}{\int_0^\infty f(\xi) d\xi = \log(1+x^2)}.$$
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <div id="figure">$$ \sin(x) $$</div>
    <!-- mathjax dont typeset here -->
  </div>
</template>

<script>
//import VuePlotly from '@/plugins/vue-plotly.js'
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
  mounted() {
    //this.startPlot()
    console.log('passou no mounted')
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'mathjax'])
  },
  created() {},

  updated() {
    //this.startPlot()
  },

  methods: {
    startPlot() {
      // console.log('startChart=', this.startChart)
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
        // {
        //   src: 'js/config-mathjax2.js',
        //   async: false,
        //   defer: true
        // },
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
