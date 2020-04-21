import Vue from 'vue'
import vPlotly from '@statnett/vue-plotly'

const VuePlotly = {
  install(Vue) {
    Vue.component('vue-plotly', vPlotly)
  }
}
Vue.use(VuePlotly)
export default VuePlotly

// import Vue from 'vue'
// import VuePlotly from '@statnett/vue-plotly'

// // Declare install function executed by Vue.use()
// export function install(Vue) {
//   if (install.installed) return
//   install.installed = true
//   Vue.component('vue-plotly', VuePlotly)
// }

// // Create module definition for Vue.use()
// const plugin = {
//   install
// }

// // Auto-install when vue is found (eg. in browser via <script> tag)
// let GlobalVue = null
// if (typeof window !== 'undefined') {
//   GlobalVue = window.Vue
// } else if (typeof global !== 'undefined') {
//   GlobalVue = global.Vue
// }
// if (GlobalVue) {
//   GlobalVue.use(plugin)
// }

// // To allow use as module (npm/webpack/etc.) export component
// export default VuePlotly
