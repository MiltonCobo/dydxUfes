<template>
  <div>
    <v-container class="mathjax" fluid>
      <v-row>
        <h3 style="color:green;margin-bottom:0.5cm;text-decoration: underline;">
          Exercício 1:
        </h3>
      </v-row>
      <v-row>
        <Qseparavel1 />
      </v-row>
      <v-divider />
      <v-spacer />

      <v-row>
        <h3
          style="color: green;margin:0.5cm 0cm 0.5cm 0cm;text-decoration: underline;"
        >
          Solução:
        </h3>
        <Sseparavel1 />
      </v-row>
    </v-container>
  </div>
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
    //MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'mathjax'])
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
