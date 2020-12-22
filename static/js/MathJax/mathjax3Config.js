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
  let script = document.createElement('script')
  script.type = 'text/javascript'
  script.id = 'MathJax-script'
  script.src = 'https://polyfill.io/v3/polyfill.min.js?features=es6'
  //'https://cdnjs.cloudflare.com/ajax/libs/mathjax/3.0.0/es5/latest?tex-svg.js'
  //script.async = true
  // script.defer = false
  document.head.appendChild(script)

  let script2 = document.createElement('script')

  script2.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js' //mml-chtml.js'
  //'https://cdnjs.cloudflare.com/ajax/libs/mathjax/3.0.0/es5/latest?tex-svg.js'
  script2.async = true
  // script.defer = false
  document.head.appendChild(script2)
})()
