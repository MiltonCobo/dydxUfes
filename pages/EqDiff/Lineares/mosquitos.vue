<template>
  <v-sheet id="mathjax">
    <v-btn
      @click="count = count + 1"
      class="mx-2"
      fab
      large
      absolute
      top
      text
      right
    >
      <v-icon class="brown--text" large>arrow_forward_ios</v-icon>
    </v-btn>
    <Qlinear1 />
    <Slinear1 />

    <v-btn
      @click="count = count + 9"
      class="mx-2"
      fab
      large
      text
      absolute
      bottom
      left
    >
      <v-icon class="brown--text" large>arrow_back_ios</v-icon>
    </v-btn>
    <v-btn
      @click="count = count + 1"
      class="mx-2"
      fab
      large
      text
      absolute
      bottom
      right
    >
      <v-icon class="brown--text" large>arrow_forward_ios</v-icon>
    </v-btn>
  </v-sheet>
</template>

<script>
import Qlinear1 from '@/components/EqDiff/Linear/Qlinear1'
import Slinear1 from '@/components/EqDiff/Linear/Slinear1'

export default {
  name: 'Text1',
  components: {
    Qlinear1,
    Slinear1
  },
  mounted() {
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'mathjax'])
  },
  head() {
    return {
      title: 'Eq. Diferenciais Lineares',
      meta: [
        {
          hid: 'Eq. Diferenciais Lineares',
          name: 'Eq. Diferenciais Lineares',
          content: 'q. Diferenciais Lineares'
        }
      ],
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
  font-size: 15px;
  /* font-family: 'Montserrat', sans-serif; */
  /* font-family: 'Neucha', cursive; */
  /* font-family: Lucida Console; */
  font-family: 'Rock Salt', cursive;
  font-weight: 700;
  line-height: 1.8;
}

p {
  font-size: 12px;
  /* font-weight: 700; */
  line-height: 1.5;
  /* font-family: 'Rock Salt', cursive; */
}
</style>
