<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <h2 style="color:brown;">
          As equações de Lotka-Volterra
          <v-btn @click="count++" large absolute text right>
            {{ updateText + 1 }}/{{ total }}
            <v-icon style="color:brown;" large>mdi-chevron-right</v-icon>
          </v-btn>
        </h2>
      </v-col>
    </v-row>
    <v-divider style="margin-bottom: 1rem;" />

    <v-row
      v-touch="{
        left: event => swipeLeft(event),
        right: event => swipeRight(event)
      }"
    >
      <v-col>
        <!-- key=count to guarantie re render -->
        <transition name="fade" mode="out-in">
          <div key="count" v-if="updateText == 0"><Text1 /></div>
          <div key="count" v-else-if="updateText == 1"><Text2 /></div>
          <div key="count" v-else-if="updateText == 2"><Text3 /></div>
          <div key="count" v-else-if="updateText == 3"><Text4 /></div>
          <div key="count" v-else><Text5 /></div>
        </transition>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-btn @click="count += 9" large text absolute bottom left>
          <v-icon style="color:brown;" large>chevron_left</v-icon>
          Anterior
        </v-btn>

        <v-btn large fab absolute bottom style="position:relative; left: 50%;"
          >{{ updateText + 1 }}/{{ total }}</v-btn
        >

        <v-btn @click="count++" large text absolute bottom right
          >Seguinte
          <v-icon style="color:brown;" large>chevron_right</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <!-- 
          <v-btn @click="count = count + 9" fab large text absolute bottom left>
            <v-icon style="color:brown;" large>mdi-chevron-left</v-icon>
          </v-btn>

          <v-spacer />
          <v-btn @click="count++" fab large text absolute bottom right>
            <v-icon style="color:brown;" large>mdi-chevron-right</v-icon>
          </v-btn> -->
    <!-- </v-col>
      </v-row> -->

    <!-- <v-row>
        <v-col>
          <v-btn @click="count = count + 9" fab large text absolute bottom left>
            <v-icon style="color:brown;" large>mdi-chevron-left</v-icon>
          </v-btn>

          <v-spacer />
          <v-btn @click="count++" fab large text absolute bottom right>
            <v-icon style="color:brown;" large>mdi-chevron-right</v-icon>
          </v-btn>
        </v-col>
      </v-row> -->
  </v-container>
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
      count: 0,
      total: 5
    }
  },
  mounted() {
    this.checkMathJaxLoaded()

    document.addEventListener('keydown', e => {
      if (e.key == 39 || e.keyCode == 39) {
        this.count++
      } else if (e.key == 37 || e.keyCode == 37) {
        this.count += 9
      } else return
    })
  },
  methods: {
    checkMathJaxLoaded() {
      if (typeof window.MathJax !== undefined) {
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.defer = true
        script.src = '/js/MathJax/mathjax2Config.js'
        document.head.appendChild(script)
        //script.addEventListener('load', this.onMathJaxLoaded)
      } else if (typeof window.MathJax.Hub !== undefined) {
        MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'mathjax'])
      }
    },

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
        this.count += 9
      }
    }
  },
  updated() {
    if (MathJax.Hub) {
      MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'mathjax'])
    }
  },
  computed: {
    updateText() {
      return this.count % 5
    }
  },
  head() {
    return {
      title: 'Lotka-Volterra',
      meta: [
        {
          hid: 'description lotka-volterra',
          name: 'Lotka-Volterra',
          content: 'Lotka-Volterra www.dydx.ufes.br do DMAT/UFES'
        }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        // {
        //   rel: 'stylesheet',
        //   href:
        //     'https://fonts.googleapis.com/css2?family=Rock+Salt&display=swap'
        // }
      ]
      // script: [
      //   {
      //     type: 'text/javascript', //x-mathjax-config',
      //     src: '/js/MathJax/mathjax2Config.js',
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
</style>
