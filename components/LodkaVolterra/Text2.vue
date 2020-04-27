<template>
  <v-sheet id="mathjax">
        <h2 style="color:brown; margin-bottom:0.1cm;">
      As equações de Lodka-Volterra
    </h2>
    <hr style="color:brown; margin-bottom:1cm;" />

    Lodka e Volterra consideraram duas espécies, um predador e uma presa, num
    ecossistema isolado e interagindo segundo algumas hipóteses. Consideramos
    populações de atuns
    <!--<img src="./figuras/atun1.png" height="50" width="50"></img>-->
    e tubarões
    <!-- <img src="./figuras/shark1.png" height="60" width="60"></img> -->
    para ilustrar que denotaremos as populações por $x(t)$ e $y(t)$
    respectivamente. Vamos justificar somente a primeira hipótese do modelo:
    <br />
    "Em ausência de tubarões o incremento na população de atuns é proporcional
    ao tempo transcorrido e à própria quantidade de atuns", isto é, após um
    intervalo de tempo $\Delta t$ teremos uma população $x(t+\Delta t)$ dada por
    \[ \color{green}{x(t+\Delta t) = x(t) + a\cdot x(t)\cdot \Delta t,\,\, a
    >0}.\] Por exemplo, se a pesca cessou por um período de 4 anos e os atuns se
    reproduzem a cada 4 meses, o intervalo de tempo a considerar será $\Delta t
    = \frac{4}{48} =\frac{1}{12} \approx 0.083$ (um ciclo reprodutivo).

    <br />
    Apresentaremos agora as hipóteses do modelo na linguagem de
    <span style="color:green">derivadas</span>, isto é, considerando os limites
    quando $\Delta t \to 0$.

    <ol>
      <li>
        Em ausência de predadores a população de presas aumenta com velocidade
        proporcional ao número de presas nesse momento:
        $\color{green}{\frac{dx}{dt} = a\, x(t),\, a \gt 0} $ (os atuns nascem a
        ritmo constante);
      </li>

      <li>
        Em ausência de presas, a população de predadores decae com velocidade
        proporcional ao número de predadores: $\color{green}{\frac{dy}{dt}= -c\,
        y(t),\, c>0}$ (as tubarões morrem de inanição a ritmo constante);
      </li>

      <li>
        A velocidade com que atuns são mortos pelos tubarões é proporcional ao
        número total de encontros tubarão-atum, $\color{green}{-b\, x(t)y(t),
        \,\, b>0}$. Posto de outra forma, $b$ é a probabilidade de um encontro
        tubarão-atum e do atum resultar morto;
      </li>

      <li>
        Similarmente, a população de tubarões aumenta devido à presença dos
        atuns com velocidade proporcional ao número de encontros entre eles
        (isto é $\color{green}{+d\, x(t)y(t),\,\, d \gt 0}$).
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
