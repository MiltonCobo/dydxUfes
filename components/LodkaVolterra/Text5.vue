<template>
  <v-sheet class="mathjax">
    <v-container fluid>
      <v-row align="center">
        <v-col sm="12" md="6">
          <h3 style="color:var(--mjx-green)">
            Qual foi a explicação dada por Volterra para o aumento da população
            de predadores no mar adriático por causa da guerra?
          </h3>

          A resposta é que a pesca prejudica o crescimento da população de
          presas, isto é, a pesca diminui o valor de $a.$ Lembramos que a
          variável $a$ se refere a fatores extrínsecos que constringem o
          crescimento das presas. Similarmente, a pesca aumenta a velocidade com
          que a população de predadores declina na ausência de presas, i.e., a
          pesca aumenta o valor de $c.$ Isto porque os pescadores pegavam nas
          suas redes tanto predadores como presas indiscriminadamente.

          <br />
        </v-col>
        <v-col sm="12" md="6" align="center" class="figure">
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
        <v-col>
          Por outro lado a pesca não altera a dinâmica intrínseca
          predador-presa, isto é, as constantes $b$ e $d$ permanecem
          inalteradas. Desta forma, o efeito da pesca será que a média $a/b$ da
          população dos tubarões diminui enquanto a média $c/d$ da população de
          atuns aumenta.
          <span style="color: var(--mjx-green)">
            Assim, de forma paradoxal, a pesca de atuns aumenta a média da
            população de atuns e diminui a média da população de tubarões!
          </span>
          <br />
          Na verdade este modelo somente é válido para uma pesca mais restrita
          com redes e barcos pequenos, desta forma os atuns se beneficiam mais
          pela captura do seu predador, o tubarão, do que se prejudicam pela
          própria pesca de atuns.<br />
          Entretanto, a restrição da pesca fará o contrário, a média dos
          tubarões aumenta e a média dos atuns diminui.

          <br />
          Observe na figura o efeito de diminuir $a$ de $5.3$ para $a'=3.6$ e
          aumentar $c=4.9$ para $c'=7.5$ . Note que como todas as soluções são
          periódicas, em certos momentos há muitas presas para poucos predadores
          e isto provoca o crescimento da população de predadores até termos a
          situação oposta, muito predador para pouca presa e o ciclo se repete.
          <br />
          As equações de Lotka-Volterra podem ser sofisticadas de várias formas,
          por exemplo introduzindo mais especies interdependentes.
          Particularmente para 3 especies, digamos um predador e duas presas,
          estas equações podem ter soluções caóticas, apresentando por exemplo
          um
          <a
            href="https://pt.wikipedia.org/wiki/Atractor_de_Lorenz"
            target="_blank"
            >atrator de Lorenz
          </a>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <ol>
            Referências:
            <li>
              <div>
                <a
                  href="https://pdfs.semanticscholar.org/30ca/85d9eaa25809d9d2814d8b79bcbec8e756d1.pdf"
                  target="_blank"
                >
                  Chaos in Low-Dimensional Lotka-Volterra Models of Competition
                  <br />
                </a>
              </div>
              <div>
                J. A. Vano,∗ J. C. Wildenberg, M. B. Anderson, J. K. Noel, and
                J. C. Sprott
              </div>
            </li>
          </ol>
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

<style scoped>
.figure {
  min-width: 400px;
  max-width: 600px;
  height: 24em;  /* apparently need a fix height */
  /* min-height: 400px;
  max-height: 500px; */
  background-color: inherit;
  margin: 0px;
  padding: 0px;
}
</style>
