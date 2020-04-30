<template>
  <v-sheet id="mathjax">
    Durante a 1ª Guerra Mundial a pesca no mar Adriático foi severamente
    restrita. Após a Guerra os pescadores italianos reportaram o aumento
    ostensível dos tubarões nesse mar, mas não assim o aumento na população de
    suas presas. O biólogo italiano
    <a href="https://it.wikipedia.org/wiki/Umberto_D%27Ancona" target="_blank">
      Umberto D'Ancona
    </a>
    documentou este fato como parte de uma pesquisa. Em 1926, D'Ancona casou-se
    com uma das filhas do matemático italiano
    <a href="https://es.wikipedia.org/wiki/Vito_Volterra" target="_blank"
      >Vito Volterra</a
    >
    quem se intrigou muito pelo fato dos predadores ter sido favorecidos pela
    restrição à pesca. As discussões entre D'Ancona e Volterra levaram
    posteriomente ao famoso modelo
    <a
      href="https://en.wikipedia.org/wiki/Lotka%E2%80%93Volterra_equations"
      target="_blank"
    >
      predador-presa</a
    >
    do qual falaremos aqui (publicado em 1942, em italiano, e em inglês em 1954
    sob o nome de "A luta pela existência"). Simultâneamente o matemático
    americano
    <a href="https://en.wikipedia.org/wiki/Alfred_J._Lotka" target="_blank">
      Alfred Lotka</a
    >
    (era também, físico, químico e estatístico!) propôs as mesmas equações,
    chamadas agora "Equações de Lodka-Volterra". Com estas equações eles
    tentaram responder à pergunta:
    <h3 style="color: green">
      Por que a restrição da pesca favoreceu o predador e não sua presa?
    </h3>
  </v-sheet>
</template>

<script>
export default {
  name: 'Text1',
  mounted() {
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
