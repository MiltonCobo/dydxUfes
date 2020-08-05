<template>
  <v-container style="margin:0px;" fluid>
    <v-row>
      <v-col>
        <h2 style="color: black;" align="center">
          O Atrator de Chen
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
        O atrator de Chen corresponde as equações: \[ \begin{cases}
        \dfrac{dx}{dt} = a(x-y) \\ \dfrac{dy}{dt} = (c-a)x-xz + cy \\
        \dfrac{dz}{dt} = xy-bz \end{cases} \] com os valores dos parâmetros $a =
        40, b=3 $ e $c=28.$
        <br />
        Inicialmente este atrator foi observado pelo Leon Chua em circuitos
        caóticos eletronicos, chamados de
        <a href="https://en.wikipedia.org/wiki/Chua%27s_circuit"
          >circuitos de Chua.</a
        >
        Chua também mostrou rigorosamente que existe um atrator caótico para os
        parâmetros dados por ele. O atrator foi chamado de
        <i>turbilhão duplo</i> (double scroll) pois se asemelha a dois dos anéis
        de Saturno conectados por uma hélice (em tradução livre). Foi desoberto
        que existem outros pequenos atratores periódicos escondidos dentro da
        hélice do atrator.
        <br />
        No ano de 1999 Guanrong Chen propós o atrator que mostramos nesta
        animação. Posteriormente outras generalizações destes atratores,
        chamadas de
        <i>multiscroll</i> foram encontradas ( ver a página de wikipedia nas
        referèncias) e em breve iremos apresentar algumas de elas.
      </v-col>
    </v-row>

    <v-row>
      <v-col class="ml-5">
        <ol>
          <u>Referências:</u>
          <li class="mt-4">
            Multiscroll attractor.
            <a
              href="https://en.wikipedia.org/wiki/Multiscroll_attractor"
              target="_blank"
            >
              Wikipedia.
            </a>
          </li>
          <li>
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
          International Journal of Bifurcation and Chaos. 16 (4): 793–794.
        </ol>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import QiChenPlot from '@/static/js/babylon/QiChen.js'

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
    console.log('destroyed foi ativado')
  },
  updated() {
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'mathjax'])
  },

  methods: {
    onBabylonLoaded() {
      this.startBabylonPlot
    },
    startBabylonPlot() {
      QiChenPlot()
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
      title: 'O atrator de Lorenz',
      meta: [
        {
          hid: 'description index.vue',
          name: 'O atrator de Lorenz',
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
:root {
  --mjx-green: white; /* #2e7d32; /* #2e7d32; /* light-green darken-3 */
  /*  #004b07; /* #33691e;*/
  /* background-color: black; */
}

.ColorWheat {
  --mjx-green: #fff9c4; /* yellow lighten-4 */
  /* wheat; */
}

/* .mathjax {
  font-size: 20px;
} */

#lorenzCanvas {
  width: 90vw;
  height: 80vh;
  touch-action: none;
  scroll-behavior: smooth;

  margin: 0px;
  padding: 0px;
}
</style>
