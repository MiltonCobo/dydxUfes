<template>
  <div>
    <v-container fluid>
      <v-row style="margin:25px;">
        <v-col style="border: 1px solid green; padding: 0px;">
          <Qseparavel3 class="mathjax green lighten-5" />
        </v-col>
      </v-row>
      <v-spacer />
      <v-spacer />
      <v-row>
        <v-col>
          <Sseparavel3 />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Qseparavel3 from '@/components/EqDiff/Separavel/Textos/Qseparavel3'
import Sseparavel3 from '@/components/EqDiff/Separavel/Textos/Sseparavel3'

export default {
  name: 'Text1',
  components: {
    Qseparavel3,
    Sseparavel3
  },
  mounted() {
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'mathjax'])
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
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: 'stylesheet',
          href:
            'https://fonts.googleapis.com/css2?family=Rock+Salt&display=swap'
        }
      ]
    }
  }
}
</script>

<style scoped>
#mathjax {
  /* font-size: 15px; */
  /* font-family: 'Montserrat', sans-serif; */
  /* font-family: 'Neucha', cursive; */
  /* font-family: Lucida Console; */
  /* font-family: 'Rock Salt', cursive;
  font-weight: 700;
  line-height: 1.8; */
}

p {
  /* font-size: 12px; */
  /* font-weight: 700; */
  /* line-height: 1.5; */
  /* font-family: 'Rock Salt', cursive; */
}
</style>
