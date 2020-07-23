import {
  getDataSurfaceWithCorner,
  //   layout,
  options
} from '@/static/js/Plotly/plotly-config.js'
import { TextureAssetTask } from 'babylonjs'

export function drawContoursSep2() {
  let c = 15
  let xwidth = 30
  let ywidth = 30
  let xcorner = c
  let ycorner = c
  let ysteps = 60
  let xsteps = 60
  let corner = {
    x: xcorner,
    y: ycorner
  }

  // let windowWidth = window.innerWidth
  // let windowHeight = window.innerHeight

  function funct(x, y) {
    return y * y * y - 3 * y * y - x * x * x - x //3*y +y*y-2*x+Math.exp(x);
  }

  let data = getDataSurfaceWithCorner(
    funct,
    corner,
    xwidth,
    ywidth,
    xsteps,
    ysteps
  )
  data.type = 'contour'
  data.showscale = false
  data.colorscale = 'None'
  data.autocontour = true
  data.ncontours = 80

  data.line = {
    smoothing: 2,
    width: 0.6,
    color: 'grey'
  }

  let data1 = Object.assign({}, data)
  data1.showscale = false

  data1.line = {
    smoothing: 2,
    width: 1.5,
    color: 'green'
  }

  data1.contours = {
    type: 'constraint',
    operation: '=',
    value: -2
  }

  xwidth = 2.2
  ywidth = 2.03
  xcorner = 1.1 //to draw better corner
  ycorner = 0 // this is not center, left-bottom corner

  ysteps = 80
  xsteps = 80
  corner = {
    x: xcorner,
    y: ycorner
  }

  let graphFunction = getDataSurfaceWithCorner(
    funct,
    corner,
    xwidth,
    ywidth,
    xsteps,
    ysteps
  )

  graphFunction.type = 'contour' // graph of solution in [-1,1]
  graphFunction.showscale = false
  graphFunction.visible = false
  graphFunction.line = {
    smoothing: 1,
    width: 3,
    color: 'red'
  }

  graphFunction.contours = {
    type: 'constraint',
    operation: '=',
    value: -2
  }

  //------------------------------------------------------------------------
  let annotations0 = [
    {
      text: '$y^3-3y^2-x^3-x = -2$',
      ax: -50, //tail of arrow
      ay: -80,
      ayref: 'pixel', // refers to axes
      axref: 'pixel',
      arrowcolor: 'black',
      font: {
        size: 18,
        color: 'black'
      },
      x: -0.75,
      y: 2.6 // head af arrow
    }
  ]
  let annotations1 = [
    {
      text: '$y^3-3y^2-x^3-x = -2$',
      ax: -50, //tail of arrow
      ay: -80,
      ayref: 'pixel', // refers to axes
      axref: 'pixel',
      arrowcolor: 'darkgreen',
      font: {
        size: 18,
        color: 'darkgreen'
      },
      x: -0.75,
      y: 2.6 // head af arrow
    },
    {
      text: '$y=x$',
      ax: 60, //tail of arrow
      ay: 0,
      ayref: 'pixel', // refers to axes
      axref: 'pixel',
      arrowcolor: 'yellow',
      font: {
        size: 18,
        color: 'yellow'
      },
      x: -5,
      y: -5 // head af arrow
    },
    {
      text: '$y=2$',
      ax: 40, //tail of arrow
      ay: -40,
      ayref: 'pixel', // refers to axes
      axref: 'pixel',
      arrowcolor: 'black',
      font: {
        size: 18,
        color: 'black'
      },
      x: 4,
      y: 2 // head af arrow
    },
    {
      text: '$y=0$',
      ax: 40, //tail of arrow
      ay: 40,
      ayref: 'pixel', // refers to axes
      axref: 'pixel',
      arrowcolor: 'black',
      font: {
        size: 18,
        color: 'black'
      },
      x: 4.5,
      y: 0 // head af arrow
    }
  ]
  let annotations2 = [
    {
      text: '$\\textrm{Domínio da solução } = [-1,1]$',
      ax: 70, //tail of arrow
      ay: 50,
      ayref: 'pixel', // refers to axes
      axref: 'pixel',
      arrowcolor: 'black',
      font: {
        size: 18,
        color: 'black'
      },
      x: 0.4,
      y: -0.1 // head af arrow
    },
    {
      text: '$\\textrm{Solução do PVI com } y(0)=1$',
      ax: 80, //tail of arrow
      ay: -50,
      ayref: 'pixel', // refers to axes
      axref: 'pixel',
      arrowcolor: 'black',
      font: {
        size: 18,
        color: 'black'
      },
      x: 0,
      y: 1 // head af arrow
    }
  ]

  let shapes1 = [
    {
      type: 'line',
      x0: -c,
      y0: -c,
      x1: c,
      y1: c,
      line: {
        color: 'yellow',
        width: 2.5
      }
    },
    {
      type: 'line',
      x0: -c * 0.9,
      y0: 2,
      x1: c * 0.9,
      y1: 2,
      line: {
        color: 'black',
        width: 2,
        dash: 'dot'
      }
    },
    {
      type: 'line',
      x0: -c * 0.9,
      y0: 0,
      x1: c * 0.9,
      y1: 0,
      line: {
        color: 'black',
        width: 2,
        dash: 'dot'
      }
    }
  ]
  let shapes2 = [
    {
      type: 'line',
      x0: -1,
      y0: 0,
      x1: 1,
      y1: 0,
      line: {
        color: 'blue',
        width: 2.5
      }
    }
  ]

  let layout = {
    title: '$y^3-3y^2-x^3-x=C$',
    font: {
      size: 18,
      color: 'brown'
    },
    plot_bgcolor: 'gainsboro',
    paper_bgcolor: 'gainsboro',

    showlegend: false,
    dragmode: false,
    hovermode: false,
    autosize: false,

    width: 550, //0.42 * windowWidth,
    height: 550, //0.42 * windowWidth,

    xaxis: {
      autorange: true,
      // range: [-15, 15],
      tickvals: [-5, -1, 1, 5],
      ticktext: ['-5', '-1', '1', '5']
    },
    yaxis: {
      autorange: true,
      // range: [-15, 15],
      tickvals: [-5, 2, 5],
      ticktext: ['-5', '2', '5']
    },
    annotations: annotations0,
    updatemenus: [
      {
        buttons: [
          {
            method: 'update',
            args: [
              { visible: [true, true, false], opacity: [0.8, 1] },
              {
                xaxis: {
                  autorange: true,
                  tickvals: [-5, -1, 1, 5],
                  ticktext: ['-5', '-1', '1', '5']
                },
                yaxis: {
                  autorange: true,
                  tickvals: [-5, 2, 5],
                  ticktext: ['-5', '2', '5']
                },
                annotations: [...annotations1],
                shapes: shapes1
              }
            ],
            label: 'Outras anotações'
          },

          {
            method: 'update',
            args: [
              { visible: [true, true, true], opacity: [0.4, 0.7, 1] },
              {
                xaxis: {
                  range: [-10, 10],
                  tickvals: [-5, -1, 1, 5],
                  ticktext: ['-5', '-1', '1', '5']
                },
                yaxis: {
                  range: [-8, 10],
                  tickvals: [-5, 2, 5],
                  ticktext: ['-5', '2', '5']
                },
                annotations: [...annotations2],
                shapes: shapes2
              }
            ],
            label: 'Solução e seu domínio'
          }
        ],
        direction: 'bottom',
        pad: {
          r: 10,
          t: 10
        },
        showactive: true,
        bgcolor: 'gainsboro',
        type: 'buttons',
        x: 0.53,
        xanchor: 'left',
        y: 0.23,
        yanchor: 'top',
        font: {
          size: 14,
          color: 'brown'
        }
      }
    ]
  }

  return { data: [data, data1, graphFunction], layout, options }
} // End

