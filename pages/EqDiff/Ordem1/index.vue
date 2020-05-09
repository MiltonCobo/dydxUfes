<template>
  <div>
      <h1>Equações diferenciais de primeira ordem</h1>

      <p> As equações de primeira ordem se dividem essencialmente em duas
          categorias.
          <ol>
              <li>
                  <nuxt-link to="/EqDiff/Ordem1/Lineares"> 
                  Equações Lineares 
                  </nuxt-link>
              </li>
             <li>
                    <nuxt-link to="/EqDiff/Ordem1/Separavel"> 
                    Equações Separáveis
                     </nuxt-link> 
              </li>
          </ol>
      </p>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: 'Equações separáveis',
      meta: [
        {
          hid: 'description Separáveis',
          name: 'eq. Separáveis',
          content: 'Separáveis www.dydx.ufes.br do DMAT/UFES'
        }
      ],
      script: [
        {
          type: 'text/javascript', //x-mathjax-config',
          src: 'js/MathJax/mathjax2Config.js',
          async: true
          //defer: true // defer = true is important
        }
      ]
    }
  }
}
</script>

<style>

</style>