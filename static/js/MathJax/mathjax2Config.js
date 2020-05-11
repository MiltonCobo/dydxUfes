// MathJax.Hub.Config({
//   jax: ['input/TeX', 'output/HTML-CSS'],
//   'HTML-CSS': {
//     fonts: ['TeX'],
//     styles: {
//       '.MathJax': { color: 'green' }
//       // '.MathJax a': { color: 'green' }
//     }
//   },
//   extensions: ['tex2jax.js'], //tex2jax.js necessary for centering displaymath?
//   TeX: {
//     extensions: ['AMSmath.js', 'AMSsymbols.js', 'AMScd.js'],
//     Macros: {
//       e: '{\\textrm{e}}',
//       R: '{\\mathbb{R}}',
//       Z: '{\\mathbb Z}',
//       KK: '{\\mathbb{K}}'
//     }
//   },
//   tex2jax: {
//     inlineMath: [
//       ['$', '$'],
//       ['\\(', '\\)']
//     ],
//     displayMath: [
//       ['$$', '$$'],
//       ['\\[', '\\]']
//     ],
//     processEscapes: true
//   },

//   displayAlign: 'center',
//   showProcessingMessages: false,
//   menuSettings: { zoom: 'Double-Click', mpContext: true, mpMouse: true }
// })

window.MathJax = {
  jax: ['input/TeX', 'output/CommonHTML'],
  extensions: ['tex2jax.js'], //tex2jax.js necessary for centering displaymath?

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
  showProcessingMessages: false,
  menuSettings: { zoom: 'Double-Click', mpContext: true, mpMouse: true },
  'HTML-CSS': {
    preferredFont: 'TeX',
    availableFonts: ['STIX', 'TeX'],
    styles: {
      scale: 120,
      '.MathJax': { padding: '0.1em 0.1em', color: 'green !important' },
      '.MathJax_Display': { 'text-align': 'center', color: 'green !important' }
      // '.MathJax a': { color: 'green' } , padding: '0.2em 0.2em'
    }
  }
}
;(function() {
  let script = document.createElement('script')
  script.src =
    'https://cdn.jsdelivr.net/npm/mathjax@2.7.8/MathJax.js?config=TeX-AMS-MML_SVG'
  script.async = true
  document.head.appendChild(script)
})()

// window.MathJax = {
//   displayAlign: 'center',
//   // tex2jax: {
//   //   inlineMath: [
//   //     ['$', '$'],
//   //     ['\\(', '\\)']
//   //   ],
//   //   processEscapes: true,
//   //   Macros: {
//   //     e: '{\\textrm e}',
//   //     R: '{\\textrm{R}^2}'
//   //   }
//   // }
//   tex: {
//     macros: {
//       e: '{\\textrm e}',
//       R: '{R^2}'
//     },
//     inlineMath: [
//       ['$', '$'],
//       ['\\(', '\\)']
//     ]
//   }
// }
