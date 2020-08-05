<template>
  <v-container style="margin:0px;" fluid>
    <v-row>
      <v-col>
        <h2 style="color: black;" align="center">
          O Atrator de Qi-Chen
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
        O atrator de Halvorsen corresponde as equações: \[ \begin{cases}
        \dfrac{dx}{dt} = a(x-y) \\ \dfrac{dy}{dt} = (c-a)x-xz + cy \\
        \dfrac{dz}{dt} = xy-bz \end{cases} \] com os valores dos parâmetros $a =
        40, b=3 $ e $c=28.$
      </v-col>
    </v-row>
    <!-- 
    <v-row>
      <v-col class="ml-5">
        <ol>
          <u>Referências:</u>
          <li class="mt-4">
            <a href="http://w3.impa.br/~viana/out/ael.pdf" target="_blank">
              Atratores estranhos de Lorenz. Marcelo Viana. IMPA
            </a>
          </li>
          <li>
            <a
              href="https://pt.wikipedia.org/wiki/Atractor_de_Lorenz"
              target="_blank"
            >
              O atrator de Lorenz. Wikipedia.
            </a>
          </li>
          <li>
            <a href="http://w3.impa.br/~viana/out/mi.pdf" target="_blank">
              What's new on Lorenz Attractors? Marcelo Viana. IMPA
            </a>
          </li>
        </ol>
      </v-col>
    </v-row> -->
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
