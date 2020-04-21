drawSurface = function(div_figure) {
  let xwidth = 6
  let ywidth = 10
  let xcenter = xwidth / 2
  let ycenter = (ywidth - 2) / 2
  var ysteps = 30
  var xsteps = 30
  let center = {
    x: xcenter,
    y: ycenter
  }

  function funct(x, y) {
    return y * y - 2 * y - x * x * x - 2 * x * x - 2 * x
  }

  let da0 = getDataSurface(funct, center, xwidth, ywidth, xsteps, ysteps)

  let data0 = {
    x: da0.x,
    y: da0.y,
    z: da0.z,
    type: 'surface',

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

  var layout = {
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

    plot_bgcolor: 'lightgrey',
    paper_bgcolor: 'lightgrey',
    showlegend: false,
    hovermode: false,
    autosize: false,
    width: 600,
    height: 600
    // margin: {
    //     l: 0,
    //     r: 0,
    //     b: 0,
    //     t: 100,
    //   },
  }

  plotData = [data0]
  console.log('passou em drawFigyre')
  window.Plotly.newPlot(div_figure, plotData, layout, {
    displaylogo: false,
    scrollZoom: false,
    responsive: true,
    showLink: false,
    modeBarButtonsToRemove: ['hoverClosest3d']
  })
} // End

function getDataSurface(funct, center, xwidth, ywidth, xsteps, ysteps) {
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
