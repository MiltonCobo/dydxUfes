<template>
  <div>
    <v-container fluid>
      <v-row align="center" class="flex-wrap-reverse">
        <v-col xs="12" md="6" style="min-width:40%">
          <div>
            <h2 style="color: salmon;" align="center">
              A razão Aúrea e o Girassol
            </h2>
            <v-divider style="margin-bottom:20px;" />
            <p class="mathjax">
              $\def\cc#1{\color{wheat}{#1}}$ Esta animação está relacionada com
              a distribuição de sementes em algumas flores como o girassol. Na
              flor do girassol, sementes vão surgindo do centro e ao mesmo tempo
              vão rodando por um certo ângulo fixo $\cc{\theta}.$
              <br />
              Na animação espalhamos um certo número de pontos num círculo (as
              "sementes") espaçados por um mesmo ângulo $\cc{\theta}$ e depois
              afastamos estes pontos do círculo para visualiza-los melhor.
              Finalmente fazemos variar o ângulo $\cc{\theta}$ provocando o
              movimento da figura (isto pode ser acelerado usando o "slider"
              embaixo na figura). Consideramos $\cc{\theta}$ como sendo da forma
              (em radianos), $\cc{\theta = x \cdot 2\pi}$ onde $\cc{x}$ é um
              número real variando no intervalo $\cc{[0,1]}$. Quando $\cc{x}$ é
              racional, digamos $\cc{x=p/q}$ a figura tem exatamente $\cc{q}$
              pernas. Por exemplo, quando $\cc{x = 0.25 = 1/4}$ a figura tem
              exatamente $\cc{4}$ pernas (digite este valor no "input" ao lado).
            </p>
          </div>
        </v-col>
        <v-col xs="12" md="6" align="center">
          <!-- <client-only placeholder="carregando..."> -->
          <div style="position:relative;" ref="container" id="container"></div>
          <v-spacer />
          <!-- </client-only> -->
        </v-col>
      </v-row>
      <!-- <v-divider /> -->
      <v-row>
        <!-- <v-col> -->
        <p class="mathjax">
          Quando $\cc{x}$ irracional o número de pernas aumenta com o número de
          iterações e as figuras ficam mais complicadas. O número de pernas que
          vão aparecendo depende das aproximações racionais de $\cc{x}.$ Por
          exemplo, para $\cc{x= 1/\pi \approx 0.31830... }$ o número de pernas é
          primeiro $\cc{3}$ e depois $\cc{22}$. Isso porque $\cc{1/\pi}$ é bem
          aproximado por $\cc{1/3}$ e por $\cc{7/22}.$ Voce pode testar estes
          número no "input" embaixo da figura.
          <br />
          A figura mais complicada acontece quando $\cc{x}$ é o número
          irracional $\cc{\varphi = 2/(1+\sqrt{5}) \approx 0.6180...}.$ Este
          número é chamado de
          <span style="color:wheat; font-size: 20px;"
            >Razão Aúrea e é o mais irracional de todos os números
            irracionais!</span
          >
          <br />
          Na verdade há dois números aúreos que são as raizes de $\cc{x^2-x-1}$:
          $\quad \cc{\varphi_1 = {(1+\sqrt{5})\over 2}}\,$ e
          $\,\cc{\varphi_2={(1-\sqrt{5})\over 2}}$. <br />
          Pode-se verificar fácilmente que $\cc{\varphi_2 = 2/(1+\sqrt{5}) =
          1/\varphi_1 }$.
          <br />
          A razão aúrea aparece constantemente em ciências naturais, por
          exemplo, o formato da flor do girassol aparentemente usa um ângulo
          muito próximo de $\cc{\varphi}.$

          <br />
          Indicamos (para aqueles que entendem inglês)
          <a
            href="https://www.youtube.com/watch?v=sj8Sg8qnjOg&t=448s"
            target="_blank"
          >
            este excelente vídeo</a
          >
          sobre o assunto no canal de youtube
          <span style="color: wheat">Numberphile</span>, que infelizmente não
          tem ainda legendas em português.
          <br />
          Em breve iremos explicar mais amplamente esta animação.
        </p>
        <!-- </v-col> -->
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
      script.addEventListener('load', this.startp5Plot)
      script.src =
        'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.0.0/p5.min.js'
      document.head.appendChild(script)
    } else {
      console.log('p5 is here')
      this.startp5Plot()
    }

    if (!window.MathJax) {
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = '../../../js/MathJax/mathjax2Config.js'
      script.addEventListener('load', this.onMathJaxLoaded)
      document.head.appendChild(script)
    } else {
      MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'mathjax'])
    }
  },
  destroyed() {
    this.p5plot.remove()
  },
  methods: {
    onMathJaxLoaded() {
      MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'mathjax'])
    },
    startp5Plot() {
      let divFigure = this.$refs.container
      // NEED TO BE SURE P5 EXIST!!!!!
      this.p5plot = new p5(goldenRatio, divFigure)
    }
  },
  updated() {
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'mathjax'])
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
            'https://fonts.googleapis.com/css2?family=Kalam:wght@300;400&display=swap'
          // 'https://fonts.googleapis.com/css2?family=Kalam&display=swap'
          // 'https://fonts.googleapis.com/css2?family=Rock+Salt&display=swap'
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

.mathjax {
  font-size: 20px;
  /* padding-left: 5%;
  padding-right: 5%; */
  /* line-height: 1.2; */
  /* font-family: 'Neucha', cursive; */
  /* font-family: 'Kalam', cursive; */
  /* font-family: 'Rock Salt', cursive; */

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
