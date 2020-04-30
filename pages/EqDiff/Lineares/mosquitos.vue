<template>
  <v-sheet id="mathjax">
    <h3 style="color:brown;">Exercício:</h3>
    <h4>
      A população de mosquitos numa determinada área cresce a uma taxa
      proporcional à população atual e, na ausência de predadores, a população
      dobra a cada semana. Inicialmente temos $ 900 $ mil mosquitos na área e os
      predadores comem $100$ mil mosquitos por dia. Encontre a população de
      mosquitos como função do tempo.
    </h4>
    <hr />
  </v-sheet>
</template>

<script>
export default {
  name: 'Text1',
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
  font-size: 22px;
  /* font-family: 'Montserrat', sans-serif; */
  font-family: 'Neucha', cursive;
  /* font-family: 'Rock Salt', cursive; */
}
</style>
