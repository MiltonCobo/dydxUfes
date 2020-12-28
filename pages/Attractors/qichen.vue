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
        O atrator de Chen corresponde às equações: \[ \begin{cases}
        \dfrac{dx}{dt} = a(x-y) \\ \dfrac{dy}{dt} = (c-a)x-xz + cy \\
        \dfrac{dz}{dt} = xy-bz \end{cases} \] com parâmetros $a = 35, b=3 $ e
        $c=28.$
        <br />
        A presença de atratores caóticos foi observada pelo Leon Chua em certos
        circuitos eletrônicos, chamados de
        <a href="https://en.wikipedia.org/wiki/Chua%27s_circuit"
          >circuitos de Chua.</a
        >
        Os atratores foram chamados de
        <i>turbilhões duplos</i> (double scroll) pois se asemelham a dois dos
        anéis de Saturno conectados por uma hélice (em tradução livre).
        <br />
        No ano de 1999 Guanrong Chen propós a versão do atrator que mostramos
        nesta animação, com um único turbilhão. Posteriormente outras
        generalizações destes atratores, chamadas de
        <i>multi-scroll</i> foram encontradas. Veja por exemplo o atrator
        <i>Three scroll.</i>

        <br />
        Para ver o
        <i>turbilhão</i> mais claramente apague o atrator, faça $a = 28$ no
        <i>slider</i> e afaste um pouco a figura. Recrie então as partículas.
        Observa-se que a maioria das trajetórias converge para uma trajetória
        periódica formando uma espécie de turbilhão. Recentemente também foi
        descoberto que existem outros pequenos atratores escondidos dentro da
        hélice do atrator. O sistema tem dois pontos críticos (além da origem)
        em $(\pm\sqrt{(2c-a)b}, 2c-a)$ e quando $a$ se aproxima de $56$ estes
        pontos críticos se tornam atratores e se aproximam da origem.
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
    this.checkBabylonGui()
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
    onBabylonLoaded() {
      this.startBabylonPlot
    },
    startBabylonPlot() {
      QiChenPlot()
    },

    checkBabylonGui() {
      if (typeof window.BABYLON !== undefined) {
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = '../../../js/babylon/babylon.gui.min.js'
        document.head.appendChild(script)

        if (typeof window.BABYLON.GUI !== undefined) {
          const script2 = document.createElement('script')
          script2.type = 'text/javascript'
          script2.src = '../../../js/babylon/babylon.gui.min.js'
          document.head.appendChild(script)
        }

        this.startBabylonPlot()
        // script.addEventListener('load', this.startBabylonPlot)
        // script2.addEventListener('load', this.startBabylonPlot)
      }
    },
    checkMathJaxLoaded() {
      if (typeof window.MathJax !== undefined) {
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.defer = true
        script.src = '../../../js/MathJax/mathjax2Config.js'
        document.head.appendChild(script)
        //script.addEventListener('load', console.log('mathjax has been loaded!'))
        //script.addEventListener('load', this.onMathJaxLoaded)
      } else if (typeof MathJax.Hub.Typeset !== 'undefined') {
        // MathJax.typeset()
        MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'mathjax'])
      }
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
  width: 84vw;
  height: 80vh;
  touch-action: auto;
  scroll-behavior: smooth;

  margin: 0px;
  padding: 0px;
}
</style>
