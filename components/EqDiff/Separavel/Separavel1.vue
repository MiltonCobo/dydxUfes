<template>
  <div>
    <v-container fluid>
      <v-row style="margin:25px;">
        <v-col style="border: 1px solid green; padding: 0px;">
          <Qseparavel1 class="mathjax green lighten-5" />
        </v-col>
      </v-row>
      <v-spacer />
      <v-spacer />
      <v-row>
        <v-col>
          <Sseparavel1 />
        </v-col>
      </v-row>
    </v-container>
  </div>
  <!-- <v-container class="mathjax" fluid>
      <v-row>
        <h3 style="color:green;margin-bottom:0.5cm;text-decoration: underline;">
          Exercício 1:
        </h3>
      </v-row>
      <v-row>
        <Qseparavel1 />
      </v-row>
      <v-divider />
      <v-spacer />

      <v-row>
        <h3
          style="color: green;margin:0.5cm 0cm 0.5cm 0cm;text-decoration: underline;"
        >
          Solução:
        </h3>
        <Sseparavel1 />
      </v-row>
    </v-container>
  </div> -->
</template>

<script>
import Qseparavel1 from '@/components/EqDiff/Separavel/Textos/Qseparavel1'
import Sseparavel1 from '@/components/EqDiff/Separavel/Textos/Sseparavel1'

export default {
  name: 'Text1',
  components: {
    Qseparavel1,
    Sseparavel1
  },
  mounted() {
    if (window.MathJax) {
      MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'mathjax'])
    }
  },
  head() {
    return {
      // title: 'Eq. Separável',
      // meta: [
      //   {
      //     hid: 'Eq. Separável',
      //     name: 'Eq. Separável',
      //     content: 'Eq. Separável de primeira ordem'
      //   }
      // ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        // {
        //   rel: 'stylesheet',
        //   href:
        //     'https://fonts.googleapis.com/css2?family=Rock+Salt&display=swap'
        // }
      ]
    }
  }
}
</script>

<style scoped></style>
