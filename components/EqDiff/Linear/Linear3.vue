<template>
  <div>
    <v-container id="mathjax" fluid>
      <v-row>
        <h3 style="color:green;margin-bottom:0.5cm;text-decoration: underline;">
          Exercício 3:
        </h3>
      </v-row>
      <v-row>
        <Qlinear3 />
      </v-row>
      <v-divider />
      <v-spacer />
      <v-row>
        <h3
          style="color: green;margin:0.5cm 0cm 0.5cm 0cm;text-decoration: underline;"
        >
          Solução:
        </h3>
        <Slinear3 />
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Qlinear3 from '@/components/EqDiff/Linear/Textos/Qlinear3'
import Slinear3 from '@/components/EqDiff/Linear/Textos/Slinear3'

export default {
  components: {
    Qlinear3,
    Slinear3
  },

  methods: {},
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
  font-size: 12px;
  /* font-weight: 700; */
  line-height: 1.5;
  /* font-family: 'Rock Salt', cursive; */
}
</style>
