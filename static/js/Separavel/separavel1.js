import {
  getDataSurfaceWithCenter,
  //   layout,
  options
} from '@/static/js/Plotly/plotly-config.js'

export function drawSurfaceSep1() {
  let xwidth = 14
  let ywidth = 14
  let xcenter = 0 //xwidth / 2
  let ycenter = 1 // (ywidth - 2) / 2
  let ysteps = 40
  let xsteps = 40
  let center = {
    x: xcenter,
    y: ycenter
  }

  // let windowWidth = window.innerWidth
  // let windowHeight = window.innerHeight

  function funct(x, y) {
    return y * y - 2 * y - x * x * x - 2 * x * x - 2 * x
  }

  let info = getDataSurfaceWithCenter(
    funct,
    center,
    xwidth,
    ywidth,
    xsteps,
    ysteps
  )

  let data = {
    x: info.x,
    y: info.y,
    z: info.z,
    type: 'surface',

    showscale: false, // not show colorbar
    colorscale: 'RdBu', //'RdBu',
    reversescale: true,
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
        // autocontour: true,
        // ncontours: 200,
        usecolormap: true,
        start: -200,
        end: 200,
        size: 10,
        //color: 'lightbrown', //'olive',
        highlightcolor: 'red',
        highlightwidth: 16,

        project: {
          z: true
        }
      },
      y: {
        show: true,
        autocontour: true,
        ncontours: 40,
        // start: -6,
        // end: 6,
        // size: 0.5,
        color: 'lightblue',
        highlightcolor: 'red',
        highlightwidth: 16,
        project: { y: true }
      },
      x: {
        show: true,
        autocontour: true,
        ncontours: 40,
        // start: -5,
        // end: 5,
        // size: 0.5,
        color: 'lightgreen',
        highlightcolor: 'red',
        highlightwidth: 16,
        project: { x: true }
      }
    }
  }

  let layout = {
    paper_bgcolor: 'gainsboro',
    plot_bgcolor: 'gainsboro',
    scene: {
      xaxis: {
        showlegend: true,
        title: 'x',
        tickmode: 'auto',
        tick0: 0,
        dtick: 1,
        nticks: 7
        //fixedrange: true
      },
      yaxis: {
        showlegend: true,
        title: 'y',
        tickmode: 'auto',

        nticks: 7
      },
      zaxis: {
        showlegend: true,
        title: 'z',
        //autorange: true,
        tickmode: 'auto',
        nticks: 10,
        range: [-200, 200]
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
    width: 550, //0.42 * windowWidth,
    height: 550 //0.44 * windowWidth
  }

  return { data: [data], layout, options }
}

//-------------------------------------------------------------------------

export function drawContoursSep1() {
  let xwidth = 14
  let ywidth = 14
  let xcenter = 0 //xwidth / 2
  let ycenter = 1 // (ywidth - 2) / 2
  let ysteps = 30
  let xsteps = 30
  let center = {
    x: xcenter,
    y: ycenter
  }

  function func(x, y) {
    return y * y - 2 * y - x * x * x - 2 * x * x - 2 * x
  }

  let info = getDataSurfaceWithCenter(
    func,
    center,
    xwidth,
    ywidth,
    xsteps,
    ysteps
  )

  let data0 = {
    x: info.x,
    y: info.y,
    z: info.z,
    type: 'contour',

    showscale: false, // not show colorbar
    colorscale: 'RdBu',
    reversescale: true,

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
  let maxIter = 20
  xx[0] = -2
  for (let i = 1; i < maxIter; i++) {
    xx[i] = xx[i - 1] + 0.02
  }
  let width = 2.6 - xx[maxIter - 1]
  let steps = 20
  let stepsize = width / steps
  for (let i = 0; i < steps - 1; i++) {
    xx[maxIter + i] = xx[maxIter + i - 1] + stepsize
  }
  let yy = xx.map(x => fExplicit(x, -1))
  let yy2 = xx.map(x => fExplicit(x, +1))

  let trace1 = {
    x: xx,
    y: yy,
    type: 'scatter',
    line: {
      smoothing: 1,
      width: 2,
      color: 'green'
    },
    visible: false
  }

  let trace2 = {
    x: xx,
    y: yy2,
    type: 'scatter',
    line: {
      smoothing: 1,
      width: 2,
      color: 'red'
    },
    visible: false
  }

  let annotations1 = [
    {
      text: '$ y^2-2y-x^3-2x^2-2x =3 $',
      ax: -100,
      ay: -40,
      axref: 'pixel',
      ayref: 'pixel',
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
      ay: -20,
      axref: 'pixel',
      ayref: 'pixel',
      arrowcolor: 'blue',
      font: {
        size: 15,
        color: 'blue'
      },
      x: -1.0,
      y: 1
    },
    {
      visible: true,
      text: '$ (-2,1) $',
      ax: -40,
      ay: -30,
      axref: 'pixel',
      ayref: 'pixel',
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
      text: '$ y = 1 + \\sqrt{x^3+2x^2+2x+4}, x \\ge -2 $',
      ax: -45, //tail of arrow
      ay: -98,
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
      text: '$ y = 1 - \\sqrt{x^3+2x^2+2x+4}, x \\ge -2 $',
      ax: -45, //tail of arrow
      ay: 90,
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
      axref: 'pixel',
      ayref: 'pixel',
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
      text: '$ (0,3) $',
      ax: 30,
      ay: 30,
      axref: 'pixel',
      ayref: 'pixel',
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
                annotations: [...annotations1],
                shapes: [],
                layout: { autosize: true }
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
                shapes: shapes,
                layout: { autosize: true }
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

    title: '$\\color{brown}{y^2-2y-x^3-2x^2-2x = C}$',
    // title: "<span style='color:brown'>Interpretando as soluções</span>",

    showlegend: false,
    hovermode: false,
    dragmode: false,
    autosize: false,
    width: 600,
    height: 500
  }

  return { data: [data0, data1, trace1, trace2], layout, options }
} // End
