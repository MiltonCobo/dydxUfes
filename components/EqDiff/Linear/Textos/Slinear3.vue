<template>
  <v-container>
    <v-row>
      <v-btn
        absolute
        right
        @click.stop="openFigure = true"
        color="green lighten-2"
      >
        Gráfico da solução
      </v-btn>
    </v-row>
    <v-spacer />
    <v-row>
      <h3 style="color: green;margin-bottom:0.3cm;text-decoration: underline;">
        Solução:
      </h3>
    </v-row>
    <v-spacer />
    <v-row>
      <p id="solution">
        A equação é linear e o fator integrante é $\mu(t)=\e^{t/4}.$ Portanto,
        $$\color{green}{ \begin{align*} \e^{t/4} (y' + \frac{1}{4} y) &=
        \frac{d}{dt} (\e^{t/4} y) = \e^{t/4} - \frac{1}{2}t\,\e^{t/4} \quad
        \color{black}{\textrm{, e integrando, } } \\ & \\ \e^{t/4} y &= \int
        \e^{t/4} \, dt - \frac{1}{2} \int t\,\e^{t/4}\,dt + C \quad
        \textrm{(eq1)}. \end{align*} } $$ Claramente $\int \e^{t/4} \, dt =
        4\e^{t/4} + C.$ Por outro lado, usando integração por partes, chegamos a
        que
        <span style="color: green">
          $$\int t\, \e^{at}\, dt = \frac{1}{a} t\, \e^{at}-
          \frac{1}{a^2}\e^{at} + C$$</span
        >
        e para $a=1/4$, $\int t\, \e^{t/4}\, dt = 4 t\, \e^{t/4}- 16\e^{t/4} +
        C.$ Portanto, substituindo estes resultados na equação (eq1) obtemos
        <span style="color: green">
          $$ \begin{align*} \e^{t/4} y &= 4 \e^{t/4} \, dt - \frac{1}{2} ( 4 t\,
          \e^{t/4}- 16\e^{t/4} ) + C, \quad\color{black}{\textrm{ isto é, }} \\
          y(t) &= 12 -2t +C\e^{-t/4}. \end{align*} $$
        </span>
        Usando a condição inicial $y(0)=y_0$ obtemos que $\color{green}{C=
        (y_0-12)}.$ Assim, a solução do problema de valor inicial é

        <span style="color: green">
          $$ y(t) = 12 - 2t + \color{green}{(y_0-12)} \e^{-t/4} \quad
          \textrm{(eq2)}. $$
        </span>

        Precisamos agora determinar o valor de $y_0$ para o qual a solução
        <span style="color:green"> encosta mas não atravessa o eixo $x$.</span>
        Que significa isto? Significa que, para algum valor $t=t_0$, a solução
        <span style="color:green">
          toca o eixo $x$, isto é $y(t_0)=0$, e é tangente nesse ponto a este
          eixo, isto é, $y'(t_0)=0$.</span
        >
        <br />
        Uma maneira de tentar achar o valor de $\color{green}{t_0}$ (que muitos
        alunos tentam) é tentar resolver o sistema de equações
        <span style="color: green">
          $$\begin{align*} y(t_0) &= 12 - 2t_0 +(y_0-12)\e^{-t_0/2} = 0 \\
          y'(t_0) &= 2 - \frac{1}{2} (y_0-12)\e^{-t_0/2} = 0, \end{align*} $$
        </span>
        para $t_0$ e $y_0$. No entanto, isto não é possível. Se isolamos uma
        variável (digamos $t_0$ na segunda equação), e substituimos na outra
        equação, obtemos uma equação igualmente complicada (com logaritmos em
        lugar de exponenciais). $\require{cancel}$
      </p>
    </v-row>

    <v-dialog
      v-model="openFigure"
      max-width="600"
      style="background-color:lightgrey;"
    >
      <v-card>
        <v-card-actions>
          <client-only placeholder="carregando...">
            <vue-plotly :data="data" :layout="layout" :options="options" />
          </client-only>
          <v-card-text id="mathjax" style="font-family: Lucida Console;">
          </v-card-text>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { drawLinear3 } from '@/static/js/Linear/Slinear3'

export default {
  data() {
    let info = drawLinear3()
    let data = info.data
    let layout = info.layout
    let options = info.options

    return {
      openFigure: false,
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
