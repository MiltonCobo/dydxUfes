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
        <v-sheet style="margin-top: 0.3cm;">
          $\def\R{\mathbb R}$ Separamos as variáveis $$ {2(y-1)\, dy =
          (3x^2+4x+2)\, dx} $$ e integramos a ambos lados, obtendo que as
          soluções $y=f(x)$ da equação diferencial moram
          <span style="color:green">implícitamente</span> nas curvas $$ { y^2-2y
          = x^3+2x^2+2x+C} \quad \textrm{(eq1)} $$ com $C$ variando em $\R.$
          Assim, as soluções da equação são as curvas de nível da função
          <v-btn large @click.stop="openFigure = true" color="green lighten-4">
            Ver Gráfico
          </v-btn>
          <br />
          $${z=V(x,y) = y^2-2y -x^3-2x^2-2x}.$$ Usando a condição inicial $x=0,
          y=-1$ na equação (eq1) obtemos que $1-2(-1)=1+2=C$, isto é, a solução
          do problema de valor inicial (PVI) mora implícitamente na curva de
          nível ${V(x,y)=3}$. Em geral não é possível achar a solução de forma
          <span style="color:var(--mjx-green);"> explícita $y=f(x).$ </span> No
          caso presente, entretanto, é possível obter a solução explícita do
          PVI. Chamamos ${\Delta = x^3+2x^2+2x+3}$ e colocamos $y$ em evidência
          na equação ${y^2-2y-\Delta =0}.$ Isto é, $$ {y= \frac{-(-2)\pm
          \sqrt{(-2)^2 - 4\Delta}}{2} = 1\pm\sqrt{x^3+2x^2+2x+4}},$$ Assim, no
          gráfico da curva ${y^2-2y = x^3+2x^2+2x+3}$ se encontram
          <span style="color:var(--mjx-green);">escondidas</span> duas funções.
          <v-btn large @click.stop="openFigure2 = true" color="green lighten-4">
            Ver Gráfico
          </v-btn>
          <br />
          Como queremos que $y(0)=-1,$ precisamos tomar sinal de "menos", isto
          é, a solução do PVI é dada por ${y=1-\sqrt{x^3+2x^2+2x+4}}.$ Notemos
          que ${x^3+2x^2+2x+4 = (x+2)(x^2+4)}$ e portanto o polinômio
          ${p(x)=x^3+2x^2+2x+4}$ só tem uma única raiz real $x=-2$ e é fácil ver
          que $p(x) \ge 0$ somente se $x \ge -2,$ assim nossa solução tem
          domínio $${ \textrm{Domínio } = \{x\in\R: x\ge -2 \} = [-2,\infty). }
          $$
        </v-sheet>
      </v-col>
    </v-row>

    <v-dialog transition="fab-transition" v-model="openFigure" max-width="600">
      <v-card style="background-color:gainsboro;">
        <v-card-actions>
          <client-only placeholder="carregando...">
            <vue-plotly :data="data" :layout="layout" :options="options" />
          </client-only>
          <v-card-text class="mathjax" style="font-family: Lucida Console;">
          </v-card-text>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog transition="fab-transition" v-model="openFigure2" max-width="600">
      <v-card style="background-color:gainsboro;">
        <v-card-actions>
          <client-only placeholder="carregando...">
            <vue-plotly :data="data2" :layout="layout2" :options="options" />
          </client-only>
          <v-card-text class="mathjax" style="font-family: Lucida Console;">
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
    //MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'mathjax'])
  }
}
</script>
