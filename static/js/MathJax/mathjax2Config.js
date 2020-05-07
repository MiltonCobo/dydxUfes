MathJax.Hub.Config({
  extensions: ['tex2jax.js'],
  jax: ['input/TeX', 'output/HTML-CSS'],
  TeX: {
    extensions: ['AMSmath.js', 'AMSsymbols.js', 'AMScd.js'],
    TagSide: 'right',

    Macros: {
      RR: '{\\bf R}',
      e: '{\\textrm e}',
      R: '{\\mathbb R}',
      Z: '{\\mathbb Z}',
      bold: ['{\\bf #1}', 1]
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
  'HTML-CSS': {
    fonts: ['TeX'],
    styles: {
      '.MathJax a': { color: 'green' }
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
