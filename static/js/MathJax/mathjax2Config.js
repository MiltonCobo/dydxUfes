window.MathJax = {
  jax: ['input/TeX', 'output/CommonHTML'],
  extensions: ['tex2jax.js', 'Safe.js'],
  styles: {
    '.mjx-chtml': { padding: '0.1em 0.1em', color: 'var(--mjx-green)' }
    // '.mjx-chtml': { color: 'var(--mjx-green)' } // .MJXc-display '#2E7D32' CSS variable in default.vue  'var(--mjx-green)'
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
    scale: 105,
    linebreaks: { automatic: false }
  },

  showProcessingMessages: false,
  menuSettings: { zoom: 'Double-Click', mpContext: true, mpMouse: true }
}
;(function() {
  let script = document.createElement('script')
  script.src = 'https://cdn.jsdelivr.net/npm/mathjax@2/MathJax.js'
  //  'https://cdn.jsdelivr.net/npm/mathjax@2.7.8/MathJax.js?config=TeX-AMS-MML_SVG'
  // 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.8/latest.js?config=TeX-AMS_SVG'
  //'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js?config=TeX-AMS_SVG'

  // 'https://cdn.jsdelivr.net/npm/mathjax@2/MathJax.js' //?config=TeX-AMS-MML_SVG'
  //script.integrity =
  //'sha512-3a//fktUW1yG8LJiA9gw3EyfUHBVWwXo3ZcAkajl69mY8dKzLPCxfDMLxGJ4VKHAtrw1mJE3yMj2F7oCCE3RxA=='
  //script.crossorigin = 'anonymous'
  // 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.8/latest.js?config=TeX-AMS-MML_SVG'
  //
  //'https://cdn.jsdelivr.net/npm/mathjax@2.7.8/latest.js?config=TeX-AMS-MML_SVG'
  script.async = true
  //script.defer = true
  document.head.appendChild(script)
})()
