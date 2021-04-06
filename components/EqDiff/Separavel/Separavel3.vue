<template>
  <v-container fluid>
    <Question>
      <template v-slot:exercise>
        Exercício 2:
      </template>

      <template>
        Resolva o problema de valor inicial $$\color{green}{ \frac{dy}{dx} =
        \frac{2-\exp(x)}{3+2y}, \quad y(0) = 0, }$$ encontre o domínio da
        solução e determine onde a solução atinge seu valor máximo.
      </template>
    </Question>
    <v-row>
      <v-col>
        <Sseparavel3 />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Question from '@/components/EqDiff/Question'
import Sseparavel3 from '@/components/EqDiff/Separavel/Textos/Sseparavel3'

export default {
  name: 'Text1',
  components: {
    Question,
    Sseparavel3
  },
  mounted() {
    // MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'mathjax'])
  },
  head() {
    return {
      // title: 'Eq. Separável',
      // meta: [
      //   {
      //     hid: 'Eq. Separável',
      //     name: 'Eq. Separável',
      //     content: 'Eq. Separável de primeira ordem'
      //   }
      // ],
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
.js-plotly-plot .plotly .modebar {
  position: relative;
  left: -20%;
}
</style>
