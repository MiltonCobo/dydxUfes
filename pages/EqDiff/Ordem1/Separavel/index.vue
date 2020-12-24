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
          <!-- key=count to guarantie re render -->
          <transition name="fade" mode="out-in">
            <div key="count" v-if="updateText == 0"><Separavel1 /></div>
            <div key="count" v-else-if="updateText == 1"><Separavel2 /></div>
            <div key="count" v-else="updateText == 2"><Separavel3 /></div>
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
    // this.checkMathJaxLoaded()
    //MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'mathjax'])

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
    onScriptLoaded() {
      if (MathJax.Hub) {
        MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'mathjax'])
      }
    },

    checkMathJaxLoaded() {
      if (typeof window.MathJax !== undefined) {
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.defer = true
        script.src = '../../../js/MathJax/mathjax2Config.js'
        document.head.appendChild(script)
        script.addEventListener('load', console.log('mathjax has been loaded!'))
        //script.addEventListener('load', this.onMathJaxLoaded)
      } else if (typeof MathJax.Hub.Typeset !== 'undefined') {
        // MathJax.typeset()
        MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'mathjax'])
        console.log('mathjax is already loaded in index.vue and typeset()')
      } else {
        console.log('mathjax.typeset is not loaded....')
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
        {
          type: 'text/javascript', //x-mathjax-config',
          src: '../../../js/MathJax/mathjax2Config.js',
          async: true // WHEN RELOAD FROM THIS PAGE MATHJAX IS LOADED
          //defer: true // defer = true is important
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

.MathJax_Display {
  text-align: center !important;
  display: inline !important;
}

.MathJax {
  color: green !important;
  padding: 3px 3px;
}

#mathjax {
  /* font-family: 'Comic Sans MS', cursive, sans-serif; */
  /* font-family: 'Neucha', cursive; */
  /* font-family: Lucida Console; */
  /* font-family: 'Montserrat', sans-serif;
  font-size: 25px; */
  /* font-weight: 700; */
  /* line-height: 150%; */
  /* margin: 0; */
  /* margin-bottom: 0.4cm; */
}
</style>