export function drawSurfaceSep2() {
  let xwidth = 12
  let ywidth = 12
  let xcorner = 5
  let ycorner = 5
  let ysteps = 30
  let xsteps = 30
  let corner = {
    x: xcorner,
    y: ycorner
  }

  // let windowWidth = window.innerWidth
  // let windowHeight = window.innerHeight

  function funct(x, y) {
    return y * y * y - 3 * y * y - x * x * x - x
  }

  let dataSurface = getDataSurfaceWithCorner(
    funct,
    corner,
    xwidth,
    ywidth,
    xsteps,
    ysteps
  )

  dataSurface.type = 'surface'
  dataSurface.showscale = false // not show colorbar
  dataSurface.colorscale = 'Viridis'

  dataSurface.line = {
    smoothing: 1.3,
    width: 1.8,
    color: 'black'
  }

  dataSurface.contours = {
    z: {
      show: true,
      start: -20,
      end: 20,
      size: 3,
      color: 'lightbrown', //'olive',
      highlightcolor: 'red',
      highlightwidth: 16,

      project: { z: true }
    },
    y: {
      show: true,
      start: -5,
      end: 5,
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

  let layout = {
    title: '$\\color{brown}{z=y^3 -3y^2-x^3-x}$',
    plot_bgcolor: 'gainsboro',
    paper_bgcolor: 'gainsboro',
    showlegend: false,
    hovermode: false,
    //autosize: true,
    width: 600, //0.5 * windowWidth,

    scene: {
      camera: {
        eye: {
          x: -1,
          y: 0.8,
          z: 0.8
        }
      },
      xaxis: {
        title: 'x',
        // showlegend: false,
        tickmode: 'linear',
        tick0: 0,
        dtick: 2
      },
      yaxis: {
        title: 'y',
        tickmode: 'linear',
        tick0: 0,
        dtick: 2
      },
      zaxis: {
        title: 'z',
        tickmode: 'linear',
        tick0: 0,
        dtick: 10,
        range: [-20, 20]
      }
    }
  }

  return { data: [dataSurface], layout, options }
} // End drawSurface_sep2
