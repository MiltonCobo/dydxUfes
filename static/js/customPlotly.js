var Plotly = require('plotly.js/lib/core.js')

Plotly.register([
  require('plotly.js/lib/mesh3d'),
  require('plotly.js/lib/scatter'),
  require('plotly.js/lib/scatter3d'),
  require('plotly.js/lib/contour'),
  require('plotly.js/lib/surface'),
  require('plotly.js/lib/calendars') // is necessay for some surfaces to show up!
  // require('plotly.js/lib/heatmap')
  // require('plotly.js/lib/cone'),
])

module.exports = Plotly
