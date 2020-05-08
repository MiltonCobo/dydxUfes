<template>
  <v-container id="mathjax">
    <v-row>
      <Qlinear1 />
    </v-row>
    <hr style="margin:0.1cm;" />
    <v-row>
      <Slinear1 />
    </v-row>
  </v-container>
</template>

<script>
import Qlinear1 from '@/components/EqDiff/Linear/Textos/Qlinear1'
import Slinear1 from '@/components/EqDiff/Linear/Textos/Slinear1'

export default {
  name: 'Text1',
  components: {
    Qlinear1,
    Slinear1
  },
  mounted() {
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'mathjax'])
  },
  head() {
    return {
      title: 'Eq. Diferenciais Lineares',
      meta: [
        {
          hid: 'Eq. Diferenciais Lineares',
          name: 'Eq. Diferenciais Lineares',
          content: 'q. Diferenciais Lineares'
        }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: 'stylesheet',
          href:
            'https://fonts.googleapis.com/css2?family=Rock+Salt&display=swap'
        }
      ]
    }
  }
}
</script>

<style scoped>
#mathjax {
  /* font-size: 15px; */
  /* font-family: 'Montserrat', sans-serif; */
  /* font-family: 'Neucha', cursive; */
  /* font-family: Lucida Console; */
  /* font-family: 'Rock Salt', cursive;
  font-weight: 700;
  line-height: 1.8; */
}

p {
  /* font-size: 12px; */
  /* font-weight: 700; */
  /* line-height: 1.5; */
  /* font-family: 'Rock Salt', cursive; */
}
</style>
