<template>
  <div>
    <h3 style="color: green;margin-bottom:0.3cm;text-decoration: underline;">
      Solução:
    </h3>

    <p id="solution"></p>
    <p>
      A equação é linear e o fator integrante é $\mu(t)=\e^{t/4}.$ Portanto,
      $$\color{green}{ \begin{align*} \e^{t/4} (y' + \frac{1}{4} y) &=
      \frac{d}{dt} (\e^{t/4} y) = \e^{t/4} - \frac{1}{2}t\,\e^{t/4} \quad
      \color{black}{\textrm{, e integrando, } } \\ & \\ \e^{t/4} y &= \int
      \e^{t/4} \, dt - \frac{1}{2} \int t\,\e^{t/4}\,dt + C \quad
      \textrm{(eq1)}. \end{align*} } $$ Claramente $\int \e^{t/4} \, dt =
      4\e^{t/4} + C.$ Por outro lado, usando integração por partes, chegamos a
      que
      <span style="color: green">
        $$\int t\, \e^{at}\, dt = \frac{1}{a} t\, \e^{at}- \frac{1}{a^2}\e^{at}
        + C$$</span
      >
      e para $a=1/4$, $\int t\, \e^{t/4}\, dt = 4 t\, \e^{t/4}- 16\e^{t/4} + C.$
      Portanto, substituindo estes resultados na equação (eq1) obtemos
      <span style="color: green">
        $$ \begin{align*} \e^{t/4} y &= 4 \e^{t/4} \, dt - \frac{1}{2} ( 4 t\,
        \e^{t/4}- 16\e^{t/4} ) + C, \quad\color{black}{\textrm{ isto é, }} \\
        y(t) &= 12 -2t +C\e^{-t/4}. \end{align*} $$
      </span>
      Usando a condição inicial $y(0)=y_0$ obtemos que $\color{green}{C=
      (y_0-12)}.$ Assim, a solução do problema de valor inicial é
      <span style="color: green"
        >$$ y(t) = 12 - 2t + \color{green}{(y_0-12)} \e^{-t/4} \quad
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
      Uma maneira de tentar achar o valor de $t_0$ (que muitos alunos tentam) é
      tentar resolver o sistema de equações
      <span style="color: green">
        $$\begin{align*} y(t_0) &= 12 - 2t_0 +(y_0-12)\e^{-t_0/2} = 0 \\ y'(t_0)
        &= 2 - \frac{1}{2} (y_0-12)\e^{-t_0/2} = 0, \end{align*} $$
      </span>
      para $t_0$ e $y_0$. No entanto, isto não é possível. Se isolamos uma
      variável (digamos $t_0$ na segunda equação), e substituimos na outra
      equação, obtemos uma equação igualmente complicada (com logaritmos em
      lugar de exponenciais). $\require{cancel}$
    </p>

    <!-- <v-container>
      <v-row>
        <v-col xs="12" md="6">
          <client-only placeholder="carregando...">
            <vue-plotly :data="data" :layout="layout" :options="options" />
          </client-only>
        </v-col>
        <v-col xs="12" md="6">
          <p id="solution">`</p>
        </v-col>
      </v-row>
    </v-container> -->
  </div>
</template>

<script>
import { getDataScatter } from '@/static/js/Plotly/plotly-config.js'
let inf = plotMosquitosSol()
let data = inf.data
let layout = inf.layout
let options = inf.options
export default {
  data() {
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

function plotMosquitosSol() {
  const a0 = 0.7 / Math.log(2)
  const inc = 0.23
  const iter = 14
  const step = 0.01
  const xwidth = 8.5
  const initial = -0.5

  let params = []
  var param
  params[0] = a0 - Math.floor(0.4 * iter) * inc

  function mapMosquitos(x) {
    // return a0+10*Math.sin(param*x);
    return a0 + (param - a0) * Math.pow(2, x)
  }

  //---define array A[]-------

  for (let i = 1; i < iter - 2; i++) {
    params[i] = params[i - 1] + inc
  }
  params.push(a0)
  params.push(0.9)

  //----------------------------

  var traces = [] // obtem as traces...
  for (let i = 0; i < iter; i++) {
    param = params[i]
    traces[i] = getDataScatter(mapMosquitos, initial, xwidth, step)
  }

  let data = traces
  let layout = {
    showlegend: false, // dont show names of traces
    autosize: true,
    hovermode: false,
    dragmode: false,
    // width: 500,
    height: 660,
    title: '$\color{green}{p(t)=a_0 + (p_0 - a_0) 2^x}$',
    xaxis: {
      range: [initial, xwidth],
      tickvals: [0, 2, 3.2, 4, 6],
      ticktext: ['0', '2', '3.2', '4', '6'],
      title: "<span style= 'color: Brown'> tempo (semanas) </span>"
    },
    yaxis: {
      range: [-20, 20],
      tickvals: [-20, -10, 0, 0.9, 10, 20],
      ticktext: ['-20', '10', '0', '0.9', '10', '20'],
      title: "<span style= 'color: Brown'> #mosquitos (milhões) </span>"
    },

    annotations: [
      {
        text: '$p(0)=0.9$',
        xref: 'pixel',
        yref: 'pixel',
        font: { size: 18, color: 'red' },
        arrowcolor: 'red',

        ax: 30,
        ay: -40,
        x: 6,
        y: -6
      },
      {
        text: '$p(0)= a_0\approx 1.01, \forall t.$',
        xref: 'pixel',
        yref: 'pixel',
        font: { size: 18, color: 'green' },
        arrowcolor: 'green',
        ax: 30,
        ay: -40,
        x: 6,
        y: a0
      }
    ]
  }

  let options = {
    displaylogo: false,
    scrollZoom: false,
    responsive: true,
    showLink: false,
    modeBarButtonsToRemove: [
      'hoverClosestCartesian',
      'hoverCompareCartesian',
      'toggleSpikelines'
    ]
  }
  return { data, layout, options }
}
</script>
