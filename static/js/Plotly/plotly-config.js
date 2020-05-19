export function getDataScatter(funct, xinitial, xwidth, step) {
  let xArray = []
  let yArray = []

  let xaxisStep = xwidth / step

  for (let i = 0; i < xaxisStep; i++) {
    let x = step * i + xinitial
    xArray.push(x)
    let value = funct.apply(this, [x])
    yArray.push(value)
  }

  return {
    x: xArray,
    y: yArray,
    type: 'scatter',
    line: {
      smoothing: 1.2,
      shape: 'spline',
      width: 1.5,
      opacity: 1
    }
  }
}

export let options = {
  displaylogo: false,
  scrollZoom: false,
  responsive: true,
  showLink: false,
  modeBarButtonsToRemove: [
    'hoverClosestCartesian',
    'hoverCompareCartesian',
    'toggleSpikelines',
    'hoverClosest3d'
  ]
}

export let layout = {
  scene: {
    xaxis: {
      showlegend: true,
      tickmode: 'linear',
      title: { text: 'x' },
      //range: [0, 6],
      tick0: 0,
      dtick: null, //xwidth * 0.2
      tickmode: 'auto',
      nticks: 4
      //fixedrange: true
    },
    yaxis: {
      showlegend: true,
      tickmode: 'linear',
      title: { text: 'y' },
      //range: [0,10],
      tick0: 0,
      dtick: null, // ywidth * 0.2
      tickmode: 'auto',
      nticks: 4

      // fixedrange: true
    },
    zaxis: {
      showlegend: true,
      tickmode: 'auto',
      nticks: 5,
      title: { text: 'z' },
      range: null //[zMin, zMax]
    },
    camera: {
      eye: {
        x: 1,
        y: 1,
        z: 1.2
      }
    }
  },
  title: null, //'$\\color{brown}{V(x,y)=y^2-2 y-x^3-2 x^2-2 x}$',

  dragmode: true,
  showlegend: false,
  hovermode: false,
  autosize: false,
  width: null,
  height: null
}
export function getDataSurface(funct, center, xwidth, ywidth, xsteps, ysteps) {
  let x, y

  let xArray = []
  let yArray = []
  let zArray = []

  let xcenter = center.x
  let ycenter = center.y

  let yaxisStep = ywidth / ysteps
  let xaxisStep = xwidth / xsteps

  for (let i = 0; i < ysteps; i++) {
    y = yaxisStep * i - ycenter
    yArray.push(y)
    zArray[i] = []
    for (let j = 0; j < xsteps; j++) {
      x = xaxisStep * j - xcenter
      xArray.push(x)
      let value = funct.apply(this, [x, y])
      zArray[i].push(value)
    }
  }
  let zMax = Math.max(...[].concat(...zArray))
  let zMin = Math.min(...[].concat(...zArray))

  // console.log('zMin=', zMin)
  // console.log('zMax=', zMax)

  let data = {
    x: xArray,
    y: yArray,
    z: zArray,
    type: '', // 'contour', surface

    showscale: false, // no colorbar
    colorscale: 'Viridis',
    // ‘Bluered’, ‘Blackbody’,‘Blues’, ‘Earth’, ‘Electric’,
    // ‘Greens’, ‘Greys’, ‘Hot’, ‘Jet’, ‘Picnic’, ‘Portland’,
    // ‘Rainbow’,‘RdBu’, ‘Reds’, ‘Viridis’, ‘YlGnBu’,‘YlOrRd’
    //autocontour: false,
    line: {
      smoothing: 1,
      width: 2
    },

    contours: {
      z: {
        show: true,
        start: zMin * 1.2,
        end: zMax * 1.2,
        size: (zMax - zMin) * 0.05,
        autocontour: true,
        ncontours: 30,
        usecolormap: true,
        // color: 'lightbrown', //'olive',
        highlightcolor: 'red',
        highlightwidth: 16,
        project: { z: true }
      },
      y: {
        show: true,
        // start: -ywidth * 0.6 /* 10% of offset */,
        // end: ywidth * 0.6,
        // size: ywidth * 0.05,
        autocontour: true /* contours attrib picked by algorithm, ncontours = contours levels */,
        ncontours: 30,
        color: 'lightblue',
        highlightcolor: 'red',
        highlightwidth: 16,
        project: { y: true }
      },
      x: {
        show: true,
        // start: -xwidth * 0.6,
        // end: xwidth * 0.6,
        // size: xwidth * 0.05,
        autocontour: true,
        ncontours: 30,
        color: 'lightgreen',
        highlightcolor: 'red',
        highlightwidth: 16,
        project: { x: true }
      }
    }
  }
  return data
}
