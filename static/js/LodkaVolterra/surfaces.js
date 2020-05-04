import {
  getDataSurface,
  //   layout,
  options
} from '@/static/js/Plotly/plotly-config.js'

export function volterraSurface() {
  const a = 5.3
  const b = 0.12
  const c = 4.9
  const d = 0.14

  let xwidth = 160
  let ywidth = 160
  let xsteps = 26
  let ysteps = 26
  let center = { x: 0, y: 0 }

  function funct(x, y) {
    return -c * Math.log(x) + d * x - a * Math.log(y) + b * y + 46
  }

  let data = getDataSurface(funct, center, xwidth, ywidth, xsteps, ysteps)
  data.type = 'surface'
  data.contours.z.start = 15 /* set manually because zMax=Infinity */
  data.contours.z.end = 50
  data.contours.z.size = 0.8
  data.colorscale = 'Earth'
  let layout = {
    showlegend: true,
    hovermode: false,
    line: {
      smoothing: 1,
      width: 1
    },
    title:
      '$\\color{brown}{V(x,y)=0.14\\, x - 4.9\\, \\ln(x) +0.12\\, y-5.3\\, \\ln(y)}$',
    //font: 12,
    scene: {
      camera: {
        eye: {
          x: 1.5,
          y: 1,
          z: 1
        }
      },
      xaxis: {
        title: 'x',
        showlegend: false,
        tickmode: 'linear',
        range: [0, 160],
        // tick0: 0,
        // dtick: 20,
        tickmode: 'auto',
        nticks: 5
        //fixedrange: true
      },
      yaxis: {
        title: 'y',
        tickmode: 'linear',
        range: [0, 160],
        // tick0: 0,
        // dtick: 20,
        tickmode: 'auto',
        nticks: 5
        //fixedrange: true
      },
      zaxis: {
        title: 'z',
        range: [15, 36]
        //fixedrange: true
      }
    },
    autosize: false,
    width: 600,
    height: 600
  }
  return {
    data: [data],
    layout,
    options
  }
}
