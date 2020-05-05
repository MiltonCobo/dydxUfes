MathJax.Hub.Config({
  showProcessingMessages: false,
  tex2jax: {
    inlineMath: [
      ['$', '$'],
      ['\\(', '\\)']
    ],
    processEscapes: true
  },
  jax: ['input/TeX', 'output/HTML-CSS'],
  TeX: {
    extensions: ['AMSmath.js', 'AMSsymbols.js', 'AMScd.js'],
    TagSide: 'left',
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
    processEscapes: true // necessario para $ nao seja confundido
  }
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
