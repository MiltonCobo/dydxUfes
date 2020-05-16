<template>
  <v-sheet class="mathjax">
    Lotka e Volterra consideraram duas espécies, um predador e uma presa, num
    ecossistema isolado e interagindo segundo certas hipóteses. Consideramos aqui, para ilustrar,
    populações de atuns e tubarões, que denotaremos as populações por $x(t)$ e $y(t)$
    respectivamente. Assumiremos as seguintes simplificações (claramente não realísticas):
    <ul> 
      <li> O predador depende totalmente da sua presa, sendo esta sua única 
      fonte de alimento; </li>
      <li> A presa tem uma fonte inesgotável de alimento e a única restrição ao seu crescimento
        se deve ao predador; </li>
    </ul>
    De fato, o modelo inicial de Lotka se aplicava a  uma população de herbívoros que dependia de uma certa planta.
    <br/>
    Do ponto de vista matemático o modelo Lotka-Volterra tem 4 hipóteses.
    Vamos justificar aqui somente a primeira:
    <br/>
    <span style="color:var(--mjx-green);">
      "Em ausência de tubarões o incremento na população de atuns é proporcional
    ao tempo transcorrido e à própria quantidade de atuns".</span>

    Isto é, num intervalo de tempo $\Delta t$ a variação da população $x(t+\Delta t)- x(t)$  será dada por
    \[ x(t+\Delta t) - x(t) = a\cdot x(t)\cdot \Delta t,\,\, a
    >0.\] Por exemplo, se a pesca cessou por um período de 4 anos e os atuns se
    reproduzem a cada 4 meses, o intervalo de tempo a considerar será $\Delta t
    = \frac{4}{48} =\frac{1}{12} \approx 0.083$. Se após cada ciclo reprodutivo a população
    de atuns se incrementa digamos em $10\%$, o valor de $a$ será dado por $a=0.1/0.083\approx 1.2.$ 

    <br />
    Apresentaremos agora as hipóteses do modelo na linguagem de
    <span style="color:var(--mjx-green)">derivadas</span>, isto é, considerando os limites
    quando $\Delta t \to 0$.

    <ol>
      <li>
        $\def\e{\textrm e}$
        Em ausência de predadores a população de presas aumenta com velocidade
        proporcional ao número de presas nesse momento:
        ${\frac{dx}{dt} = a\, x(t),\, a \gt 0} $ (os atuns nascem a
        ritmo constante); como sabem nossos alunos do curso de equações diferenciais,
        isto implica que $x(t)=x_0\e^{at},$ e a população de presas cresce exponencialente.
        Sabe-se que a população de toda forma de vida tende a aumentar exponencialmente, e que isto só
        não acontece pelas restrições impostas pelo ecossistema.
      </li>

      <li>
        Em ausência de presas, a população de predadores decai com velocidade
        proporcional ao número de predadores: $\frac{dy}{dt}= -c\,
        y(t),\, c>0$ (as tubarões morrem de inanição a ritmo constante);
      </li>

      <li>
        A velocidade com que atuns são mortos pelos tubarões é proporcional ao
        número total de encontros tubarão-atum, ${-b\, x(t)y(t),
        \,\, b>0}.$ Posto de outra forma: ${b}$ é a probabilidade de um encontro
        tubarão-atum e do atum resultar morto;
      </li>

      <li>
        Similarmente, a população de tubarões aumenta devido à presença dos
        atuns com velocidade proporcional ao número de encontros entre eles
        (isto é ${+d\, x(t)y(t),\,\, d \gt 0}$).
      </li>
    </ol>
  </v-sheet>
</template>

<script>
export default {
  name: 'Text2',
  mounted() {
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'mathjax'])
  }
}
</script>

</script>
