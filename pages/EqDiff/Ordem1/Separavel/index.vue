<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col xs="12" align="start">
          <h2 style="color:brown;">
            Equações separáveis de primeira Ordem
            <v-btn @click="count++" large absolute text right>
              {{ updateText + 1 }}/{{ total }}
              <v-icon style="color:brown" large>chevron_right</v-icon>
            </v-btn>
          </h2>
        </v-col>
      </v-row>
      <v-divider style="margin:0.5cm;" />

      <v-row
        v-touch="{
          left: event => swipeLeft(event),
          right: event => swipeRight(event)
        }"
      >
        <v-col>
          <!-- key=count to guarrantie re render -->
          <transition name="bounce">
            <div key="count" v-if="updateText == 0"><Separavel1 /></div>
            <div key="count" v-else-if="updateText == 1"><Separavel2 /></div>
            <div key="count" v-else><Separavel3 /></div>
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

          <v-btn @click="count++" large text absolute bottom right
            >Seguinte<v-icon style="color:brown;" large>chevron_right</v-icon>
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
        script.defer = true
        script.src = '../../../js/MathJax/mathjax2Config.js'
        document.head.appendChild(script)
        //script.addEventListener('load', console.log('mathjax has been loaded!'))
        //script.addEventListener('load', this.onMathJaxLoaded)
      } else if (typeof MathJax.Hub !== 'undefined') {
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
      title: 'Eq. Separável',
      meta: [
        {
          hid: 'description Eq Separável',
          name: 'Eq. Separável',
          content: 'Eq. diferencial separável www.dydx.ufes.br do DMAT/UFES'
        }
      ],
      script: [
        // {
        //   type: 'text/javascript', //x-mathjax-config',
        //   src: '../../../js/MathJax/mathjax2Config.js',
        //   async: true // WHEN RELOAD FROM THIS PAGE MATHJAX IS LOADED
        //   //defer: true // defer = true is important
        // }
      ]
    }
  }
}
</script>
<style scoped>
/* TRANSITIONS----------------------------------- */

/* Transitions Layout */
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}

/* TRANSITIONS------------------------------- */
</style>
