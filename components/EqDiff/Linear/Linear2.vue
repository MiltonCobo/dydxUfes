<template>
  <div>
    <v-container fluid>
      <Question>
        <template v-slot:exercise>
          Exercício 2:
        </template>

        <template>
          Descreva o comportamento das soluções do problema de valor inicial
          $$\color{green}{ y' - {1\over 2} y = 2\cos(t), \quad y(0)=}
          \color{green}{a} $$ dependendo do valor inicial $\color{green}{a} .$
        </template>
      </Question>
      <v-spacer />
      <v-row>
        <v-col>
          <Slinear2 />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Question from '@/components/EqDiff/Question'
import Slinear2 from '@/components/EqDiff/Linear/Textos/Slinear2'

export default {
  data() {
    return {}
  },
  name: 'Text1',

  components: {
    Question,
    Slinear2
  },
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

<style scoped></style>
