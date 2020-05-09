import {
  getDataSurface,
  //   layout,
  options
} from '@/static/js/Plotly/plotly-config.js'

export function drawSurfaceSep3() {
  let xwidth = 20
  let ywidth = 20
  let xcenter = 15
  let ycenter = 10
  let ysteps = 40
  let xsteps = 40
  let center = {
    x: xcenter,
    y: ycenter
  }

  function funct(x, y) {
    return 3 * y + y * y - 2 * x + Math.exp(x)
  }

  let dat = getDataSurface(funct, center, xwidth, ywidth, xsteps, ysteps)

  let data = {
    x: dat.x,
    y: dat.y,
    z: dat.z,
    type: 'surface',

    showscale: false, // not show colorbar
    colorscale: 'RdBu',
    reversescale: true,
    // ‘Bluered’, ‘Blackbody’,‘Blues’, ‘Earth’, ‘Electric’,
    // ‘Greens’, ‘Greys’, ‘Hot’, ‘Jet’, ‘Picnic’, ‘Portland’,
    // ‘Rainbow’,‘RdBu’, ‘Reds’, ‘Viridis’, ‘YlGnBu’,‘YlOrRd’
    //autocontour: false,
    line: {
      smoothing: 0.85,
      width: 2
    },

    contours: {
      z: {
        show: true,
        start: -2,
        end: 20,
        size: 1,
        color: 'lightbrown', //'olive',
        highlightcolor: 'red',
        highlightwidth: 16,

        project: { z: true }
      },
      y: {
        show: true,
        start: -10,
        end: 10,
        size: 1,
        color: 'lightblue',
        highlightcolor: 'red',
        highlightwidth: 16,
        project: { y: true }
      },
      x: {
        show: true,
        start: -15,
        end: 15,
        size: 1,
        color: 'lightgreen',
        highlightcolor: 'red',
        highlightwidth: 16,
        project: { x: true }
      }
    }
  }

  let layout = {
    scene: {
      xaxis: {
        showlegend: false,
        tickmode: 'linear',
        tick0: 0,
        dtick: 5
      },
      yaxis: {
        tickmode: 'linear',
        tick0: 0,
        dtick: 5
      },
      zaxis: {
        range: [-2, 20]
      }
    },
    title: '$\\color{brown}{z=V(x,y)=y^2+3y-2x+\\exp(x)}$',
    // plot_bgcolor: 'lightgrey',
    // paper_bgcolor: 'lightgrey',
    scene: {
      camera: {
        eye: {
          x: 1,
          y: 0.8,
          z: 0.8
        }
      },
      xaxis: {
        title: 'x',
        tickmode: 'linear',
        tick0: 0,
        dtick: 5
      },
      yaxis: {
        title: 'y',
        tickmode: 'linear',
        tick0: 0,
        dtick: 5
      },
      zaxis: {
        title: 'z',
        range: [-2, 20]
      }
    },
    showlegend: false,
    hovermode: false,
    autosize: true,
    width: 500
    // height: 600
  }

  return { data: [data], layout, options }
} // End

