window.MathJax = {
  tex2jax: {
    inlineMath: [
      ['$', '$'],
      ['\\(', '\\)']
    ],
    processEscapes: true
  },
  tex: {
    macros: {
      e: '{\\textrm e}',
      R: '{\\mathbb R}'
    },
    inlineMath: [
      ['$', '$'],
      ['\\(', '\\)']
    ]
  }
}

// MathJax.Hub.Config({
//   showProcessingMessages: false,
//   tex2jax: {
//     inlineMath: [
//       ['$', '$'],
//       ['\\(', '\\)']
//     ],
//     processEscapes: true
//   },
//   // jax: ['input/TeX', 'output/HTML-CSS'],
//   TeX: {
//     TagSide: 'left',
//     Macros: {
//       RR: '{\\bf R}',
//       e: '\\textrm{e}',
//       R: '\\mathbb{R}',
//       bold: ['{\\bf #1}', 1]
//     }
//   },
//   tex2jax: {
//     inlineMath: [
//       ['$', '$'],
//       ['(', ')']
//     ],
//     displayMath: [
//       ['$$', '$$'],
//       ['[', ']']
//     ],
//     processEscapes: true // necessario para $ nao seja confundido
//   }
// })
