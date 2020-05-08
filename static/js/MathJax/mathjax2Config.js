MathJax.Hub.Config({
  TeX: {
    Macros: {
      e: '{\\textrm e}',
      R: '{\\mathbb R}',
      Z: '{\\mathbb Z}',
      KK: '{\\bf K}'
    }
  },
  jax: ['input/TeX', 'output/HTML-CSS'],
  extensions: ['tex2jax.js'], //tex2jax.js necessary for centering displaymath?
  TeX: {
    extensions: ['AMSmath.js', 'AMSsymbols.js', 'AMScd.js']
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
  'HTML-CSS': {
    fonts: ['TeX'],
    styles: {
      '.MathJax': { color: 'green' }
      // '.MathJax a': { color: 'green' }
    }
  },
  displayAlign: 'center',
  showProcessingMessages: false,
  menuSettings: { zoom: 'Double-Click', mpContext: true, mpMouse: true }
})

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
