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
  mounted() {
    //this.checkMathJaxLoaded()
  },
  methods: {
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
          console.log('mathjax has been loaded in lineares/LINEAR1!')
        )
        //script.addEventListener('load', this.onMathJaxLoaded)
      } else if (typeof MathJax.Hub !== 'undefined') {
        console.log('mathjax is present in LINEAR1, it will typeset')
        MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'mathjax'])
      }
    }
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

<style scoped></style>
