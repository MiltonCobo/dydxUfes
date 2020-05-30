<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col xs="12" align="start">
          <h2 style="color:brown;">
            Equações Lineares de primeira Ordem
            <v-btn @click="count++" fab large absolute text right>
              <v-icon style="color:brown;" large>chevron_right</v-icon>
            </v-btn>
          </h2>
          <v-divider style="margin:0.5cm;" />
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <transition name="fade">
            <div key="1" v-if="updateText == 0"><Linear1 /></div>
            <div key="2" v-else-if="updateText == 1"><Linear2 /></div>
            <div key="3" v-else="updateText == 2"><Linear3 /></div>
            <!-- <div key="4" v-else-if="updateText == 3"><Text4 /></div> -->
            <!-- <div key="5" v-else><Linear1 /></div> -->
          </transition>
          <v-btn @click="count += 2" fab large text absolute bottom left>
            <v-icon style="color:brown;" large>chevron_left</v-icon>
          </v-btn>
          <v-btn @click="count++" fab large text absolute bottom right>
            <v-icon style="color:brown;" large>chevron_right</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <!-- <v-row>
        <v-col>
          <v-btn @click="count += 2" fab large text absolute bottom left>
            <v-icon style="color:brown;" large>chevron_left</v-icon>
          </v-btn>
          <v-btn @click="count++" fab large text absolute bottom right>
            <v-icon style="color:brown;" large>chevron_right</v-icon>
          </v-btn>
        </v-col>
      </v-row> -->
    </v-container>
  </div>
</template>

<script>
import Linear1 from '@/components/EqDiff/Linear/Linear1'
import Linear2 from '@/components/EqDiff/Linear/Linear2'
import Linear3 from '@/components/EqDiff/Linear/Linear3'
// import Linear4 from '../../components/LodkaVolterra/Linear4'
// import Linear5 from '../../components/LodkaVolterra/Linear5'

export default {
  components: {
    Linear1,
    Linear2,
    Linear3
    // Linear4,
    // Linear5
  },
  data() {
    return {
      count: 0
    }
  },
  mounted() {
    document.addEventListener('keydown', e => {
      if (e.keyCode == 39) {
        this.count++
      } else if (e.keyCode == 37) {
        this.count += 2
      } else return
    })
    if (!window.MathJax) {
      const script = document.createElement('script')
      // script.onload = this.onScriptLoaded
      script.type = 'text/javascript'
      script.src = '../../../js/MathJax/mathjax2Config.js'
      document.head.appendChild(script)
    } else {
      this.onScriptLoaded()
    }
    //MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'mathjax'])
  },
  methods: {
    onScriptLoaded(event = null) {
      MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'mathjax'])
    }
  },
  updated() {
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'mathjax'])
  },

  computed: {
    updateText() {
      return this.count % 3
    }
  },
  head() {
    return {
      title: 'Eq. Linear de 1a ordem',
      meta: [
        {
          hid: 'description eq. linear de primeira ordem',
          name: 'eq. linear',
          content: 'eq. linear de primeira ordem www.dydx.ufes.br do DMAT/UFES'
        }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: 'stylesheet',
          href:
            'https://fonts.googleapis.com/css2?family=Rock+Salt&display=swap'
        },
        {
          rel: 'stylesheet',
          href:
            'https://fonts.googleapis.com/css2?family=Reenie+Beanie&display=swap'
        }
      ]
      // script: [
      //   {
      //     type: 'text/javascript', //x-mathjax-config',
      //     src: '../../../static/js/MathJax/mathjax2Config.js',
      //     async: true
      //     //defer: true // defer = true is important
      //   }
      // ]
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

/* font-family: 'Comic Sans MS', cursive, sans-serif; */
/* font-family: 'Neucha', cursive; */
/* font-family: Lucida Console; */
/* font-family: 'Montserrat', sans-serif; */
/* font-family: 'Reenie Beanie', cursive; */
/* font-family: 'Lucida Grande', sans-serif; */
/* font-size: 20px; */
/* font-weight: 700; */
/* line-height: 160%; */
/* margin: 25px; */
/* margin-bottom: 0.4cm; */
</style>
