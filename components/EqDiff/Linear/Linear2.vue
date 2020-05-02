<template>
  <v-sheet id="mathjax">
    <v-container>
      <v-row>
        <Qlinear2 />
      </v-row>
      <v-spacer />
      <v-row style="margin-top:0.5cm;">
        <v-btn
          absolute
          right
          @click.stop="openFigure = true"
          color="green lighten-2"
        >
          Gráfico das soluções
        </v-btn>
      </v-row>

      <v-spacer />
      <v-row style="margin-top:1cm;">
        <Slinear2 />
      </v-row>

      <v-spacer />

      <v-dialog
        v-model="openFigure"
        max-width="600"
        style="background-color:lightgrey;"
      >
        <v-card>
          <v-card-actions>
            <client-only>
              <line-chart :chartdata="data" :options="options" />
            </client-only>
            <v-card-text id="mathjax" style="font-family: Lucida Console;">
              Ao lado as soluções ...note que para $$a=-0.8$$ a soluções
              permanecem limitadas.
              <v-btn class="green lighten-2" text @click="openFigure = false">
                Voltar
              </v-btn>
            </v-card-text>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </v-sheet>
</template>

<script>
import { getDataLineChartjs, options } from '@/static/js/Chartjs/Functions.js'
import Qlinear2 from '@/components/EqDiff/Linear/Textos/Qlinear2'
import Slinear2 from '@/components/EqDiff/Linear/Textos/Slinear2'

let info = createDataSets()

let data = {
  labels: info.xlabels,
  datasets: info.datasets
}
export default {
  data() {
    return {
      openFigure: true,
      data,
      options // has been modified below from original
    }
  },
  name: 'Text1',
  mounted() {
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'mathjax'])
  },
  components: {
    Qlinear2,
    Slinear2
  },
  head() {
    return {
      title: 'Eq. Diferenciais Lineares',
      meta: [
        {
          hid: 'Eq. Diferenciais Lineares',
          name: 'Eq. Diferenciais Lineares',
          content: 'q. Diferenciais Lineares'
        }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: 'stylesheet',
          href:
            'https://fonts.googleapis.com/css2?family=Rock+Salt&display=swap'
        }
      ]
    }
  }
}

options.legend.labels = {
  // para aparecerem apenas 5 legendas
  boxWidth: 10, // reduce tamanho da cor
  filter: function(legendItem, data) {
    return legendItem.datasetIndex % 4 == 1
  }
}

options.scales = {
  yAxes: [
    {
      ticks: {
        max: 60,
        min: -60,
        stepSize: 10,
        type: 'linear'
      }
    }
  ],
  xAxes: [
    {
      ticks: {
        max: 50,
        min: 0,
        stepSize: 5,
        maxTicksLimit: 10,
        type: 'linear'
        // autoSkip: true
      }
    }
  ]
}
function createDataSets() {
  const xwidth = 50.5
  const step = 0.5
  const xinitial = 0
  const N = 10 // half of all traces
  const inc = 0.0005
  let a = -4 / 5 - N * inc
  const xaxisStep = xwidth / step

  function funct(x) {
    return (
      Math.sin(x) * (8 / 5) -
      (4 / 5) * Math.cos(x) +
      (a + 4 / 5) * Math.exp(x / 2)
    )
  }

  let params = []
  let yValues = []

  for (let i = 0; i < 2 * N - 1; i++) {
    a = a + inc
    params.push(a)
    yValues[i] = getDataLineChartjs(funct, xinitial, xwidth, step)
  }

  // labels -----//
  let xlabels = []
  for (let i = 0; i < xaxisStep; i++) {
    let x = step * i + xinitial
    xlabels.push(x)
  }

  let colors = []

  // for (let i = 0; i < 2 * N - 1; i++) {
  //   colors[i] = getRandomColor()
  // }

  let datasets = []

  let labels = params.map(x => x.toFixed(3).toString())
  for (let i = 0; i < 2 * N - 1; i++) {
    datasets[i] = {
      label: 'a=' + labels[i],
      data: yValues[i],
      borderWidth: 2,
      borderColor: '#' + (((1 << 24) * Math.random()) | 0).toString(16), //colors[i],
      pointRadius: 0,
      pointHitRadius: 0,
      fill: false
    }
  }
  return { xlabels: xlabels, datasets: datasets }
}

// function getRandomColor() {
//   let letters = '0123456789ABCDEF'.split('')
//   let color = '#'
//   for (let i = 0; i < 6; i++) {
//     color += letters[Math.floor(Math.random() * 16)]
//   }
//   return color
// }
</script>

<style scoped>
#mathjax {
  font-size: 18px;
  /* font-family: 'Montserrat', sans-serif; */
  /* font-family: 'Neucha', cursive; */
  font-family: Lucida Console;
  /* font-family: 'Rock Salt', cursive; */
  font-weight: 700;
  line-height: 1.2;
}

p {
  font-size: 15px;
  font-family: Lucida Console;
  /* font-weight: 700; */
  line-height: 1.2;
  /* font-family: 'Rock Salt', cursive; */
}
</style>
