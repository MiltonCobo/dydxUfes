<template>
  <div>
    <v-container fluid>
      <v-row style="margin:25px;">
        <v-col style="border: 1px solid green; padding: 0px;">
          <Qlinear1 class="mathjax green lighten-5" />
        </v-col>
      </v-row>
      <v-spacer />
      <v-spacer />
      <v-row>
        <v-col>
          <Slinear1 />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Qlinear1 from '@/components/EqDiff/Linear/Textos/Qlinear1'
import Slinear1 from '@/components/EqDiff/Linear/Textos/Slinear1'

export default {
  name: 'Linear1',
  components: {
    Qlinear1,
    Slinear1
  },

  methods: {},
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

<style scoped></style>
