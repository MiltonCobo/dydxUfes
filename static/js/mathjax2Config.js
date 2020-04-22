// MathJax.Hub.Config({
//   extensions: ['tex2jax.js'],
//   jax: ['input/TeX', 'output/HTML-CSS'],
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
//   'HTML-CSS': { fonts: ['TeX'] }
// })

window.MathJax = {
  tex: {
    inlineMath: [
      ['$', '$'],
      ['\\(', '\\)']
    ],
    macros: {
      RR: '{\\bf R}',
      e: '{\\textrm e}',
      R: '{\\mathbb R}',
      Q: '{\\mathbb Q}'
    },
    processEscapes: true
  }
}
