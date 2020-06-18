<template>
  <div class="mathjax">
    <v-container fluid>
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
            Seja $ p(t) $ a população de mosquitos em tempo $ {t}. $ Para
            simplificar os números consideramos ${p(t)}$ em milhões e ${t}$ em
            semanas. Na ausência de predadores, a taxa de crescimento dos
            mosquitos é dada por ${ p'(t) = r\cdot p(t) }$ onde ${r}\, $ a taxa
            intrínseca de crescimento. Obtemos que a população de mosquitos
            cresce como ${ p(t)=p_0\e^{rt} }$ sendo ${p_0=p(0)}$ a população
            inicial.
            <br />
            Por outro lado, a população de mosquitos dobra a cada semana. Isto
            significa que ${ p(1)=2p(0) = p(0)\e^{r\cdot 1}}, $ de onde
            concluímos que $ {r=\ln(2) \approx 0.69.}$ Denotaremos por $v$ a
            taxa de mortalidade dos mosquitos, isto é, $ v=0,1 $ milhões x dia,
            ou
            <span style="color:var(--mjx-green)">
              $ v= 0.7 $ milhões por semana.</span
            >
            <br />
            A equação diferencial associada é dada por $${\frac{dp}{dt} =
            (\text{taxa crescimento}) - (\text{taxa de mortalidade}) = r\, p - v
            . }$$ A equação é linear de primeira ordem e o
            <span style="color:var(--mjx-green)">fator integrante é </span>
            $ \mu(t)=\e^{-rt } $ e portanto, $$\e^{-rt}(p'-r\,p) = \frac{d}{dt}
            ( \e^{-rt} \,p ) = -v\cdot \e^{-rt} $$ e integrando, $$\int
            \frac{d}{dt} ( \e^{-rt} \,p ) dt = \e^{-rt}\, p(t) = \frac{v}{r}
            \e^{-rt} + C \implies p(t) = a_0 + C\cdot \e^{rt} $$ onde ${a_0 =
            \frac{v}{r} = \frac{0.7}{\ln(2)}.}$ É fácil ver que $C = p(0)- a_0 =
            p_0-a_0.$
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>

    <v-container fluid>
      <v-row no-gutters align="center">
        <v-col xs="12" md="6" align="center">
          <client-only placeholder="carregando...">
            <vue-plotly :data="data" :layout="layout" :options="options" />
          </client-only>
        </v-col>
        <v-col xs="12" md="6">
          <v-sheet>
            Temos então a solução geral $${p(t)=a_0 + (p_0-a_0)\, \e^{rt}.}$$
            Note que para ${p(0)=a_0 }$ a solução é a
            <span style="color:var(--mjx-green)"
              >função constante $p(t) = a_0\approx 1.01,\,\, \forall t$ (um
              milhão e 10 mil mosquitos).
            </span>
            <br />
            O comportamente das demais soluções depende do sinal de ${p_0 -
            a_0}$:

            <br />
            Se ${p_0 - a_0 \gt 0}$ a população de mosquitos explode para
            infinito e se ${p_0 - a_0 \lt 0}$ a população de mosquitos se torna
            negativa eventualmente, isto é, passa por zero em tempo positivo
            implicando que os mosquitos se extinguem pela ação dos predadores.
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>

    <v-container fluid>
      <v-row>
        <v-col>
          <p>
            Note que ${\e^{\ln(2)t} = 2^t}.$ Se inicialmente há ${ 0.9 }$
            milhões de mosquitos, a constante ${ C=(0.9-\frac{0.7}{\ln 2})
            \approx -0.11},$ e a quantidade mosquitos (em milhões) é dada por ${
            p(t) = 1.01 -(0.11) \, 2^{t}.} $ Os mosquitos se estinguem neste
            caso, e resolvendo $p(t) = 0$ temos $2^t = 1.01/0.11\approx 9.18,$
            ou $t=\log(9.18)/\log(2),$ os mosquitos se extinguem em
            aproximadamente ${t\approx 3.2}$ semanas (ver gráfico).
          </p>
        </v-col>
      </v-row>
    </v-container>
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
  mounted() {},
  methods: {},
  updated() {
    // MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'mathjax'])
  }
}

function plotMosquitosSol() {
  const a0 = 0.7 / Math.log(2)
  const inc = 0.23
  const iter = 14
  const step = 0.05
  const xwidth = 30
  const initial = -20

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
    width: 450,
    height: 450,
    title: '$\\color{green}{p(t)=a_0 + (p_0 - a_0) 2^x}$',
    xaxis: {
      range: [-2, 10],
      tickvals: [-10, -2, 0, 2, 3.2, 5, 10],
      ticktext: ['-10', '-2', '0', '2', '3.2', '5', '10'],
      title: "<span style= 'color: Brown'> tempo (semanas) </span>"
    },
    yaxis: {
      range: [-2, 3],
      tickvals: [-5, -2, 0, 0.9, 2, 5],
      ticktext: ['-5', '-2', '0', '0.9', '2', '5'],
      title: "<span style= 'color: Brown'> #mosquitos (milhões) </span>"
    },

    annotations: [
      {
        text: '$p(0)=0.9,\\, p(3.2)=0$',
        xref: 'pixel',
        yref: 'pixel',
        font: { size: 16, color: 'red' },
        arrowcolor: 'red',
        ax: 80,
        ay: -20,
        x: 3.2,
        y: 0
      },
      {
        text: '$p(0)= a_0\\approx 1.01, \\forall t.$',
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
    responsive: false,
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
