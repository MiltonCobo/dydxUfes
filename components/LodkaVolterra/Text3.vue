<template>
  <v-sheet id="mathjax">
    Sendo assim, temos por exemplo que a velocidade com que varia a população de
    presas estará dada
    <span style="color:green">$dx/dt $= taxa de entrada - taxa saida</span> e as
    equações do modelo são (com $a, b, c $ e $d$ positivas): $$ \color{green}{
    \frac{dx}{dt} = a\,x - b\,x y, \quad \frac{dy}{dt} = -c\,y + d\,x y.}\quad
    \textrm{(EQs)} $$ Uma observação é importante. As constantes $b$ e $d$
    dependem apenas da dinâmica interna predador-presa enquanto que $a$ e $c$
    consideram fatores exteriores, como a pesca, que afetam o taxa de
    crescimento dos atuns e a taxa de mortalidade dos tubarões.
    <br />
    As soluções $(x(t), y(t))$ das equações de Lodka-Volterra moram nas
    <span style="color:green">curvas de nível</span> da função
    $$\color{green}{V(x,y)=d\, x -c\,\ln(x) + b\, y -a\, \ln(y) }.$$ Para ver
    isto eliminamos o tempo nas equações fazendo $$\color{green}{ { dy/dt\over
    {dx/dt}} = {dy\over dx} = \frac{y(d\,x-c)}{x(a-b\,y)} }$$ e desta forma
    obtemos uma equação diferencial, numa variável, do tipo "separável":
    \[\color{green}{ \frac{a-b\, y}{y} dy = \frac{d\, x-c}{x}\, dx } \] e e por
    integração chegamos na chamada solução
    <span style="color:green">implícita</span>
    $$\color{green}{ V=d\, x -c\,\ln(x) + b\, y -a\, \ln(y) }.$$
    <br />
  </v-sheet>
</template>

<script>
export default {
  name: 'Text3',
  mounted() {
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'mathjax'])
  }
}
</script>
