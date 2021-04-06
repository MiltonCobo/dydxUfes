<template>
  <v-container fluid>
    <Question>
      <template v-slot:exercise>
        Exercício 2:
      </template>

      <template>
        Resolva o problema de valor inicial $$\color{green}{ \frac{dy}{dx} =
        \frac{1+ 3x^2}{3y^2-6y}, \quad y(0) =1 }$$ e encontre o domínio da
        solução.
      </template>
    </Question>

    <v-row>
      <v-col>
        <Sseparavel2 />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Question from '@/components/EqDiff/Question'
import Sseparavel2 from '@/components/EqDiff/Separavel/Textos/Sseparavel2'

export default {
  name: 'Separavel2',
  components: {
    Question,
    Sseparavel2
  },
  mounted() {
    // if (MathJax.Hub) {
    //   MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'mathjax'])
    // }
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

<style scoped></style>
