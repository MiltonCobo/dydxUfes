<template>
  <div>
    <v-container class="mathjax" fluid>
      <v-row>
        <h3 style="color:green;margin-bottom:0.5cm;text-decoration: underline;">
          Exercício 3:
        </h3>
      </v-row>
      <v-row>
        <Qseparavel3 />
      </v-row>
      <v-divider />
      <v-spacer />
      <v-row>
        <h3
          style="color: green;margin:0.5cm 0cm 0.5cm 0cm;text-decoration: underline;"
        >
          Solução:
        </h3>
        <Sseparavel3 />
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Qseparavel3 from '@/components/EqDiff/Separavel/Textos/Qseparavel3'
import Sseparavel3 from '@/components/EqDiff/Separavel/Textos/Sseparavel3'

export default {
  name: 'Text1',
  components: {
    Qseparavel3,
    Sseparavel3
  },
  mounted() {
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'mathjax'])
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
