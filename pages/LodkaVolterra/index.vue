<template>
  <div>
    <v-container id="mathjax" fluid>
      <v-row align="center" align-content="space-between" wrap>
        <v-col cols="1" align-items="start">
          <v-btn
            @click="count = count + 9"
            class="mx-2"
            fab
            large
            left
            color="lightgrey green--text"
          >
            <v-icon large>mdi-chevron-left</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="10">
          <div v-if="updateText == 0"><Text1 id="mathjax" /></div>
          <div v-else-if="updateText == 1"><Text2 /></div>
          <div v-else-if="updateText == 2"><Text3 /></div>
          <div v-else-if="updateText == 3"><Text4 /></div>
          <div v-else><Text5 /></div>
        </v-col>
        <v-col cols="1" align-items="end">
          <v-btn
            @click="count++"
            class="mx-2"
            fab
            large
            right
            color="lightgrey green--text"
          >
            <v-icon large>mdi-chevron-right</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Text1 from '../../components/LodkaVolterra/Text1'
import Text2 from '../../components/LodkaVolterra/Text2'
import Text3 from '../../components/LodkaVolterra/Text3'
import Text4 from '../../components/LodkaVolterra/Text4'
import Text5 from '../../components/LodkaVolterra/Text5'

export default {
  components: {
    Text1,
    Text2,
    Text3,
    Text4,
    Text5
  },
  data() {
    return {
      count: 0
    }
  },
  mounted() {
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'mathjax'])
  },
  computed: {
    updateText() {
      return this.count % 5
    }
  },
  head() {
    return {
      title: 'Lodka-Volterra',
      meta: [
        {
          hid: 'description lodka-volterra',
          name: 'Lodka-Volterra',
          content: 'Lodka-Volterra www.dydx.ufes.br do DMAT/UFES'
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
  /* font-family: 'Comic Sans MS', cursive, sans-serif; */
  /* font-family: 'Neucha', cursive; */
  font-family: Lucida Console;
  /* font-family: 'Montserrat', sans-serif; */
  font-size: 18px;
  /* font-weight: 700; */
  /* line-height: 150%; */
  margin: 0px;
  margin-bottom: 0.4cm;
}
</style>
