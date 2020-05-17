import {
  getDataScatter,
  //layout,
  options
} from '@/static/js/Plotly/plotly-config.js'

export function drawLinear3() {
  let xwidth = 4
  let step = 0.05
  let xinitial = 0

  function funct(x) {
    return 12 - 2 * x - 8 * Math.sqrt(Math.E) * Math.exp(-x / 4)
  }

  function assintota(x) {
    return 12 - 2 * x
  }

  let dat1 = getDataScatter(funct, xinitial, xwidth, step)

  let data1 = {
    x: dat1.x,
    y: dat1.y,
    line: {
      smoothing: 1.2,
      width: 1.2,
      color: 'green',
      opacity: 1
    }
  }

  xwidth = 20
  step = 0.01
  xinitial = 0

  let dat2 = getDataScatter(funct, xinitial, xwidth, step)

  let data2 = {
    visible: false,
    x: dat2.x,
    y: dat2.y,
    line: {
      smoothing: 1.2,
      width: 1.2,
      color: 'green',
      opacity: 1
    }
  }

  let dat3 = getDataScatter(assintota, xinitial, xwidth, step)
  let data3 = {
    visible: false,
    x: dat3.x,
    y: dat3.y,
    line: {
      smoothing: 1.2,
      shape: 'spline',
      width: 1.4,
      color: 'black',
      opacity: 1
    }
  }

  let annotations1 = [
    {
      text: '$ y= 12- 2t $',
      ax: 100,
      ay: -60,
      xref: 'pixel',
      yref: 'pixel',
      arrowcolor: 'black',
      font: {
        size: 15,
        color: 'black'
      },
      x: 5,
      y: 2
    }
  ]

  let annotations0 = [
    {
      text: '$ t_0=2 $',
      xref: 'pixel',
      yref: 'pixel',
      showarrow: false,
      font: {
        size: 14,
        color: 'green'
      },
      x: 1.96,
      y: 0.04
    },
    {
      text: '$y_0=12-8\\sqrt{\\e}$',
      xref: 'pixel',
      yref: 'pixel',
      showarrow: false,
      xanchor: 'left',
      font: {
        size: 14,
        color: 'green'
      },
      x: 0.05,
      y: -1.18
    }
  ]

  let layout = {
    paper_bgcolor: 'gainsboro',
    plot_bgcolor: 'gainsboro',
    annotations: annotations0,
    updatemenus: [
      {
        buttons: [
          {
            method: 'update',
            args: [
              { visible: [true, false, false], opacity: [1, 0, 0] },
              {
                annotations: annotations0
              }
            ],
            label: 'Tangência'
          },
          {
            method: 'update',
            args: [
              { visible: [false, true, true], opacity: [0, 1, 1] },
              {
                annotations: annotations1
              }
            ],
            label: 'Mostrar assíntota'
          }
        ],
        direction: 'bottom',
        pad: {
          r: 10,
          t: 10
        },
        showactive: true,
        type: 'buttons',
        x: 0.7,
        xanchor: 'left',
        y: 0.63,
        yanchor: 'top',
        font: {
          size: 14,
          color: 'brown'
        }
      }
    ],
    xaxis: {
      title: 't',
      titlefont: { size: 14, color: 'brown' },
      tickfont: { size: 12, color: 'blue' }
    },
    yaxis: {
      title: 'y(t)',
      titlefont: { size: 14, color: 'brown' },
      // side : 'right',
      // tickvals: [0, -1.18, 12, -20],
      // ticktext: ['0', '$12-8\\sqrt{\\e}$', '12', '-20'],
      tickfont: { size: 12, color: 'blue' }
    },

    title:
      '$\\color{brown}{ y(t)=12 - 2t -\\color{green}{8\\sqrt{e}}\\,\\exp(-t/4)  }$',

    showlegend: false,
    hovermode: false,
    autosize: false,
    dragmode: false,
    displaylogo: false,
    showLink: false,
    width: 600,
    height: 600
  }

  return { data: [data1, data2, data3], layout, options }
}
