<template>
  <v-sheet id="mathjax">
    <v-container fluid>
      <v-row wrap>
        <v-col justify-start xs="12" md="6">
          As soluções das equações de Lodka-Volterra tem uma característica
          importante:
          <span style="color: green">
            O valor médio da população de atuns, em qualquer trajetória, é $c/d$
            e o valor médio para os tubarões é $a/b$,</span
          >
          isto é, $$ \color{green}{ {1\over T}\int_0^T x(t) dt = c/d, \quad\quad
          {1\over T}\int_0^T y(t) dt = a/b.}$$ De fato pelas equações
          <span style="font-size: 20px">(EQs)</span>, $\color{green}{ {d\over
          dx} \ln(x) = x'/x= a-b\,y, }$ então
          $$\color{green}{0=\ln(x(T))-\ln(x(0))=\int_0^T {d\over dt} \ln(x) \,dt
          = \int_0^T a-b\, y(t)\, dt }$$ de onde $\color{green}{ {1\over
          T}\int_0^T y(t) dt = a/b.}$ A outra igualdade é similar.
        </v-col>
        <v-col xs="12" md="6">
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
        <v-col xs="12">
          <h4 style="color:green">
            Qual foi a explicação dada por Volterra para o aumento da população
            de tubarões no mar adriático por causa da guerra?
          </h4>

          A resposta é que a pesca prejudica o crescimento intrínseco da
          população de presas, isto é, a pesca diminui o valor de $a.$ Por outro
          lado, a pesca aumenta a velocidade intrínseca com que a população de
          predadores declina na ausência de presas, i.e., aumenta o valor de
          $c.$ Isto porque os pescadores pegam nas suas redes tanto predadores
          como presas indiscriminadamente.

          <br />

          Por outro lado a pesca não altera a dinâmica intrínseca
          predador-presa, isto é, as constantes $b$ e $d$ permanecem
          inalteradas. Assim, o efeito da pesca será que a média $a/b$ da
          população dos tubarões diminui enquanto a média $c/d$ da população de
          atuns aumenta.
          <br />
          Observe na figura o efeito de diminuir $a$ de $5.3$ para $a'=3.6$ e
          aumentar $c=4.9$ para $c'=7.5$.
          <br />
          <h4 style="color:green">
            Não é paradoxal? A pesca aumentaria a média da população de atuns!.
          </h4>
          <br />
          Entretanto, a restrição da pesca fará o contrário, a média dos
          tubarões aumenta e a média dos atuns diminui.
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script>
import { getDataSurface } from '@/static/js/Plotly/plotly-config.js'

export default {
  name: 'Text5',
  data() {
    let surface = getData()
    let data = surface.data
    let layout = surface.layout
    let options = surface.options

    return {
      startChart: true,
      data /* data use in the plot */,
      layout,
      options
    }
  },
  mounted() {
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'mathjax'])
  }
}

