<template>
  <div style="width:100%">
    <!-- <div class="text-center"> -->
    <v-dialog v-model="startChart2" width="600">
      <template v-slot:activator="{ on }">
        <v-btn color="red lighten-2" dark v-on="on">
          Gráfico da Função
        </v-btn>
      </template>

      <v-card>
        <v-card-actions>
          <client-only placeholder="carregando..." class="figure">
            <line-chart
              v-if="startChart2"
              :chartdata="chartData"
              :options="chartOptions"
            />
          </client-only>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="startChart2 = false">
            Voltar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- </div> -->

    <v-container style="width:100%" fluid>
      <v-row wrap>
        <v-col
          sm="12"
          md="8"
          style="position: relative; height:100%; width:100%"
        >
          <client-only placeholder="carregando...">
            <div class="chart-container">
              <line-chart :chartdata="chartData" :options="chartOptions" />
            </div>
          </client-only>
        </v-col>
        <v-col
          sm="12"
          md="4"
          style="position: relative; height:100%; width:100%"
        >
          <v-card style="width:100%" class="green lighten-4">
            <v-card-title class="blue lighten-4 font-weight-bold"
              >Exercício:</v-card-title
            >
            <v-card-text id="mathjax">
              Resolva o problema de valor inicial $$\color{green} {\frac{dy}{dx}
              = \frac{1+ 3x^2}{3y^2-6y}, \quad y(0) =1 }$$ TEXTO EM MAIÚSCULAS
              COM ROCK-SALT Nesse período temos escrito em portugués para não
              crer mais em cocô.... Lorem ipsum dolor
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-btn @click="startChart = !startChart"> Toggle/Figura </v-btn>
    <v-divider />
  </div>
</template>

<script>
export default {
  data() {
    return {
      startChart: true,
      startChart2: false,

      chartData: {
        labels: ['0', '0.25', '0.5', '0.75', '1'],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: 'Green',
            borderColor: 'Blue',
            lineTension: 0.4,
            borderWidth: 1,
            data: [40, 25, 67, 33, 46],
            fill: false
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },

  updated() {},
  mounted() {
    //this.startChart = true
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'mathjax'])
  },
  methods: {},
  head() {
    return {
      title: 'About page',
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
          defer: true, //&delayStartupUntil=configured
          id: 'MathJaxScript',
          src:
            'https://cdn.jsdelivr.net/npm/mathjax@2/MathJax.js?config=TeX-AMS-MML_SVG'
        }
      ]
    }
  }
}
</script>
<style scoped>
#mathjax {
  /* font-family: 'Comic Sans MS', cursive, sans-serif; */
  font-family: 'Neucha', cursive;
  /* font-family: 'Montserrat', sans-serif; */
  font-size: 22px;
  font-weight: 700;
}
</style>
