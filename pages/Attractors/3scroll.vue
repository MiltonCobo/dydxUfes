<template>
  <v-container style="margin:0px;" fluid>
    <v-row>
      <v-col>
        <h2 style="color: black;" align="center">
          O Atrator <i>Three Scroll</i>
        </h2>
        <!-- color attractor #f59700; -->
        <v-divider style="margin-bottom:0.5%;" />
      </v-col>
    </v-row>
    <v-row>
      <v-col align="center">
        <canvas id="lorenzCanvas"></canvas>
      </v-col>
    </v-row>

    <v-row
      ><v-col class="mathjax">
        O atrator de "Three scroll" (com três turbilhões) corresponde às
        equações: \[ \begin{cases} \dfrac{dx}{dt} = a(y-x) + dxz \\
        \dfrac{dy}{dt} = bx + fy -xz \\ \dfrac{dz}{dt} = ex^2 + xy +
        cz\end{cases} \] com parâmetros $a = 43, b= 55, c=11/6, d= 4/25, e =
        -13/20$ e $f=20.$
        <br />
      </v-col>
    </v-row>

    <v-row>
      <v-col class="ml-5">
        <ol>
          <u>Referências:</u>
          <li class="mt-4">
            <a
              href="https://www.sciencedirect.com/science/article/pii/S0375960107010584"
              target="_blank"
            >
              A three-scroll chaotic attractor.
            </a>
            Dequan Li. Physics Letters A Volume 372, Issue 4, 21 January 2008,
            Pages 387-393.
          </li>
          <!-- <li>
            Chua, Leon (2007).
            <a
              href="http://www.scholarpedia.org/article/Chua_circuit"
              target="_blank"
            >
              Chua circuits.
            </a>
            Scholarpedia.
          </li>
          <li>
            Chua, Leon (2007).
            <a
              href="http://www.scholarpedia.org/article/Chua_circuit#Fractal_Geometry_of_the_Double_Scroll_Attractor"
              target="_blank"
            >
              Fractal Geometry of the Double-Scroll Attractor
            </a>
            . Scholarpedia.
          </li>
          <li>
            Chen, Guanrong; Jinhu Lu (2006).
            <a
              href="http://www.ee.cityu.edu.hk/~gchen/pdf/LC-IJBC06-survey.pdf"
              target="_blank"
            >
              Generating multiscroll chaotic attractors: theories, methods and
              applications (pdf).
            </a>
          </li>
          International Journal of Bifurcation and Chaos. 16 (4): 793–794. -->
        </ol>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import * as BABYLON from 'babylonjs'
import ThreeScroll from '@/static/js/babylon/ThreeScroll.js'

export default {
  // layout: 'darkTheme',
  created() {},
  mounted() {
    ThreeScroll()
    this.checkMathJaxLoaded()
  },
  destroyed() {},
  updated() {
    if (window.MathJax.Hub) {
      MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'mathjax'])
    }
  },

  methods: {
    checkMathJaxLoaded() {
      if (typeof window.MathJax === undefined) {
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.defer = true
        script.src = '/js/MathJax/mathjax2Config.js'
        document.head.appendChild(script)

        //script.addEventListener('load', this.onMathJaxLoaded)
      } else if (typeof MathJax.Hub !== 'undefined') {
        MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'mathjax'])
      }
    }
  },
  updated() {
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'mathjax'])
  },

  data() {
    return {}
  },

  head() {
    return {
      title: 'O atrator de Chen',
      meta: [
        {
          hid: 'description index.vue',
          name: 'O atrator de Chen',
          content: 'O atrator de Lorenz em www.dydx.ufes.br do DMAT/UFES'
        }
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }, {}],
      script: []
    }
  }
}
</script>

<style scoped>
#lorenzCanvas {
  width: 84vw;
  height: 90vh;
  touch-action: auto;
  scroll-behavior: smooth;

  margin: 0px;
  padding: 0px;
}
</style>
