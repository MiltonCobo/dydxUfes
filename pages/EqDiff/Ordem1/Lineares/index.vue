<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col xs="12" align="start">
          <h2 style="color:brown;">
            Equações Lineares de primeira Ordem
            <v-btn @click="count++" large absolute text right>
              {{ updateText + 1 }}/{{ total }}
              <v-icon style="color:brown;" large>chevron_right</v-icon>
            </v-btn>
          </h2>
          <v-divider style="margin:0.5cm;" />
        </v-col>
      </v-row>

      <v-row
        v-touch="{
          left: event => swipeLeft(event),
          right: event => swipeRight(event)
        }"
      >
        <v-col>
          <!-- key=count to guarantie re render -->
          <transition name="slide-fade" mode="out-in">
            <div key="count" v-if="updateText == 0"><Linear1 /></div>
            <div key="count" v-else-if="updateText == 1"><Linear2 /></div>
            <div key="count" v-else><Linear3 /></div>
          </transition>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-btn @click="count += 2" large text absolute bottom left>
            <v-icon style="color:brown;" large>chevron_left</v-icon>
            Anterior
          </v-btn>

          <v-btn large fab absolute bottom style="position:relative; left: 50%;"
            >{{ updateText + 1 }}/{{ total }}</v-btn
          >

          <v-btn @click="count++" large text absolute bottom right>
            Seguinte
            <v-icon style="color:brown;" large>chevron_right</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// import vuePlotly from '@statnett/vue-plotly'

import Linear1 from '@/components/EqDiff/Linear/Linear1'
import Linear2 from '@/components/EqDiff/Linear/Linear2'
import Linear3 from '@/components/EqDiff/Linear/Linear3'

export default {
  components: {
    Linear1,
    Linear2,
    Linear3
  },
  data() {
    return {
      count: 0,
      total: 3
    }
  },
  mounted() {
    this.checkMathJaxLoaded()

    document.addEventListener('keydown', e => {
      if (e.keyCode == 39) {
        this.count++
      } else if (e.keyCode == 37) {
        this.count += 2
      } else return
    })
  },
  methods: {
    swipeLeft(event) {
      if (this.$store.state.discardTouch) {
        this.$store.discardTouch(false) // allow swipes
      } else if (event.offsetX < -150) {
        // long swipe?
        this.count++
      }
    },
    swipeRight(event) {
      console.log(event.offsetX)
      if (this.$store.state.discardTouch) {
        this.$store.discardTouch(false) // allow swipes
      } else if (event.offsetX > 150) {
        // long swipe?
        this.count += 2
      }
    },

    checkMathJaxLoaded() {
      if (typeof window.MathJax !== undefined) {
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.async = true
        script.src = '/js/MathJax/mathjax2Config.js'
        document.head.appendChild(script)
        script.addEventListener(
          'load',
          //MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'mathjax'])
          console.log('mathjax has been loaded in lineares/index.vue!')
        )
        //script.addEventListener('load', this.onMathJaxLoaded)
      } else if (typeof MathJax.Hub !== 'undefined') {
        console.log('mathjax is present, it will typeset')
        MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'mathjax'])
      }
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
        //{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        // {
        //   rel: 'stylesheet',
        //   href:
        //     'https://fonts.googleapis.com/css2?family=Rock+Salt&display=swap'
        // },
        // {
        //   rel: 'stylesheet',
        //   href:
        //     'https://fonts.googleapis.com/css2?family=Reenie+Beanie&display=swap'
        // }
      ],
      script: [
        // {
        //   type: 'text/javascript', //x-mathjax-config',
        //   src: '/js/MathJax/mathjax2Config.js',
        //   async: true // WHEN RELOAD FROM THIS PAGE MATHJAX IS LOADED
        //   //defer: true // defer = true is important
        // }
      ]
    }
  }
}
</script>
<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
