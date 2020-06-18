<template>
  <div>
    <v-container fluid>
      <v-row style="margin:25px;">
        <v-col style="border: 1px solid green; padding: 0px;">
          <Qlinear2 class="mathjax green lighten-5" />
        </v-col>
      </v-row>
      <v-spacer />
      <v-spacer />
      <v-row>
        <v-col>
          <Slinear2 />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Qlinear2 from '@/components/EqDiff/Linear/Textos/Qlinear2'
import Slinear2 from '@/components/EqDiff/Linear/Textos/Slinear2'

export default {
  data() {
    return {}
  },
  name: 'Text1',

  components: {
    Qlinear2,
    Slinear2
  },
  head() {
    return {
      // title: 'Eq. Diferenciais Lineares',
      // meta: [
      //   {
      //     hid: 'Eq. Diferenciais Lineares',
      //     name: 'Eq. Diferenciais Lineares',
      //     content: 'q. Diferenciais Lineares'
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
  /* font-size: 18px; */
  /* font-family: 'Montserrat', sans-serif; */
  /* font-family: 'Neucha', cursive; */
  /* font-family: Lucida Console; */
  /* font-family: 'Rock Salt', cursive; */
  /* font-weight: 700;
  line-height: 1.2; */
}

p {
  /* font-size: 15px;
  font-family: Lucida Console; */
  /* font-weight: 700; */
  /* line-height: 1.2; */
  /* font-family: 'Rock Salt', cursive; */
}
</style>
