<template>
  <v-sheet class="mathjax">
    <v-container fluid>
      <v-row align="center">
        <v-col sm="12">
          Note que as curvas de nível de $V$ são fechadas. De fato o gradiente
          ${\nabla V(x,y)=(d-c/x, b-a/y)}$ se anula no ponto $\bar{p}=(c/d,
          a/b)$ e a matriz Hessiana de $V$ em ${\bar{p}}$ é dada por
          $$\textrm{Hess}\, V(\bar{p}) = \begin{pmatrix} d^2/c & 0 \\ 0 & b^2/a
          \end{pmatrix}.$$ Pelo critério da segunda derivada $V$ tem um mínimo
          local em $\bar{p}$, isto é, ${ V(\frac{c}{d}+x,\frac{a}{b}+y) }$ é
          aproximadamente igual $${ V(\bar{p})+\frac{d^2}{c}\, x^2
          +\frac{b^2}{a}\, y^2 }$$ para $(x,y)$ muito pequenos e portanto, perto
          do ponto $\bar{p}$, o gráfico de $V$ é próximo de um paraboloide, com
          curvas de nível fechadas.
          <br />
          As soluções das equações de Lotka-Volterra tem uma característica
          importante:
          <span style="color:  var(--mjx-green);">
            O valor médio da população de atuns, em qualquer trajetória, é $c/d$
            e o valor médio para os tubarões é $a/b$,</span
          >
          isto é, $${1\over T}\int_0^T x(t) dt = c/d, \quad\quad {1\over
          T}\int_0^T y(t) dt = a/b.$$ De fato pelas equações (EQs), $ {d\over
          dx} \ln(x) = x'/x= a-b\,y $ então integrando e usando que $x(T)=x(0)$
          porque as soluções são periódicas,
          $$\begin{split}0&=\ln(x(T))-\ln(x(0))=\int_0^T {d\over dt} \ln(x) \,dt
          \\ &= \int_0^T a-b\, y(t)\, dt \end{split} $$ de onde $ {1\over
          T}\int_0^T y(t) dt = a/b.$ A outra igualdade é similar.
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script>
export default {
  name: 'Text4',

  mounted() {
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'mathjax'])
  }
}
</script>
