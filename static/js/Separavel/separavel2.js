import {
  getDataSurface,
  //   layout,
  options
} from '@/static/js/Plotly/plotly-config.js'
export function drawContoursSep2() {
  let max = 20
  let c = 10
  let xwidth = max
  let ywidth = max
  let xcenter = c
  let ycenter = c
  let ysteps = 50
  let xsteps = 50
  let center = {
    x: xcenter,
    y: ycenter
  }

  function funct(x, y) {
    return y * y * y - 3 * y * y - x * x * x - x //3*y +y*y-2*x+Math.exp(x);
  }

  let info = getDataSurface(funct, center, xwidth, ywidth, xsteps, ysteps)

  let data = {
    x: info.x,
    y: info.y,
    z: info.z,
    type: 'contour',

    showscale: false, // not show colorbar
    //colorscale: 'Earth',
    //reversescale: true,
    // ‘Bluered’, ‘Blackbody’,‘Blues’, ‘Earth’, ‘Electric’,
    // ‘Greens’, ‘Greys’, ‘Hot’, ‘Jet’, ‘Picnic’, ‘Portland’,
    // ‘Rainbow’,‘RdBu’, ‘Reds’, ‘Viridis’, ‘YlGnBu’,‘YlOrRd’
    //autocontour: false,
    line: {
      smoothing: 1.3,
      shape: 'spline',
      width: 1,
      color: 'grey'
    },

    contours: {
      coloring: 'none',
      start: -30,
      end: 30,
      size: 2,
      highlightcolor: 'red'
    }
  }

  let data1 = {
    x: info.x,
    y: info.y,
    z: info.z,
    type: 'contour',

    showscale: false, // not show colorbar
    colorscale: 'Greys',
    reversescale: true,
    // ‘Bluered’, ‘Blackbody’,‘Blues’, ‘Earth’, ‘Electric’,
    // ‘Greens’, ‘Greys’, ‘Hot’, ‘Jet’, ‘Picnic’, ‘Portland’,
    // ‘Rainbow’,‘RdBu’, ‘Reds’, ‘Viridis’, ‘YlGnBu’,‘YlOrRd’
    //autocontour: false,
    line: {
      smoothing: 1.3,
      width: 2,
      color: 'green'
    },

    contours: {
      coloring: 'none',
      shape: 'spline',
      start: -2,
      end: -2,
      //size: 4,
      highlightcolor: 'red'
    }
  }

  //-----calcula a solução em [-1,1]--------
  let maxSteps = 1999
  let dh = 0.001
  let x_data = []
  let y_data = []
  let x = -0.999
  let y = 1.95
  x_data.push(-1)
  y_data.push(2)
  for (let i = 1; i < maxSteps; i++) {
    let d = (1 + 3 * x * x) / (3 * y * y - 6 * y)
    let dy = d * dh
    y = y + dy
    x = x + dh
    x_data.push(x)
    y_data.push(y)
  }

  x_data.push(1)
  y_data.push(0)

  //---------------------------
  let trace1 = {
    visible: false,
    x: x_data,
    y: y_data,
    type: 'scatter',
    line: {
      smoothing: 1.3,
      shape: 'spline',
      width: 3,
      color: 'red',
      opacity: 1
    }
  }

  let annotations1 = [
    {
      text: '$y^3-3y^2-x^3-x = -2$',
      ax: -50, //tail of arrow
      ay: -80,
      ayref: 'pixel', // refers to axes
      axref: 'pixel',
      arrowcolor: 'green',
      font: {
        size: 18,
        color: 'green'
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
      x: 7,
      y: 7 // head af arrow
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
      text: 'Domínio da solução = [-1,1]',
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
      text: 'Solução do PVI com y(0)=1',
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
      x0: -10,
      y0: 2,
      x1: 10,
      y1: 2,
      line: {
        color: 'green',
        width: 2.5
      }
    },
    {
      type: 'line',
      x0: -10,
      y0: 0,
      x1: 10,
      y1: 0,
      line: {
        color: 'green',
        width: 2.5
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
    width: 600,
    height: 600,
    // margin: {
    //   l: 80,
    //   r: 0,
    //   b: 80,
    //   t: 100,
    // },
    xaxis: {
      range: [-c, c],
      tickvals: [-5, -1, 1, 5],
      ticktext: ['-5', '-1', '1', '5']
    },
    yaxis: {
      range: [-c, c],
      tickvals: [-5, 2, 5],
      ticktext: ['-5', '2', '5']
    },
    updatemenus: [
      {
        buttons: [
          {
            method: 'update',
            args: [
              { visible: [true, true, false], opacity: [0.6, 1] },
              {
                annotations: [...annotations1],
                shapes: shapes1
              }
            ],
            label: 'Anotações'
          },

          {
            method: 'update',
            args: [
              { visible: [true, true, true], opacity: [0.2, 0.7, 1] },
              {
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
        x: 1.04,
        xanchor: 'left',
        y: 0.92,
        yanchor: 'top',
        font: {
          size: 14,
          color: 'brown'
        }
      }
    ]
  }

  return { data: [data, data1, trace1], layout, options }
} // End

export function drawSurfaceSep2() {
  let xwidth = 16
  let ywidth = 16
  let xcenter = 8
  let ycenter = 8
  let ysteps = 40
  let xsteps = 40
  let center = {
    x: xcenter,
    y: ycenter
  }

  function funct(x, y) {
    return y * y * y - 3 * y * y - x * x * x - x
  }

  let info = getDataSurface(funct, center, xwidth, ywidth, xsteps, ysteps)

  let data = {
    x: info.x,
    y: info.y,
    z: info.z,
    type: 'surface',

    showscale: false, // not show colorbar
    colorscale: 'Blues',
    //reversescale: true,

    // ‘Bluered’, ‘Blackbody’,‘Blues’, ‘Earth’, ‘Electric’,
    // ‘Greens’, ‘Greys’, ‘Hot’, ‘Jet’, ‘Picnic’, ‘Portland’,
    // ‘Rainbow’,‘RdBu’, ‘Reds’, ‘Viridis’, ‘YlGnBu’,‘YlOrRd’
    //autocontour: false,

    line: {
      smoothing: 1.3,
      width: 1.8,
      color: 'black'
    },

    contours: {
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
  }

  let layout = {
    title: '$\\color{brown}{z=y^3 -3y^2-x^3-x}$',
    plot_bgcolor: 'gainsboro',
    paper_bgcolor: 'gainsboro',
    showlegend: false,
    hovermode: false,
    autosize: true,
    width: 600,
    // height: 600,
    // margin: {
    //   l: 0,
    //   r: 0,
    //   b: 0,
    //   t: 100,
    // },
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
        range: [-10, 10]
      }
    }
  }

  return { data: [data], layout, options }
} // End drawSurface_sep2
