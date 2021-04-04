import {
  getDataScatter,
  //layout,
  options
} from '@/static/js/Plotly/plotly-config.js'

export function drawLinear3() {
  let xwidth = 4
  let step = 0.05
  let xinitial = 0

  let body = document.getElementsByTagName('body')[0]
  let clientWidth = body.clientWidth // save initial values of width,height
  let clientHeight = body.clientHeight

  let size = Math.min(clientWidth, clientHeight)

  function funct(x) {
    return 12 - 2 * x - 8 * Math.sqrt(Math.E) * Math.exp(-x / 4)
  }

  let data1 = getDataScatter(funct, xinitial, xwidth, step)

  xwidth = 20
  step = 0.01
  xinitial = 0

  let data2 = getDataScatter(funct, xinitial, xwidth, step)
  data2.visible = false // important

  let shapes = [
    {
      type: 'line',
      x0: 0,
      y0: 12,
      x1: 20,
      y1: -28,
      line: {
        color: 'red',
        width: 2
      }
    }
  ]

  let annotations1 = [
    {
      text: '$ y= 12- 2t $',
      ax: 100,
      ay: -60,
      axref: 'pixel',
      ayref: 'pixel',
      arrowcolor: 'red',
      font: {
        color: 'brown'
      },
      x: 5,
      y: 2
    }
  ]

  let annotations0 = [
    {
      text: '$ t_0=2 $',
      axref: 'pixel',
      ayref: 'pixel',
      showarrow: false,
      font: {
        color: 'green'
      },
      x: 1.96,
      y: 0.04
    },
    {
      text: '$y_0=12-8\\sqrt{\\e}$',
      axref: 'pixel',
      ayref: 'pixel',
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
              {
                visible: [true, false],
                opacity: 1
              },
              {
                annotations: annotations0,
                shapes: []
              }
            ],
            label: 'Tangência'
          },
          {
            method: 'update',
            args: [
              { visible: [false, true], opacity: 1 },
              {
                annotations: annotations1,
                shapes: shapes
              }
            ],
            label: 'Assíntota'
          }
        ],
        direction: 'right',
        pad: {
          r: 0,
          t: 0
        },
        font: { size: 14, color: 'brown' },
        showactive: true,
        type: 'buttons',
        x: 0.01,
        xanchor: 'left',
        y: -0.2,
        yanchor: 'right'
      }
    ],
    xaxis: {
      autorange: true,
      title: 't',
      titlefont: { color: 'brown' },
      tickfont: { size: 12, color: 'blue' }
    },
    yaxis: {
      autorange: true,
      title: 'y(t)',
      titlefont: { size: 14, color: 'brown' },
      // side : 'right',
      // tickvals: [0, -1.18, 12, -20],
      // ticktext: ['0', '$12-8\\sqrt{\\e}$', '12', '-20'],
      tickfont: { size: 12, color: 'blue' }
    },

    // title:
    //   '$\\color{brown}{ y(t)=12 - 2t -\\color{green}{8\\sqrt{e}}\\,\\exp(-t/4)  }$',

    showlegend: false,
    hovermode: false,
    autosize: false,
    width: Math.min(size, 600),
    height: Math.min(size, 600),
    dragmode: false,
    displaylogo: false,
    showLink: false
  }

  return { data: [data1, data2], layout, options }
}
