<template>
  <v-container style="margin:0px;" fluid>
    <v-row>
      <v-col>
        <h2 style="color: black;" align="center">
          O Atrator de Chen-Lee
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
        O atrator de Chen-Lee corresponde as equações: \[ \begin{cases}
        \dfrac{dx}{dt} = a x- yz \\ \dfrac{dy}{dt} = by + xz \\ \dfrac{dz}{dt} =
        cz + xy/3\end{cases} \] com parâmetros $a = 5, b=-10 $ e $c=-0.38.$
        <br />
      </v-col>
    </v-row>

    <v-row>
      <v-col class="ml-5">
        <ol>
          <u>Referências:</u>
          <li class="mt-4">
            <a
              href="https://www.scielo.br/scielo.php?script=sci_arttext&pid=S0103-97332009000500007&lng=en&nrm=iso&tlng=en"
              target="_blank"
            >
              A 3-D four-wing attractor and its analysis.
            </a>
            Braz. J. Phys. vol.39 no.3 São Paulo Sept. 2009
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
import ChenLeePlot from '@/static/js/babylon/ChenLee.js'

export default {
  // layout: 'darkTheme',
  created() {},
  mounted() {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = '../../../js/babylon/babylon.gui.min.js'
    document.head.appendChild(script)
    script.addEventListener('load', this.startBabylonPlot)

    if (!window.MathJax) {
      let script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = '../../../js/MathJax/mathjax2Config.js'
      script.addEventListener('load', this.onMathJaxLoaded)
      document.head.appendChild(script)
    } else {
      MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'mathjax'])
    }
    //this.startBabylonPlot()
  },
  destroyed() {
    //console.log('destroyed foi ativado')
  },
  updated() {
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'mathjax'])
  },

  methods: {
    onBabylonLoaded() {
      this.startBabylonPlot
    },
    startBabylonPlot() {
      ChenLeePlot()
    }
  },
  updated() {
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'mathjax'])
  },

  data() {
    return {
      //   p5plot: null,
      //   startChart: true,
      //   startChart2: false
    }
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
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          // rel: 'stylesheet',
          // href:
          //   'https://fonts.googleapis.com/css2?family=Kalam:wght@300;400&display=swap'
          // 'https://fonts.googleapis.com/css2?family=Kalam&display=swap'
          // 'https://fonts.googleapis.com/css2?family=Rock+Salt&display=swap'
        }
      ],
      script: []
    }
  }
}
</script>

<style scoped>
#lorenzCanvas {
  width: 90vw;
  height: 90vh;
  touch-action: auto;
  scroll-behavior: smooth;

  margin: 0px;
  padding: 0px;
}
</style>
