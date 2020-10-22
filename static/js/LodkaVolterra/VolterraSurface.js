import {
  getDataSurfaceWithCorner,
  layout,
  options
} from '@/static/js/Plotly/plotly-config.js'

export function volterraSurface() {
  const a = 5.3
  const b = 0.12
  const c = 4.9
  const d = 0.14

  const a1 = 3.6
  const b1 = 0.12
  const c1 = 7.5
  const d1 = 0.14

  let xwidth = 200
  let ywidth = 200
  let xsteps = 30
  let ysteps = 30
  let corner = { x: 0, y: 0 }

  function funct(x, y) {
    return -c * Math.log(x) + d * x - a * Math.log(y) + b * y + 46
  }

  function funct_1(x, y) {
    return -c1 * Math.log(x) + d1 * x - a1 * Math.log(y) + b1 * y + 46
  }

  let data = getDataSurfaceWithCorner(
    funct,
    corner,
    xwidth,
    ywidth,
    xsteps,
    ysteps
  )

  data.type = 'surface'
  //   let zMax = Math.max(...[].concat(...data.z))
  let zMin = Math.min(...[].concat(...data.z))

  let layout0 = Object.assign({}, layout) //copy of data

  layout0.autosize = true
  //let vw = window.innerWidth
  //let vh = window.innerHeight
  //layout0.width = 0.6*vw
  //console.log('0.6 vw', 0.6*vw)
  //layout0.height = 0.6 * vw //550 /* set size of plot */
  data.colorscale = 'Earth'
  layout0.title =
    '$\\color{green}{V(x,y)=0.14\\, x - 4.9\\, \\ln(x) +0.12\\, y-5.3\\,\\ln(y)}$'

  data.contours.z.start = 15 /* set manually because zMax=Infinity */
  data.contours.z.end = 50
  data.contours.z.size = 1
  // data.contours.usecolormap = true // this is done in options
  data.visible = true
  //data.autocontour = true /* contours attrib picked by algorithm, ncontours = contours levels */
  //data.ncontours = 100
  data.line = {
    smoothing: 1,
    width: 1,
    color: 'green'
  }
  data.contours.coloring = 'lines'

  function funct_1(x, y) {
    return -c1 * Math.log(x) + d1 * x - a1 * Math.log(y) + b1 * y + 46
  }

  let data1 = getDataSurfaceWithCorner(
    funct_1,
    corner,
    xwidth,
    ywidth,
    xsteps,
    ysteps
  )
  let zMin1 = Math.min(...[].concat(...data1.z))

  data1.type = 'surface'
  data1.visible = false
  data1.contours.z.start = 15 /* set manually because zMax=Infinity */
  data1.contours.z.end = 40
  data1.contours.z.size = 1
  data1.autocontour = true /* contours attrib picked by algorithm, ncontours = contours levels */
  data1.ncontours = 50
  // data.contours.z.start = 15 /* set manually because zMax=Infinity */
  // data.contours.z.end = 50
  // data.contours.z.size = 0.4
  /* start - end-size not requiere when ncountours set */
  data1.line = {
    smoothing: 1,
    width: 1,
    color: 'brown'
  }
  data1.colorscale = 'Jet' //'Viridis' //'RdBu'
  data1.contours.coloring = 'lines'

  let annotations1 = {
    text: 'mínimo=' + zMin.toFixed(1).toString(),
    ax: 40, //tail of arrow
    ay: +20,
    visible: true,
    yref: 'paper', // refers to axes
    xref: 'paper',
    arrowcolor: 'black',
    xanchor: 'left',
    arrowsize: 3,
    arrowwidth: 1,
    arrowhead: 1,
    font: {
      size: 16,
      color: 'red'
    },
    x: c / d,
    y: a / b,
    z: zMin // head af arrow
  }

  let annotations2 = {
    text: 'mínimo=' + zMin1.toFixed(1).toString(),
    ax: 40, //tail of arrow
    ay: 20,
    visible: true,
    xanchor: 'left',
    yref: 'paper', // refers to axes
    xref: 'paper',
    arrowhead: 1,
    arrowcolor: 'black',
    font: {
      size: 16,
      color: 'red'
    },
    x: c1 / d1,
    y: a1 / b1,
    z: zMin1 // head af arrow
  }

  layout0.scene = {
    camera: {
      eye: {
        x: 0.9,
        y: 0.9,
        z: 1.5
      }
      //projection: { type: 'orthographic' }
    },
    xaxis: {
      title: 'x',
      showlegend: true,
      tickmode: 'linear',
      range: [0, xwidth],
      tick0: 0,
      dtick: xwidth / 4
      // tickmode: 'auto',
      // nticks: 4
      //fixedrange: true
    },
    yaxis: {
      title: 'y',
      tickmode: 'linear',
      range: [0, ywidth],
      tick0: 0,
      dtick: ywidth / 4
      // tickmode: 'auto',
      // nticks: 4
      //fixedrange: true
    },
    zaxis: {
      title: 'z',
      tickmode: 'linear',
      tick0: 0,
      dtick: 5,
      range: [15, 45]
      //fixedrange: true
    }
  }

  layout0.scene.annotations = [annotations1]

  layout0.updatemenus = [
    {
      buttons: [
        {
          method: 'update',
          args: [
            { visible: [true, false], opacity: 1 },
            {
              title:
                '$\\color{green}{V(x,y)=0.14\\, x - 4.9\\, \\ln(x) +0.12\\, y-5.3\\,\\ln(y)}$',
              // layout: {
              scene: {
                annotations: [annotations1],
                zaxis: { range: [15, 45] },
                camera: {
                  eye: {
                    x: 0.9,
                    y: 0.9,
                    z: 1.5
                  }
                }
              }
            }
            // }
            //   shapes: shapes1  zaxis: { range: [10, 45]
          ],
          label: 'Superfície 1'
        },

        {
          method: 'update',
          args: [
            {
              visible: [true, true],
              opacity: [0.05, 1]
            },
            {
              title:
                '$\\color{green}{V(x,y)=0.14\\, x - 7.5\\, \\ln(x) +0.12\\, y-3.6\\,\\ln(y)}$',

              // layout: {
              scene: {
                zaxis: { range: [10, 40] },
                camera: {
                  eye: {
                    x: 0.9,
                    y: 0.1, //1.1
                    z: 1.5
                  }
                },
                annotations: [annotations2]
              }
            }
            //   shapes: [...shapes3, ...shapes2] //
            // }
          ],
          label: 'Superfície 2'
        }
      ],
      direction: 'right',
      pad: {
        r: 10,
        t: 10
      },
      showactive: true,
      //bgcolor: 'lightgrey',
      type: 'buttons',
      x: 0.01,
      xanchor: 'left', // 0.01 is at the left
      y: -0.03,
      yanchor: 'top', // -0.02 is at the top
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
