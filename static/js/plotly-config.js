export { data, getDataSurface }

let data = {
  x: [],
  y: [],
  z: [],
  type: 'contour',

  showscale: false, // not show colorbar
  colorscale: 'RdBu',
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

let getDataSurface = function(funct, center, xwidth, ywidth, xsteps, ysteps) {
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
  return {
    x: xArray,
    y: yArray,
    z: zArray
  }
}
