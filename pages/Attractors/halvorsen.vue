<template>
  <v-container style="margin:0px;" fluid>
    <v-row>
      <v-col>
        <h2 style="color: black;" align="center">
          O Atrator de Halvorsen
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
        O atrator de Halvorsen corresponde às equações: \[ \begin{cases}
        \dfrac{dx}{dt} = -ax +2y - 4z -y^2 \\ \dfrac{dy}{dt} = -ay +2z - 4x -z^2
        \\ \dfrac{dz}{dt} = -az +2x - 4y -x^2 \end{cases} \] com $ a $ próximo
        de $ 1.4. $
        <br />

        Em breve iremos postar informação mais detalhada sobre este atrator.
        Aparentemente o atrator não é global pois observam-se trajetórias que
        fogem para o infinito mas parece que um conjunto com medida positiva de
        pontos é capturado pelo atrator. Também notamos que para $a=1.8$ o
        atrator aparentemente se reduz a uma única trajetória periódica e para
        $a=1.2$ quase todas as trajetórias fogem para o infinito. Isto pode ser
        visto melhor se apagamos o atrator e movemos o <i>slider</i> pois assim
        o processo é mais fluido.
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
import HalvorsenPlot from '@/static/js/babylon/Halvorsen.js'

export default {
  // layout: 'darkTheme',
  created() {},
  mounted() {
    HalvorsenPlot()
    this.checkMathJaxLoaded()
  },
  destroyed() {
    //console.log('destroyed foi ativado')
  },
  updated() {
    if (MathJax.Hub) {
      MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'mathjax'])
    }
  },

  methods: {
    checkMathJaxLoaded() {
      if (typeof window.MathJax !== undefined) {
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.defer = true
        script.src = '/js/MathJax/mathjax2Config.js'
        document.head.appendChild(script)
        // script.addEventListener(
        //   'load',
        //   console.log('mathjax has been loaded in halvorsen!')
        // )
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
      title: 'O atrator de Halvorsen',
      meta: [
        {
          hid: 'description index.vue',
          name: 'O atrator de Halvorsen',
          content: 'O atrator de Halvorsen em www.dydx.ufes.br do DMAT/UFES'
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
  width: 84vw;
  height: 80vh;
  touch-action: none;
  scroll-behavior: smooth;

  margin: 0px;
  padding: 0px;
}
</style>
