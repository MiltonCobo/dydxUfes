import {
  getDataSurfaceWithCorner,
  layout,
  options
} from '@/static/js/Plotly/plotly-config.js'

export function volterraSurface2() {
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

  let layout0 = Object.assign({}, layout)
  //   let layout0 = {}
  layout0.autosize = false
  layout0.width = 660
  layout0.height = 660 /* set size of plot */
  data.colorscale = 'Earth'
  layout0.title =
    '$\\color{green}{V(x,y)=0.14\\, x - 4.9\\, \\ln(x) +0.12\\, y-5.3\\,\\ln(y)}$'

  data.contours.z.start = 15 /* set manually because zMax=Infinity */
  data.contours.z.end = 35
  data.contours.z.size = 1
  // data.contours.usecolormap = true // this is done in options
  data.visible = true
  // data.autocontour = true /* contours attrib picked by algorithm, ncontours = contours levels */
  // data.ncontours = 40
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
  data1.ncontours = 40
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
    //   ayref: 'pixel', // refers to axes
    //   axref: 'pixel',
    arrowcolor: 'black',
    xanchor: 'left',
    arrowsize: 3,
    arrowwidth: 1,
    arrowhead: 1,
    font: {
      size: 18,
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

    //   ayref: 'pixel', // refers to axes
    //   axref: 'pixel',
    arrowhead: 1,
    arrowcolor: 'black',
    font: {
      size: 18,
      color: 'red'
    },
    x: c1 / d1,
    y: a1 / b1,
    z: zMin1 // head af arrow
  }

  layout0.scene = {
    camera: {
      eye: {
        x: 1.25,
        y: 1.25,
        z: 1.25
      }
      //projection: { type: 'orthographic' }
    },
    xaxis: {
      title: 'x',
      showlegend: true,
      tickmode: 'linear',
      range: [0, 160],
      tick0: 20,
      dtick: 20
      // tickmode: 'auto',
      // nticks: 4
      //fixedrange: true
    },
    yaxis: {
      title: 'y',
      tickmode: 'linear',
      range: [0, 160],
      tick0: 20,
      dtick: 20
      // tickmode: 'auto',
      // nticks: 4
      //fixedrange: true
    },
    zaxis: {
      title: 'z',
      tickmode: 'linear',
      tick0: 15,
      dtick: 5,
      range: [10, 38]
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
              scene: { annotations: [annotations1], zaxis: { range: [10, 38] } }
              //   shapes: shapes1
            }
          ],
          label: 'Superfície 1'
        },

        {
          method: 'update',
          args: [
            {
              visible: [true, true],
              opacity: [0.1, 1]
            },
            {
              title:
                '$\\color{green}{V(x,y)=0.14\\, x - 7.5\\, \\ln(x) +0.12\\, y-3.6\\,\\ln(y)}$',
              scene: { annotations: [annotations2], zaxis: { range: [10, 38] } }
              //   shapes: [...shapes3, ...shapes2]
            }
          ],
          label: 'Superfície 2'
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
