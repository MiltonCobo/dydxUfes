import Vue from 'vue'
import { Line } from 'vue-chartjs'

Vue.component('line-chart', {
  extends: Line,
  props: ['options', 'chartdata'],
  mounted() {
    this.renderChart(this.chartdata, this.options)
  }
})

Vue.use(Line)