export function drawContoursSep3() {
  let xwidth = 16
  let ywidth = 10
  let xcenter = 12
  let ycenter = 6.5
  let ysteps = 40
  let xsteps = 40
  let center = {
    x: xcenter,
    y: ycenter
  }

  function funct(x, y) {
    return 3 * y + y * y - 2 * x + Math.exp(x)
  }

  let info = getDataSurface(funct, center, xwidth, ywidth, xsteps, ysteps)

  let data = {
    x: info.x,
    y: info.y,
    z: info.z,
    type: 'contour',
    visible: true,
    // xaxis: 'x',
    // yaxis: 'y',
    showscale: false, // not show colorbar
    colorscale: 'Earth',
    // colorscale: 'RdBu',
    // reversescale: true,

    line: {
      smoothing: 1.3,
      shape: 'spline',
      width: 1.2,
      color: 'grey',
      opacity: 0.4
    },

    contours: {
      //coloring: 'none',
      start: -2,
      end: 40,
      size: 1,
      opacity: 1
    }
  }

  let data1 = {
    x: info.x,
    y: info.y,
    z: info.z,
    type: 'contour',
    visible: true,
    // xaxis: 'x2',
    // yaxis: 'y2',
    showscale: false, // not show colorbar
    //colorscale: 'Earth',

    line: {
      smoothing: 1.3,
      shape: 'spline',
      width: 2.2,
      color: 'black',
      opacity: 1
    },

    contours: {
      coloring: 'none',
      start: 1,
      end: 1
      //size: 1,
    }
  }

  let y2 = info.y.map(chang) // data2 so plota mitade da figura...
  function chang(y) {
    if (y <= -1.5) {
      y = -1.5
    }
    return y
  }

  let data2 = {
    x: info.x,
    y: y2,
    z: info.z,
    type: 'contour',
    // xaxis: 'x',
    // yaxis: 'y',
    visible: false,
    showscale: false, // not show colorbar
    //colorscale: 'Earth',

    line: {
      smoothing: 1.3,
      shape: 'spline',
      width: 2.5,
      color: 'red',
      opacity: 1
    },

    contours: {
      coloring: 'none', // important
      start: 1,
      end: 1
    }
  }

  let annotations1 = [
    {
      text: '$y^2+3y-2x + \\e^x = 1$',
      ax: -120, //tail of arrow
      ay: -30,
      ayref: 'pixel', // refers to axes
      axref: 'pixel',
      arrowcolor: 'black',
      font: {
        size: 16,
        color: 'black'
      },
      x: -1.5,
      y: -1.5 // head af arrow
    },
    {
      text: '$(0,0)$',
      ax: -60, //tail of arrow
      ay: -60,
      ayref: 'pixel', // refers to axes
      axref: 'pixel',
      arrowcolor: 'black',
      font: {
        size: 16,
        color: 'black'
      },
      x: 0,
      y: 0 // head af arrow
    }
  ]

  let annotations = [
    {
      text: '$y=-3/2$',
      ax: -80, //tail of arrow
      ay: -80,
      ayref: 'pixel', // refers to axes
      axref: 'pixel',
      arrowcolor: 'blue',
      font: {
        size: 16,
        color: 'blue'
      },
      x: -5,
      y: -3 / 2 // head af arrow
    },
    {
      text: '$x=\\ln(2)$',
      ax: -90, //tail of arrow
      ay: 80,
      ayref: 'pixel', // refers to axes
      axref: 'pixel',
      arrowcolor: 'blue',
      font: {
        size: 16,
        color: 'blue'
      },
      x: 0.69,
      y: -2 // head af arrow
    },
    {
      text: '$y=\\frac{-3+\\sqrt{13-4\\e^x+8x}}{2}$',
      ax: -100, //tail of arrow
      ay: -80,
      ayref: 'pixel', // refers to axes
      axref: 'pixel',
      arrowcolor: 'red',
      font: {
        size: 18,
        color: 'red'
      },
      x: 0,
      y: 0 // head af arrow
    }
  ]
  let shapes = [
    {
      type: 'line',
      x0: -11,
      y0: -3 / 2,
      x1: 3.5,
      y1: -3 / 2,
      line: {
        color: 'blue',
        width: 2.5
      }
    },
    {
      type: 'line',
      x0: 0.69,
      y0: -6,
      x1: 0.69,
      y1: 3.5,
      line: {
        color: 'blue',
        width: 2.5
      }
    }
  ]

  let updatemenus = [
    {
      buttons: [
        {
          method: 'update',
          args: [
            { visible: [true, true, false], opacity: [0.8, 1, 0] },
            {
              annotations: [...annotations1],
              shapes: []
            }
          ],
          label: 'Curvas de nível'
        },
        {
          method: 'update',
          args: [
            { visible: [true, true, true], opacity: [0.4, 0.6, 1] },
            {
              annotations: [...annotations],
              shapes: [...shapes]
            }
          ],
          label: 'Anotações'
        }
      ],
      direction: 'bottom',
      pad: {
        r: 10,
        t: 10
      },
      showactive: true,
      //   bgcolor: '',
      type: 'buttons',
      x: 0.01,
      xanchor: 'left',
      y: 0.35,
      yanchor: 'top',
      font: {
        size: 14,
        color: 'brown'
      }
    }
  ]

  let layout = {
    annotations: annotations1,
    updatemenus: updatemenus,
    // plot_bgcolor: 'lightgrey',
    // paper_bgcolor: 'lightgrey',

    xaxis: {
      tickmode: 'linear',
      tick0: 0,
      dtick: 2
    },
    yaxis: {
      tickmode: 'linear',
      tick0: 0,
      dtick: 2
    },

    //title: '$\\color{brown}{y^2+3y-2x+\\exp(x)= C}$',
    showlegend: false,
    hovermode: false,
    dragmode: false,
    autosize: true,
    width: 550
    // height: 500
  }

  return { data: [data, data1, data2], layout, options }
} // End Contours

export function drawFunctionsSep3() {
  function exp1(x) {
    return 4 * Math.exp(x)
  }

  function reta1(x) {
    return 13 + 8 * x
  }

  let xx2 = []
  xx2[0] = -2

  for (let i = 1; i < 500; i++) {
    xx2[i] = xx2[i - 1] + 0.01
  }
  let yy3 = xx2.map(x => exp1(x))
  let yy4 = xx2.map(x => reta1(x))

  let trace1 = {
    visible: true,
    x: xx2,
    y: yy3,
    type: 'scatter',
    line: {
      smoothing: 1.3,
      width: 1.3,
      color: 'green'
    }
  }

  let trace2 = {
    visible: true,
    x: xx2,
    y: yy4,
    type: 'scatter',
    line: {
      smoothing: 1.3,
      width: 1.3,
      color: 'brown'
    }
  }

  let annotations = [
    {
      text: '$y=4\\exp(x)$',
      ax: 50, //tail of arrow
      ay: 40,
      ayref: 'pixel', // refers to axes
      axref: 'pixel',
      arrowcolor: 'green',
      font: {
        size: 18,
        color: 'green'
      },
      x: 1,
      y: 10.98 // head af arrow
    },
    {
      text: '$y=13+8x$',
      ax: 0, //tail of arrow
      ay: -50,
      ayref: 'pixel', // refers to axes
      axref: 'pixel',
      arrowcolor: 'brown',
      font: {
        size: 18,
        color: 'brown'
      },
      x: 1,
      y: 21 // head af arrow
    }
  ]

  let layout = {
    annotations: annotations,
    xaxis: {
      showlegend: false,
      tickmode: 'array',
      tickvals: [-1.5, 1.97],
      //ticktext: ['0', 'c/d', "c'/d", '140'],
      tick0: 0,
      dtick: 1
    },
    yaxis: {
      range: [-2, 40],
      tickmode: 'linear',
      dtick: 6
    },

    title: '$\\color{brown}{y=4\\exp(x)\\textrm{    e    } y=13+8x}$',
    // plot_bgcolor: 'lightgrey',
    // paper_bgcolor: 'lightgrey',
    showlegend: false,
    hovermode: false,
    autosize: false,
    dragmode: false,
    displaylogo: false,
    showLink: true,
    width: 500
    // height: 400
  }

  return { data: [trace1, trace2], layout, options }
}