import { getDataLineChartjs, options } from '@/static/js/Chartjs/Functions.js'

export function drawLinear2() {
  let newOptions = Object.assign({}, options)
  newOptions.legend.labels = {
    // para aparecerem apenas 5 legendas
    boxWidth: 10, // reduce tamanho da cor
    filter: function(legendItem, data) {
      return legendItem.datasetIndex % 4 == 1
    }
  }

  newOptions.scales = {
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
          max: 40,
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

    //let colors = []

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

  let info = createDataSets()

  let data = {
    labels: info.xlabels,
    datasets: info.datasets
  }

  return { data, options: newOptions }
  // function getRandomColor() {
  //   let letters = '0123456789ABCDEF'.split('')
  //   let color = '#'
  //   for (let i = 0; i < 6; i++) {
  //     color += letters[Math.floor(Math.random() * 16)]
  //   }
  //   return color
  // }
}
