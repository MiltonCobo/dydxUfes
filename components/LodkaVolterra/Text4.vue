<template>
  <v-sheet id="mathjax">
    <h2 style="color:brown;margin-buttom:0.1cm;">
      As equações de Lodka-Volterra
    </h2>
    <hr style="color:brown;margin-bottom:0.1cm;" />
    <v-container fluid>
      <v-row align="center" wrap>
        <v-col align-center xs="12" style="width:600">
          <client-only>
            <vue-plotly
              v-if="startChart"
              :data="data"
              :layout="layout"
              :options="options"
            />
          </client-only>
        </v-col>
        <v-col xs="12">
          A figura mostra o gráfico de $V(x,y)$ para valores
          $\color{green}{a=5.3, b=0.12, c=4.9}$ e $\color{green}{d=0.14}$.
          <br />
          Note que as curvas de nível de $V$ são fechadas. De fato o gradiente
          $\color{green}{\nabla V(x,y)=(d-c/x, b-a/y)}$ se anula no ponto
          $\bar{p}=(c/d, a/b)$ e a matriz Hessiana de $V$ em
          $\color{green}{\bar{p}}$ é dada por $$\color{green}{\textrm{Hess }
          V(\bar{p}) = \begin{pmatrix} &d^2/c & 0 \\ &0 & b^2/a
          \end{pmatrix}.}$$ Pelo critério da segunda derivada $V$ tem um mínimo
          local em $\bar{p}$, isto é, $\color{green}{
          V(\frac{c}{d}+x,\frac{a}{b}+y) }$ é aproximdamente igual
          $$\color{green}{ V(\bar{p})+\frac{d^2}{c}\, x^2 +\frac{b^2}{a}\, y^2
          }$$ para $(x,y)$ muito pequenos e portanto, perto do ponto $\bar{p}$,
          o gráfico de $V$ é próximo de um paraboloide, com curvas de nível
          fechadas.
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script>
import getDataSurface from '@/static/js/Plotly/plotly-config.js'

export default {
  name: 'Text4',
  data() {
    const a = 5.3
    const b = 0.12
    const c = 4.9
    const d = 0.14

    let xwidth = 160
    let ywidth = 160
    let xsteps = 26
    let ysteps = 26
    let center = { x: 0, y: 0 }

    function funct(x, y) {
      return -c * Math.log(x) + d * x - a * Math.log(y) + b * y + 20
    }

    let info = getDataSurface(funct, center, xwidth, ywidth, xsteps, ysteps)
    console.log(info)
    let data = info.data
    let layout = info.layout
    let options = info.options

    data.type = 'surface' /* contour ...*/
    layout.width = 600
    layout.height = 600 /* set size of plot */
    data.colorscale = 'Earth'
    layout.title =
      '$\\color{green}{V(x,y)=0.14\\, x - 4.9\\, \\ln(x) +0.12\\, y-5.3\\, \\ln(y)}$'
    // data.contours.z.size = 0.005

    data.contours.z.start = -14 /* set manually because zMax=Infinity */
    data.contours.z.end = 70
    data.contours.z.size = 0.6

    return {
      startChart: true,
      data: [data] /* data use in the plot */,
      layout,
      options
    }
  },
  mounted() {
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'mathjax'])
  }
}
</script>
