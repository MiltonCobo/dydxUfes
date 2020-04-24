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
    'https://cdn.jsdelivr.net/npm/mathjax@2/MathJax.js?config=TeX-AMS-MML_SVG' //'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js'
  script.async = false
  script.defer = false
  document.head.appendChild(script)
})()
