import {
  getDataSurface,
  layout,
  options
} from '@/static/js/Plotly/plotly-config.js'

export function volterraContours() {
  const a = 5.3
  const b = 0.12
  const c = 4.9
  const d = 0.14

  const a1 = 3.6
  const b1 = 0.12
  const c1 = 7.5
  const d1 = 0.14

  let xwidth = 160
  let ywidth = 160
  let xsteps = 40
  let ysteps = 40
  let center = { x: 0, y: 0 }

  function funct(x, y) {
    return -c * Math.log(x) + d * x - a * Math.log(y) + b * y + 46
  }

  function funct_1(x, y) {
    return -c1 * Math.log(x) + d1 * x - a1 * Math.log(y) + b1 * y + 46
  }

  let data = getDataSurface(funct, center, xwidth, ywidth, xsteps, ysteps)

  data.type = 'contour'
  let layout0 = Object.assign({}, layout)

  layout0.width = 500
  layout0.height = 500 /* set size of plot */
  layout0.dragmode = false
  data.colorscale = 'Earth'
  layout0.title =
    '$\\color{green}{V(x,y)=0.14\\, x - 4.9\\, \\ln(x) +0.12\\, y-5.3\\, \\ln(y)}$'

  // data.contours.z.start = -10 /* set manually because zMax=Infinity */
  // data.contours.z.end = 50
  // data.contours.z.size = 0.5
  data.visible = true
  data.autocontour = true /* contours attrib picked by algorithm, ncontours = contours levels */
  data.ncontours = 30
  data.line = {
    smoothing: 1,
    width: 1,
    color: 'green'
  }
  data.contours.coloring = 'lines'

  function funct_1(x, y) {
    return -c1 * Math.log(x) + d1 * x - a1 * Math.log(y) + b1 * y + 46
  }

  let data1 = getDataSurface(funct_1, center, xwidth, ywidth, xsteps, ysteps)
  data1.type = 'contour'
  data1.visible = false
  data1.autocontour = true /* contours attrib picked by algorithm, ncontours = contours levels */
  data1.ncontours = 40
  /* start - end-size not requiere when ncountours set */
  data1.line = {
    smoothing: 1,
    width: 1,
    color: 'brown'
  }
  data1.colorscale = 'Rainbow' //'RdBu'
  data1.contours.coloring = 'lines'

  let annotations1 = [
    {
      text: 'Sem pesca',
      ax: 50, //tail of arrow
      ay: -70,
      ayref: 'pixel', // refers to axes
      axref: 'pixel',
      arrowcolor: 'black',
      font: {
        size: 18,
        color: 'black'
      },
      x: c / d,
      y: a / b // head af arrow
    }
  ]
  let annotations2 = [
    {
      text: 'Com pesca',
      ax: 60, //tail of arrow
      ay: -50,
      ayref: 'pixel', // refers to axes
      axref: 'pixel',
      arrowcolor: 'black',
      font: {
        size: 18,
        color: 'black'
      },
      x: c1 / d1,
      y: a1 / b1 // head af arrow
    }
  ]

  let shapes2 = [
    {
      type: 'line',
      x0: c1 / d1,
      y0: 0,
      x1: c1 / d1,
      y1: 140,
      line: {
        color: 'Green',
        width: 2.5
      }
    },
    {
      type: 'line',
      x0: 0,
      y0: a1 / b1,
      x1: 140,
      y1: a1 / b1,
      line: {
        color: 'Green',
        width: 2.5
      }
    }
  ]

  let shapes1 = [
    {
      type: 'line',
      x0: c / d,
      y0: 0,
      x1: c / d,
      y1: 140,
      line: {
        color: 'olive',
        width: 2.5
      }
    },
    {
      type: 'line',
      x0: 0,
      y0: a / b,
      x1: 140,
      y1: a / b,
      line: {
        color: 'olive',
        width: 2.5
      }
    }
  ]
  let shapes3 = [
    {
      type: 'line',
      x0: c / d,
      y0: 0,
      x1: c / d,
      y1: 140,
      line: {
        color: 'olive',
        width: 2.5
      },
      opacity: 0.4
    },
    {
      type: 'line',
      x0: 0,
      y0: a / b,
      x1: 140,
      y1: a / b,
      line: {
        color: 'olive',
        width: 2.5
      },
      opacity: 0.4
    }
  ]
  layout0.xaxis = {
    tickmode: 'array',
    tickvals: [0, c / d, c1 / d1, 140],
    ticktext: ['0', 'c/d', "c'/d", '140'],
    title: 'Atuns',
    titlefont: {
      family: 'Arial, sans-serif',
      size: 18,
      color: 'Blue'
    }
  }
  layout0.yaxis = {
    tickmode: 'array',
    tickvals: [0, a / b, a1 / b1, 140],
    ticktext: ['0', 'a/b', "a'/b", '140'],
    title: 'Tubarões',
    titlefont: {
      family: 'Arial, sans-serif',
      size: 18,
      color: 'Blue'
    }
  }
  layout0.images = [
    {
      source: '../../figures/atun1.png',
      xref: 'paper',
      yref: 'paper',
      x: 0.66,
      y: -0.15,
      sizex: 0.2,
      sizey: 0.2,
      xanchor: 'left',
      yanchor: 'bottom'
    },
    {
      source: '../../figures/shark1.png',
      xref: 'paper',
      yref: 'paper',
      x: 0,
      y: 0.7,
      sizex: 0.2,
      sizey: 0.2,
      xanchor: 'right',
      yanchor: 'bottom'
    }
  ]
  layout0.annotations = annotations1
  layout0.shapes = shapes1

  layout0.title =
    "<span style = 'font-family: lucida Console; color: brown;'>Soluções com/sem pesca</span>"

  layout0.updatemenus = [
    {
      buttons: [
        {
          method: 'update',
          args: [
            { visible: [true, false], opacity: 1 },
            {
              annotations: annotations1,
              shapes: shapes1
            }
          ],
          label: 'Sem pesca'
        },

        {
          method: 'update',
          args: [
            { visible: [true, true], opacity: [0.5, 1] },
            {
              annotations: [...annotations2],
              shapes: [...shapes3, ...shapes2]
            }
          ],
          label: 'Com pesca'
        }
      ],
      direction: 'bottom',
      pad: {
        r: 10,
        t: 10
      },
      showactive: true,
      // bgcolor: 'lightgrey',
      type: 'buttons',
      x: 0.76,
      xanchor: 'left',
      y: 0.92,
      yanchor: 'top',
      font: {
        size: 14,
        color: 'brown'
      }
    }
  ]

  return {
    data: [data, data1] /* data use in the plot */,
    layout: layout0,
    options
  }
} // end function
