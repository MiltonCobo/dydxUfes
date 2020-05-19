<template>
  <v-sheet class="mathjax">
    Durante a 1ª Guerra Mundial (1914-1917) a pesca no mar adriático foi
    severamente restrita. Após a Guerra os pescadores italianos reportaram o
    aumento ostensível dos predadores nesse mar, mas não assim o aumento na
    população de suas presas. O biólogo italiano Umberto D'Ancona documentou
    este fato como parte de uma pesquisa, registrando a proporção de predadores
    capturados pelos pescadores (tubarões, arraias, etc) nos portos de Fiume,
    Trieste e Veneza no período de 1914 a 1923. Ele observou que tal proporção
    era maior durante e imediatamente após a guerra, quando a pesca estava
    severamente restrita. D'Ancona concluiu que a dinâmica predador-presa estava
    mais próxima do seu equilíbrio natural neste período e que era a pesca que
    alterava este equilíbrio, favorecendo de alguma forma o predador. D'Ancona
    era casado com uma das filhas do destacado matemático italiano Vito
    Volterra. Naquele momento não existia nenhuma explicação biológica ou
    ecológica para este fenômeno e D'Ancona perguntou ao Volterra se ele podería
    elaborar um modelo matemático para o mesmo. Em apenas alguns meses Volterra
    elaborou varios modelos, o mais simple dos quais será abordado aqui. Ele é
    conhecido como

    <a
      href="https://en.wikipedia.org/wiki/Lotka%E2%80%93Volterra_equations"
      target="_blank"
    >
      modelo predador-presa</a
    >
    e foi publicado como parte de um livro em 1942 em italiano, e em inglês em
    1954 sob o nome de "A luta pela existência". O matemático americano
    <!-- <a href="https://en.wikipedia.org/wiki/Alfred_J._Lotka" target="_blank"> -->
    Alfred Lotka
    <!-- </a> -->
    (era também, físico, químico e estatístico!) propôs mais ou menos ao mesmo
    tempo, equações similares chamadas agora de "Equações de Lotka-Volterra".
    Com estas equações eles tentaram responder à pergunta:
    <h3 style="color: var(--mjx-green)">
      Por que a restrição da pesca favoreceu mais o predador do que sua presa?
    </h3>
  </v-sheet>
</template>

<script>
export default {
  name: 'Text1',
  mounted() {
    if (!window.MathJax) {
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = '../../../js/MathJax/mathjax2Config.js'
      script.addEventListener('load', this.onMathJaxLoaded)
      document.head.appendChild(script)
    } else {
      MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'mathjax'])
    }
  },
  onMathJaxLoaded() {
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'mathjax'])
  }
}
</script>

<style scoped>
/* #mathjax { 
  font-family: 'Comic Sans MS', cursive, sans-serif; 
  font-family: 'Neucha', cursive;
  font-family: 'Montserrat', sans-serif; margin: 20px; 
   }  */
</style>
