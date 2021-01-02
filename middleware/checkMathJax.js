// export default function() {
//   console.log('running middleware!')
//   if (typeof window.MathJax === undefined) {
//     const script = document.createElement('script')
//     script.type = 'text/javascript'
//     script.defer = true
//     script.src = '/js/MathJax/mathjax2Config.js'
//     document.head.appendChild(script)
//     script.addEventListener('load', console.log('mathjax has been loaded!'))
//     //script.addEventListener('load', this.onMathJaxLoaded)
//   } else if (typeof MathJax.Hub !== 'undefined') {
//     // MathJax.typeset()
//     MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'mathjax'])
//     console.log('mathjax is already loaded in index.vue and typeset()')
//     //MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'mathjax'])
//     //console.log('MathJax.Hub!')
//   } else {
//     console.log('mathjax.typeset is not loaded....')
//   }
// }
