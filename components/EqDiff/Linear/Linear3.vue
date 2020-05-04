<template>
  <v-sheet id="mathjax">
    <v-container>
      <v-row>
        <Qlinear3 />
      </v-row>
      <v-spacer />
      <v-row>
        <Slinear3 />
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script>
import Qlinear3 from '@/components/EqDiff/Linear/Textos/Qlinear3'
import Slinear3 from '@/components/EqDiff/Linear/Textos/Slinear3'

export default {
  components: {
    Qlinear3,
    Slinear3
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
  font-size: 15px;
  /* font-family: 'Montserrat', sans-serif; */
  /* font-family: 'Neucha', cursive; */
  /* font-family: Lucida Console; */
  font-family: 'Rock Salt', cursive;
  font-weight: 700;
  line-height: 1.8;
}

p {
  font-size: 12px;
  /* font-weight: 700; */
  line-height: 1.5;
  /* font-family: 'Rock Salt', cursive; */
}
</style>
