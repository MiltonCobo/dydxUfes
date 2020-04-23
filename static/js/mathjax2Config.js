// MathJax.Hub.Config({
//   TeX: {
//     Macros: {
//       RR: '{\\bf R}',
//       R: '{\\mathbb R}',
//       e: '{\\textrm e}',
//       bold: ['{\\bf #1}', 1]
//     }
//   }
// })

//MathJax.Ajax.loadComplete('[MathJax]/config/local/local.js')

window.MathJax = {
  tex2jax: {
    inlineMath: [
      ['$', '$'],
      ['\\(', '\\)']
    ],
    processEscapes: true
  }
}

// MathJax.Hub.Config({
//   TeX: {
//     Macros: {
//       RR: '{\\bf R}',
//       R: '{\\mathbb R}',
//       bold: ['{\\bf #1}', 1]
//     }
//   }
// })
// ;(function() {
//   let script = document.createElement('script')
//   //script.src = 'cdn.jsdelivr.net/npm/mathjax@2/MathJax.js'
//   script.src =
//     'https://cdn.jsdelivr.net/npm/mathjax@2/MathJax.js?config=TeX-AMS-MML_SVG'
//   script.async = true
//   script.defer = true
//   document.head.appendChild(script)
// })()
