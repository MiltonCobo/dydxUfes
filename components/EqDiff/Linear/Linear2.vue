<template>
  <v-container id="mathjax" style="width:100%;">
    <v-row>
      <h3 style="color:green;margin-bottom:0.5cm;text-decoration: underline;">
        Exercício 2:
      </h3>
    </v-row>
    <v-spacer />

    <v-row>
      <Qlinear2 />
    </v-row>
    <v-divider />
    <!-- <v-spacer />
    <v-spacer />
    <v-row style="margin-top:0.5cm;">
      <v-btn
        absolute
        right
        @click.stop="openFigure = true"
        color="green lighten-2"
      >
        Gráfico das soluções
      </v-btn>
    </v-row> -->

    <v-spacer />
    <v-row>
      <h3
        style="color: green;margin:0.5cm 0cm 0.5cm 0cm;text-decoration: underline;"
      >
        Solução:
      </h3>
      <Slinear2 />
    </v-row>

    <!-- <v-spacer />

    <v-dialog v-model="openFigure" max-width="450">
      <v-card>
        <v-card-actions>
          <client-only v-if="openFigure">
            <line-chart id="mathjax" :chartdata="data" :options="options" />
          </client-only>
        </v-card-actions>

        <v-card-text id="mathjax" style="font-family: Lucida Console;">
          $$ \color{green}{ y(t) = (\frac{8}{5}) \sin(t) - (\frac{4}{5}) \cos(t)
          + \color{green}{(\frac{4}{5}+a)}\e^{t/2}. }$$ Para
          $\color{green}{a=-0.8=-4/5}$ a soluções permanecem limitadas.
        </v-card-text>
      </v-card>
    </v-dialog> -->
  </v-container>
</template>

<script>
import Qlinear2 from '@/components/EqDiff/Linear/Textos/Qlinear2'
import Slinear2 from '@/components/EqDiff/Linear/Textos/Slinear2'

export default {
  data() {
    return {}
  },
  name: 'Text1',

  components: {
    Qlinear2,
    Slinear2
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
  /* font-size: 18px; */
  /* font-family: 'Montserrat', sans-serif; */
  /* font-family: 'Neucha', cursive; */
  /* font-family: Lucida Console; */
  /* font-family: 'Rock Salt', cursive; */
  /* font-weight: 700;
  line-height: 1.2; */
}

p {
  /* font-size: 15px;
  font-family: Lucida Console; */
  /* font-weight: 700; */
  /* line-height: 1.2; */
  /* font-family: 'Rock Salt', cursive; */
}
</style>
