window.MathJax = {
  tex: {
    macros: {
      e: '{\\textrm e}',
      R: '{\\mathbb R}'
    },
    inlineMath: [
      ['$', '$'],
      ['\\(', '\\)']
    ]
  },
  svg: {
    fontCache: 'global'
  }
}
;(function() {
  var script = document.createElement('script')
  script.src =
    'https://cdnjs.cloudflare.com/ajax/libs/mathjax/3.0.0/es5/latest?tex-svg.js'
  script.async = true
  // script.defer = false
  document.head.appendChild(script)
})()
