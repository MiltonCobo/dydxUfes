<template>
  <v-sheet id="mathjax">
    <v-container fluid>
      <v-row align="center" wrap>
        <v-col align-center xs="12" style="width:600">
          <client-only>
            <vue-plotly
              v-if="startChart"
              :data="data"
              :layout="layout"
              :options="options"
            />
          </client-only>
        </v-col>
        <v-col xs="12">
          A figura mostra o gráfico de $V(x,y)$ para valores
          $\color{green}{a=5.3, b=0.12, c=4.9}$ e $\color{green}{d=0.14}$.
          <br />
          Note que as curvas de nível de $V$ são fechadas. De fato o gradiente
          $\color{green}{\nabla V(x,y)=(d-c/x, b-a/y)}$ se anula no ponto
          $\bar{p}=(c/d, a/b)$ e a matriz Hessiana de $V$ em
          $\color{green}{\bar{p}}$ é dada por $$\color{green}{\textrm{Hess }
          V(\bar{p}) = \begin{pmatrix} &d^2/c & 0 \\ &0 & b^2/a
          \end{pmatrix}.}$$ Pelo critério da segunda derivada $V$ tem um mínimo
          local em $\bar{p}$, isto é, $\color{green}{
          V(\frac{c}{d}+x,\frac{a}{b}+y) }$ é aproximadamente igual
          $$\color{green}{ V(\bar{p})+\frac{d^2}{c}\, x^2 +\frac{b^2}{a}\, y^2
          }$$ para $(x,y)$ muito pequenos e portanto, perto do ponto $\bar{p}$,
          o gráfico de $V$ é próximo de um paraboloide, com curvas de nível
          fechadas.
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script>
import { volterraSurface } from '@/static/js/LodkaVolterra/surfaces'

export default {
  name: 'Text4',

  data() {
    let info = volterraSurface()
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
  mounted() {
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'mathjax'])
  }
}
</script>
