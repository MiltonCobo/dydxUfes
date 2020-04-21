window.MathJax = {
  loader: {
    load: ['[tex]/tagFormat', '[tex]/color']
  },
  startup: {
    elements: ['#mathjax'],
    typeset: true,
    ready: () => {
      console.log('MathJax is loaded, but not yet initialized')
      MathJax.startup.defaultReady()
      console.log('MathJax is initialized, and the initial typeset is queued')
    }
  },

  tex: {
    packages: { '[+]': ['color'] },
    inlineMath: [
      ['$', '$'],
      ['\\(', '\\)']
    ],
    macros: {
      e: '{\\textrm{e}}',
      R: '{\\mathbb R}',
      Q: '{\\mathbb Q}'
    }
  },
  svg: {
    fontCache: 'global'
  }
}
;(function() {
  let script = document.createElement('script')
  //script.src = 'cdn.jsdelivr.net/npm/mathjax@2/MathJax.js'

  script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-svg.js'
  ;(script.async = false),
    (script.defer = false),
    document.head.appendChild(script)
})()
