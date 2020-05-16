<template>
  <v-sheet class="mathjax">
    <v-container fluid>
      <v-row wrap>
        <v-col justify-start xs="12" md="6">
          As soluções das equações de Lodka-Volterra tem uma característica
          importante:
          <span style="color:  var(--mjx-green);">
            O valor médio da população de atuns, em qualquer trajetória, é $c/d$
            e o valor médio para os tubarões é $a/b$,</span
          >
          isto é, $${1\over T}\int_0^T x(t) dt = c/d, \quad\quad {1\over
          T}\int_0^T y(t) dt = a/b.$$ De fato pelas equações (EQs), $ {d\over
          dx} \ln(x) = x'/x= a-b\,y $ então integrando e usando que $x(T)=x(0)$
          porque as soluções são periódicas,
          $$\begin{split}0&=\ln(x(T))-\ln(x(0))=\int_0^T {d\over dt} \ln(x) \,dt
          \\ &= \int_0^T a-b\, y(t)\, dt \end{split} $$ de onde $ {1\over
          T}\int_0^T y(t) dt = a/b.$ A outra igualdade é similar.
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
          <h4 style="color:var(--mjx-green)">
            Qual foi a explicação dada por Volterra para o aumento da população
            de tubarões no mar adriático por causa da guerra?
          </h4>

          A resposta é que a pesca prejudica o crescimento intrínseco da
          população de presas, isto é, a pesca diminui o valor de $a.$ Por outro
          lado, a pesca aumenta a velocidade intrínseca com que a população de
          predadores declina na ausência de presas, i.e., aumenta o valor de
          $c.$ Isto porque os pescadores pegavam nas suas redes tanto predadores
          como presas indiscriminadamente.

          <br />

          Por outro lado a pesca não altera a dinâmica intrínseca
          predador-presa, isto é, as constantes $b$ e $d$ permanecem
          inalteradas. Assim, o efeito da pesca será que a média $a/b$ da
          população dos tubarões diminui enquanto a média $c/d$ da população de
          atuns aumenta.
          <span style="color: var(--mjx-green)">
            Assim, de forma paradoxal, a pesca aumenta a média da população de
            atuns e diminui a média da população de tubarões!. Entretanto, a
            restrição da pesca fará o contrário, a média dos tubarões aumenta e
            a média dos atuns diminui.
          </span>
          <br />
          Observe na figura o efeito de diminuir $a$ de $5.3$ para $a'=3.6$ e
          aumentar $c=4.9$ para $c'=7.5$. Note que como todas as soluções são
          periódicas, em certos momentos há muitas presas para poucos predadores
          e isto provoca o crescimento da população de predadores até termos a
          situação oposta, muito predador para pouca presa e o ciclo se repete.
          <br />
          As equações de Lotka-Volterra podem ser sofisticadas de várias formas,
          por exemplo introduzindo mais especies interdependentes.
          Particularmente para 3 especies, digamos um predador e duas presas,
          estas equações podem ter soluções caóticas, apresentando por exemplo
          um "atrator de Lorenz".
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
