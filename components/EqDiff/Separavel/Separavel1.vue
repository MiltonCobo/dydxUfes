<template>
  <v-container id="mathjax">
    <v-row>
      <Qseparavel1 />
    </v-row>
    <hr style="margin:0.1cm;" />
    <v-row>
      <Sseparavel1 />
    </v-row>
  </v-container>
</template>

<script>
import Qseparavel1 from '@/components/EqDiff/Separavel/Textos/Qseparavel1'
import Sseparavel1 from '@/components/EqDiff/Separavel/Textos/Sseparavel1'

export default {
  name: 'Text1',
  components: {
    Qseparavel1,
    Sseparavel1
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
