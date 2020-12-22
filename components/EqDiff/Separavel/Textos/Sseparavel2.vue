<template>
  <v-container class="mathjax" fluid>
    <v-row>
      <v-col>
        <h3 style="color:green; margin-top: 0.3cm;">
          Solução:
        </h3>
      </v-col>
    </v-row>
    <v-divider />
    <v-row>
      <v-col>
        <v-sheet style="margin-top: 0.3cm;">
          $\def\R{\mathbb R}$ Separando as variáveis, $ { (3y^2-6y) \, dy = (1+
          3x^2) \, dx},$ e integrando a ambos lados, obtemos que as soluções
          $y=f(x)$ da equação diferencial moram
          <span style="color:var(--mjx-green)">implícitamente</span> nas curvas
          $$ { y^3-3y^2 = x^3+x+C} \quad\textrm{(eq1)}$$ com $C$ variando em
          $\R.$ Dito de outra forma, as soluções da equação moram nas curvas de
          nível da função:
          <v-btn large @click.stop="openFigure = true" color="green lighten-4">
            Ver figura
          </v-btn>
          $${z=V(x,y) = y^3-3y^2 -x^3-x}. $$
          <br />

          Usando a condição inicial $x=0, y=1$ em (eq1) obtemos que $C=-2,$ ou
          seja a solução do problema de valor inicial (PVI) mora implícitamente
          na curva de nível $${y^3-3y^2 - x^3-x = -2}\quad \textrm{(eq2)}.$$
          Neste caso é muito complicado, embora possível, achar a solução de
          forma
          <span style="color:var(--mjx-green)"> explícita $y=f(x).$ </span> Para
          achar o intervalo de definição da solução do PVI, precisamos achar
          <span style="color:var(--mjx-green)">
            o maior intervalo, que contenha $x=0$, e onde a derivada $dy/dx$
            esteja bem definida.
          </span>
          Isto é, precisamos determinar os valores de $x$ e $y$ onde
          ${\frac{dy}{dx} = \frac{1+3x^2}{3y^2-6y}}$,
          <span style="color:var(--mjx-green)">não existe. </span>
          Isto acontece quando $y=0$ ou $y=2.$ Para achar os valores de $x$
          substituimos $y$ na equação (eq2). Por exemplo se ${y=0}$ temos ${0 =
          x^3+x-2}$.
          <span style="color:var(--mjx-green)"
            >Como determinar os valores de $x$ que satisfazem esta equação?
          </span>
        </v-sheet>
      </v-col>
    </v-row>

    <v-row align="center">
      <v-col sm="12" md="7">
        <v-sheet>
          O problema de achar as raizes de um polinômio de grau $n\ge 3$ é em
          geral difícil. Para $n=2$ temos a fórmula de Bháskara ou quadrática.
          Para $n=3$ e $4$ ainda existem fórmulas explícitas mas muito extensas
          e pouco práticas para calcular as raizes. O matemático francês
          <span style="color: Brown">Évariste Galois </span> provou que
          <span style="color:var(--mjx-green)">
            para polinômios de grau $\ge 5$ não existem fórmulas gerais para
            calcular as raizes.</span
          >
          Este é um resultado profundo que Galois demostrou antes de completar
          seus 21 anos, quando morreu num duelo de pistola!
        </v-sheet>
      </v-col>
      <v-col sm="12" md="5" align="center">
        <v-img contain src="/figures/Evariste_galois.jpg" height="300"> </v-img>
        <div class="subheading">Évariste Galois(1811-1832)</div>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-sheet>
          Ele viveu num momento de turbulência política na França sendo um
          acalorado ativista político que não hesitava em se envolver em
          situações perigosas, sendo preso varias vezes. Ele ainda conseguiu ser
          expulso da École Normale Supérieure, onde era aluno, praticamente
          acabando sua carreira matemática. As razões do duelo de pistola não
          estão completamente claras mas aparentemente estão relacionadas com um
          caso amoroso. De acordo com seu primo, Gabriel Demante, Galois teria
          lhe dito numa carta escrita pouco antes do duelo
          <span style="font-style: italic">
            "eu sou vítima de uma coquete infame e seus dois idiotas"
          </span>
          (veja por exemplo a página de
          <a
            href="https://pt.wikipedia.org/wiki/%C3%89variste_Galois"
            target="_blank"
            >Wikipedia sobre Galois).
          </a>

          <v-spacer />
          <br />
          Usaremos o seguinte teorema matemático que nos permite achar as raizes
          racionais de um polinômio
          <span style="color:var(--mjx-green)"> se elas existirem. </span>
          <br />
          <br />

          <v-sheet
            style="border: 1px green; padding: 2%;"
            class="green lighten-5"
          >
            <h3 style="color:var(--mjx-green)">Teorema:</h3>
            <p>
              Considere o polinômio ${p(x)= a_n x^n+ \dots+a_1 x+ a_0}$ onde os
              coeficientes ${a_0, a_1, \dots,a_n}$ e ${n\gt 1}$ são números
              inteiros.
              <br />
              Então se $p(x)$ tem uma raiz racional ${x=p/q}$ (com $p,q$ sem
              divisores comuns), então
              <span style="color:var(--mjx-green)"
                >$p$ divide a $a_0$ e $q$ divide a $a_n.$
              </span>
            </p>
          </v-sheet>

          <br />
          Não tentaremos demostrar este resultado nestas notas, mas incentivamos
          o leitor a achar uma prova por si próprio. É importante frisar que
          $p(x)$ pode não ter nenhuma raiz racional e nesse caso o teorema não
          diz nada sobre as raizes de $p(x).$

          <ul>
            <li>
              Para ${y=0}$ nossa esperança é que ${p(x) = x^3+x-2}$ tenha pelo
              menos uma raiz racional. Pelo teorema se $x=p/q$ é uma raiz
              racional de $p(x)$ então
              <span style="color:var(--mjx-green)">
                $p$ é um divisor de $-2$ e $q$ é um divisor de $1$</span
              >. Isto nos deixa com as possíveis raizes racionais $ x= \pm 1,
              \pm 2.$ Testando cada uma delas descobrimos que $x=1$ é raiz de
              $p(x)$. Isto significa que o monômio $(x-1)$ é um divisor de
              $p(x),$ de fato podemos mostrar que ${p(x) = x^3+x-2 =
              (x-1)(x^2+x+2)}$. Comprovamos fácilmente que $x^2+x+2$ não tem
              raizes reais. Assim $x=1$ é a única raiz real de $p(x),$ o que
              implica que a curva $y^3-3y^2 - x^3-x = -2$ intercepta o eixo "x"
              únicamente no ponto $(1,0).$
            </li>

            <li>
              Para ${y=2}$ devemos achar as raizes de ${q(x)=x^3+x+2.}$ Usando
              de novo o teorema temos que as possíveis raizes racionais deste
              polinômio são $x=\pm1, \pm 2.$ Testando descobrimos que $x=-1$ é
              uma raiz e que
              <span style="color:var(--mjx-green)">$q(x)= (x+1)(x^2+x-2)$</span>
              onde $x^2+x-2$ não tem raizes reais. Portanto a curva $y^3-3y^2 -
              x^3-x = -2$ intercepta a reta $y=2$ únicamente no ponto $(-1,2).$
            </li>
          </ul>

          Desta forma sabemos que a derivada de nossa solução $y=f(x)$ não está
          definida para $x=-1$ e $x=1$ pois como vimos os valores $y(-1) = 2$ e
          $y(1)=0$ estão proibidos na expressão de $dy/dx.$ Como o intervalo de
          definição da solução deve conter o valor inicial $x=0$ concluimos que
          <span style="color:var(--mjx-green)">
            o domínio da solução é o intervalo $[-1,1]$</span
          >
          <v-btn large @click.stop="openFigure2 = true" color="green lighten-4">
            Ver figura.
          </v-btn>
          Uma outra observação a se fazer é que as curvas de nível de
          ${V(x,y)=y^3-3y^2-x^3-x}$ se tornam assintóticas à reta ${y=x}$ quando
          $t\to\pm\infty.$ Para sermos mais claros, se ${y=f(x)}$ é uma função
          implícita numa das curva de nível de $V(x,y)$
          <span style="color:var(--mjx-green)"
            >e que está definida num intervalo da forma ${[a, \infty)}$ (ou
            ${(-\infty, a]}$),
          </span>
          então
          <span style="color:var(--mjx-green)">
            $$\lim_{x\to\infty} f(x)/x = 1 \quad\textrm{(ou $\lim_{x\to-\infty}
            f(x)/x = 1$)}. $$
          </span>
          <br />
          <span style="color:var(--mjx-green)">
            Consegue encontrar uma justificativa matemática para este
            fenômeno?</span
          >
          <v-dialog
            transition="fab-transition"
            v-model="openFigure"
            width-width="360"
            max-width="600"
          >
            <v-card style="background-color:gainsboro;">
              <v-card-actions class="flex-column align-start">
                <client-only placeholder="carregando...">
                  <vue-plotly
                    :data="data"
                    :layout="layout"
                    :options="options"
                  />
                </client-only>

                <v-btn color="light-green" @click="openFigure = false">
                  Voltar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-sheet>
      </v-col>
    </v-row>

    <v-dialog
      transition="fab-transition"
      v-model="openFigure2"
      width="600"
      height="600"
    >
      <v-card style="background-color:gainsboro;">
        <v-card-actions class="flex-column align-start">
          <client-only placeholder="carregando...">
            <vue-plotly :data="data2" :layout="layout2" :options="options" />
          </client-only>
          <v-btn color="light-green" @click="openFigure2 = false">
            Voltar
          </v-btn>
          <v-card-text class="mathjax" style="font-family: Lucida Console;">
          </v-card-text>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { drawSurfaceSep2 } from '@/static/js/Separavel/separavel2.js'
import { drawContoursSep2 } from '@/static/js/Separavel/separavel2.js'

export default {
  components: {
    'vue-plotly': () => import('@statnett/vue-plotly')
  },

  data() {
    let info = drawSurfaceSep2()
    let data = info.data
    let layout = info.layout
    let options = info.options

    let info2 = drawContoursSep2()
    let data2 = info2.data
    let layout2 = info2.layout

    return {
      openFigure: false,
      openFigure2: false,
      data,
      layout,
      options,
      data2,
      layout2
    }
  },
  mounted() {
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'mathjax'])
  }
}
</script>
