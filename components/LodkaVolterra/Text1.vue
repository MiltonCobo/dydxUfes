<template>
  <v-container fluid>
    <v-row align="center" no-gutters>
      <v-col sm="12" md="7">
        <p>
          Durante a 1ª Guerra Mundial (1914-1917) a pesca no mar adriático foi
          severamente restrita. Após a Guerra os pescadores italianos reportaram
          o aumento ostensível dos predadores nesse mar, mas não assim o aumento
          na população de suas presas. O biólogo italiano Umberto D'Ancona
          documentou este fato como parte de uma pesquisa, registrando a
          proporção de predadores capturados pelos pescadores (tubarões,
          arraias, etc) nos portos de Fiume, Trieste e Veneza no período de 1914
          a 1923.
        </p>
      </v-col>
      <v-col sm="12" md="5" align="center">
        <img
          src="~/assets/figures/lebrelince.png"
          width="300px"
          height="250px"
          contain
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <p>
          Ele observou que tal proporção era maior durante e imediatamente após
          a guerra, quando a pesca estava minguada. D'Ancona concluiu que a
          dinâmica predador-presa estava mais próxima do seu equilíbrio natural
          neste período e que era a pesca que alterava este equilíbrio,
          prejudicando de alguma forma mais os predadores que suas presas.
          <br />
          D'Ancona era casado com uma das filhas do destacado matemático
          italiano Vito Volterra. Naquele momento não existia nenhuma explicação
          biológica ou ecológica para este fenômeno e D'Ancona perguntou ao
          Volterra se ele podería elaborar um modelo matemático para o mesmo. Em
          apenas alguns meses Volterra elaborou varios modelos, o mais simple
          dos quais será abordado aqui. Ele é conhecido como
          <a
            href="https://en.wikipedia.org/wiki/Lotka%E2%80%93Volterra_equations"
            target="_blank"
          >
            modelo predador-presa
          </a>
          e foi publicado como parte de um livro em 1942 em italiano, e em
          inglês em 1954 sob o nome de "A luta pela existência". O matemático
          americano Alfred Lotka (era também, físico, químico e estatístico!)
          propôs mais ou menos ao mesmo tempo, equações similares chamadas agora
          de "Equações de Lotka-Volterra".
          <br />
          Com estas equações eles tentaram responder à pergunta:
        </p>

        <br />
        <h3 style="color: var(--myGreen); font-size: 1.2rem;">
          Porque a restrição da pesca favoreceu mais o predador do que a presa?
        </h3>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { volterraContours } from '@/static/js/LodkaVolterra/contours'

export default {
  name: 'Text1',
  data() {
    let info = volterraContours()
    let data = info.data
    let layout = info.layout
    let options = info.options

    return {
      startChart: true,
      data,
      layout,
      options
    }
  },
  mounted() {}
}
</script>

<style scoped></style>
