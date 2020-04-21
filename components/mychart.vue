<template>
  <div>This is a new chart!</div>
</template>
<script>
import Plotly from 'plotly.js-dist'
export default {
  mounted() {
    // exists only on client:
    console.log(Plotly)
  },
  components: {
    Plotly
  }
}
</script>
