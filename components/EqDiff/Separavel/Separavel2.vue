<template>
  <div>
    <v-container id="mathjax">
      <v-row>
        <h3 style="color:green;margin-bottom:0.5cm;text-decoration: underline;">
          Exercício 2:
        </h3>
      </v-row>
      <v-spacer />
      <v-row>
        <Qseparavel2 />
      </v-row>
      <v-divider />
      <v-spacer />

      <v-row>
        <h3
          style="color: green;margin:0.5cm 0cm 0.5cm 0cm;text-decoration: underline;"
        >
          Solução:
        </h3>
        <Sseparavel2 />
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Qseparavel2 from '@/components/EqDiff/Separavel/Textos/Qseparavel2'
import Sseparavel2 from '@/components/EqDiff/Separavel/Textos/Sseparavel2'

export default {
  name: 'Text1',
  components: {
    Qseparavel2,
    Sseparavel2
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
