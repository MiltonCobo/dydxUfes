window.MathJax = {
  jax: ['input/TeX', 'output/CommonHTML'],
  extensions: ['tex2jax.js', 'Safe.js'],
  styles: {
    '.mjx-chtml': { padding: '0.1em 0.1em' },
    '.MJXc-display, .mjx-chtml': { color: 'var(--mjx-green)' } //'#2E7D32' CSS variable in default.vue
  },
  displayAlign: 'center',

  TeX: {
    extensions: ['AMSmath.js', 'AMSsymbols.js', 'AMScd.js'],
    Macros: {
      e: '{\\textrm{e}}',
      R: '{\\mathbb{R}}',
      Z: '{\\mathbb Z}',
      KK: '{\\mathbb{K}}'
    }
  },
  tex2jax: {
    inlineMath: [
      ['$', '$'],
      ['\\(', '\\)']
    ],
    displayMath: [
      ['$$', '$$'],
      ['\\[', '\\]']
    ],
    processEscapes: true
  },
  CommonHTML: {
    scale: 100,
    linebreaks: { automatic: false }
  },

  showProcessingMessages: false,
  menuSettings: { zoom: 'Double-Click', mpContext: true, mpMouse: true }
}
;(function() {
  let script = document.createElement('script')
  script.src = 'https://cdn.jsdelivr.net/npm/mathjax@2/MathJax.js' //?config=TeX-AMS-MML_SVG' //TeX-AMS_HTML'
  // 'https://cdn.jsdelivr.net/npm/mathjax@2.7.8/MathJax.js?config=TeX-AMS-MML_SVG'
  script.async = true
  document.head.appendChild(script)
})()
