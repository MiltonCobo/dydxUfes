<template>
  <v-container pa="0" ma="0" fluid>
    <v-row>
      <v-col>
        <p>
          Sendo assim, temos por exemplo que a velocidade com que varia a
          população de presas estará dada por $dx/dt =$
          <span style="color: var(--myGreen)">taxa de entrada-taxa saida</span>
          e as equações do modelo são (com $a, b, c $ e $d$ positivas): $$ {
          \frac{dx}{dt} = a\,x - b\,x y, \quad \frac{dy}{dt} = -c\,y + d\,x
          y.}\quad \textrm{(EQs)} $$ Uma observação é importante. As constantes
          $b$ e $d$ dependem apenas da dinâmica interna predador-presa enquanto
          que $a$ e $c$ consideram fatores exteriores, como a pesca, que afetam
          o taxa de crescimento dos atuns e a taxa de mortalidade dos tubarões.
        </p>
      </v-col>
    </v-row>

    <v-row align="center" no-gutters>
      <v-col
        align="center"
        v-touch="{ left: () => swipeLeft(), right: () => swipeRight() }"
        sm="12"
        md="7"
        ref="figure1"
        class="figure"
      >
        <client-only>
          <vue-plotly
            placeholder="carregando..."
            :data="data"
            :layout="layout"
            :options="options"
          />
          <!-- v-if="startChart"  -->
        </client-only>

        <!-- <div style="color: brown">
          Gráfico da superfície dada por $$V(x,y)=0.14\, x - 4.9\, \ln(x)
          +0.12\, y-5.3\,\ln(y)$$
        </div> -->
      </v-col>

      <v-col sm="12" md="5">
        <p>
          As soluções $(x(t), y(t))$ das equações de Lodka-Volterra moram nas
          <span style="color:var(--mjx-green)">curvas de nível</span> da função
          $${V(x,y)=d\, x -c\,\ln(x) + b\, y -a\, \ln(y) }.$$ Para ver isto
          eliminamos o tempo nas equações fazendo $${ { dy/dt\over {dx/dt}} =
          {dy\over dx} = \frac{y(d\,x-c)}{x(a-b\,y)} }$$ e desta forma obtemos
          uma equação diferencial, numa variável, do tipo "separável": \[{
          \frac{a-b\, y}{y} dy = \frac{d\, x-c}{x}\, dx } \] e e por integração
          chegamos na chamada solução
          <span style="color:var(--mjx-green)">implícita</span>
          $${ V=d\, x -c\,\ln(x) + b\, y -a\, \ln(y) }.$$
          <!-- A figura mostra o
            gráfico de $V(x,y)$ para valores ${a=5.3, b=0.12, c=4.9}$ e ${d=0.14}$
            (superfície 1, sem pesca) e para valores ${a=3.6}$ e ${c=7.5} $
            (superfície 2, com pesca). -->
        </p>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <p>
          A figura mostra o gráfico de $V(x,y)$ para valores ${a=5.3, b=0.12,
          c=4.9}$ e ${d=0.14}$ (superfície 1, sem pesca) e para valores
          ${a=3.6}$ e ${c=7.5} $ (superfície 2, com pesca).
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { volterraSurface } from '@/static/js/LodkaVolterra/VolterraSurface'
import errorComp from '@/components/LodkaVolterra/errorComp.vue'
import loadingComp from '@/components/LodkaVolterra/loadingComp.vue'

export default {
  name: 'Text3',
  components: {
    'vue-plotly': () => ({
      component: process.client ? import('@statnett/vue-plotly') : null,
      loading: loadingComp,
      erro: errorComp,
      delay: 200,
      timeout: 800
    })
  },

  data() {
    let info = volterraSurface()
    let data = info.data
    let layout = info.layout
    let options = info.options

    return {
      // startChart: true,
      data,
      layout,
      options
    }
  },

  mounted() {
    let w, h

    this.layout.autosize = false

    w = Math.min(this.$refs.figure1.clientWidth, 600)
    h = Math.min(this.$refs.figure1.clientHeight, 650)

    this.layout.width = w
    this.layout.height = Math.max(h, w)
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
