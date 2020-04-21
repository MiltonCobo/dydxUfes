<template>
  <div>NOVA COMP</div>
</template>

<script>
export default {}
</script>

<style></style>

/*
<template>
  <div>
    <client-only>
      <my-chart></my-chart>
    </client-only>
  </div>
</template>
*/ /*
<script>
import mychart from '@/components/mychart.vue'

export default {
  components: {
    //'my-chart': mychart
    // this different (webpack) import did the trick together with <no-ssr>:
    'my-chart': mychart //() => import('@/components/mychart.vue')
  }
}
</script>
*/
