<template>
  <div>
    <v-container fluid>
      <v-row no-gutters>
        <v-col xs="12" md="7">
          <div style="color:lightgoldenrodyellow" id="mathjax">
            <h2 style="color: salmon;">O número Aúreo e o Girassol</h2>
            <v-divider style="margin-bottom:20px;" />
            <p>
              $\def\cc#1{\color{}{#1}}$ Esta animação está relacionada com a
              distribuição de sementes em algumas flores como o girassol.
              Matematicamente se trata de rotar iteradamente um ponto do círculo
              por um ângulo $\cc\theta$ (que podemos variar usando o
              <i>slider</i> na figura). Se $\cc{\theta=p/q}$ é racional, a
              figura tem exatamente $\cc{q}$ pernas. Para ângulos irracionais o
              número de pernas aumenta com o número de iterações. Por exemplo
              para $\cc{\theta = 1/\pi \approx 0.31830... }$ o número de pernas
              é primeiro $\cc{3}$ e depois $\cc{22}$. Isso porque $\cc{1/\pi}$ é
              bem aproximado por $\cc{1/3}$ e por $\cc{7/22}.$
              <br />
              A figura mais complicada acontece quando $\cc{\theta =
              2/(1+\sqrt{5}) \approx 0.6180...}$
              <span style="color:wheat"
                >Este é o mais irracional de todos os números irracionais!</span
              >
              Ele é chamado de <span style="color:wheat">Número Aúreo</span> e
              aparece constantemente em ciências naturais, por exemplo no
              formato da flor do girassol.
              <br />
              Indicamos (para aqueles que entendem inglês) este excelente
              <a
                href="https://www.youtube.com/watch?v=sj8Sg8qnjOg&t=448s"
                target="_blank"
              >
                vídeo</a
              >
              sobre o assunto no canal de youtube
              <span style="color: wheat">Numberphile</span>, que infelizmente
              não tem ainda legendas em português.
              <br />
              Em breve iremos explicar mais amplamente esta animação.
            </p>

            <p>
              Indicamos (para aqueles que entendem inglês) este excelente
              <a
                href="https://www.youtube.com/watch?v=sj8Sg8qnjOg&t=448s"
                target="_blank"
              >
                vídeo</a
              >
              sobre o assunto no canal de youtube
              <span style="color: lightgoldenrodyellow">Numberphile</span>, que
              infelizmente não tem ainda legendas em português.

              <br />
              Em breve iremos explicar mais amplamente esta animação.
            </p>
          </div>
        </v-col>
        <v-col xs="12" md="5" align-start>
          <div style="position:relative" ref="container" id="container"></div
        ></v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import goldenRatio from '@/static/js/p5/goldenNumber.js'

export default {
  layout: 'darkTheme',
  created() {},
  mounted() {
    if (!window.p5) {
      const script = document.createElement('script')
      script.type = 'text/javascript'
      //script.onload = this.startPlot
      script.src =
        'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.0.0/p5.min.js'
      document.head.appendChild(script)
    } else {
      console.log('p5 is here')
    }

    if (!window.MathJax) {
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = '../../../js/MathJax/mathjax2Config.js'
      document.head.appendChild(script)
      //script.onload = this.onScriptLoaded
    } else {
      MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'mathjax'])
      //this.onScriptLoaded()
    }
    this.startPlot()
  },
  destroyed() {
    this.p5plot.remove()
  },
  methods: {
    // onScriptLoaded(event = null) {
    //   if (window.MathJax.Hub) {
    //     MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'mathjax'])
    //   }
    // },
    startPlot() {
      let divFigure = this.$refs.container
      this.p5plot = new p5(goldenRatio, divFigure)
    }
  },
  updated() {
    //MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'mathjax'])
  },

  data() {
    return {
      p5plot: null,
      startChart: true,
      startChart2: false
    }
  },

  head() {
    return {
      title: 'página dydx da UFES',
      meta: [
        {
          hid: 'description index.vue',
          name: 'Pagina inicial',
          content: 'Pagina inicial www.dydx.ufes.br do DMAT/UFES'
        }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: 'stylesheet',
          href:
            'https://fonts.googleapis.com/css2?family=Rock+Salt&display=swap'
        }
      ],
      script: [
        {
          type: 'text/javascript',
          //src: '/js/p5/p5.min.js',
          src: 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.0.0/p5.min.js',
          // src: 'https://cdn.jsdelivr.net/npm/p5@1.0.0/lib/p5.js',
          async: false,
          defer: false
        }
        // {
        //   type: 'text/javascript',
        //   src: '/js/p5/p5.dom.js',
        //   // src: 'https://cdn.jsdelivr.net/npm/p5@1.0.0/lib/p5.js',
        //   async: false,
        //   defer: false
        // }
      ]
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

#mathjax {
  font-size: 22px;
  /* padding-left: 5%;
  padding-right: 5%; */
  line-height: 1.2;
  font-family: 'Neucha', cursive;

  /* font-family: SofiaPro Roboto; */
}
/* font-family: 'Rock Salt', cursive;
  /* font-family: SofiaPro Roboto; */
/* font-family: 'Palatino Linotype', 'Book Antiqua', Palatino, serif; */
/* font-family: 'Montserrat', sans-serif; */
/* font-family: 'Neucha', cursive; */
/*font-size: 24px;
  font-weight: 700; */
</style>