/*  function separated to compute data of surface  */
let getData = function() {
  const a = 5.3
  const b = 0.12
  const c = 4.9
  const d = 0.14

  const a1 = 3.6
  const b1 = 0.12
  const c1 = 7.5
  const d1 = 0.14

  let xwidth = 160
  let ywidth = 160
  let xsteps = 40
  let ysteps = 40
  let center = { x: 0, y: 0 }

  function funct(x, y) {
    return -c * Math.log(x) + d * x - a * Math.log(y) + b * y + 46
  }

  let info = getDataSurface(funct, center, xwidth, ywidth, xsteps, ysteps)
  let data = info.data
  let layout = info.layout
  let options = info.options

  data.type = 'contour'
  layout.width = 500
  layout.height = 500 /* set size of plot */
  data.colorscale = 'Earth'
  layout.title =
    '$\\color{green}{V(x,y)=0.14\\, x - 4.9\\, \\ln(x) +0.12\\, y-5.3\\, \\ln(y)}$'

  // data.contours.z.start = -10 /* set manually because zMax=Infinity */
  // data.contours.z.end = 50
  // data.contours.z.size = 0.5
  data.visible = false
  data.autocontour = true /* contours attrib picked by algorithm, ncontours = contours levels */
  data.ncontours = 30
  data.line = {
    smoothing: 1,
    width: 1,
    color: 'green'
  }
  data.contours.coloring = 'lines'

  function funct_1(x, y) {
    return -c1 * Math.log(x) + d1 * x - a1 * Math.log(y) + b1 * y + 46
  }

  let info1 = getDataSurface(funct_1, center, xwidth, ywidth, xsteps, ysteps)
  let data1 = info1.data
  data1.type = 'contour'
  data1.visible = true
  data1.autocontour = true /* contours attrib picked by algorithm, ncontours = contours levels */
  data1.ncontours = 30
  /* start - end-size not requiere when ncountours set */
  data1.line = {
    smoothing: 1,
    width: 1,
    color: 'brown'
  }
  data1.colorscale = 'RdBu'
  data1.contours.coloring = 'lines'

  let annotations1 = [
    {
      text: 'Sem pesca',
      ax: 50, //tail of arrow
      ay: -70,
      ayref: 'pixel', // refers to axes
      axref: 'pixel',
      arrowcolor: 'black',
      font: {
        size: 18,
        color: 'black'
      },
      x: c / d,
      y: a / b // head af arrow
    }
  ]

  let annotations2 = [
    {
      text: 'Com pesca',
      ax: 60, //tail of arrow
      ay: -50,
      ayref: 'pixel', // refers to axes
      axref: 'pixel',
      arrowcolor: 'black',
      font: {
        size: 18,
        color: 'black'
      },
      x: c1 / d1,
      y: a1 / b1 // head af arrow
    }
  ]

  let shapes2 = [
    {
      type: 'line',
      x0: c1 / d1,
      y0: 0,
      x1: c1 / d1,
      y1: 140,
      line: {
        color: 'blue',
        width: 2
      },
      opacity: 0.5
    },
    {
      type: 'line',
      x0: 0,
      y0: a1 / b1,
      x1: 140,
      y1: a1 / b1,
      line: {
        color: 'blue',
        width: 2
      },
      opacity: 0.5
    }
  ]

  let shapes1 = [
    {
      type: 'line',
      x0: c / d,
      y0: 0,
      x1: c / d,
      y1: 140,
      line: {
        color: 'green',
        width: 2
      },
      opacity: 0.5
    },
    {
      type: 'line',
      x0: 0,
      y0: a / b,
      x1: 140,
      y1: a / b,
      line: {
        color: 'green',
        width: 2
      },
      opacity: 0.5
    }
  ]

  let shapes3 = [
    {
      type: 'line',
      x0: c / d,
      y0: 0,
      x1: c / d,
      y1: 140,
      line: {
        color: 'green',
        width: 2
      },
      opacity: 0.5
    },
    {
      type: 'line',
      x0: 0,
      y0: a / b,
      x1: 140,
      y1: a / b,
      line: {
        color: 'green',
        width: 2
      },
      opacity: 0.5
    }
  ]

  layout.annotations = annotations1
  layout.shapes = shapes1
  layout.updatemenus = [
    {
      buttons: [
        {
          method: 'update',
          args: [
            { visible: [true, false], opacity: 1 },
            {
              annotations: annotations1,
              shapes: shapes1
            }
          ],
          label: 'Sem pesca'
        },
        {
          method: 'update',
          args: [
            { visible: [true, true], opacity: [0.2, 1] },
            {
              annotations: [...annotations2],
              shapes: [...shapes3, ...shapes2]
            }
          ],
          label: 'Com pesca'
        }
      ],
      direction: 'bottom',
      pad: {
        r: 10,
        t: 10
      },
      // showactive: true,
      // highlightcolor: 'lightgrey',
      // bgcolor: 'lightgrey',
      type: 'buttons',
      x: 1,
      xanchor: 'right',
      y: 1,
      yanchor: 'top',
      font: {
        size: 14,
        color: 'black'
      }
    }
  ]
  layout.xaxis = {
    tickmode: 'array',
    tickvals: [0, c / d, c1 / d1, 140],
    ticktext: ['0', 'c/d', "c'/d", '140'],
    title: 'Atuns',
    titlefont: {
      family: 'Arial, sans-serif',
      size: 18,
      color: 'Blue'
    }
  }
  layout.yaxis = {
    tickmode: 'array',
    tickvals: [0, a / b, a1 / b1, 140],
    ticktext: ['0', 'a/b', "a'/b", '140'],
    title: 'Tubarões',
    titlefont: {
      family: 'Arial, sans-serif',
      size: 18,
      color: 'Blue'
    }
  }
  layout.images = [
    {
      source: '~assets/figures/atun1.png',
      xref: 'paper',
      yref: 'paper',
      x: 0.66,
      y: -0.15,
      sizex: 0.2,
      sizey: 0.2,
      xanchor: 'left',
      yanchor: 'bottom'
    },
    {
      source: '~assets/figures/shark1.png',
      xref: 'paper',
      yref: 'paper',
      x: 0,
      y: 0.7,
      sizex: 0.2,
      sizey: 0.2,
      xanchor: 'right',
      yanchor: 'bottom'
    }
  ]

  return {
    data: [data, data1] /* data use in the plot */,
    layout,
    options
  }
}
</script>
