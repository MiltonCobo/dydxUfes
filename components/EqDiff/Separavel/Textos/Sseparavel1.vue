<template>
  <v-container>
    <v-row>
      <h3 style="color: green;margin-bottom:0.3cm;text-decoration: underline;">
        Solução:
      </h3>
    </v-row>
    <v-spacer />
    <v-row>
      <p id="solution">
        $\def\R{\mathbb R}$ Separamos as variáveis $$ \color{green}{2(y-1)\, dy
        = (3x^2+4x+2)\, dx} $$ e integramos a ambos lados, obtendo que as
        soluções $y=f(x)$ da equação diferencial moram
        <span style="color:green">implícitamente</span> nas curvas $$
        \color{green}{ y^2-2y = x^3+2x^2+2x+C} \quad \textrm{(eq1)} $$ com $C$
        variando em $\R.$ Assim, as soluções da equação são as curvas de nível
        da função $$\color{green}{z=V(x,y) = y^2-2y -x^3-2x^2-2x}.$$
        <v-btn
          id="mathjax"
          @click.stop="openFigure = true"
          color="green lighten-4"
        >
          Ver Gráfico
        </v-btn>
        <br />
        Usando a condição inicial $x=0, y=-1$ na equação (eq1) obtemos que
        $1-2(-1)=1+2=C$, isto é, a solução do problema de valor inicial (PVI)
        mora implícitamente na curva de nível $\color{green}{V(x,y)=3}$.
      </p>
      <p>
        Em geral não é possível achar a solução de forma
        <span style="color:green"> explícita $y=f(x).$ </span> No caso presente,
        entretanto, é possível obter a solução explícita do PVI. Chamamos
        $\color{green}{\Delta = x^3+2x^2+2x+3}$ e colocamos $y$ em evidência na
        equação $\color{green}{y^2-2y-\Delta =0}.$ Isto é, $$ \color{green}{y=
        \frac{-(-2)\pm \sqrt{(-2)^2 - 4\Delta}}{2} =
        1\pm\sqrt{x^3+2x^2+2x+4}},$$ Assim, no gráfico da curva
        $\color{green}{y^2-2y = x^3+2x^2+2x+3}$ se encontram
        <span style="color:green;">escondidas</span> duas funções.
        <v-btn
          style="margin:10px;"
          id="mathjax"
          @click.stop="openFigure2 = true"
          color="green lighten-4"
        >
          Ver Gráfico
        </v-btn>
      </p>

      <p>
        Como queremos que $y(0)=-1,$ precisamos tomar sinal de "menos", isto é,
        a solução do PVI é dada por $\color{green}{y=1-\sqrt{x^3+2x^2+2x+4}}.$
        Notemos que $\color{green}{x^3+2x^2+2x+4 = (x+2)(x^2+4)}$ e portanto o
        polinômio $\color{green}{p(x)=x^3+2x^2+2x+4}$ só tem uma única raiz real
        $x=-2$ e é fácil ver que $p(x) \ge 0$ somente se $x \ge -2,$ assim nossa
        solução tem domínio $$\color{green}{ \textrm{Domínio } = \{x\in\R: x\ge
        -2 \} = [-2,\infty). } $$
      </p>
    </v-row>

    <v-dialog v-model="openFigure" max-width="600">
      <v-card style="background-color:gainsboro;">
        <v-card-actions>
          <client-only placeholder="carregando...">
            <vue-plotly :data="data" :layout="layout" :options="options" />
          </client-only>
          <v-card-text id="mathjax" style="font-family: Lucida Console;">
          </v-card-text>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="openFigure2" max-width="600">
      <v-card style="background-color:gainsboro;">
        <v-card-actions>
          <client-only placeholder="carregando...">
            <vue-plotly :data="data2" :layout="layout2" :options="options" />
          </client-only>
          <v-card-text id="mathjax" style="font-family: Lucida Console;">
          </v-card-text>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { drawSurfaceSep1 } from '@/static/js/Separavel/separavel1.js'
import { drawContoursSep1 } from '@/static/js/Separavel/separavel1.js'

export default {
  data() {
    let info = drawSurfaceSep1()
    let data = info.data
    let layout = info.layout
    let options = info.options

    let info2 = drawContoursSep1()
    let data2 = info2.data
    let layout2 = info2.layout

    return {
      openFigure: false,
      openFigure2: false,
      data,
      layout,
      options,
      data2,
      layout2
    }
  },
  mounted() {
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'mathjax'])
  }
}
</script>
