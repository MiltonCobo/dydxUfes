<template>
  <div>
    <v-container fluid>
      <Question>
        <template v-slot:exercise>
          Exercício 1:
        </template>

        <template>
          A população de mosquitos numa determinada área cresce a uma taxa
          proporcional à população atual e, na ausência de predadores, a
          população dobra a cada semana. Inicialmente temos $ 900 $ mil
          mosquitos na área e os predadores comem $100 $ mil mosquitos por dia.
          Encontre a população de mosquitos como função do tempo.
        </template>
      </Question>
      <v-row>
        <v-col>
          <Slinear1 />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Question from '@/components/EqDiff/Question'
import Slinear1 from '@/components/EqDiff/Linear/Textos/Slinear1'

export default {
  name: 'Linear1',
  components: {
    Question,
    Slinear1
  },
  mounted() {},
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

<style scoped></style>
