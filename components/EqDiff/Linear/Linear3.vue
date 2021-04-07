<template>
  <v-container fluid>
    <Question>
      <template v-slot:exercise>
        Exercício 3:
      </template>

      <template>
        Encontre o valor de $y_0$ para que a solução de
        <span style="color:green">
          $$y'+1/4 y = 1- t/2, \, y(0)=y_0$$
        </span>
        <span style="color: green">encoste mas não atravesse o eixo $x$. </span>
      </template>
    </Question>
    <v-row>
      <v-col>
        <Slinear3 />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Question from '@/components/EqDiff/Question'
import Slinear3 from '@/components/EqDiff/Linear/Textos/Slinear3'

export default {
  components: {
    Question,
    Slinear3
  },

  methods: {},
  head() {
    return {
      // title: 'Eq. Diferenciais Lineares',
      // meta: [
      //   {
      //     hid: 'Eq. Diferenciais Lineares',
      //     name: 'Eq. Diferenciais Lineares',
      //     content: 'q. Diferenciais Lineares'
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
  font-size: 12px;
  /* font-weight: 700; */
  line-height: 1.5;
  /* font-family: 'Rock Salt', cursive; */
}
</style>
