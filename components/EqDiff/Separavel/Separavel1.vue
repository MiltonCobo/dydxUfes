<template>
  <v-container fluid>
    <Question>
      <template v-slot:exercise>
        Exercício 1:
      </template>

      <template>
        Ache a solução explícita do problema de valor inicial \[ \frac{dy}{dx} =
        \frac{3x^2+4x+2}{2(y-1)},\quad y(0)=-1, \] determinando o intervalo de
        validade da solução.
      </template>
    </Question>

    <v-row>
      <v-col>
        <Sseparavel1 />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Question from '@/components/EqDiff/Question'
import Sseparavel1 from '@/components/EqDiff/Separavel/Textos/Sseparavel1'

export default {
  name: 'Text1',
  components: {
    Sseparavel1,
    Question
  },
  mounted() {},
  updated() {},

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
        // { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        // {
        //   rel: 'stylesheet',
        //   href:
        //     'https://fonts.googleapis.com/css2?family=Rock+Salt&display=swap'
        // }
      ]
    }
  }
}
</script>

<style scoped></style>
