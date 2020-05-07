<template>
  <v-sheet id="mathjax">
    <div>
      <h2 style="color:brown; margin-bottom:0.5cm;">
        Equações separáveis de primeira Ordem
      </h2>
      <hr style="color:brown; margin-bottom:0.5cm;" />
      <v-btn @click="count++" class="mx-2" fab large absolute top text right>
        <v-icon class="black--text" large>mdi-chevron-right</v-icon>
      </v-btn>
    </div>

    <v-btn @click="count += 2" class="mx-2" fab large text absolute bottom left>
      <v-icon class="black--text" large>mdi-chevron-left</v-icon>
    </v-btn>

    <transition name="fade">
      <div key="1" v-if="updateText == 0"><Separavel1 /></div>
      <div key="2" v-else-if="updateText == 1"><Separavel2 /></div>
      <div key="3" v-else="updateText == 2"><Separavel3 /></div>
      <!-- <div key="4" v-else-if="updateText == 3"><Text4 /></div> -->
      <!-- <div key="5" v-else><Linear1 /></div> -->
    </transition>

    <v-btn @click="count++" class="mx-2" fab large text absolute bottom right>
      <v-icon class="black--text" large>mdi-chevron-right</v-icon>
    </v-btn>
  </v-sheet>
</template>

<script>
import Separavel1 from '@/components/EqDiff/Separavel/Separavel1'
import Separavel2 from '@/components/EqDiff/Separavel/Separavel2'
import Separavel3 from '@/components/EqDiff/Separavel/Separavel3'
// import Linear4 from '../../components/LodkaVolterra/Linear4'
// import Linear5 from '../../components/LodkaVolterra/Linear5'

export default {
  components: {
    Separavel1,
    Separavel2,
    Separavel3
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
      return this.count % 3
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
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all 0.2s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

#mathjax {
  /* font-family: 'Comic Sans MS', cursive, sans-serif; */
  /* font-family: 'Neucha', cursive; */
  /* font-family: Lucida Console; */
  font-family: 'Montserrat', sans-serif;
  font-size: 18px;
  /* font-weight: 700; */
  line-height: 150%;
  /* margin: 0; */
  /* margin-bottom: 0.4cm; */
}
</style>
