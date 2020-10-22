<template>
  <div>
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
      <v-divider style="margin-bottom:0.5cm;" />

      <v-row v-touch="{ left: (event) => swipeLeft(event), right: (event) => swipeRight(event) }">
        <v-col> <!-- key=count to guarantie re render -->
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

            <v-btn
              large
              fab
              absolute
              bottom
              style="position:relative; left: 50%;"
              >{{ updateText + 1 }}/{{ total }}</v-btn
            >

            <v-btn @click="count++" large text absolute bottom right>Seguinte
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
        </v-col>
      </v-row>

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
      count: 0,
      total: 5
    }
  },
  mounted() {
    window.PlotlyConfig = { MathJaxConfig: 'local' }


    document.addEventListener('keydown', e => {
      if (e.keyCode == 39) {
        this.count++
      } else if (e.keyCode == 37) {
        this.count += 9
      } else return
    })
    if (!window.MathJax) {
      const script = document.createElement('script')
      //script.onload = this.onScriptLoaded
      script.type = 'text/javascript'
      script.src = '../../../js/MathJax/mathjax2Config.js'
      document.head.appendChild(script)
    } 
    else {
        if (MathJax.Hub) {
        MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'mathjax'])
        //console.log('MathJax.Hub!')
      }

      //MathJax.typeset()
    }
  },
  methods: {
    swipeLeft(event) {
        if (this.$store.state.discardTouch ) {
        this.$store.discardTouch(false)   // allow swipes
        } else if (event.offsetX < -150) { // long swipe?
        this.count++ 
        }
    },
    swipeRight(event) {
        if (this.$store.state.discardTouch ) {
        this.$store.discardTouch(false)   // allow swipes
        } else if (event.offsetX > 150) { // long swipe?
       this.count +=9
        }
        // if (this.$store.state.discardTouch) {
        //   this.$store.discardTouch(false)
        // } else {
        //   this.count += 9
        // }
    }
  },
  updated() {
    //MathJax.typeset()
        if (MathJax.Hub) {
        MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'mathjax'])
        //console.log('MathJax.Hub!')
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
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
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

/*#mathjax {
   font-family: 'Lucida Grande', sans-serif;
  font-size: 20px; */
  /* font-weight: 700; */
  /* line-height: 150%; */
  /* font-family: 'Comic Sans MS', cursive, sans-serif; */
  /* font-family: 'Neucha', cursive; */
  /* font-family: Lucida Console; */
  /* font-family: 'Montserrat', sans-serif; */
  /* font-size: 18px; */
  /* font-weight: 700; */
  /* line-height: 150%; */
  /* margin: 0; 
  margin-bottom: 0.4cm; 
} */
</style>
