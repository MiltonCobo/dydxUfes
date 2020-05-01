export function getDataLineChartjs(funct, xinitial, xwidth, step) {
  let xArray = []
  let yArray = []

  let xaxisStep = xwidth / step

  for (let i = 0; i < xaxisStep; i++) {
    let x = step * i + xinitial
    xArray.push(x)
    let value = funct.apply(this, [x])
    yArray.push(value)
  }

  return yArray
}

export let options = {
  responsive: true,
  maintainAspectRatio: true,
  aspectRatio: 1,
  title: {
    display: true,
    fontSize: 22,
    fontColor: 'blue',
    text: '',
    fontFamily: 'Lucide Console'
  },
  legend: {
    display: true,
    position: 'bottom',
    labels: {
      // boxWidth: 10,
      // filter: function(legendItem, data) {
      //   return legendItem.datasetIndex % 4 == 1
      //}
    }
  },
  animation: {
    duration: 250 * 1.5,
    easing: 'easeInOutBounce' // 'easeInElastic', //'easeInSine', //'easeInOutQuad'
  }
  // scales: {
  //   yAxes: [
  //     {
  //       ticks: {
  //         max: 60,
  //         min: -60,
  //         stepSize: 10,
  //         type: 'linear'
  //       }
  //     }
  //   ],
  //   xAxes: [
  //     {
  //       ticks: {
  //         max: 50,
  //         min: 0,
  //         stepSize: 5,
  //         maxTicksLimit: 10,
  //         type: 'linear',
  //         autoSkip: true
  //       }
  //     }
  //   ]
  // }
}
