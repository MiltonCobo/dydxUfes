import {
  getDataSurface,
  //   layout,
  options
} from '@/static/js/Plotly/plotly-config.js'

export function drawSurfaceSep1() {
  let xwidth = 6
  let ywidth = 10
  let xcenter = xwidth / 2
  let ycenter = (ywidth - 2) / 2
  let ysteps = 20
  let xsteps = 20
  let center = {
    x: xcenter,
    y: ycenter
  }

  function funct(x, y) {
    return y * y - 2 * y - x * x * x - 2 * x * x - 2 * x
  }

  let info = getDataSurface(funct, center, xwidth, ywidth, xsteps, ysteps)

  let data = {
    x: info.x,
    y: info.y,
    z: info.z,
    type: 'surface',

    showscale: false, // not show colorbar
    colorscale: 'Jet', //'RdBu',
    // ‘Bluered’, ‘Blackbody’,‘Blues’, ‘Earth’, ‘Electric’,
    // ‘Greens’, ‘Greys’, ‘Hot’, ‘Jet’, ‘Picnic’, ‘Portland’,
    // ‘Rainbow’,‘RdBu’, ‘Reds’, ‘Viridis’, ‘YlGnBu’,‘YlOrRd’
    autocontour: false,
    line: {
      smoothing: 1,
      width: 2
    },

    contours: {
      z: {
        show: true,
        start: -80,
        end: 50,
        size: 2,
        color: 'lightbrown', //'olive',
        highlightcolor: 'red',
        highlightwidth: 16,

        project: {
          z: true
        }
      },
      y: {
        show: true,
        start: -6,
        end: 6,
        size: 0.5,
        color: 'lightblue',
        highlightcolor: 'red',
        highlightwidth: 16,
        project: { y: true }
      },
      x: {
        show: true,
        start: -5,
        end: 5,
        size: 0.5,
        color: 'lightgreen',
        highlightcolor: 'red',
        highlightwidth: 16,
        project: { x: true }
      }
    }
    // dx: 10,
    // x0: 0,
    // dy: 10,
    // y0: 0,
  }

  let layout = {
    paper_bgcolor: 'gainsboro',
    plot_bgcolor: 'gainsboro',
    scene: {
      xaxis: {
        showlegend: false,
        tickmode: 'linear',
        //range: [0, 6],
        tick0: 0,
        dtick: 1,
        nticks: 4
        //fixedrange: true
      },
      yaxis: {
        tickmode: 'linear',
        //range: [0,10],
        tick0: 0,
        dtick: 2,
        nticks: 3,
        fixedrange: true
      },
      zaxis: {
        range: [-15, 20]
      },
      camera: {
        eye: {
          x: 1,
          y: 0.8,
          z: 1.2
        }
      }
    },
    title: '$\\color{brown}{V(x,y)=y^2-2 y-x^3-2 x^2-2 x}$',
    hovermode: false,
    dragmode: true,
    autosize: false,
    width: 600,
    height: 600
  }

  return { data: [data], layout, options }
}

//-------------------------------------------------------------------------

