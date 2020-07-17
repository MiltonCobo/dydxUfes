<template>
  <v-container class="mathjax" fluid>
    <v-row>
      <v-col>
        <h3 style="color:green; margin-top: 0.3cm;">
          Solução:
        </h3>
      </v-col>
    </v-row>
    <v-divider />
    <v-row>
      <v-col>
        <div style="margin-top: 0.3cm;">
          A equação é do tipo linear $\,\boxed{y'+p(t) y = g(t)}\,$ sendo o
          fator integrante $${\mu(t)=\e^{\int p(t) dt} = \e^{-\int (1/2) dt} =
          \e^{-t/2} }.$$ Desta forma temos $${ \begin{align*} \e^{-t/2} (y' -
          \frac{1}{2} y) &= \frac{d}{dt} (\e^{-t/2} y) = 2 \e^{-t/2} \cos(t),
          \color{black}{\textrm{ e por integração indefinida, } } \\ \e^{-t/2} y
          &= 2 \int \e^{-t/2} \cos(t) dt + C \quad \textrm{(eq1)}. \end{align*}
          } $$ Precisamos calcular a integral $ {\int \e^{a t} \cos(t) dt}$ com
          ${a=-1/2.}$ Lembremos a fórmula de integração por partes: $\boxed{
          \int u\, dv = u\, v - \int v\, du. } $ Portanto fazendo ${u =
          \e^{at},\, du = a\e^{at}}$ e ${dv = \cos(t) dt, \, v = \sin(t)} $
          temos $$\int u\, dv = \int \e^{a t} \cos(t) dt = \e^{at}\sin(t) - a
          \int \e^{at} \sin(t) dt, \, \textrm{(eq2)} $$ A segunda integral
          também pode ser integrada por partes usando ${u = \e^{at},\, du =
          a\e^{at}}$ e ${dv = \sin(t) dt, \, v = -\cos(t)} $ obtendo $${ \int
          \e^{a t} \sin(t) dt = -\e^{at}\cos(t) + a \int \e^{at} \cos(t) dt,
          \quad \textrm{(eq3)} } $$ Finalmente substituindo a equação (eq3) na
          equação (eq2) temos: $${ \int\e^{at}\cos(t)dt = \e^{at}\sin(t) +
          a\e^{at}\cos(t) -a^2\int\e^{at}\cos(t)dt, }$$ de onde $${(1+a^2) \int
          \e^{at}\cos(t)dt = \e^{at}\sin(t) + a\e^{at}\cos(t) + C, }$$ obtendo,
          $${\int\e^{at}\cos(t)dt = (\frac{1}{1+a^2}) \e^{at}\sin(t) +
          (\frac{a}{1+a^2})\e^{at} \cos(t) + C,} $$ ou, pondo ${a=-1/2}$, $${
          \int\e^{-t/2}\cos(t)dt = (\frac{4}{5}) \e^{-t/2}\sin(t) -
          (\frac{2}{5})\e^{-t/2} \cos(t) + C. }$$ Voltando então para a equação
          (eq1) temos que $$ { y(t) = (\frac{8}{5}) \sin(t) - (\frac{4}{5})
          \cos(t) + C \e^{t/2}. }$$ Pela condição inicial ${y(0)=a}$ temos que
          $\require{cancel}$ $$ y(0)=a = (\frac{8}{5})
          \cancel{\sin(0)}^{\color{red}{0}} - (\frac{4}{5})
          \cancel{\cos(0)}^{\color{red}{1}} + C
          \cancel{\e^{0}}^{\color{red}{1}}= -4/5 + C, $$ isto é, ${C=(4/5 +
          a)}$. Assim as soluções do problema de valor inicial são da forma: $$
          { y(t) = (\frac{8}{5}) \sin(t) - (\frac{4}{5}) \cos(t) +
          {(\frac{4}{5}+a)}\e^{t/2}. }$$
          <v-btn large @click.stop="openFigure = true" color="green lighten-4">
            Gráfico das soluções
          </v-btn>
          <br />
          O comportamento das soluções depende inteiramente do coeficiente
          ${(\frac{4}{5}+a)}$:
          <ul>
            <li>
              Se este número for positivo, isto é, se ${(a \gt -\frac{4}{5})}$
              então a solução explode para infinito positivo (por causa da
              exponencial) quando $t\to\infty$: $\lim_{t\to\infty}
              y(t)=+\infty.$
            </li>
          </ul>

          <ul>
            <li>
              se ${(a \lt -\frac{4}{5})}$ então a solução explode para infinito
              negativo quando $t\to\infty$: $\lim_{t\to\infty} y(t)=-\infty.$,
            </li>
            <li>
              se ${(a = -\frac{4}{5})}$ então a solução se torna
              $${y(t)=(\frac{8}{5}) \sin(t) - (\frac{4}{5}) \cos(t)} $$ que
              permanece
              <span style="color:var(--mjx-green)"> limitada</span>
              quando $t\to\infty.$ Isto significa que o módulo de $y(t)$ nunca é
              maior que um certo número $M>0, $ i.e., $| y(t) | < M \textrm{
              para todo } t>0.$
              <br />
              Observe que o limite $\lim_{t\to\infty} y(t)$
              <span style="color:var(--mjx-green)"> não existe </span> para esta
              função. O fato da função estar limitada não implica na existência
              deste limite.
              <br />
              Note também que quando $t\to -\infty$ a exponencial $\e^{t/2}\to
              0$ e todas as soluções $y(t)$ se aproximam muito rápido da solução
              periódica ${y(t)=(\frac{8}{5}) \sin(t) - (\frac{4}{5}) \cos(t)}.$
            </li>
          </ul>

          <v-dialog
            v-model="openFigure"
            width="600"
            height="700"
            transition="fab-transition"
          >
            <v-card>
              <v-card-actions class="flex-column align-start">
                <client-only v-if="openFigure">
                  <line-chart
                    style="width:500px; height:500px;"
                    :chartdata="data"
                    :options="options"
                  />
                </client-only>
                <v-btn color="light-green" @click="openFigure = false">
                  Voltar
                </v-btn>
              </v-card-actions>

              <v-card-text class="mathjax" style="font-family: Lucida Console;">
                $$ { y(t) = (\frac{8}{5}) \sin(t) - (\frac{4}{5}) \cos(t) +
                {(\frac{4}{5}+a)}\e^{t/2}. }$$ Para ${a=-0.8=-4/5}$ as soluções
                permanecem limitadas.
              </v-card-text>
            </v-card>
          </v-dialog>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { drawLinear2 } from '@/static/js/Linear/linear2.js'

export default {
  data() {
    let info = drawLinear2()
    let data = info.data
    let options = info.options

    return {
      openFigure: false,
      data,
      options // has been modified below from original
    }
  },

  mounted() {
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'mathjax'])
  },
  updated() {
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'mathjax'])
  }
}
</script>

<style></style>
