<template>
  <v-container pa="0" ma="0" fluid>
    <v-row>
      <v-col>
        <h3 style="color:green; margin-top: 1rem;">
          Solução:
        </h3>
        <v-divider />
      </v-col>
    </v-row>

    <v-row class="flex-wrap-reverse" align="center" no-gutters>
      <v-col
        v-touch="{ left: () => swipeLeft(), right: () => swipeRight() }"
        align="center"
        sm="12"
        md="7"
        order="1"
        id="figure1"
        class="figure"
        ref="figure1"
      >
        <client-only placeholder="carregando...">
          <vue-plotly :data="data" :layout="layout" :options="options" />
        </client-only>
      </v-col>
      <v-col sm="12" md="5" order="2">
        <p>
          Separando as variáveis, $ { (3+2y) \, dy = (2-\exp(x)) \, dx},$ e
          integrando a ambos lados, obtemos que as soluções $y=f(x)$ da equação
          diferencial moram nas curvas de nível da função $$ {V(x,y) = y^2+3y-2x
          + \exp(x)}.$$ (ver figura). Neste caso é possível achar a solução
          explícita do PVI. Observe que podemos isolar $y$ na equação
          $${y^2+3y-2x + \exp(x) -C =0} $$ fazendo ${\Delta = \exp(x) - 2x -C}$
          e usando a fórmula quadrática, chegando-se a
        </p>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <p>
          $$ y = {-3\pm\sqrt{9-4\Delta}\over 2} =
          {-3\pm\sqrt{(9-4C)+8x-4\e^x}\over 2}, \textrm{(eq1)}$$ Vemos que a
          curva de nível $V(x,y)=C$ esconde duas funções $y=f(x).$ Para
          verificar a condição inicial $x=0, y=0,$ precisamos tomar sinal de
          "mais" e o valor de $C$ deve ser ${C=-1}.$ Portanto a solução
          explícita do problema de valor inicial é $${ y = \frac{-3
          +\sqrt{(13+8x)-4\e^x}}{2}} \quad\textrm{(eq2).}$$
        </p>
      </v-col>
    </v-row>
    <v-row class="flex-wrap-reverse" align="center" no-gutters>
      <v-col sm="12" md="5" order="4">
        <p>
          Para determinar onde esta função atinge seu máximo precisamos
          encontrar os pontos críticos, i.e., os valores de $x$ onde $y'(x) =
          0.$ Podemos usar diretamente na expressão explícita de $y(x)$ na
          equação (eq2), mas é mais simples é olhar para a expressão de $y'(x) =
          (2-\e^x)/(3+2y) = 0.$ Concluimos fácilmente que $y'(x)=0$ se e somente
          se ${x= \ln(2)\approx 0.69.}$
          <br />
          Para determinar que se trata de um máximo podemos usar o critério da
          segunda derivada na equação (eq1) mas isto sería bastante trabalhoso.
          <br />
          É mais fácil fazer o seguinte. Note que
          <span style="color: var(--myGreen)">
            $y(x)$ é positivo quando $x=\ln(2)$, logo por continuidade, $y(x)>0$
            para $x$ próximo de $\ln(2).$
          </span>
        </p>
      </v-col>
      <v-col
        sm="12"
        md="7"
        order="3"
        align="center"
        ref="figure2"
        class="figure"
      >
        <client-only placeholder="carregando...">
          <vue-plotly :data="data2" :layout="layout2" :options="options" />
        </client-only>
      </v-col>
    </v-row>

    <v-row>
      <v-col md="12" order="4">
        <p>
          Portanto o denominador $3+2y$ da derivada $dy/dx$ é positivo perto de
          $x=\ln(2)$ e o sinal da derivada depende inteiramente do numerador
          $2-\e^x.$ É fácil ver então que
          <span style="color:var(--myGreen)">
            $y'(x) \gt 0$ se $ x \lt \ln(2)$ e $y'(x) \lt 0$ se $ x \gt \ln(2),$
            isto é, a derivada $y'(x)$ esta decrescendo ao passar por
            $x=\ln(2),$ o que implica que $y(x)$ passa por um máximo em
            ${x=\ln(2).}$
          </span>
        </p>
      </v-col>
    </v-row>
    <v-row no-gutters align="center">
      <v-col sm="12" md="7" align="center" ref="figure2" class="figure">
        <client-only placeholder="carregando...">
          <vue-plotly :data="data3" :layout="layout3" :options="options" />
        </client-only>
      </v-col>
      <v-col>
        <p>
          Uma outra observação é que a derivada $y'(x)$ não está bem definida
          para $y=-3/2,$ e podemos ver na figura que é sobre esta reta que as
          curvas de nível são separadas em duas soluções da equação diferencial.
          Sobre o domínio da solução do PVI : Vemos na equação (eq1) que $y(x)$
          estará definida para valores de $x$ tais que ${ (13 + 8x)-4\exp(x) \ge
          0. }$ Na figura podemos notar que aproximadamente no intervalo
          ${[-1.5, 1.97]}$ a função $y=13+8x$ está acima de $y=4\exp(x)$ e
          portanto $y(x)$ está bem definida nesse intervalo.
          <br />
          Notemos também que não é possível resolver explícitamente a equação ${
          (13 + 8x)-4\exp(x) = 0, }$ precisamos usar algum software para
          aproximar numéricamente os valores de $x$.
          <br />
          <span style="color:var(--myGreen)">
            Para que valor da constante $C$ a curva de nível $V(x,y)=C$ fica
            reduzida a um ponto? Justifique.
          </span>
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { drawSurfaceSep3 } from '@/static/js/Separavel/separavel3.js'
import { drawContoursSep3 } from '@/static/js/Separavel/separavel3.js'
import { drawFunctionsSep3 } from '@/static/js/Separavel/separavel3.js'

export default {
  components: {
    'vue-plotly': () => import('@statnett/vue-plotly')
  },

  data() {
    let info = drawSurfaceSep3()
    let data = info.data
    let layout = info.layout

    //layout.autosize = false

    let options = info.options
    // options.displayModeBar = false

    let info2 = drawContoursSep3()
    let data2 = info2.data
    let layout2 = info2.layout

    let info3 = drawFunctionsSep3()
    let data3 = info3.data
    let layout3 = info3.layout

    return {
      data,
      layout,
      options,
      data2,
      layout2,
      data3,
      layout3
    }
  },
  created() {},

  mounted() {
    let w, h

    this.layout.autosize = false

    w = Math.min(this.$refs.figure1.clientWidth, 600)
    h = Math.min(this.$refs.figure1.clientHeight, 650)

    this.layout.width = w
    this.layout.height = Math.max(h, w)
    this.layout2.width = w
    this.layout2.height = Math.max(h, w)
    this.layout3.width = w
    this.layout3.height = Math.max(h, w)
  },
  methods: {
    swipeLeft() {
      this.$store.discardTouch(true)
    },
    swipeRight() {
      this.$store.discardTouch(true)
    }
  }
}
</script>

<style scoped></style>
