<template>
  <div>
    <h3 style="color: brown;margin-bottom:0.3cm;text-decoration: underline;">
      Solução:
    </h3>

    <div id="solution">
      $\def\e{\textrm{e}}$ A equação é do tipo linear $\color{green}{y'+p(t) y =
      g(t)}$ sendo o fator integrante $\color{green}{\mu(t)=\e^{\int p(t) dt} =
      \e^{-\int (1/2) dt} = \e^{-t/2} }.$ Desta forma temos $$\color{green}{
      \begin{align*} \e^{-t/2} (y' - \frac{1}{2} y) &= \frac{d}{dt} (\e^{-t/2}
      y) = 2 \e^{-t/2} \cos(t), \color{black}{\textrm{ e integrando, } } \\
      \e^{-t/2} y &= 2 \int \e^{-t/2} \cos(t) dt + C \quad \textrm{(eq1)}.
      \end{align*} } $$ Precisamos calcular a integral $ \color{green}{\int
      \e^{a t} \cos(t) dt}$ com $\color{green}{a=-1/2.}$ Lembremos a fórmula de
      integração por partes: $\color{green}{ \int u\, dv = u\, v - \int v\, du
      }. $ Portanto fazendo $\color{green}{u = \e^{at},\quad du = a\e^{at}}$ e
      $\color{green}{dv = \cos(t) dt, \quad v = \sin(t)} $ temos
      $$\color{green}{\int \e^{a t} \cos(t) dt = \e^{at}\sin(t) - a \int \e^{at}
      \sin(t) dt, \quad \textrm{(eq2)}} $$ A segunda integral também pode ser
      integrada por partes usando $\color{green}{u = \e^{at},\quad du =
      a\e^{at}}$ e $\color{green}{dv = \sin(t) dt, \quad v = -\cos(t)} $ obtendo
      $$\color{green}{ \int \e^{a t} \sin(t) dt = -\e^{at}\cos(t) + a \int
      \e^{at} \cos(t) dt, \quad \textrm{(eq3)} } $$ Finalmente substituindo a
      equação (eq3) na equação (eq2) temos: $$ \int\e^{at}\cos(t)dt =
      \e^{at}\sin(t) + a\e^{at}\cos(t) -a^2\int\e^{at}\cos(t)dt, $$ de onde
      $$(1+a^2) \int \e^{at}\cos(t)dt = \e^{at}\sin(t) + a\e^{at}\cos(t) + C, $$
      obtendo, $$\int\e^{at}\cos(t)dt = (\frac{1}{1+a^2}) \e^{at}\sin(t) +
      (\frac{a}{1+a^2})\e^{at} \cos(t) + C, $$ ou, pondo
      $\color{green}{a=-1/2}$, $$ \int\e^{-t/2}\cos(t)dt = (\frac{4}{5})
      \e^{-t/2}\sin(t) - (\frac{2}{5})\e^{-t/2} \cos(t) + C. $$ Voltando então
      para a equação (eq1) temos que $$ \color{green}{ y(t) = (\frac{8}{5})
      \sin(t) - (\frac{4}{5}) \cos(t) + C \e^{t/2}. }$$ Pela condição inicial
      $\color{green}{y(0)=a}$ temos que $\require{cancel}$ $$ \color{green}{
      y(0)=a = (\frac{8}{5}) \cancel[mathcolor="red"]{\sin(0)}^{\color{red}{0}}
      - (\frac{4}{5}) \cancel{\cos(0)}^{\color{red}{1}} + C
      \cancel{\e^{0}}^{\color{red}{1}}= -4/5 + C,} $$ isto é,
      $\color{green}{C=(4/5 + a)}$. Assim as soluções do problema de valor
      inicial são da forma: $$ \color{green}{ y(t) = (\frac{8}{5}) \sin(t) -
      (\frac{4}{5}) \cos(t) + \color{green}{(\frac{4}{5}+a)}\e^{t/2}. }$$ O
      comportamento das soluções depende inteiramente do coeficiente
      $\color{green}{(\frac{4}{5}+a)}$:
      <ul>
        <li>
          Se este número for positivo, isto é, se $\color{green}{(a \gt
          -\frac{4}{5})}$ então a solução explode para infinito positivo (por
          causa da exponencial) quando $t\to\infty$: $\lim_{t\to\infty}
          y(t)=+\infty.$
        </li>
      </ul>

      <ul>
        <li>
          se $\color{green}{(a \lt -\frac{4}{5})}$ então a solução explode para
          infinito negativo quando $t\to\infty$: $\lim_{t\to\infty}
          y(t)=-\infty.$,
        </li>
        <li>
          se $\color{green}{(a = -\frac{4}{5})}$ então a solução se torna
          $$\color{green}{y(t)=(\frac{8}{5}) \sin(t) - (\frac{4}{5}) \cos(t)} $$
          que permance <span style="color:green"> limitada</span>
          quando $t\to\infty.$ Isto significa que existe um número
          $\color{green}{M>0}$ tal que o módulo $\color{green}{| y(t) | < M
          \textrm{ para todo } t>0.}$
          <br />
          Observe que o limite $\lim_{t\to\infty} y(t)$
          <span style="color:green"> não existe </span> para esta função. O fato
          da função estar limitada não implica na existência deste limite.
          <br />
          Note também que quando $t\to -\infty$ a exponencial $\e^{t/2}\to 0$ e
          todas as soluções $y(t)$ se aproximam muito rápido da solução
          periódica $\color{green}{y(t)=(\frac{8}{5}) \sin(t) - (\frac{4}{5})
          \cos(t)}.$
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
