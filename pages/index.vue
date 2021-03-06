<template>
  <v-container class="container" fluid>
    <v-row>
      <v-col>
        <h2 style="color:brown" align="center">
          O número Aúreo e o Girassol
        </h2>
        <v-divider style="margin-bottom:1rem;" />
      </v-col>
    </v-row>

    <v-row id="wrapper">
      <v-col align="center">
        <div
          style="position:relative;"
          ref="container"
          class="figure"
          id="container-figure"
        ></div>
      </v-col>
    </v-row>
    <!--id=container-figure is used in goldenNumber.js -->

    <v-row align="center" class="flex-wrap-reverse">
      <v-col>
        <p>
          Esta animação está relacionada com a distribuição de sementes em
          algumas flores como o girassol. Na flor do girassol, sementes vão
          surgindo do centro e, enquanto vão se afastando, vão rodando por um
          certo ângulo fixado.
          <br />
          Na animação espalhamos um certo número de bolinhas num círculo (as
          "sementes") espaçadas por um mesmo ângulo $ \theta $ e as afastamos do
          círculo para visualizá-las melhor. A distância da n-ésima bolinha à
          origem é $\sqrt{n}.$ Finalmente fazemos variar o ângulo $ \theta $
          provocando o movimento da figura (isto pode ser acelerado usando o
          "slider" dado nos controles). Consideramos $ \theta $, em radianos,
          como sendo da forma $ \theta = x \cdot 2\pi $ onde $ x $ é um número
          real variando no intervalo $ [0,1] $. Quando $ x $ é racional, digamos
          $ x=p/q $ a figura tem exatamente $ q $ pernas. Por exemplo, quando $
          x = 0.25 $ a figura tem exatamente $ 4 $ pernas (digite este valor no
          "input" dado nos controles). Quando $ x $ é irracional as figuras
          ficam mais complexas pois o número de pernas aumenta a medida que nos
          afastamos da origem. De fato, o número de pernas que vai aparecendo
          depende das aproximações racionais de $ x $. Por exemplo, para $ x=
          1/\pi \approx 0.31830... $ o número de pernas é primeiro $ 3 $ e
          depois $ 22 $. Isso porque $ 1/\pi $ é bem aproximado por $ 1/3 $ e
          por $ 7/22 $. Voce pode observar isto digitando $0.31830$ no "input"
          dado nos controles.
          <br />
          A figura mais complexa acontece quando $ x $ é o número irracional $
          \varphi = (1+\sqrt{5})/2 \approx 1.6180339... $. Ele é chamado de
          <i>número aúreo ou proporção aúrea </i>
          e pode ser considerado o mais irracional de todos os números
          irracionais, no sentido de que é o número real com as "piores
          aproximações" por números racionais.
          <br />
          Na verdade há dois números aúreos que são as raizes de $ x^2-x-1 $:
          $\quad \varphi_1 = {(1+\sqrt{5})\over 2}\,$ e $\,
          \varphi_2={(1-\sqrt{5})\over 2} $. <br />
          A primera raiz, que é positiva, é normalmente considerada a razão
          aúrea. Pode-se verificar fácilmente que $ \varphi_2 = -1/\varphi_1 =
          1-\varphi_1 \approx -0.6180339. $
          <br />
          A razão aúrea aparece constantemente em ciências naturais, por
          exemplo, o formato da flor do girassol aparentemente usa um ângulo
          muito próximo da proporção aúrea
          <a
            href="https://pt.wikipedia.org/wiki/Propor%C3%A7%C3%A3o_%C3%A1urea"
            target="_blank"
          >
            (ver a página de Wikipedia) </a
          >.
          <br />
          Indicamos
          <a
            href="https://www.youtube.com/watch?v=sj8Sg8qnjOg&t=448s"
            target="_blank"
          >
            este excelente vídeo,</a
          >
          para aqueles que entendem inglês, sobre o assunto no canal de youtube
          <i>Numberphile</i>, que infelizmente não tem ainda legendas em
          português.
        </p>
        <!-- <br /> -->
        <!-- Em breve iremos explicar mais amplamente este assunto. -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import goldenRatio from '@/static/js/p5/goldenNumber.js'

export default {
  //layout: 'darkTheme',
  created() {},
  // middleware: 'checkMathJax',
  mounted() {
    this.checkMathJaxLoaded() // NEED TO RELOAD MATHJAX WHEN CLICK ON UFES LINK...
    this.checkp5Loaded()
  },
  updated() {
    if (typeof MathJax.Hub !== undefined)
      MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'mathjax']) //NEEDED WHEN ANY UPDATE IN ANY COMPONENT
  },

  destroyed() {
    if (this.p5plot) {
      this.p5plot.remove()
    }
  },
  methods: {
    async checkp5Loaded() {
      if (!window.p5) {
        await import('@/static/js/p5/p5.min.js')
          .then(() => (this.p5plot = new p5(goldenRatio, this.$refs.container)))
          .catch(err => console.log(err.message))
      } else {
        this.p5plot = new p5(goldenRatio, this.$refs.container)
      }
    },

    checkMathJaxLoaded() {
      if (!window.MathJax) {
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.id = 'MathJax-script'
        script.defer = false
        script.src = '/js/MathJax/mathjax2Config.js'
        document.head.appendChild(script)
      } else if (MathJax.Hub !== undefined) {
        MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'mathjax']) // THIS PART SEEMS NECESSARY OTHERWISE
        //WHEN CLICK ON UFES MATHJAX DOESNT PARSE AGAIN...
      }
    },

    startp5Plot() {
      this.p5plot = new p5(goldenRatio, this.$refs.container)
    }
  },
  updated() {
    if (MathJax.Hub) {
      MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'mathjax'])
    }
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
      title: 'O número de Ouro',
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
          // rel: 'stylesheet',
          // href:
          //   'https://fonts.googleapis.com/css2?family=Kalam:wght@300;400&display=swap'
          // 'https://fonts.googleapis.com/css2?family=Kalam&display=swap'
          // 'https://fonts.googleapis.com/css2?family=Rock+Salt&display=swap'
        }
      ],
      script: [
        // {
        //   type: 'text/javascript',
        //   //src: '/js/p5/p5.min.js',
        //   //'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.0.0/p5.min.js',
        //   src: '/js/p5/p5.min.js',
        //   // src: 'https://cdn.jsdelivr.net/npm/p5@1.0.0/lib/p5.js',
        //   async: true,
        //   defer: false
        // }
        // {
        //   type: 'text/javascript',
        //   id: 'MathJax-script',
        //   src: '/js/MathJax/mathjax2Config.js',
        //   defer: false, // defer = true is important
        //   async: false
        // }
      ]
    }
  }
}
</script>

<style scoped>
#wrapper {
  height: min(460px, 100vw);
  /* width: min(90vw, 800px);   WIDTH IS SETUP BY ROW */
}

p {
  padding: 2rem;
}

/* .mathjax { */
/* font-size: 20px; */
/* padding-left: 5%;
  padding-right: 5%; */
/* line-height: 1.2; */
/* font-family: 'Neucha', cursive; */
/* font-family: 'Kalam', cursive; */
/* font-family: 'Rock Salt', cursive; */

/* font-family: SofiaPro Roboto; */
/* } */
/* font-family: 'Rock Salt', cursive;
  /* font-family: SofiaPro Roboto; */
/* font-family: 'Palatino Linotype', 'Book Antiqua', Palatino, serif; */
/* font-family: 'Montserrat', sans-serif; */
/* font-family: 'Neucha', cursive; */
/*font-size: 24px;
  font-weight: 700; */
</style>
