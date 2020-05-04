<template>
  <v-sheet id="mathjax">
    <v-container fluid>
      <v-row wrap>
        <v-col justify-start xs="12" md="6">
          As soluções das equações de Lodka-Volterra tem uma característica
          importante:
          <span style="color: green">
            O valor médio da população de atuns, em qualquer trajetória, é $c/d$
            e o valor médio para os tubarões é $a/b$,</span
          >
          isto é, $$ \color{green}{ {1\over T}\int_0^T x(t) dt = c/d, \quad\quad
          {1\over T}\int_0^T y(t) dt = a/b.}$$ De fato pelas equações
          <span style="font-size: 20px">(EQs)</span>, $\color{green}{ {d\over
          dx} \ln(x) = x'/x= a-b\,y, }$ então
          $$\color{green}{0=\ln(x(T))-\ln(x(0))=\int_0^T {d\over dt} \ln(x) \,dt
          = \int_0^T a-b\, y(t)\, dt }$$ de onde $\color{green}{ {1\over
          T}\int_0^T y(t) dt = a/b.}$ A outra igualdade é similar.
        </v-col>
        <v-col xs="12" md="6">
          <client-only>
            <vue-plotly
              v-if="startChart"
              :data="data"
              :layout="layout"
              :options="options"
            />
          </client-only>
        </v-col>
      </v-row>
      <v-row>
        <v-col xs="12">
          <h4 style="color:green">
            Qual foi a explicação dada por Volterra para o aumento da população
            de tubarões no mar adriático por causa da guerra?
          </h4>

          A resposta é que a pesca prejudica o crescimento intrínseco da
          população de presas, isto é, a pesca diminui o valor de $a.$ Por outro
          lado, a pesca aumenta a velocidade intrínseca com que a população de
          predadores declina na ausência de presas, i.e., aumenta o valor de
          $c.$ Isto porque os pescadores pegam nas suas redes tanto predadores
          como presas indiscriminadamente.

          <br />

          Por outro lado a pesca não altera a dinâmica intrínseca
          predador-presa, isto é, as constantes $b$ e $d$ permanecem
          inalteradas. Assim, o efeito da pesca será que a média $a/b$ da
          população dos tubarões diminui enquanto a média $c/d$ da população de
          atuns aumenta.
          <br />
          Observe na figura o efeito de diminuir $a$ de $5.3$ para $a'=3.6$ e
          aumentar $c=4.9$ para $c'=7.5$.
          <br />
          <h4 style="color:green">
            Não é paradoxal? A pesca aumentaria a média da população de atuns!.
          </h4>
          <br />
          Entretanto, a restrição da pesca fará o contrário, a média dos
          tubarões aumenta e a média dos atuns diminui.
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script>
import { volterraContours } from '@/static/js/LodkaVolterra/contours'
export default {
  name: 'Text5',
  data() {
    let info = volterraContours()
    let data = info.data
    let layout = info.layout
    let options = info.options

    return {
      startChart: true,
      data /* data use in the plot */,
      layout,
      options
    }
  },
  mounted() {
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'mathjax'])
  }
}
</script>