export function drawContoursSep1() {
  let xwidth = 8
  let ywidth = 8
  let xcenter = xwidth / 2
  let ycenter = (ywidth - 2) / 2
  let ysteps = 30
  let xsteps = 30
  let center = {
    x: xcenter,
    y: ycenter
  }

  function func(x, y) {
    return y * y - 2 * y - x * x * x - 2 * x * x - 2 * x
  }

  let info = getDataSurface(func, center, xwidth, ywidth, xsteps, ysteps)

  let data0 = {
    x: info.x,
    y: info.y,
    z: info.z,
    type: 'contour',

    showscale: false, // not show colorbar

    line: {
      smoothing: 1.2,
      width: 1,
      color: 'grey'
      // opacity: 0.3
    },

    autocontour: true /* contours attrib picked by algorithm, ncontours = contours levels */,
    ncontours: 40
  }

  let data1 = {
    // show only one level

    x: info.x,
    y: info.y,
    z: info.z,
    type: 'contour',

    showscale: false, // not show colorbar

    line: {
      coloring: 'none',
      smoothing: 1.2,
      width: 1.8,
      color: 'black'
      // opacity: 1
    },

    contours: {
      type: 'constraint',
      operation: '=',
      value: 3,
      coloring: 'none'
      // shape: 'spline',
      // start: 3, //show only one level curve
      // end: 3,
      // size: 0
    }
  }

  function fExplicit(x, s) {
    //if (x >= -2) {
    return 1 + s * Math.sqrt(x * x * x + 2 * x * x + 2 * x + 4)
    //}
  }

  let xx = []
  let maxIter = 10
  xx[0] = -2
  for (let i = 1; i < maxIter; i++) {
    xx[i] = xx[i - 1] + 0.02
  }
  let width = 1.5 - xx[maxIter - 1]
  let steps = 20
  let stepsize = width / steps
  for (let i = 0; i < steps - 1; i++) {
    xx[maxIter + i] = xx[maxIter + i - 1] + stepsize
  }
  let yy = xx.map(x => fExplicit(x, -1))
  let yy2 = xx.map(x => fExplicit(x, +1))

  let trace1 = {
    visible: false,
    x: xx,
    y: yy,
    type: 'scatter',
    line: {
      shape: 'spline',
      smoothing: 1,
      width: 2,
      color: 'green'
    }
  }

  let trace2 = {
    visible: false,
    x: xx,
    y: yy2,
    type: 'scatter',
    line: {
      shape: 'spline',
      smoothing: 1,
      width: 2,
      color: 'red'
    }
  }

  let annotations1 = [
    {
      text: '$ y^2-2y-x^3-2x^2-2x =3 $',
      ax: -100,
      ay: -40,
      xref: 'pixel',
      yref: 'pixel',
      arrowcolor: 'black',
      font: {
        size: 15,
        color: 'black'
      },
      x: 0,
      y: 3
    }
  ]

  let annotations = [
    {
      visible: true,
      text: '$ y = 1 $',
      ax: 0,
      ay: 0,
      xref: 'pixel',
      yref: 'pixel',
      arrowcolor: 'blue',
      font: {
        size: 15,
        color: 'blue'
      },
      x: -1.0,
      y: 1.2
    },
    {
      visible: true,
      text: '$ (-2,1) $',
      ax: -40,
      ay: -30,
      xref: 'pixel',
      yref: 'pixel',
      arrowcolor: 'black',
      font: {
        size: 15,
        color: 'black'
      },
      x: -2,
      y: 1 // head af arrow
    },
    {
      visible: true,
      text: '$ y = 1 - \\sqrt{x^3+2x^2+2x+4}, x \\ge -2 $',
      ax: -65, //tail of arrow
      ay: 45,
      ayref: 'pixel', // refers to axes
      axref: 'pixel',
      arrowcolor: 'green',
      font: {
        size: 18,
        color: 'green'
      },
      x: 0,
      y: -1 // head af arrow
    },
    {
      visible: true,
      text: '$ (0,-1) $',
      ax: 30,
      ay: -30,
      xref: 'pixel',
      yref: 'pixel',
      arrowcolor: 'black',
      font: {
        size: 15,
        color: 'black'
      },
      x: 0,
      y: -1 // head af arrow
    },
    {
      visible: true,
      text: '$ y = 1 + \\sqrt{x^3+2x^2+2x+4},  x \\ge -2 $',
      ax: -65, //tail of arrow
      ay: -45,
      ayref: 'pixel', // refers to axes
      axref: 'pixel',
      arrowcolor: 'red',
      font: {
        size: 18,
        color: 'red'
      },
      x: 0,
      y: 3 // head af arrow
    },
    {
      visible: true,
      text: '$ (0,3) $',
      ax: 30,
      ay: 30,
      xref: 'pixel',
      yref: 'pixel',
      arrowcolor: 'black',
      font: {
        size: 15,
        color: 'black'
      },
      x: 0,
      y: 3 // head af arrow
    }
  ]

  let shapes = [
    {
      type: 'line',
      x0: -3.8,
      y0: 1,
      x1: 3,
      y1: 1,
      line: {
        color: 'blue',
        width: 2,
        dash: 'dot'
      },
      visible: true
    }
  ]
  let layout = {
    annotations: annotations1,
    // shapes: [],
    paper_bgcolor: 'gainsboro',
    plot_bgcolor: 'gainsboro',
    xaxis: {
      autorange: true
      // showlegend: false,
      // tickmode: 'auto',
      // nticks: 5
      // tickmode: 'linear',
      // tick0: 0,
      // dtick: 2
      // nticks: 6   //work only with tickmode: auto
    },

    yaxis: {
      autorange: true
      // tickmode: 'auto',
      // nticks: 5
      // tickmode: 'linear',
      // tick0: 0,
      // dtick: 2
      // nticks: 4
    },

    updatemenus: [
      {
        buttons: [
          {
            args: [
              { visible: [true, true, false, false], opacity: [1, 0.6, 0, 0] },
              {
                annotations: [...annotations1], //
                shapes: []
              }
            ],
            label: 'Curvas de nível',
            method: 'update'
          },
          {
            args: [
              { visible: [true, false, true, true], opacity: [0.4, 0, 1, 1] },
              {
                annotations: [...annotations],
                shapes: shapes
              }
            ],
            label: 'Ver as funções',
            method: 'update'
          }
        ],
        direction: 'right',
        pad: {
          r: 10,
          t: 10
        },
        showactive: true,
        paper_bgcolor: 'gainsboro',
        plot_bgcolor: 'gainsboro',
        type: 'buttons',
        x: 0.01,
        xanchor: 'left',
        y: -0.1,
        yanchor: 'top',
        font: {
          size: 14,
          color: 'brown'
        }
      }
    ],

    // title: '$ dy/dx = (3x^2+4x+2)/2(y-1),\\quad y(0)=-1.$',
    //title: '$\\color{brown}{y^2-2y-x^3-2x^2-2x = C}$',
    title: "<span style='color:brown'>Interpretando as soluções</span>",

    showlegend: false,
    hovermode: false,
    dragmode: false,
    autosize: false,
    width: 600,
    height: 500
  }

  return { data: [data0, data1, trace1, trace2], layout, options }
} // End
