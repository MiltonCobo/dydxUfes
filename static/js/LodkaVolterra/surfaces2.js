import {
  getDataSurface,
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
  let center = { x: 0, y: 0 }

  function funct(x, y) {
    return -c * Math.log(x) + d * x - a * Math.log(y) + b * y + 46
  }

  function funct_1(x, y) {
    return -c1 * Math.log(x) + d1 * x - a1 * Math.log(y) + b1 * y + 46
  }

  let data = getDataSurface(funct, center, xwidth, ywidth, xsteps, ysteps)

  data.type = 'surface'
  //   let zMax = Math.max(...[].concat(...data.z))
  let zMin = Math.min(...[].concat(...data.z))

  let layout0 = Object.assign({}, layout)
  //   let layout0 = {}

  layout0.width = 600
  layout0.height = 600 /* set size of plot */
  data.colorscale = 'Earth'
  layout0.title =
    '$\\color{green}{V(x,y)=d\\, x - c\\, \\ln(x) +b\\, y-a\\, \\ln(y)}$'

  data.contours.z.start = 15 /* set manually because zMax=Infinity */
  data.contours.z.end = 40
  data.contours.z.size = 2
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
  data1.type = 'surface'
  data1.visible = false
  data1.contours.z.start = 15 /* set manually because zMax=Infinity */
  data1.contours.z.end = 40
  data1.contours.z.size = 2
  data1.autocontour = true /* contours attrib picked by algorithm, ncontours = contours levels */
  data1.ncontours = 40
  data.contours.z.start = 15 /* set manually because zMax=Infinity */
  data.contours.z.end = 50
  data.contours.z.size = 0.4
  /* start - end-size not requiere when ncountours set */
  data1.line = {
    smoothing: 1,
    width: 1,
    color: 'brown'
  }
  data1.colorscale = 'Viridis' //'RdBu'
  data1.contours.coloring = 'lines'

  let annotations1 = {
    text: 'mínimo',
    ax: 50, //tail of arrow
    ay: 0,
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
      color: 'black'
    },
    x: c / d,
    y: a / b,
    z: zMin // head af arrow
  }

  let annotations2 = {
    text: 'Com pesca',
    ax: 50, //tail of arrow
    ay: 0,
    visible: true,
    //   ayref: 'pixel', // refers to axes
    //   axref: 'pixel',
    arrowhead: 1,
    arrowcolor: 'black',
    font: {
      size: 18,
      color: 'black'
    },
    x: 50, //c1 / d1,
    y: 50, //a1 / b1,
    z: 25 // head af arrow
  }

  layout0.scene = {
    camera: {
      eye: {
        x: 1.5,
        y: 1,
        z: 1
      }
    },
    xaxis: {
      title: 'x',
      showlegend: true,
      tickmode: 'linear',
      range: [0, 160],
      // tick0: 0,
      // dtick: 20,
      tickmode: 'auto',
      nticks: 4
      //fixedrange: true
    },
    yaxis: {
      title: 'y',
      tickmode: 'linear',
      range: [0, 160],
      // tick0: 0,
      // dtick: 20,
      tickmode: 'auto',
      nticks: 4
      //fixedrange: true
    },
    zaxis: {
      title: 'z',
      range: [15, 36]
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
              annotations: [annotations1]
              //   shapes: shapes1
            }
          ],
          label: 'Sem pesca'
        },

        {
          method: 'update',
          args: [
            {
              visible: [true, true],
              opacity: [0.2, 1]
            },
            {
              annotations: [annotations2]
              //   shapes: [...shapes3, ...shapes2]
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
