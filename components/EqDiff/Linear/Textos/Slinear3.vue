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
        <div style="margin-top: 1rem;">
          A equação é linear e o fator integrante é $\mu(t)=\e^{t/4}.$ Portanto,
          $$\e^{t/4} (y' + \frac{1}{4} y) = \frac{d}{dt} (\e^{t/4} y) = \e^{t/4}
          - \frac{1}{2}t\,\e^{t/4}, $$ e integrando respeito de $t,$ $$ \e^{t/4}
          y = \int \e^{t/4} \, dt - \frac{1}{2} \int t\,\e^{t/4}\,dt + C \quad
          \textrm{(eq1)}. $$ Claramente $\int \e^{t/4} \, dt = 4\e^{t/4} + C.$
          Por outro lado, usando integração por partes, chegamos a que $$\int
          t\, \e^{at}\, dt = \frac{1}{a} t\, \e^{at}- \frac{1}{a^2}\e^{at} + C$$
          e para $a=1/4$, $\int t\, \e^{t/4}\, dt = 4 t\, \e^{t/4}- 16\e^{t/4} +
          C.$ Portanto, substituindo estes resultados na equação (eq1) obtemos
          $$ \begin{align*} \e^{t/4} y &= 4 \e^{t/4} \, dt - \frac{1}{2} ( 4 t\,
          \e^{t/4}- 16\e^{t/4} ) + C, \quad\color{black}{\textrm{ isto é, }} \\
          y(t) &= 12 -2t +C\e^{-t/4}. \end{align*} $$ Usando a condição inicial
          $y(0)=y_0$ obtemos que ${C= (y_0-12)}.$ Assim, a solução do problema
          de valor inicial é $$ y(t) = 12 - 2t + {(y_0-12)} \e^{-t/4} \quad
          \textrm{(eq2)}. $$ Precisamos agora determinar o valor de $y_0$ para o
          qual a solução
          <span style="color:var(myGreen)">
            encosta mas não atravessa o eixo $x$.</span
          >
          Que significa isto? Significa que, para algum valor $t=t_0$, a solução
          <span style="color:var(myGreen)">
            toca o eixo $x$, isto é $y(t_0)=0$, e é tangente nesse ponto a este
            eixo, isto é, $y'(t_0)=0$.</span
          >
          <br />
          Uma maneira de tentar achar o valor de ${t_0}$ (que muitos alunos
          tentam) é tentar resolver o sistema de equações $$\begin{split} y(t_0)
          &= 12 - 2t_0 +(y_0-12)\e^{-t_0/2} = 0 \\ y'(t_0) &= 2 - \frac{1}{2}
          (y_0-12)\e^{-t_0/2} = 0, \end{split} $$ para ${t_0}$ e ${y_0}$. No
          entanto, isto não é possível. Se isolamos uma variável (digamos $t_0$
          na segunda equação), e substituimos na outra equação, obtemos uma
          equação igualmente complicada (com logaritmos em lugar de
          exponenciais). Assim, devemos procurar uma outra forma de achar $y_0$.
          A resposta é olhar para a própria equação diferencial, ${ y'(t)+
          (1/4)\, y(t) = 1-(1/2)\, t. }$ Esta equação é válida
          <span style="color: var(myGreen)">
            para todo $t$ no domínio da função $y$, em particular vale no ponto
            ${t_0}$!
          </span>
          Portanto obtemos que $ \cancelto{0}{y'(t_0) }+ (1/4)\,
          \cancelto{0}{y(t_0) }= 0 = 1-(1/2)\, t_0. $ Isto implica que ${t_0 = 2
          }$ !
          <br />
          Sabendo que ${t_0=2}$ então resolvemos $${ y(2)= 12 -2\cdot 2 +
          (y_0-12) \e^{-2/4} = 0} $$ obtendo-se que ${ y_0 = 12-8\sqrt{\e}}.$
          Substituindo na equação (eq2) temos que $${ y(t) = 12 - 2t -
          {8\sqrt{\e}}\, \e^{-t/4} }.$$ A figura mostra que realmente ${t=2}$ é
          um ponto de tangência desta função.
          <v-btn @click.stop="openFigure = true" large color="green lighten-4">
            Ver gráfico
          </v-btn>
          <br />
          Note que se ${y_0=12}$ na equação (eq2) então a solução o PVI é a
          linha reta $y=12- 2t.$ É fácil ver que todas as soluções da equação
          são "assintóticamente equivalentes" à reta $y=12-2t$ quando
          $t\to\infty.$ Por assintóticamente equivalentes entendemos que
          $\lim_{t\to\infty} {y(t)\over {12-2t}} = 1$ para toda solução $y(t)$
          da equação.
        </div>
      </v-col>
    </v-row>

    <v-dialog
      v-model="openFigure"
      :width="clientWidth"
      :height="clientHeight"
      transition="fab-transition"
      class="figure"
    >
      <v-card style="background-color:gainsboro;" :loading="loading" outlined>
        <v-card-text
          class="mathjax figure"
          align="center"
          style="padding-top:2rem; font-family: 'Lucida Grande', sans-serif;"
        >
          Gráfico da solução $$y(t)=12 - 2t -\color{brown}{8 \sqrt{e}
          }\,\exp(-t/4).$$
        </v-card-text>
        <v-card-actions class="flex-column align-start">
          <client-only>
            <vue-plotly
              placeholder="carregando..."
              :data="data"
              :layout="layout"
              :options="options"
            />
          </client-only>
          <v-btn color="light-green" @click="openFigure = false">
            Voltar
          </v-btn>
          <v-card-text
            class="gainsboro mathjax"
            style="font-family: 'Lucida Grande', sans-serif;"
          >
            Esta função apresenta uma tangência com o eixo $t$ no ponto $t_0=2$
            e é assintótica à reta $y = 12 -2t$ quando $t\to\infty.$
          </v-card-text>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
// import vuePlotly from '@statnett/vue-plotly'
import { drawLinear3 } from '@/static/js/Linear/Slinear3'

export default {
  components: { 'vue-plotly': () => import('@statnett/vue-plotly') },
  data() {
    let info = drawLinear3()
    let data = info.data
    let layout = info.layout
    let options = info.options

    let clientWidth
    let clientHeight

    return {
      openFigure: false,
      loading: false,
      data,
      layout,
      options,

      clientWidth,
      clientHeight
    }
  },
  mounted() {
    this.clientWidth = Math.min(document.documentElement.clientWidth, 700) // save initial values of width,height
    this.clientHeight = Math.min(document.documentElement.clientHeight, 700)
  },
  updated() {
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'mathjax'])
  }
}
</script>

<style scoped></style>
