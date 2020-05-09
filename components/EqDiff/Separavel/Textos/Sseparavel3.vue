<template>
  <v-container>
    <v-row class="flex-wrap-reverse">
      <v-col xs="12" md="6" order="1">
        <client-only placeholder="carregando...">
          <vue-plotly :data="data" :layout="layout" :options="options" />
        </client-only>
      </v-col>
      <v-col xs="12" md="6" order="2">
        <p id="solution">
          $\def\e{\textrm e}$ Separando as variáveis, $ \color{green}{ (3+2y) \,
          dy = (2-\exp(x)) \, dx},$ e integrando a ambos lados, obtemos que as
          soluções $y=f(x)$ da equação diferencial moram nas curvas de nível da
          função $$ \color{green}{V(x,y) = y^2+3y-2x + \exp(x)}.$$ (ver figura).
          Neste caso é possível achar a solução explícita do PVI. Observe que
          podemos isolar $y$ na equação $\color{green}{y^2+3y-2x + \exp(x) -C
          =0} $ fazendo $\color{green}{\Delta = \exp(x) - 2x -C}$ e usando a
          fórmula quadrática, chegando-se a $$\color{green}{ y =
          \frac{-3\pm\sqrt{9-4\Delta}}{2} =\frac{-3\pm\sqrt{(9 -4C)+8x
          -4\e^x}}{2}}\,\textrm{(eq1)} $$
        </p>
      </v-col>
    </v-row>

    <v-row>
      <p>
        Vemos que a curva de nível $V(x,y)=C$ esconde duas funções $y=f(x).$
        Para verificar a condição inicial $x=0, y=0,$ precisamos tomar sinal de
        "mais" e o valor de $C$ deve ser $\color{green}{C=-1}.$ Portanto a
        solução explícita do problema de valor inicial é $$\color{green}{ y =
        \frac{-3 +\sqrt{(13+8x)-4\e^x}}{2}} \quad\textrm{(eq2).}$$
      </p>
    </v-row>
    <v-row class="flex-wrap-reverse">
      <v-col xs="12" md="6" order="4">
        <p id="solution">
          <br />
          Para determinar onde esta função atinge seu máximo precisamos
          encontrar os pontos críticos, i.e., os valores de $x$ onde $y'(x) =
          0.$ Podemos usar diretamente na expressão explícita de $y(x)$ na
          equação (eq2), mas é mais simples é olhar para a expressão de $y'(x) =
          (2-\e^x)/(3+2y) = 0.$ Concluimos fácilmente que $y'(x)=0$ se e somente
          se $\color{green}{x= \ln(2)\approx 0.69.}$
          <br />
          Para determinar que se trata de um máximo podemos usar o critério da
          segunda derivada na equação (eq1) mas isto sería bastante trabalhoso.
          <br />
          É mais fácil fazer o seguinte.
        </p>
      </v-col>
      <v-col xs="12" md="6" order="3">
        <client-only placeholder="carregando...">
          <vue-plotly :data="data2" :layout="layout2" :options="options" />
        </client-only>
      </v-col>
    </v-row>

    <v-row>
      <p id="solution">
        Note que
        <span style="color: green">
          $y(x)$ é positivo quando $x=\ln(2)$, logo por continuidade, $y(x)>0$
          para $x$ próximo de $\ln(2).$
        </span>
        Portanto o denominador $3+2y$ da derivada $dy/dx$ é positivo perto de
        $x=\ln(2)$ e o sinal da derivada depende inteiramente do numerador
        $2-\e^x.$ É fácil ver então que
        <span style="color:green">
          $y'(x) > 0$ se $ x< \ln(2)$ e $y'(x) < 0$ se $ x > \ln(2),$ isto é, a
          derivada $y'(x)$ esta decrescendo ao passar por $x=\ln(2),$ o que
          implica que $y(x)$ passa por um máximo em $\color{green}{x=\ln(2).}$
        </span>
      </p>
    </v-row>
    <v-row class="flex-wrap">
      <v-col xs="12" md="6" order="5">
        <client-only placeholder="carregando...">
          <vue-plotly :data="data3" :layout="layout3" :options="options" />
        </client-only>
      </v-col>
      <v-col xs="12" ms="6" order="4">
        <p id="solution">
          Uma outra observação é que a derivada $y'(x)$ não está bem definida
          para $y=-3/2,$ e podemos ver na figura que é sobre esta reta que as
          curvas de nível são separadas em duas soluções da equação diferencial.
          Sobre o domínio da solução do PVI : Vemos na equação (eq1) que $y(x)$
          estará definida para valores de $x$ tais que $\color{green}{ (13 +
          8x)-4\exp(x) \ge 0. }$ Na figura podemos notar que aproximadamente no
          intervalo $\color{green}{[-1.5, 1.97]}$ a função $y=13+8x$ está acima
          de $y=4\exp(x)$ e portanto $y(x)$ está bem definida nesse intervalo.
          <br />
          Notemos também que não é possível resolver explícitamente a equação
          $\color{green}{ (13 + 8x)-4\exp(x) = 0, }$ precisamos usar algum
          software para aproximar numéricamente os valores de $x$.
          <br />
          <span style="color:green">
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
  data() {
    let info = drawSurfaceSep3()
    let data = info.data
    let layout = info.layout
    let options = info.options

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
  mounted() {
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'mathjax'])
  }
}
</script>