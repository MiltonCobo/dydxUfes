<template>
  <v-container style="margin:0px;" fluid>
    <v-row>
      <v-col>
        <h2 style="color: black;" align="center">
          O Atrator de Lorenz
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
        O Atrator de Lorenz foi introduzido por Edward Lorenz em 1963. Na
        animação acima são criadas $10$ mil partículas aleatóriamente numa caixa
        muito grande entorno da origem. Cada partícula tem uma velocidade em
        cada instante $t$, mas tal velocidade depende apenas do ponto de
        $\mathbb{R}^3$ no qual ela se encontra em esse instante. Isto é
        conhecido como um <i>campo de velocidades autônomo.</i>
        O movimento das partículas segue então este campo de velocidades e se
        observa que todas elas se aproximam rapidamente de uma certa região do
        $\mathbb{R}^3$, com uma estrutura geométrica complexa que se asemelha a
        uma borboleta. É o chamado
        <i>Atrator de Lorenz.</i>

        <br />

        Lorenz, um metererologista americano, estava tentando modelar o fenômeno
        de convecção térmica na atmosfera produzido pelo aquecimento das camadas
        superiores provocado pelo sol. Neste fenômeno, o ar quente, mais leve,
        circula para cima criando correntes de ar mais fresco nas camadas
        inferiores. Após numerosas simplificações, Lorenz chegou no seguinte
        sistema de equações diferenciais, que é uma forma de indicar a
        velocidade de uma partícula que se encontra num ponto $(x,y,z)$ no
        instante $t$: \[ \begin{cases} \dfrac{dx}{dt} = -\sigma x+\sigma y \\
        \dfrac{dy}{dt} = -xz+\rho x-y \\ \dfrac{dz}{dt} = xy-\beta z.
        \end{cases} \] Neste sistema $\sigma, \beta$ e $\rho$ são parâmetros
        usados em mecânica de fluidos. $\sigma$ é o chamado
        <i>número de Prandtl,</i> ($\sigma = 4.8$ para a água e $\sigma = 1$
        para o ar). Lorenz considerou $\sigma =10$ e $\beta = 8/3.$ O parâmetro
        $ \rho $ é o <i>número de Rayleigh</i> e é geralmente considerado
        variável. Para $ \rho < 1 $ a origem é um ponto crítico e um atrator
        global para as trajetórias. Em $\rho =1$ acontece uma
        <a
          href="https://en.wikipedia.org/wiki/Pitchfork_bifurcation"
          target="_blank"
          ><i>bifurcação tipo pichfork</i></a
        >, aparecendo dois pontos críticos atratores, cada um deles atrai metade
        do $ \mathbb{R}^3$ (você pode apreciar isto variando o valor de $\rho$).
        Existe então uma bola $ B $ centrada na origem de forma que
        <i>todas</i> as trajetórias do fluxo entram nessa bola e não podem mais
        sair, de fato todas as trajetorias se aproximam de um dos pontos
        críticos que estão dentro dessa bola (isto se vê mais claro quando
        apagamos o atrator e depois <i>recriamos as partículas</i>).
        <br />
        Aproximadamente em $\rho =24.73$ estes dois pontos críticos se tornam
        repulsores, expulsando trajetórias muito próximas. No entanto as
        trajetórias que nascem longe continuam sendo capturadas dentro da bola
        $B.$ Sendo assim devem existir atratores dentro da bola $B$.
        Inicialmente estes atratores são trajetórias periódicas atratoras que
        vão sendo criadas a través de
        <a
          href="https://en.wikipedia.org/wiki/Bifurcation_theory"
          target="_blank"
        >
          <i>bifurcações</i></a
        >. Estas trajetórias periódicas vão também sofrendo outras bifurcações e
        se tornando repulsoras enquanto $\rho$ aumenta. Para $\rho = 28$ todas
        as trajetórias periódicas dentro da bola são repulsoras. Desta forma, o
        atrator dentro da bola $B$ não pode ser uma trajetória periódica e
        portanto tem estrutura geométrica mais complexa. De fato, sua dimensão
        de Hausdorff foi calculada em $2.06$ aproximadamente, ou seja o atrator
        é uma criatura com dimensão fractal, intermediária entre um plano e um
        $\mathbb{R}^3.$ Conjecturou-se que para $\rho = 28$ o sistema teria um
        <i>atrator caótico</i>. Nos atratores caóticos, qualquer erro na
        determinação da posição inicial, por minúsculo que seja, fará a
        trajetória divergir totalmente da trajetória verdadeira. Isto é o que se
        conhece como
        <i>sensibilidade às condições inicias.</i>
        <br />
        Em 1998 foi finalmente demonstrado pelo Warwick Tucker que o atrator
        dado pelo Lorenz é realmente caótico. Tucker demonstrou este resultado,
        usando recursos computacionais, enquanto fazia um estágio de
        pós-doutorado no Instituto de Matemática Pura e Aplicada (IMPA), no Rio
        de Janeiro. Vale ressaltar que, nesta altura, já era conhecido que o
        sistema de Lorenz apresentava atratores caóticos para muitos valores dos
        parâmetros $\sigma, \beta$ e $\rho$ (um conjunto de
        <i>medida positiva</i>), mas não para os valores específicos dados pelo
        próprio Lorenz.
        <br />
        O nome de <i>Borboleta de Lorenz</i> tem uma origem curiosa. Lorenz
        comenta que para um congresso no Washington em 1972, o título da sua
        palestra seria
        <i>"Uma gaivota bate as asas no Brazil e cría um tornado no Texas",</i>
        e por um engano do organizador do congresso, o título ficou como
        <i>
          "Uma borboleta bate as asas no Brazil e cría um tornado no Texas".</i
        >
        Foi posteriormente, quando foi possível visualizar o atrator, que seu
        parecido com uma borboleta ficou evidente. Note que Lorenz e seus
        colegas trabalhavam na época com o equivalente de uma calculadora
        simples moderna, portanto eles apenas conseguiam visualizar uma
        coordenada de uma única trajetória de cada vez!
        <br />
        Sobre a borboleta ter sido adotada como símbolo para a sensibilidade nas
        condições iniciais, Lorenz comenta:
        <br />
        <p>
          <i
            ><b
              >"talvez a borboleta, com sua aparente fragilidade e falta de
              poder, seja o símbolo natural daquilo que, sendo muito pequeno,
              causa grandes efeitos..."</b
            >
          </i>
        </p>
        Podemos ver a borboleta batendo as asas se transladamos o atrator da
        origem (com Ctrl+$\leftrightarrows$, na animação) e depois o rotamos
        rápidamente.
      </v-col>
    </v-row>

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
    </v-row>
  </v-container>
</template>

<script>
import lorenzPlot from '@/static/js/babylon/lorenzPlot.js'

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
      lorenzPlot()
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
  /* manipulation; */
  margin: 0px;
  padding: 0px;
}
</style>
